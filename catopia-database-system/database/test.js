// ./database/db-connector.js

// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createConnection({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_chanc5',
  password        : '2132',
  database        : 'cs340_chanc5'
})

pool.connect(function(err) {
    if (err) throw err;
    pool.query("SELECT cat_id AS 'Cat ID', CONCAT(Customers.first_name, ' ', Customers.last_name) AS 'Customer', cat_name AS 'Cat Name' FROM Cats INNER JOIN Customers ON Customers.customer_id = Cats.customer_id;", function (err, result, fields) {
      if (err) throw err;
      console.log(result[1]);
    });
  });