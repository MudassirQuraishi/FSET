// importing express
const express = require('express');

//importing bodyParser
const bodyParser = require('body-parser');

//importing cors
const cors = require('cors');

// importing database from util
const Sequelize= require('./util/database');

// importing routes
const routes = require('./routes/routes');

const User = require('./model/expense');

const app = express();
app.use(bodyParser.urlencoded({ extended:false }));
app.use(cors());
app.use(bodyParser.json())

app.use('/expense',routes);

Sequelize.sync()
.then(()=>{
    const port = 4000;
    console.log(`Server running at ${port}`);
    app.listen(port);
})
.catch (err => console.log(err));

