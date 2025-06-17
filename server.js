const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const  testRoutes = require('./routes/testRoutes');
const postRoutes = require('./routes/postRoutes');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize app
const app = express();

// Middleware
app.use(express.json());

app.use('/api/posts', postRoutes);

// test Routes
// app.get('/', (req, res) => {
//     res.send('API is running...');
// });


// test Routes
app.use('/api', testRoutes);
 



app.use('/api/auth', authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
