//var mysql = require("mysql");
var connection = require("./connection.js");

var x = 1;
function validator(item_id){
    connection.query(
        "SELECT COUNT(item_id) FROM products WHERE item_id= '" + item_id + "';",
        function(error, results){
            var number = results[0]["COUNT(item_id)"];
            //console.log(number);
            return number;
        }
    );

};

function validator2(x){
    if(x === 1){
        return true;
    } else {
        return false;
    }
};

function validator3(item_id){
    var y = item_id;
    connection.query(
        "SELECT * FROM products",
        function(error, results){
            console.log("this is a console log");
            return "yeah";
        }
    );

};


console.log(validator3(2));


//console.log(validator2(1));
//console.log(validator(1));
//module.exports = validator;