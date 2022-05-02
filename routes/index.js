const express = require('express');
const router = express.Router();

router.use(require('./departmentRoutes'));
router.use(require('./jobRoutes'));
router.use(require('./employeeRoutes'));

module.exports = router;