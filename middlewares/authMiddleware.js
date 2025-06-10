const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

// Check if user is logged in
const protect = async (req, res, next) => {
  let token;

  // 1. Check if there is a token in the headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 2. Extract token
      token = req.headers.authorization.split(' ')[1];

      // 3. Decode token and get user id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Find user from the database
      req.user = await User.findById(decoded.id).select('-password'); // don't send password

      next(); // move on to the actual route
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, invalid token' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = protect;



// Check if logged-in user is an admin
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); // user is admin, move forward
  } else {
    res.status(403).json({ message: 'Access denied. Admins only.' });
  }
};

module.exports = { protect, adminOnly };
