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

module.exports = router;
