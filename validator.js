//This file was supposed to be a way of validating that a certain set of data exists in a database 
//unfortunately I could not get the functions to return anything except undefined
//I tried commenting out every line of code that referred to another file and running it as a standalone file. 
//I made sure that the query was correct, and even tried simpler queries
//I narrowed it down the the connection.query file. As long as the query ran, it would always return "undefined"
//I tried literally setting the if statement to if(1 === 1){ return true; } and it still returned "undefined", so it wasn't a result of an empty variable.
//I tried all sorts of asyncronous methods, as you can see on the bottom. 
//At this point I need to move on to the next homework assignment. 

//var mysql = require("mysql");
//var connection = require("./connection.js");

/*var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'bamazon'
  });*/

var x = 1;
function validator(item_id, func){
    connection.query(
        "SELECT COUNT(item_id) FROM products WHERE item_id= '" + item_id + "';",
        function(error, results){
            var number = results[0]["COUNT(item_id)"];
            func(number);
        }
    );

};





//console.log(validator2(1));
function validation(){
    validator(1, function(number) {
        if (number === 1) {
            return(true);
        } else {
            return(false);
        }
    });
};

var x = validation();
console.log(x);
if(validation()){
    console.log("it works");
}
//module.exports = validator;