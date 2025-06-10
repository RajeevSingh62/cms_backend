const express = require('express');

const { protect, adminOnly } = require('../middlewares/authMiddleware');


const router = express.Router();
// Test route to check if the user is logged in
router.get('/test', protect, (req, res) => {
  res.status(200).json({ message: 'You are logged in!', user: req.user });
});
// Test route to check if the user is an admin
router.get('/admin-test', protect, adminOnly, (req, res) => {
  res.status(200).json({ message: 'You are an admin!', user: req.user });
});

module.exports=router;