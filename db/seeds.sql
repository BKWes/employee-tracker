INSERT INTO departments(name)
VALUES
('General Merchandise'),
('Customer Service'),
('Electronics'),
('Style'),
('Grocery');

INSERT INTO roles(title, department_id, salary)
VALUES
('GM Assistant Manager', 1, 100000),
('GM Lead', 1, 50000),
('GM Stocker', 1, 40000),
('CS Assistant Manager', 2, 100000),
('CS Lead', 2, 50000),
('Cashier', 2, 25000),
('Cleaning', 2, 35000),
('Electronics Lead', 3, 55000),
('Electronics Worker', 3, 42000),
('Style Lead', 4, 50000),
('Style Worker', 4, 40000),
('Grocery Lead', 5, 55000),
('Grocery Stocker', 5, 42000);

INSERT INTO employees(first_name, last_name, role_id)
VALUES
('Eliza', 'Hampton', 1),
('Andrew', 'North', 2),
('Sharon', 'Montez', 3),
('Barry', 'Andreas', 3),
('Janet', 'Jackson', 4),
('Karen', 'White', 4),
('Colin', 'Firth', 5),
('Karey', 'Smith', 6),
('Sam', 'Long', 6),
('Colby', 'Ports', 7),
('Karey', 'Smith', 8),
('Austin', 'Greenway', 9),
('James', 'London', 10),
('Bruce', 'Fraser', 11),
('George', 'Dryden', 12),
('Rhonda', 'Morris', 13),
('Dora', 'Explorer', 13);