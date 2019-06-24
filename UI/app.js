const mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
    host:localhost,
    user:root,
    password:khennikay101,
    database:login_signupdb
});

mysqlConnection.connect((err) => {
    if(!err)
    console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error: ' = JSON.stringify(err, undefined, 2));
});