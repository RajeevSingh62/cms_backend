const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const  testRoutes = require('./routes/testRoutes');
const postRoutes = require('./routes/postRoutes');
const categoriesRoutes=require('./routes/CategoryRoutes');
const headerRoutes = require('./routes/headerRoutes');
const carousal= require('./routes/carousalRoutes');
const adminDashRoutes = require('./routes/adminDashRoutes');
const cors = require('cors');
const http = require("http");
const socketIo = require("socket.io");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize app
const app = express();
const server = http.createServer(app);
// Initialize Socket.IO
const io = socketIo(server, {
  cors: {
    origin: "*", // allow all origins (for now)
  }
});
// Handle Socket.IO connections
// Store connected admins (you’ll refine this later)
let adminSocket = null;

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("registerAdmin", () => {
    adminSocket = socket;
    console.log("Admin registered for notifications");
  });
  socket.on("disconnect", () => {
    if (socket === adminSocket) adminSocket = null;
    console.log("Client disconnected");
  });
});
app.set("io", io);

// Middleware
app.use(express.json());


// console.log("api key in cloudinary Key:", process.env.CLOUDINARY_API_KEY);
// console.log("api key in cloudinary name:", process.env.CLOUDINARY_CLOUD_NAME);
// console.log("api key in cloudinary secret:", process.env.CLOUDINARY_API_SECRET);


  

// test Routes
// app.get('/', (req, res) => {
//     res.send('API is running...');
// });


// test Routes
app.use('/api', testRoutes);
 



app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/categories',categoriesRoutes)
app.use('/api/headers', headerRoutes);
app.use('/api/carousal', carousal);
app.use('/api/admin', adminDashRoutes);

// Start server
const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

