const express = require('express');
const cTable = require('console.table');
const db = require('./db/connection');
const inquirer = require('inquirer');
const apiRoutes = require('./routes');
require('dotenv').config();

// const PORT = process.env.PORT || 3001;
// const app = express();

// app.use(express.urlencoded({ extended: false} ));
// app.use(express.json());

// app.use('/api', apiRoutes);

const departmentStr = `SELECT * FROM departments;`;

const rolesStr = `SELECT roles.id, roles.title, roles.salary, departments.name AS department
                FROM roles
                LEFT JOIN departments ON roles.department_id = departments.id;`;

// CREATE EMPLOYEE SQL FOR VIEW ALL CHOICE  
const employeeStr = `
SELECT employees.*, roles.title AS role_title, roles.salary AS salary, departments.name AS department
FROM employees
LEFT JOIN roles ON employees.role_id = roles.id
LEFT JOIN departments ON roles.department_id = departments.id;`;

// inquirer options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
const initPrompt = () => {
    return inquirer.prompt([
    {
        type: 'list',
        name: 'start',
        message: 'What would you like to do?',
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update employee role', 'exit']
    }
])
.then(results => {
    if(results.start === 'view all departments') {
        db.query(departmentStr, (err, rows) => {
            console.table(rows);
            initPrompt();
        })
    } else if (results.start === 'view all roles') {
        db.query(rolesStr, (err, rows) => {
            console.table(rows);
            initPrompt();
        })
    } else if (results.start === 'view all employees') {
        db.query(employeeStr, (err, rows) => {
            console.table(rows);
            initPrompt();
        })
    } else if (results.start === 'add a department') {
        addDepartmentPrompt();
    } else if (results.start === 'add a role') {
        addRolePrompt();
    } else if (results.start === 'add an employee') {
        addEmployeePrompt();
    } else if (results.start === 'update an employee role') {
        updatePrompt();
    } else if (results.start === 'exit') {
        db.end();
    }
})
};

const addDepartmentPrompt = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'What is the name of this department?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Enter a name for this department');
                    return false;
                }
            }
        }
    ])
    .then(departmentResults => {
        const addDepartmentStr = `INSERT INTO departments (name)
                                VALUES ('${departmentResults.departmentName}');`
        db.query(addDepartmentStr, (err, results) => {
            if (err) {
                return console.error(err.message);
            }
        })
        db.query(departmentStr, (err, rows) => {
            console.table(rows);
            initPrompt();
        })
    })
};

const addRolePrompt = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'roleName',
            message: 'What is the name of this role?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Enter a name for this role');
                    return false;
                }
            }
        },
        {
            type: 'number',
            name: 'salary',
            message: 'What is the salary for this role?',
            validate: salaryInput => {
                if (salaryInput) {
                    return true;
                } else {
                    console.log('Enter the salary for this role');
                    return false;
                }
            }
        },
        {
            type: 'number',
            name: 'department',
            message: 'What is the department ID that this role belong to?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Enter the department ID this role is under');
                    return false;
                }
            }
        }
    ])
    .then(roleResults => {
        const addRoleStr = `INSERT INTO roles (name, salary, department_id)
                            VALUES ('${roleResults.roleName}', '${roleResults.salary}', '${roleResults.department}');`
        db.query(addRoleStr, (err, results) => {
            if (err) {
                return console.error(err.message);
            }
        })
        db.query(rolesStr, (err, rows) => {
            console.table(rows);
            initPrompt();
        })
    })
};

const addEmployeePrompt = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the first name of this employee?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Enter the new employee's first name");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the last name of this employee?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Enter the new employee's last name");
                    return false;
                }
            }
        },
        {
            type: 'number',
            name: 'role',
            message: 'What is the new employees role ID?',
            validate: roleInput => {
                if (roleInput) {
                    return true;
                } else {
                    console.log('Enter this employees role ID');
                    return false;
                }
            }
        }
    ])
    .then(empResults => {
        const addEmpStr = `INSERT INTO employees (first_name, last_name, role_id)
                            VALUES ('${empResults.firstName}', '${empResults.lastName}', '${empResults.role}');`
        db.query(addEmpStr, (err, results) => {
            if (err) {
                return console.error(err.message);
            }
        })
        db.query(employeeStr, (err, rows) => {
            console.table(rows);
            initPrompt();
        })
    })
};

const updatePrompt = () => {
    return inquirer.prompt([
        {
            type: 'number',
            name: 'employeeId',
            message: 'What is the ID of the employee whose role you want to update?',
            validate: idInput => {
                if (idInput) {
                    return true;
                } else {
                    console.log('You must enter an employees ID');
                    return false;
                }
            }
        },
        {
            type: 'number',
            name: 'newRole',
            message: 'What is the ID of the new role?',
            validate: idInput => {
                if (idInput) {
                    return true;
                } else {
                    console.log('You must enter a role ID to update this employee');
                    return false;
                }
            }
        }
    ])
    .then(updateResults => {
        const updateStr = `UPDATE employees 
                           SET role_id = ${updateResults.newRole}
                           WHERE id = ${updateResults.employeeId};`
        db.query(updateStr, (err, results) => {
            if (err) {
                return console.error(err.message);
            }
        })
        initPrompt();
    })
};

initPrompt();


// // default response for any other request (NOT FOUND)
// app.use((req,res) => {
//     res.status(404).end();
// });

// db.connect(err => {
//     if (err) throw err;
//     console.log('Database connected.');
//     app.listen(PORT, () => {
//         console.log(`Server running on port ${PORT}`);
//     });
// });

// CODE FOR API SERVER ^^
