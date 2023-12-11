-- Group 65
-- Chung Man Chan
-- Minyoung Shin

--------------------------------
------------ SELECT ------------
--------------------------------
-- select all Customers
SELECT * FROM Customers ORDER BY customer_id ASC;

-- select all Cats
SELECT cat_id, 
    CONCAT(Customers.first_name, ' ', Customers.last_name) AS 'customer', 
    cat_name 
    FROM Cats 
    INNER JOIN Customers ON Customers.customer_id = Cats.customer_id 
    ORDER BY cat_id ASC;

-- select all Services
SELECT * FROM Services ORDER BY service_id ASC;

-- select all Reservations
SELECT Reservations.res_id AS "res_id", 
    CONCAT(Customers.first_name, " ", Customers.last_name) AS "customer_name", 
    Reservations.cat_id AS "cat_id",
    CASE
        WHEN Reservations.cat_id IS NULL THEN ""
        ELSE Cats.cat_name
    END AS "cat_name",
    CASE
        WHEN Reservations.room_id IS NULL THEN ""
        ELSE Room_Types.room_name
    END AS "room_name",
    DATE_FORMAT(check_in_date, '%Y/%c/%d') AS "check_in_date", 
    DATE_FORMAT(check_out_date, '%Y/%c/%d') AS "check_out_date" 
    FROM Reservations
    INNER JOIN Customers ON Customers.customer_id = Reservations.customer_id
    LEFT JOIN Cats ON Cats.cat_id = Reservations.cat_id
    LEFT JOIN Room_Types ON Room_Types.room_id = Reservations.room_id
    ORDER BY Reservations.res_id ASC;

-- select all Purchased_Services
SELECT Purchased_Services.purchase_id AS "purchase_id", 
    CASE
        WHEN Purchased_Services.service_id IS NULL THEN ""
        ELSE Services.service_name
    END AS "service_name", 
    CONCAT(Customers.first_name, " ", Customers.last_name, " | ", IF(Reservations.cat_id IS NULL, "N/A", Cats.cat_name), " | ", Reservations.check_in_date) AS "reservation", 
    Purchased_Services.quantity AS "quantity" 
    FROM Purchased_Services
    LEFT JOIN Services ON Services.service_id = Purchased_Services.service_id
    INNER JOIN Reservations ON Reservations.res_id = Purchased_Services.res_id
    LEFT JOIN Cats ON Reservations.cat_id = Cats.cat_id
    INNER JOIN Customers ON Customers.customer_id = Reservations.customer_id;

-- select all Cats with customers name
SELECT cat_id, cat_name, CONCAT(Customers.first_name, " ", Customers.last_name) AS customer_name FROM Cats
INNER JOIN Customers ON Customers.customer_id = Cats.customer_id;

-- select Reservation with customer, cat, room information
SELECT res_id, CONCAT(Customers.first_name, " ", Customers.last_name) AS customer_name, Cats.cat_name AS cat_name, Room_Types.room_name, check_in_date, check_out_date FROM Reservations
INNER JOIN Customers ON Customers.customer_id = Reservations.customer_id
INNER JOIN Cats ON Cats.cat_id = Reservations.cat_id
INNER JOIN Room_Types ON Room_Types.room_id = Reservations.room_id;

-- select all Room_Types
SELECT * FROM Room_Types ORDER BY room_id ASC;



------ DROPDOWN MENUS ------
-- get customer's data to populate dropdown menus
SELECT customer_id, 
    CONCAT(Customers.first_name, ' ', Customers.last_name) AS 'customer_dropdown' 
    FROM Customers;

-- get cat's data to populate dropdown menus
SELECT cat_id, cat_name FROM Cats;

-- get cat's data to populate dropdown menus when customers are selected on Reservations
SELECT cat_id, cat_name FROM Cats 
    INNER JOIN Customers ON Customers.customer_id = Cats.customer_id 
    WHERE Cats.customer_id = ${req.params.id} 
    ORDER BY cat_id ASC;

-- get room names to populate dropdown menus
SELECT room_id, room_name FROM Room_Types;

-- get services data to populate dropdown menus
SELECT service_id, 
    service_name AS 'services_dropdown' 
    FROM Services 
    ORDER BY service_id ASC;

-- select customer name, cat name, reservation check in date to populate dropdown menu to represent reservations in Purchased Services
SELECT res_id, CONCAT(Customers.first_name, " ", Customers.last_name, " | ", IF(Reservations.cat_id IS NULL, "N/A", Cats.cat_name), " | ", Reservations.check_in_date) AS 'reservations_dropdown' FROM Reservations
    LEFT JOIN Cats ON Reservations.cat_id = Cats.cat_id
    INNER JOIN Customers ON Customers.customer_id = Reservations.customer_id;


--------------------------------
------------ INSERT ------------
--------------------------------
-- insert a customer
INSERT INTO Customers (first_name, last_name, phone) 
    VALUES (
        :first_name, 
        :last_name, 
        :phone
        );

-- insert a cat
INSERT INTO Cats (customer_id, cat_name) 
    VALUES (
        :customer_id, 
        :cat_name
        );
        
-- insert a service
INSERT INTO Services (service_name, service_price) 
    VALUES (
        :service_name, 
        :service_price
        );

-- insert a reservation
INSERT INTO Reservations (customer_id, cat_id, room_id, check_in_date, check_out_date) 
    VALUES (
        :customer_id, 
        :cat_id, 
        :room_id, 
        :check_in_date, 
        :check_out_date
        );

-- insert a reservation with NULL values for room_id and cat_id
INSERT INTO Reservations (customer_id, cat_id, room_id, check_in_date, check_out_date) 
    VALUES (
        :customer_id, 
        NULL, 
        NULL, 
        :check_in_date, 
        :check_out_date
        );

-- insert a reservation with NULL value for cat_id only
INSERT INTO Reservations (customer_id, cat_id, room_id, check_in_date, check_out_date) 
    VALUES (
        :customer_id, 
        NULL, 
        :room_id, 
        :check_in_date, 
        :check_out_date
        );

-- insert a reservation with NULL value for room_id only
    INSERT INTO Reservations (customer_id, cat_id, room_id, check_in_date, check_out_date) 
    VALUES (
        :customer_id, 
        :cat_id, 
        NULL, 
        :check_in_date, 
        :check_out_date
        );

-- insert a new service - reservation relationship
INSERT INTO Purchased_Services (service_id, res_id, quantity) 
    VALUES (
        :service_id, 
        :res_id, 
        :quantity
        );

-- insert a room type
INSERT INTO Room_Types (room_name, rate) 
    VALUES (
        :room_name, 
        :rate
        );


--------------------------------
------------ UPDATE ------------
--------------------------------
-- Update a customer
UPDATE Customers SET
    first_name = :firstName, 
    last_name = :lastName, 
    phone = :phone 
    WHERE customer_id = :customer_id;

-- update a cat
UPDATE Cats SET 
    customer_id = :customerID, 
    cat_name = :newCatName
    WHERE cat_id = :cat_id;

-- update a service
UPDATE Services SET 
    service_name = :serviceName, 
    service_price = :price 
    WHERE service_id = :service_id;

-- update a Room_Type
UPDATE Room_Types 
    SET 
        room_name = :room_name, 
        rate = :rate 
    WHERE room_id = :room_is;

-- update a Reservation
UPDATE Reservations 
    SET 
        customer_id = :customer_id, 
        cat_id = :cat_id, 
        room_id = :room_id,
        check_in_date = :check_in_date, 
        check_out_date = :check_out_date 
    WHERE res_id = :res_id;

-- update a Reservation with NULL values for cat_id and room_id
UPDATE Reservations 
    SET 
        customer_id = :customer_id, 
        cat_id = NULL, 
        room_id = NULL,
        check_in_date = :check_in_date, 
        check_out_date = :check_out_date 
    WHERE res_id = :res_id;

-- update a Reservation with NULL value for cat_id only
UPDATE Reservations 
    SET 
        customer_id = :customer_id, 
        cat_id = NULL, 
        room_id = :room_id,
        check_in_date = :check_in_date, 
        check_out_date = :check_out_date 
    WHERE res_id = :res_id;

-- update a Reservation with NULL value for room_id only
UPDATE Reservations 
    SET 
        customer_id = :customer_id, 
        cat_id = :cat_id, 
        room_id = NULL,
        check_in_date = :check_in_date, 
        check_out_date = :check_out_date 
    WHERE res_id = :res_id;

-- update a service - reservation relationship
UPDATE Purchased_Services 
    SET 
        service_id = :service_id, 
        res_id = :res_id, 
        quantity = :quantity 
    WHERE purchase_id = :purchase_id;


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
