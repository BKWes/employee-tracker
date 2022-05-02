const express = require('express');
const router = express.Router();

router.use(require('./departmentRoutes'));
router.use(require('./jobRoutes'));

module.exports = router;