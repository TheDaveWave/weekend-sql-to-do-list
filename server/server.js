const express = require('express');
const PORT = process.env.PORT || 5000;


const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.static('public/server'));


app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});
