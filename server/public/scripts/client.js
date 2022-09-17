
$(readyNow);

function readyNow() {
    // grab data
    grabTodos();
    // click handlers
    $('#todos').on('click', '.delBtn', deleteTodo);
}

// GET the todo's from the server.
function grabTodos() {
    $.ajax({
        method: 'GET',
        url: '/todos'
    }).then((response) => {
        appendTodos(response);
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
            <td>${todo.isDone}</td>
            <td>
                <button data-todoid="${todo.id}" class="delBtn">
                    Delete
                </button>
            </td>
        </tr>
        `);
    }
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