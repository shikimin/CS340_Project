// App.js

/*
    SETUP
*/
const express = require('express');     // Import express.js
const app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))

PORT        = 1839;                 // Set a port number at the top so it's easy to change in the future
// Database
var db = require('./database/db-connector')

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


/*
    ROUTES
*/

app.get('/', function(req, res)
    {
        res.render('index');
    });       

// Get Cats
app.get('/cats', function(req, res)
    {  
        let query1 = "SELECT cat_id, CONCAT(Customers.first_name, ' ', Customers.last_name) AS 'customer', cat_name FROM Cats INNER JOIN Customers ON Customers.customer_id = Cats.customer_id ORDER BY cat_id ASC;";               // Define our query
        let query2 = "SELECT customer_id, CONCAT(Customers.first_name, ' ', Customers.last_name) AS 'customer_dropdown' FROM Customers;";

        db.pool.query(query1, function(error, rows, fields){    // Execute the query
            let cats = rows;
        
        db.pool.query(query2, function(error, rows, fields){
            let customers = rows;
            return res.render('cats', {data: cats, customers: customers});
        })
            
        })
    });

// Get Customers
app.get('/customers', function(req, res)
    {  
        let query = "SELECT * FROM Customers ORDER BY customer_id ASC;";

        db.pool.query(query, function(error, rows, fields){    // Execute the query
            let customers = rows;
            return res.render('customers', {data: customers});
            
        })
    });


// Create new cat
app.post('/add-cat-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Cats (customer_id, cat_name) VALUES ('${data['customer_id']}', '${data['cat_name']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/cats');
        }
    })
})

// Create new customer
app.post('/add-customer-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Customers (first_name, last_name, phone) VALUES ('${data['first_name']}', '${data['last_name']}', '${data['phone']}');`;

    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/customers');
        }
    })
})




// Update Cat
app.put('/put-cat-ajax', (req,res,next) => {
    let data = req.body;
  
    let catID = parseInt(data.catID);
    let customerID = parseInt(data.customerID);
    let newCatName = data.newCatName;
    
    let queryUpdateCat = `UPDATE Cats SET customer_id = "${customerID}", cat_name = "${newCatName}" WHERE cat_id = ${catID};`;
    let selectCat = `SELECT * FROM Cats WHERE cat_id = ?`
  
          // Run the 1st query
          db.pool.query(queryUpdateCat, [catID, customerID, newCatName], function(error, rows, fields){
            if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }

            // If there was no error, we run our second query and return that data so we can use it to update the people's
            // table on the front-end
            else
            {
                 // Run the second query
                 db.pool.query(selectCat, [catID], function(error, rows, fields) {

                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.send(rows);
                    }
                })
            }
  })});


  // Update Customer
app.put('/put-customer-ajax', (req,res,next) => {
    let data = req.body;
  
    let customerID = parseInt(data.customerID);
    let firstName = data.firstName;
    let lastName = data.lastName;
    let phone = data.phone;
    
    let queryUpdateCustomer = `UPDATE Customers SET first_name = "${firstName}", last_name = "${lastName}", phone = "${phone}" WHERE customer_id = ${customerID};`;
    let selectCustomer = `SELECT * FROM Customers WHERE customer_id = ?`
  
          // Run the 1st query
          db.pool.query(queryUpdateCustomer, [customerID, firstName, lastName, phone], function(error, rows, fields){
            if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }

            // If there was no error, we run our second query and return that data so we can use it to update the people's
            // table on the front-end
            else
            {
                 // Run the second query
                 db.pool.query(selectCustomer, [customerID], function(error, rows, fields) {

                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.send(rows);
                    }
                })
            }
  })});


// Delete Cat
app.delete('/delete-cat-ajax/', function(req,res,next){
    let data = req.body;
    let catID = parseInt(data.id);
    let delete_cat = `DELETE FROM Cats WHERE cat_id = ?`;
  
        db.pool.query(delete_cat, [catID], function(error, rows, fields){
            if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }

            else
            {
            res.sendStatus(204);
            }
        })
    });

// Get Room_Types
app.get('/room_types', function(req, res) {  
        let query = "SELECT * FROM Room_Types ORDER BY room_id ASC;";

        db.pool.query(query, function(error, rows, fields){    // Execute the query
            let room_types = rows;
            return res.render('room_types', {data: room_types});
            
        })
    });

// Create new room_type
app.post('/add-room-form', function(req, res){
    let data = req.body;
    console.log(data);
    // Check if room name and rate are empty
    if (data['room_name'] == "" || data['rate'] == "")
    {
        // error message?
    }
    let query1 = `INSERT INTO Room_Types (room_name, rate) VALUES ('${data['room_name']}', '${data['rate']}');`;
    db.pool.query(query1, function(error, rows, fields){
        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            res.redirect('/room_types');
        }
    });
});

// Update Room_Type

// Delete Room_Type
app.delete('/delete-room-ajax/', function(req,res,next){
    let data = req.body;
    let roomID = parseInt(data.id);
    let delete_room = `DELETE FROM Room_Types WHERE room_id = ?`;
  
        db.pool.query(delete_room, [roomID], function(error, rows, fields){
            if (error) {
            console.log(error);
            res.sendStatus(400);
            }
            else
            {
            res.sendStatus(204);
            }
        })
    });
/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
