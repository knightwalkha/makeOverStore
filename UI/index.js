const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({extend: false}));
app.use(bodyparser.json());

// TRo prevent CORs error(is a security mechanism enforced by the browser) handling
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'khennikay101',
    database:'login_signupdb',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if(!err)
        console.log('DB connection successful.');
    else
        console.log('DB connection failed \n Error: ' +  JSON.stringify(err, undefined, 2));
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Express server is running on port: ${process.env.PORT || '3000'}`)
});

// Getting all data for admin_login from MySQL
app.get('/admin_login', (req, res) => {
    mysqlConnection.query('SELECT * FROM admin_login', (err, rows, fields) => {
        if(!err)
        res.send(rows);
        else
        console.log(err);
    });
});

// Getting all data for admin_signup from MySQL
app.get('/admin_signup', (req, res) => {
    mysqlConnection.query('SELECT * FROM admin_signup', (err, rows, fields) => {
        if(!err)
        res.send(rows);
        else
        console.log(err);
    });
});

// Getting all data for customer_signup from MySQL
app.get('/customer_signup', (req, res) => {
    mysqlConnection.query('SELECT * FROM customer_signup', (err, rows, fields) => {
        if(!err)
        res.send(rows);
        else
        console.log(err);
    });
});

// Getting all data for customer_login from MySQL
app.get('/customer_login', (req, res) => {
    mysqlConnection.query('SELECT * FROM customer_login', (err, rows, fields) => {
        if(!err)
        res.send(rows);
        else
        console.log(err);
    });
});

// Getting an individual data for customer_login from MySQL
app.get('/customer_login/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM customer_login WHERE customerLoginId = ?', [req.params.id], (err, rows, fields) => {
        if(!err)
        res.send(rows);
        else
        console.log(err);
    });
});

// deleting an individual data from customerLogin  
app.delete('/customer_login/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM customer_login WHERE customerLoginId = ?', [req.params.id], (err, rows, fields) => {
        if(!err)
        res.send('Deleted successfully.');
        else
        console.log(err);
    });
});

// Inserting/Adding an individual data from customerLogin  
app.post('/customer_login', (req, res) => {
    let customer = req.body; 
    var sql =  "SET @customerLoginID = ?; SET @Username = ?; SET @Password = ?;\
    CALL customer_loginAddOrEdit(@customerLoginID, @Username, @Password);";
    mysqlConnection.query(sql, [customer.customerLoginID, customer.Username, customer.Password], (err, rows, fields) => {
        if(!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('Inserted new customerLoginID :' + element[0].customerLoginID);
            });
        else
            console.log(err);
    });
});

