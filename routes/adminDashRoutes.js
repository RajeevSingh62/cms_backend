const express = require('express');
const{ getAdminDashboardData } = require('../controllers/adminDashController');

const router = express.Router();


router.get('/dashboard', getAdminDashboardData);


module.exports = router;