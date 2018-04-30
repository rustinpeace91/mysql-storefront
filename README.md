# mysql-storefront

# Bamazon Storefront

The main concept behind this project is to build a storefront out of a databse.  

There are two files in the program. Customer Mode (bamazonCustomer.js) and Manager Mode (bamazonManager.js)

The customer file only allows the user to view the storefront and purchase items. It displays the price of the items and depletes the databse based on the amount of items ordered.

The manager file allows the user to view the storefront, view items with a stock of 5 or less, increase the inventory of a single item, or add a new item to the databse. 

I tried to code a file that would validate the item_ID data to ensure that the item ID that the user typed in existed in the database by querying the database and setting a Count to 0 or 1, and then returning true or false based on that count. However no matter what I did, the function would always turn "undefined" after the query was run. For more details on this endevour. See the comments on the top of the "validator.js" file.  Eventually I had to stop and move on to the next homework because I was spending far too much time on it. 