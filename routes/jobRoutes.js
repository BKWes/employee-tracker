const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// GET all roles
router.get('/roles', (req, res) => {
    const sql = `SELECT roles.*, departments.name AS department_name
                FROM roles
                LEFT JOIN departments ON roles.department_id = departments.id`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// GET ONE role by id
router.get('/role/:id', (req, res) => {
    const sql = `SELECT * FROM roles WHERE id = ?`;
    const params = [req.params.id];
    db.query(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

// POST role
router.post('/role', ({ body }, res) => {
    const sql = `INSERT INTO roles (title, department_id, salary)
                VALUES (?,?,?)`;
    const params = [body.title, body.department_id, body.salary]
    
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

module.exports = router;