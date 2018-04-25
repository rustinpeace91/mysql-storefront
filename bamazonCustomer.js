//https://upenn.bootcampcontent.com/upenn-bootcamp/UPENN201801FSF4-Class-Repository-FSF/blob/master/01-Class-Content/12-mysql/02-Homework/homework_instructions.md

//global variables
var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table");

//connection data: Maybe secure in another location later
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});

//displays the storefront when the program is run
function storefront(){
    connection.query(
        "SELECT * FROM products;",
        function(error, results){
            var x = "";
            if(error) throw error;
            //console.log(results.length);
            /*for(var i = 0; i < results.length; i++){
                console.log(results[i].item_id + " " + results[i].product_name);
            }*/
            console.table(results);
            buy();
        }
    )
}

//prompts the user for an item to buy 
//TODO: make it so when the user purchases an item it depletes some of the inventory
function buy() {
    inquirer.prompt({
        name:"itemToBuy",   
        type: "input",
        message: "what is the ID number of the item you would like to buy"
    }).then(function(answer){
        connection.query(
            "SELECT * FROM products WHERE ?", [{
                item_id: answer.itemToBuy
            }],
            function(error, results){

                if(error) throw error;
                var product = results[0].product_name;
                var price = results[0].price;
                /*inquirer.prompt({
                    name:"yesOrNo",
                    type: ""
                })*/
                console.log("would you like to buy " + product + " for " + price + "?");
            }
        )
    });
};



connection.connect(function(err) {
    if (err) throw err;
    storefront();
  });