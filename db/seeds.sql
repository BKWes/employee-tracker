INSERT INTO departments(name)
VALUES
('General Merchandise'),
('Customer Service'),
('Electronics'),
('Style'),
('Grocery');

INSERT INTO roles(title, department_id, salary)
VALUES
('Assistant Manager', 1, 100000),
('GM Lead', 1, 50000),
('GM Stocker', 1, 40000),
('Assistant Manager', 2, 100000),
('CS Lead', 2, 50000),
('Cashier', 2, 25000),
('Cleaning', 2, 35000),
('Electronics Lead', 3, 55000),
('Electronics Worker', 3, 42000),
('Style Lead', 4, 50000),
('Style Worker', 4, 40000),
('Grocery Lead', 5, 55000),
('Grocery Stocker', 5, 42000)
