const router = require('express').Router();
// import pool config
const pool = require('../modules/pool');

// setup get route for /todos
router.get('/', (req,res) => {
    console.log(`In GET route /todos`);
    const queryText = `SELECT * FROM "todos" ORDER BY "id";`;
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log(`Error getting to-do's`,error);
        res.sendStatus(500);
    });
});

// POST route for /todos
router.post('/', (req,res) => {
    const todo = req.body;
    console.log('In POST route /todos', todo);
    let queryText = '';
    let values = [];

    // check for empty keys and use the correct query statement accordingly.
    if(todo.task !== '' && todo.priority !== undefined && todo.due !== '') {
        // setup query statement to insert a new todo.
        queryText = `INSERT INTO "todos" ("task", "priority", "due")
        VALUES ($1, $2, $3);`;
        // setup values to put into the query.
        values = [todo.task, todo.priority, todo.due];
    } else if (todo.task !== '' && todo.priority !== undefined) {
        queryText = `INSERT INTO "todos" ("task", "priority")
        VALUES ($1, $2);`;
        values = [todo.task, todo.priority];
    } else if (todo.task !== '' && todo.due !== '') {
        queryText = `INSERT INTO "todos" ("task", "due")
        VALUES ($1, $2);`;
        values = [todo.task, todo.due];
    } else if (todo.task !== ''){
        queryText = `INSERT INTO "todos" ("task")
        VALUES ($1);`;
        values = [todo.task];
    }
    // console.log(queryText);
    // console.log(values);

   pool.query(queryText, values).then((result) => {
        res.sendStatus(201);
   }).catch((error) => {
        console.log(`Error creating to-do`, error);
        res.sendStatus(500);
   });
});

// PUT route for /todos
// UPDATE the boolean value isDone. (maybe implement time stamp here)
router.put('/:todoid', (req,res) => {
    console.log(`In PUT route /todos/`, req.body, req.params);
    const todoid = req.params.todoid;
    const isDone = !req.body.isDone;
    const queryText = `UPDATE "todos" SET "isDone"=$1 WHERE id=$2 RETURNING *;`;
    let values = [isDone, todoid];

    pool.query(queryText,values).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log(`Error updating isDone for to-do with id${todoid}`, error);
        res.sendStatus(500);
    });
});

// PUT route for /todos/edit
// Will grab keys from current to do item 
// should only be updated in an edit mode.
router.put('/edit/:todoid', (req,res) => {
    console.log(`In POST route /todos/edit`, req.params, req.body);
    const todoid = req.params.todoid;
    const todo = req.body;
    const queryText = `UPDATE "todos" SET "task"=$1, "priority"=$2, "due"=$3 WHERE id=$4 RETURNING *;`;
    let values = [todo.task, todo.priority, todo.due, todoid];

    pool.query(queryText,values).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log(`Error in updating to-do with id:${todoid}`, error);
        res.sendStatus(500);
    });
});

// DELETE route for /todos
router.delete('/:todoid', (req,res) => {
    console.log('In DELETE route /todos/', req.params);
    const todoid = req.params.todoid;
    const queryText = `DELETE FROM "todos" WHERE id=$1 RETURNING *;`;
    pool.query(queryText, [todoid]).then((result) => {
        res.send(result.rows).status(200);
    }).catch((error) => {
        console.log(`Error deleting to-do with id:${todoid}`, error);
        res.sendStatus(500);
    });
});

module.exports = router;
