-- Group 65
-- Chung Man Chan
-- Minyoung Shin

--------------------------------
------------ SELECT ------------
--------------------------------
-- select all Customers
SELECT customer_id AS Customer ID, 
    first_name AS "First Name", 
    last_name AS "Last Name", 
    phone AS "Phone"
    FROM Customers;

-- select all Cats
SELECT cat_id AS "Cat ID", 
    CONCAT(Customers.first_name, " ", Customers.last_name) AS "Customer", 
    cat_name AS "Cat Name" 
    FROM Cats
    INNER JOIN Customers ON Customers.customer_id = Cats.customer_id;

-- select all Services
SELECT service_id AS "Service ID", 
    service_name AS "Service Name", 
    service_price AS "Price" FROM Services;

-- select all Reservations
SELECT Reservations.res_id AS "Res ID", 
    CONCAT(Customers.first_name, " ", Customers.last_name) AS "Customer", 
    Cats.cat_name AS "Cat",
    Room_Types.room_name AS "Room Type", 
    check_in_date AS "Check In Date", 
    check_out_date AS "Check Out Date" 
    FROM Reservations
    INNER JOIN Customers ON Customers.customer_id = Reservations.customer_id
    INNER JOIN Cats ON Cats.cat_id = Reservations.cat_id
    INNER JOIN Room_Types ON Room_Types.room_id = Reservations.room_id
    ORDER BY Reservations.res_id ASC;

-- select all Room_Types
SELECT room_id AS "Room ID", 
    room_name AS "Room Name", 
    rate AS "Rate"
    FROM Room_Types;

-- select all Purchased_Services
SELECT Purchased_Services.purchase_id AS "Purchase ID", 
    Services.service_name AS "Service ID", 
    CONCAT(Customers.first_name, " ", Customers.last_name, " | ", Cats.cat_name, " | ", Reservations.check_in_date) AS "Reservation", 
    Purchased_Services.quantity AS "Quantity" 
    FROM Purchased_Services
    INNER JOIN Services ON Services.service_id = Purchased_Services.service_id
    INNER JOIN Reservations ON Reservations.res_id = Purchased_Services.res_id
    INNER JOIN Cats ON Reservations.cat_id = Cats.cat_id
    INNER JOIN Customers ON Customers.customer_id = Cats.customer_id;

-- select all Cats with customers name
SELECT cat_id, cat_name, CONCAT(Customers.first_name, " ", Customers.last_name) AS customer_name FROM Cats
INNER JOIN Customers ON Customers.customer_id = Cats.customer_id;
-- select Reservation with customer, cat, room information
SELECT res_id, CONCAT(Customers.first_name, " ", Customers.last_name) AS customer_name, Cats.cat_name AS cat_name, Room_Types.room_name, check_in_date, check_out_date FROM Reservations
INNER JOIN Customers ON Customers.customer_id = Reservations.customer_id
INNER JOIN Cats ON Cats.cat_id = Reservations.cat_id
INNER JOIN Room_Types ON Room_Types.room_id = Reservations.room_id;

------ DROPDOWN MENUS ------
-- get customer's data to populate dropdown menus
SELECT CONCAT(Customers.customer_id, " : ", Customers.first_name, " ", Customers.last_name) FROM Customers;
-- get cat's data to populate dropdown menus
SELECT CONCAT(Cats.cat_id, " : ", Cats.cat_name) FROM Cats;
-- get service's data to populate dropdown menus
SELECT CONCAT(Services.service_id, " : ", Services.service_name) FROM Services;
-- select customer name, cat name, reservation check in date to populate dropdown menu to represent reservations in Purchased Services
SELECT CONCAT(Customers.first_name, " ", Customers.last_name, " | ", Cats.cat_name, " | ", Reservations.check_in_date) FROM Reservations
INNER JOIN Cats ON Reservations.cat_id = Cats.cat_id
INNER JOIN Customers ON Customers.customer_id = Cats.customer_id;
----------------------------

-- select cat name to populate cat delete form
SELECT cat_name FROM Cats WHERE cat_id = :cat_id;
-- select cats belonging to a specific customer to populate dropdown list
SELECT CONCAT(Cats.cat_id, " : ", Cats.cat_name) FROM Cats WHERE Cats.customer_id = :customer_id;


--------------------------------
------------ INSERT ------------
--------------------------------
-- insert a customer
INSERT INTO Customers (first_name, last_name, phone) VALUES (:first_name, :last_name, :phone);
-- insert a cat
INSERT INTO Cats (customer_id, cat_name) VALUES (:customer_id, :cat_name);
-- insert a service
INSERT INTO Services (service_name, service_price) VALUES (:service_name, :service_price);
-- insert a room type
INSERT INTO Room_Types (room_name, rate) VALUES (:room_name, :rate);
-- insert a reservation
INSERT INTO Reservatios (customer_id, room_id, check_in_date, check_out_date) VALUES (:customer_id, :room_id, :check_in_date, :check_out_date);
-- insert a new service - reservation relationship
INSERT INTO Purchased_Services (service_id, res_id, quantity) VALUES (:service_id, :res.id, :quantity);


--------------------------------
------------ UPDATE ------------
--------------------------------
-- Update a customer
UPDATE Customers SET first_name = :new_first_name, lastName = :new_last_name, phone = :new_phone WHERE customer_id = :customer_id;
-- update a cat
UPDATE Cats SET cat_name = :new_cat_name WHERE cat_id = :cat_id;
-- update a service
UPDATE Services SET service_name = :new_service_name, service_price = :new_service_price WHERE service_id = :service_id;
-- update a Room_Type
UPDATE Room_Types SET room_name = :new_room_name, rate = :new_rate WHERE room_id = :room_id;
-- update a Reservation
UPDATE Reservations SET customer_id = :new_customer_id, room_id = :new_room_id, check_in_date = :new_check_in_date, check_out_date = :new_check_out_date WHERE res_id = :res_id;
-- update a service - reservation relationship
UPDATE Purchased_Services SET service_id = :new_service_id , res_id = :new_res_id, quantity = :new_quantity WHERE purchase_id = :purchase_id;


--------------------------------
------------ DELETE ------------
--------------------------------
-- delete a customer
DELETE FROM Customers WHERE customer_id = :customer_id;
-- delete a cat
DELETE FROM Cats WHERE cat_id = :cat_id;
-- delete a service
DELETE FROM Services WHERE service_id = :service_id;
-- delete a room type
DELETE FROM Room_Types WHERE room_id = :room_id;
-- delete a resercation
DELETE FROM Reservations WHERE res_id = :res_id;
-- delete a service - reservation relationship
DELETE FROM Purchased_Services WHERE purchase_id = :purchase_id;