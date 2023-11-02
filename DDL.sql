/*
Project Step 2 Draft
Group 65 - Team Cat Ladies
    Chung Man Chan
    Minyoung Shin
*/

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;


------------------ TABLE CREATION ------------------
CREATE OR REPLACE TABLE Customers (
customer_id INT AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(50) NOT NULL,
last_name VARCHAR(50) NOT NULL,
phone VARCHAR(22) NOT NULL
);


CREATE OR REPLACE TABLE Cats (
cat_id INT AUTO_INCREMENT PRIMARY KEY,
customer_id INT NOT NULL,
cat_name VARCHAR(50) NOT NULL,
FOREIGN KEY (customer_id) REFERENCES Customers(customer_id) ON DELETE CASCADE ON UPDATE CASCADE
);


CREATE OR REPLACE TABLE Services (
service_id INT AUTO_INCREMENT PRIMARY KEY,
service_name VARCHAR(50) UNIQUE NOT NULL,
service_price DECIMAL(9, 2) NOT NULL
);


CREATE OR REPLACE TABLE Reservations (
res_id INT AUTO_INCREMENT PRIMARY KEY,
customer_id INT NOT NULL,
cat_id INT,
room_id INT,
check_in_date DATE NOT NULL,
check_out_date DATE NOT NULL,
FOREIGN KEY (customer_id) REFERENCES Customers(customer_id) ON DELETE RESTRICT ON UPDATE CASCADE,
FOREIGN KEY (cat_id) REFERENCES Cats(cat_id) ON DELETE SET NULL ON UPDATE CASCADE,
FOREIGN KEY (room_id) REFERENCES Room_Types(room_id) ON DELETE SET NULL ON UPDATE CASCADE
);


CREATE OR REPLACE TABLE Room_Types (
room_id INT AUTO_INCREMENT PRIMARY KEY,
room_name VARCHAR(50) NOT NULL,
rate DECIMAL(9, 2) NOT NULL
);


CREATE OR REPLACE TABLE Purchased_Services (
purchase_id INT AUTO_INCREMENT PRIMARY KEY,
service_id INT,
res_id INT NOT NULL,
quantity INT NOT NULL,
FOREIGN KEY (service_id) REFERENCES Services(service_id) ON DELETE SET NULL ON UPDATE CASCADE,
FOREIGN KEY (res_id) REFERENCES Reservations(res_id) ON DELETE CASCADE ON UPDATE CASCADE
);


------------------ DATA INSERTION ------------------
INSERT INTO Customers (
    first_name, 
    last_name, 
    phone
)
VALUES
    ('Cole', 'Spencer', '8707651234'),
    ('Andrew', 'Coleman', '7033142424'),
    ('Mohammed', 'Hancock', '7324802182'),
    ('Monica', 'Kalinina', '5615260588');


INSERT INTO Cats (
    customer_id,
    cat_name
)
VALUES
    (1, 'Reginald'),
    (1, 'Okra'),
    (2, 'Mr. Death'),
    (3, 'Concha'),
    (4, 'Baby');


INSERT INTO Services (
    service_name,
    service_price
)
VALUES
    ('Grooming', 120.99),
    ('Massaging', 80.99),
    ('Aromatherapy', 60.99),
    ('Play Time', 45.99);


INSERT INTO Room_Types (
    room_name,
    rate
)
VALUES
    ('Single', 40.32),
    ('Double', 50.28),
    ('Master', 60.84),
    ('Master', 78.98);


INSERT INTO Reservations (
    customer_id,
    cat_id,
    room_id,
    check_in_date,
    check_out_date
)
VALUES
    (1, 1, 1, '2023-06-23', '2023-06-27'),
    (2, 3, 2, '2023-06-24', '2023-06-30'),
    (1, 2, 1, '2023-06-28', '2023-06-30'),
    (4, 5, 3, '2023-06-30', '2023-07-08'),
    (2, 3, 4, '2023-07-01', '2023-07-09');


INSERT INTO Purchased_Services (
    service_id,
    res_id,
    quantity
)
VALUES
    (1, 1, 1),
    (2, 1, 2),
    (3, 2, 1),
    (4, 5, 4);


SET FOREIGN_KEY_CHECKS=1;
COMMIT;
