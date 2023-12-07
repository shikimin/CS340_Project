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

// Get Cats with customer ID, Data for the dropdown menu
app.get('/get-cats/:id', function(req, res) {  
        let query = `SELECT cat_id, cat_name FROM Cats 
                    INNER JOIN Customers ON Customers.customer_id = Cats.customer_id 
                    WHERE Cats.customer_id = ${req.params.id} ORDER BY cat_id ASC;`;               // Define our query

        db.pool.query(query, function(error, rows, fields) {
            if (error) {
                res.status(500).json({ error: error.message });
            } else {
                res.json({ cats: rows });
            }
        });
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

// Get Services
app.get('/services', function(req, res)
    {  
        let query = "SELECT * FROM Services ORDER BY service_id ASC;";

        db.pool.query(query, function(error, rows, fields){    // Execute the query
            let services = rows;
            return res.render('services', {data: services});
            
        })
    });

// Get Services
app.get('/purchased_services', function(req, res)
    {  
        let query = `SELECT Purchased_Services.purchase_id AS "purchase_id", 
        Services.service_name AS "service_name", 
        CONCAT(Customers.first_name, " ", Customers.last_name, " | ", Cats.cat_name, " | ", Reservations.check_in_date) AS "reservation", 
        Purchased_Services.quantity AS "quantity" 
        FROM Purchased_Services
        INNER JOIN Services ON Services.service_id = Purchased_Services.service_id
        INNER JOIN Reservations ON Reservations.res_id = Purchased_Services.res_id
        INNER JOIN Cats ON Reservations.cat_id = Cats.cat_id
        INNER JOIN Customers ON Customers.customer_id = Cats.customer_id;`;

        let query2 = `SELECT service_id, service_name as 'services_dropdown' FROM Services ORDER BY service_id ASC;`
        let query3 = `SELECT res_id, CONCAT(Customers.first_name, " ", Customers.last_name, " | ", Cats.cat_name, " | ", Reservations.check_in_date) AS 'reservations_dropdown' FROM Reservations
        INNER JOIN Cats ON Reservations.cat_id = Cats.cat_id
        INNER JOIN Customers ON Customers.customer_id = Cats.customer_id;`

        db.pool.query(query, function(error, rows, fields){
            let purchases = rows;
            db.pool.query(query2, function(error, rows, fields){
                let services = rows;
                db.pool.query(query3, function(error, rows, fields){
                    let reservations = rows;
                        return res.render('purchased_services', {data: purchases, services: services, reservations: reservations});
                    })
                })
        });
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
});

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
});

// Create new service
app.post('/add-service-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Services (service_name, service_price) VALUES ('${data['service_name']}', '${data['price']}')`;
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
            res.redirect('/services');
        }
    })
});

// Create new service
app.post('/add-purchase-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Purchased_Services (service_id, res_id, quantity) VALUES ('${data['service_id']}', '${data['res_id']}', '${data['quantity']}')`;
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
            res.redirect('/purchased_services');
        }
    })
});


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

  // Update Services
  app.put('/put-service-ajax', (req,res,next) => {
    let data = req.body;
  
    let serviceID = parseInt(data.serviceID);
    let serviceName = data.serviceName;
    let price = parseFloat(data.price);
    
    let queryUpdateService = `UPDATE Services SET service_name = "${serviceName}", service_price = "${price}" WHERE service_id = ${serviceID};`;
    let selectService = `SELECT * FROM Services WHERE service_id = ?`
  
          // Run the 1st query
          db.pool.query(queryUpdateService, [serviceID, serviceName, price], function(error, rows, fields){
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
                 db.pool.query(selectService, [serviceID], function(error, rows, fields) {

                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.send(rows);
                    }
                })
            }
  })});

// Update Cat
app.put('/put-purchase-ajax', (req,res,next) => {
    let data = req.body;
  
    let purchaseID = parseInt(data.purchaseID);
    let serviceID = parseInt(data.serviceID);
    let resID = parseInt(data.resID);
    let quantity = parseInt(data.quantity);
    
    let queryUpdatePurchase = `UPDATE Purchased_Services SET service_id = "${serviceID}" , res_id = "${resID}", quantity = "${quantity}" WHERE purchase_id = "${purchaseID}"`
    let selectPurchase = `SELECT * FROM Purchased_Services WHERE purchase_id = ?`
  
          // Run the 1st query
          db.pool.query(queryUpdatePurchase, [purchaseID, serviceID, resID, quantity], function(error, rows, fields){
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
                 db.pool.query(selectPurchase, [purchaseID], function(error, rows, fields) {

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
    let deleteCat = `DELETE FROM Cats WHERE cat_id = ?`;
  
        db.pool.query(deleteCat, [catID], function(error, rows, fields){
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

// Delete Service
app.delete('/delete-service-ajax/', function(req,res,next){
    let data = req.body;
    let serviceID = parseInt(data.id);
    let deleteService = `DELETE FROM Services WHERE service_id = ?`;
  
        db.pool.query(deleteService, [serviceID], function(error, rows, fields){
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

// Delete Service
app.delete('/delete-purchase-ajax/', function(req,res,next){
    let data = req.body;
    let purchaseID = parseInt(data.id);
    let deletePurchase = `DELETE FROM Purchased_Services WHERE purchase_id = ?`;
  
        db.pool.query(deletePurchase, [purchaseID], function(error, rows, fields){
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

// Get Reservations
app.get('/reservations', function(req, res) {
    let query = `SELECT Reservations.res_id AS "res_id", 
                CONCAT(Customers.first_name, " ", Customers.last_name) AS "customer_name", 
                Cats.cat_name AS "cat_name",
                Room_Types.room_name AS "room_name", 
                DATE_FORMAT(check_in_date, '%Y/%c/%d') AS "check_in_date", 
                DATE_FORMAT(check_out_date, '%Y/%c/%d') AS "check_out_date" 
                FROM Reservations
                INNER JOIN Customers ON Customers.customer_id = Reservations.customer_id
                INNER JOIN Cats ON Cats.cat_id = Reservations.cat_id
                INNER JOIN Room_Types ON Room_Types.room_id = Reservations.room_id
                ORDER BY Reservations.res_id ASC;`;

    let query1 = `SELECT customer_id, CONCAT(Customers.first_name, ' ', Customers.last_name) AS 'customer_dropdown' FROM Customers;`;
    let query2 = `SELECT cat_id, cat_name FROM Cats;`;
    let query3 = `SELECT room_id, room_name FROM Room_Types;`;
    db.pool.query(query, function(error, rows, fields){
        let reservations = rows;
        console.log(reservations)
        db.pool.query(query1, function(error, rows, fields){
            let customers = rows;
            db.pool.query(query2, function(error, rows, fields){
                let cats = rows;
                db.pool.query(query3, function(error, rows, fields){
                    let rooms = rows;
                    return res.render('reservations', {data: reservations, customers: customers, cats: cats, rooms: rooms});
                })
            })
        })
    });
});

// Create new reservation
app.post('/add-res-form', function(req, res){
    let data = req.body;

    let query1 = `INSERT INTO Reservations (customer_id, cat_id, room_id, check_in_date, check_out_date) VALUES ('${data['customer_id']}', '${data['cat_id']}', '${data['room_id']}', '${data['check_in']}', '${data['check_out']}');`;

    // Check for NULL values in cat_id or room_id
    if (data['room_id'] == "" && 'cat_id' in data == false) {
        query1 = `INSERT INTO Reservations (customer_id, cat_id, room_id, check_in_date, check_out_date) VALUES ('${data['customer_id']}', NULL, NULL, '${data['check_in']}', '${data['check_out']}');`;
    }

    else if ('cat_id' in data == false) {
        query1 = `INSERT INTO Reservations (customer_id, cat_id, room_id, check_in_date, check_out_date) VALUES ('${data['customer_id']}', NULL, '${data['room_id']}', '${data['check_in']}', '${data['check_out']}');`;
    }

    else if (data['room_id'] == "") {
        query1 = `INSERT INTO Reservations (customer_id, cat_id, room_id, check_in_date, check_out_date) VALUES ('${data['customer_id']}', '${data['cat_id']}', NULL, '${data['check_in']}', '${data['check_out']}');`;
    }

    db.pool.query(query1, function(error, rows, fields){
        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else {
            res.redirect('/reservations');
        }
    });
});

app.delete('/delete-res-ajax/', function(req,res,next){
    let data = req.body;
    let resID = parseInt(data.id);
    let deleteRes = `DELETE FROM Reservations WHERE res_id = ?`;
  
        db.pool.query(deleteRes, [resID], function(error, rows, fields){
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

app.put('/put-res-ajax', (req,res,next) => {
    let data = req.body;

    let resID = parseInt(data.resID);
    let customerID = parseInt(data.customerID);
    let catID = parseInt(data.catID);
    let roomID = parseInt(data.roomID);
    let checkIn = data.checkIn;
    let checkOut = data.checkOut;

    let queryUpdateRes = `UPDATE Reservations SET customer_id = "${customerID}", cat_id = "${catID}", room_id = "${roomID}", check_in_date = "${checkIn}", check_out_date = "${checkOut}" WHERE res_id = ${resID};`;
    let selectRes = `SELECT * FROM Reservations WHERE res_id = ?`
    
    db.pool.query(queryUpdateRes, [resID, customerID, catID, roomID, checkIn, checkOut], function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            db.pool.query(selectRes, [resID], function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});
// Get Room_Types
app.get('/room_types', function(req, res) {  
    let query1 = "SELECT * FROM Room_Types ORDER BY room_id ASC;";
    db.pool.query(query1, function(error, rows, fields){    // Execute the query
        let room_types = rows;
        return res.render('room_types', {data: room_types});
    });
});

// Create new room_type
app.post('/add-room-form', function(req, res){
    let data = req.body;
    // Check if room name and rate are empty
    if (data['add-room-name'] == "" || data['add-rate'] == "")
    {
        // error message?
    }
    let query1 = `INSERT INTO Room_Types (room_name, rate) VALUES ('${data['add-room-name']}', '${data['add-rate']}');`;
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

// Update Room_Type
app.put('/put-room-ajax', (req,res,next) => {
    let data = req.body;

    let roomID = parseInt(data.roomID);
    let roomName = data.roomName;
    let rate = parseFloat(data.rate);

    let queryUpdateRoom = `UPDATE Room_Types SET room_name = "${roomName}", rate = "${rate}" WHERE room_id = ${roomID};`;
    let selectRoom = `SELECT * FROM Room_Types WHERE room_id = ?`
    
    db.pool.query(queryUpdateRoom, [roomID, roomName, rate], function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            db.pool.query(selectRoom, [roomID], function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
