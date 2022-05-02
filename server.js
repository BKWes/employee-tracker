const express = require('express');
const cTable = require('console.table');
const db = require('./db/connection');
const inquirer = require('inquirer');
const apiRoutes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false} ));
app.use(express.json());

app.use('/api', apiRoutes);

// inquirer options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role


// default response for any other request (NOT FOUND)
app.use((req,res) => {
    res.status(404).end();
});

db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});