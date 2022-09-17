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

router.post('/', (req,res) => {
    let todo = req.body;
    console.log('In POST route /todos', todo);
    let queryText = '';
    let values = [];

    // check for empty keys and use the correct query statement accordingly.
    if(todo.task !== '' && todo.priority !== undefined && todo.due !== undefined) {
        // setup query statement to insert a new todo.
        queryText = `INSERT INTO "todos" ("task", "priority", "due")
        VALUES ($1, $2, $3);`;
        // setup values to put into the query.
        values = [todo.task, todo.priority, todo.due];
    } else if (todo.task !== '' && todo.priority !== undefined) {
        queryText = `INSERT INTO "todos" ("task", "priority")
        VALUES ($1, $2);`;
        values = [todo.task, todo.priority];
    } else if (todo.task !== '' && todo.due !== undefined) {
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

module.exports = router;
