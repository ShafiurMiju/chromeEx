require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const historyRoutes = require('./routes/history');
const cors = require('cors'); // Import cors


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// middle ware:
app.use(cors());
app.use(express.json({ limit: "50mb" })); // Increase required size

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbName = process.env.DB_NAME;

const mongodbUri = `mongodb+srv://${dbUser}:${dbPass}@omd.wn73u.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=OMD`;


mongoose
  .connect(mongodbUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));


// Routes
app.use('/api/history', historyRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
