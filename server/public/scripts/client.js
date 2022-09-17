
$(readyNow);

function readyNow() {
    // grab data
    grabTodos();
    // click handlers
    $('#todos').on('click', '.delBtn', deleteTodo);
    $('#todos').on('click', '.check', toggleCheck);
}

// GET the todo's from the server.
function grabTodos() {
    $.ajax({
        method: 'GET',
        url: '/todos'
    }).then((response) => {
        appendTodos(response);
        // displayCheck();
    }).catch((error) => {
        console.log(error);
    });
}

// display the todo list onto the DOM.
function appendTodos(response) {
    // clear table
    $('#todos').empty();
    for(const todo of response) {
        $('#todos').append(`
        <tr>
            <td>${todo.priority}</td>
            <td>${todo.task}</td>
            <td>${todo.due}</td>
            <td data-isDone="${todo.isDone}">
                <input data-id="${todo.id}" class="check" type="checkbox" ${todo.isDone ? 'checked' : ''}/>
            </td>
            <td>
                <button data-todoid="${todo.id}" class="delBtn">
                    Delete
                </button>
            </td>
        </tr>
        `);
    }
}

// When checkbox is toggled change the value of isDone.
function toggleCheck(event) {
    const todoid = $(event.target).data('id');
    // get the boolean value of the check box.
    const check = $(event.target).is(':checked');
    // console.log(check);
    $.ajax({
        method: 'PUT',
        url: `/todos/${todoid}`,
        data: {isDone: check}
    }).then(() => {
        // refresh the table.
        grabTodos();
    }).catch((error) => {
        console.log(error);
    });
}

// Ajax request to DELETE a todo
function deleteTodo(event) {
    const todoid = $(event.target).data('todoid');
    $.ajax({
        method: 'DELETE',
        url: `/todos/${todoid}`
    }).then(() => {
        // refresh the table
        grabTodos();
    }).catch((error) => {
        console.log(error);
    });
}