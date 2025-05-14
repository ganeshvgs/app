// backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', authRoutes);

// Server Start
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
console.log("ENV TEST:", process.env.DB_USER, process.env.DB_PASS);