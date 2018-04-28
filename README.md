# mysql-storefront

# Bamazon Storefront

The main concept behind this project is to build a storefront out of a databse.  

There are two files in the program. Customer Mode (bamazonCustomer.js) and Manager Mode (bamazonManager.js)

The customer file only allows the user to view the storefront and purchase items. It displays the price of the items and depletes the databse based on the amount of items ordered.

The manager file allows the user to view the storefront, view items with a stock of 5 or less, increase the inventory of a single item, or add a new item to the databse. 

Currently there is nothing validating that the userID that is typed in exists in the database. I spent so much time developing the manager view that I forgot to code a method of validating that, but I will add that as soon as possible. 