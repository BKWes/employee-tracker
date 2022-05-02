DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employees;

CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

-- CREATE TABLE roles (
--     id INT PRIMARY KEY,
--     title VARCHAR(30),
--     department_name VARCHAR(30),
--     salary DECIMAL,
--     FOREIGN KEY (department_name) REFERENCES departments(name)
--     ON DELETE SET NULL
-- );

-- CREATE TABLE employees (
--     id INT PRIMARY KEY,
--     first_name VARCHAR(30),
--     last_name VARCHAR(30),
--     department_name VARCHAR(30), 
--     salary DECIMAL,   
--     role_id INTEGER,
--     FOREIGN KEY (role_id) REFERENCES roles(id)
--     ON DELETE SET NULL,
--     FOREIGN KEY (department_name) REFERENCES departments(name)
--     ON DELETE SET NULL,
--     FOREIGN KEY (salary) REFERENCES roles(salary)
--     ON DELETE SET NULL
-- );