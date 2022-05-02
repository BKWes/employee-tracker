DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employees;

CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    department_id INTEGER,
    salary DECIMAL,
    FOREIGN KEY (department_id) REFERENCES departments(id)
    ON DELETE SET NULL
);

CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    department_id INTEGER,
    role_id INTEGER,
    FOREIGN KEY (department_id) REFERENCES departments(id)
    ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id)
    ON DELETE CASCADE
);