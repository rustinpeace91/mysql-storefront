require("dotenv").config({EMPTY: ""});
var mysql = require("mysql");
var keys = require("./keys.js")
var connection = mysql.createConnection(keys);


/*var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'bamazon'
  });*/



  module.exports = connection;