const mysql = require('mysql2');
const cTable = require('console.table');
const db = require('./db/connection');

// inquirer options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role