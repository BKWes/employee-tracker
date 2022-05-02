const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// GET all departments
router.get('/departments', (req, res) => {
    const sql = `SELECT * FROM departments`;
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

// GET ONE department by ID
router.get('/department/:id', (req, res) => {
    const sql = `SELECT * FROM departments WHERE id = ?`;
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

// POST department
router.post('/department', ({ body }, res) => {
    const sql = `INSERT INTO departments (name)
                VALUES (?)`;
    db.query(sql, [body.name], (err, result) => {
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