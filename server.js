// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./config/db');
// const routes = require('./routes');
// require('dotenv').config();
// const cookieParser = require('cookie-parser');

// const app = express();
// const port = process.env.PORT || 3000;

// // Connect to MongoDB
// connectDB();

// // Middleware setup
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));


// app.use(cookieParser());

// app.use(cors({ 
//     origin: 'http://localhost:5173', 
//     credentials: true 
// }));

// // Routes
// app.use('/api', routes);


// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const connectDB = require('./config/db'); // Ensure you have a DB connection file
const routes = require('./routes'); // Main API routes
const progressRoutes = require("./routes/progress"); // Import progress routes
require('dotenv').config();
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 3000;

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://indic-frontend.onrender.com',
  'https://indic.in.net' // Replace this with your actual frontend deploy URL
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// ✅ Main Routes
app.use('/api', routes); // Other API routes
app.use('/api/progress', progressRoutes); // Progress API


// ✅ Start Server
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});