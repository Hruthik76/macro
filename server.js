const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Root route (optional but helpful!)
app.get('/', (req, res) => {
  res.send('API is running. Welcome to the Macro Tracker!');
});

// Route imports
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const diaryRoutes = require('./routes/diary');

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/diary', diaryRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
