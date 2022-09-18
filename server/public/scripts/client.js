
$(readyNow);

function readyNow() {
    // grab data
    grabTodos();
    // click handlers
    $('#todos').on('click', '.delBtn', deleteTodo);
    $('#todos').on('click', '.check', toggleCheck);
    $('#addBtn').on('click', addTodo);
}

// POST to add a new todo.
function addTodo() {
    const newTodo = {
        task: $('#task').val(),
        priority: $('#priority').val(),
        due: $('#due').val()
    };

    $.ajax({
        method: 'POST',
        url: '/todos',
        data: newTodo
    }).then(() => {
        grabTodos();
    }).catch((error) => {
        console.log(error);
        if(error.status === 400) {
            alert('Please fill in a task.');
        }
    });

    $('#priority').prop('selectedIndex', 0);
    $('#task').val('');
    $('#due').val('');
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
        let cleanDue = todo.due.substring(0, todo.due.indexOf('T'));
        // console.log(cleanDue);
        $('#todos').append(`
        <tr ${todo.isDone ? 'class="done"' : ''}>
            <td>${todo.priority}</td>
            <td>${todo.task}</td>
            <td>${todo.due !== null ? cleanDue : ''}</td>
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

    // $(event.target).closest('tr').toggleClass('done');
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