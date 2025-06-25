const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const  testRoutes = require('./routes/testRoutes');
const postRoutes = require('./routes/postRoutes');
const categoriesRoutes=require('./routes/CategoryRoutes')

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize app
const app = express();

// Middleware
app.use(express.json());


console.log("api key in cloudinary Key:", process.env.CLOUDINARY_API_KEY);
console.log("api key in cloudinary name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("api key in cloudinary secret:", process.env.CLOUDINARY_API_SECRET);


  

// test Routes
// app.get('/', (req, res) => {
//     res.send('API is running...');
// });


// test Routes
app.use('/api', testRoutes);
 



app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/categories',categoriesRoutes)

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
