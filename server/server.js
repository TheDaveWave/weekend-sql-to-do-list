const express = require('express');
const PORT = process.env.PORT || 5000;
// import router
const todoRouter = require('./routes/todos.router');

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.static('server/public'));

// direct requests for /todos to todos.router.js
app.use('/todos', todoRouter);


app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});