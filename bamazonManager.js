var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table");
var connection = require("./connection.js");
var currentQuantity = 0;


function start(){
    inquirer.prompt({
        name:"mainMenu",
        type: "list",
        message: "what would you like to do",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }).then(function(answer){
        switch(answer.mainMenu){
            case "View Products for Sale":
                console.log("yeah");
                storefront();
                break;
            case "View Low Inventory":
                lowInventory();
                break;
            case "Add to Inventory":
                addToInventory();
                break;
            default:
                newItemData();
                "cooool"
        }
    });
}

function storefront(){
    connection.query(
        "SELECT * FROM products;",
        function(error, results){
            //var x = "";
            if(error) throw error;
            //console.log(results.length);
            /*for(var i = 0; i < results.length; i++){
                console.log(results[i].item_id + " " + results[i].product_name);
            }*/
            console.table(results);
            end();
        }
    )
}

function lowInventory(){
    connection.query(
        "SELECT * FROM products WHERE stock_quantity < 5;",
        function(error, results){
            //var x = "";
            if(error) throw error;
            //console.log(results.length);
            /*for(var i = 0; i < results.length; i++){
                console.log(results[i].item_id + " " + results[i].product_name);
            }*/
            console.table(results);
            end();
        }
    )
}


//should probably break this up. 
function addToInventory(){
    var itemID = 0;
    var quantity = 0;
    inquirer.prompt({
        name: "whatItem",
        type: "input",
        message: "what is the id of the item you would like to order more of?",
    }).then(function(answer){
        
        
        if(!isNaN(parseInt(answer.whatItem))){
            itemID = parseInt(answer.whatItem);
        };
        
        //make this a seperate file? 
        connection.query("SELECT * FROM products WHERE item_id = " + itemID, function(error, results){
            currentQuantity = parseInt(results[0].stock_quantity);
            inquirer.prompt({
                name: "howMany",
                type: "input",
                message: "how many would you like to order?"
            }).then(function(answer){
                quantity = parseInt(answer.howMany);
                var total = quantity + currentQuantity;
                //console.log(total);
                var thequery = "UPDATE products SET stock_quantity= " + total
                + " WHERE item_id = " + itemID;
                console.log(thequery);
                connection.query(thequery, function(error, results){
                    if(error) throw error;
                    console.log("thank your order");
                    end();
                });
            });
        });

 

    })
};

function newItemData(){
    var productName = "";
    var departmentName = "";
    var price = 0.00;
    var stockQuantity = 0;
    inquirer.prompt({
        name: "productName",
        type: "input",
        message: "What is the name of the new product you would like to add?"
    }).then(function(answer){
        productName = answer.productName;

        inquirer.prompt({
            name : "departmentName",
            type: "input",
            message: "What is the department name?"
        }).then(function(answer){
            departmentName = answer.departmentName;
            inquirer.prompt({
                name: "price",
                type: "input",
                message: "How much would you like to sell it for (must be formatted like 0.00)"
            }).then(function(answer){
                price = parseFloat(answer.price);
                inquirer.prompt({
                    name: "stockQuantity",
                    type: "input",
                    message: "How many would you like to order?"
                }).then(function(answer){
                    stockQuantity = parseInt(answer.stockQuantity);
                    console.log(productName + " " + departmentName + " " + price + " " + stockQuantity);
                })
            })
        })
    });
}


function end(){
    inquirer.prompt({
        name: "endScreen",
        type: "list",
        message: "What would you like to do now?",
        choices: [
            "Go Back to Main Menu",
            "quit"
        ]
    }).then(function(answer){
        if(answer.endScreen === "Go Back to Main Menu"){
            start();
        } else {
            process.exit();
        }
    })
}

start();