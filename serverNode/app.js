const express = require('express');
const { queryDatabase } = require('./azureGet');
const app = express();


// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/cities', async (req, res) => {
    let result = await queryDatabase();
    res.send(result);
});

app.get('/', (req, res) => {
    res.send({
        message: 'Welcome!!! Server is up and running'
    });
});


module.exports = app;