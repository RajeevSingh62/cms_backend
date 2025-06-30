const User=require('../models/UserModel');
const bcrypt = require('bcryptjs');

const generateToken = require('../utils/generateToken');

exports.registerUser = async (req, res) => {
    const{username,email,password,role}=req.body;
    try {

        // Check if user already exists
        const existingUser = await User.findOne({email})    
        if(existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create new user
        const imageUrl = req.file ? req.file.path : "";
         console.log("image url ", imageUrl);
        const user = new User({
            username: username,
            email,
            password: hashedPassword,
            role,
            avatar: imageUrl
        });
        // Save user to the database
        const savedUser = await user.save();
        // Generate token
        const token = generateToken(savedUser._id);
        // Respond with user data and token
        res.status(201).json({
            _id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email,
            role: savedUser.role,
            token,
            avatar: savedUser.avatar
        });

        
    } 
    catch (error) {
        console.log("first error",error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
  
      const token = generateToken(user._id);
  
      res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };