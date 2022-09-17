
$(readyNow);

function readyNow() {
    // grab data
    grabTodos();
    // click handlers

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
    $('todos').empty();
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