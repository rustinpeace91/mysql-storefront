//https://upenn.bootcampcontent.com/upenn-bootcamp/UPENN201801FSF4-Class-Repository-FSF/blob/master/01-Class-Content/12-mysql/02-Homework/homework_instructions.md

//global variables
var inquirer = require("inquirer");
var table = require("console.table");
var currentQuantity = 0;
var currentItemId = 0;
var connection = require("./connection.js");
//var validator = require("./validator.js");

//connection data: Maybe secure in another location later


//displays the storefront of items when the program is run
function storefront(){
    connection.query(
        "SELECT * FROM products;",
        function(error, results){
            if(error) throw error;
            //using the console table package to display the items
            console.table(results);
            select();
        }
    )
}

//prompts the user for an item to buy 
function select() {
    inquirer.prompt({
        name:"itemToBuy",   
        type: "input",
        message: "what is the ID number of the item you would like to buy"
    }).then(function(answer){
        currentItemId = answer.itemToBuy;
            connection.query(
                "SELECT * FROM products WHERE ?", [{
                    item_id: answer.itemToBuy
                }],
                function(error, results){
                    if(error) throw error;
                    var product = results[0].product_name;
                    var price = results[0].price;
                    currentQuantity = parseInt(results[0].stock_quantity);
                    if(parseInt(results[0].stock_quantity) <= 0){
                        console.log("Sorry. Out of stock.");
                        select();
                    }
                    confirm(product, price);
                }
            )
        
        //Validator function. Does not return anything other than undfined for now. 
        /*if(validator(currentItemId)){
        } else {
            console.log("that item ID does not exist");
            end();
        }*/

    });
};

//the confirmation function. displays the unit price of the item
function confirm(product, price){
    inquirer.prompt({
        name:"yesOrNo",
        type: "confirm",
        message: "would you like to buy " + product + " for " + price + "?"
    }).then(function(answer){
        if(answer.yesOrNo === true){
            howMany(product, price);
        } else if (answer.yesOrNo === false){
            storefront();
        } else {
            console.log("please type a valid answer");

        }
    });
};

//prompts the user for the quanity of items they would like
function howMany(product, price){
    inquirer.prompt({
        name: "howMany",
        type: "input",
        message: "How many would you like?"
    }).then(function(answer){
        if(isNaN(parseInt(answer.howMany))){
            console.log("please type a valid number");
            howMany(product,price);
        }else {
            var finalPrice = (parseInt(answer.howMany) * price).toFixed(2);
            var quantity = parseInt(answer.howMany);
            if(quantity > currentQuantity){
                console.log("Sorry. We do not have that many of that item");
                howMany(product, price);
            } else {
                console.log("that will be  " + finalPrice); 
                purchase(product, price, quantity);
            };
        }
    })
};

//updates the database based on the purchase 
function purchase(product, price, quantity){
    connection.query(
        "UPDATE products SET ? WHERE ?",[{
            stock_quantity: currentQuantity - quantity,
        },
        {
            item_id: currentItemId,
        }],
        function(error, results){

            if(error) throw error;
            console.log("thank you for your purchase!");
            end();
        }
    )

};

//the end menu. prompts the user
function end(){
    inquirer.prompt({
        name: "endScreen",
        type: "list",
        message: "What would you like to do now?",
        choices: [
            "continue shopping",
            "quit"
        ]
    }).then(function(answer){
        if(answer.endScreen === "continue shopping"){
            storefront();
        } else {
            process.exit();
        };
    });
};

//runs when the program stars
connection.connect(function(err) {
    if (err) throw err;
    storefront();
  });