-- Group 65
-- Chung Man Chan
-- Minyoung Shin

-- SELECT
-- select all Customers
SELECT customer_id, first_name, last_name, phone FROM Customers;
-- select all Cats
SELECT cat_id, customer_id, cat_name FROM Cats;
-- select all Services
SELECT service_id, service_name, service_price FROM Services;
-- select all Reservations
SELECT res_id, customer_id, cat_id, room_id, check_in_date, check_out_date FROM Reservations;
-- select all Room_Types
SELECT room_id, room_name, rate FROM Room_Types;
-- select all Purchased_Services
SELECT purchase_id, service_id, res_id, quantity FROM Purchased_Services;

-- select all Cats with customers name
SELECT cat_id, cat_name, CONCAT(Customers.first_name, " ", Customers.last_name) AS customer_name FROM Cats
INNER JOIN Customers ON Customers.customer_id = Cats.customer_id;
-- select Reservation with customer, cat, room information
SELECT res_id, CONCAT(Customers.first_name, " ", Customers.last_name) AS customer_name, Cats.cat_name AS cat_name, Room_Types.room_name, check_in_date, check_out_date FROM Reservations
INNER JOIN Customers ON Customers.customer_id = Reservations.customer_id
INNER JOIN Cats ON Cats.cat_id = Reservations.cat_id
INNER JOIN Room_Types ON Room_Types.room_id = Reservations.room_id;

-- INSERT
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

-- UPDATE
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


-- DELETE
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