// backend/controllers/authController.js
const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
  const { username, email, password } = req.body;
  db.query("SELECT * FROM users WHERE username = ?", [username], (err, result) => {
    if (result.length > 0) return res.status(400).json({ message: "Username already exists" });

    const hashedPassword = bcrypt.hashSync(password, 10);
    db.query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword],
      (err, result) => {
        if (err) throw err;
        res.json({ message: "Registration successful" });
      }
    );
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  db.query("SELECT * FROM users WHERE username = ?", [username], (err, result) => {
    if (result.length === 0) return res.status(400).json({ message: "Invalid credentials" });

    const validPass = bcrypt.compareSync(password, result[0].password);
    if (!validPass) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: result[0].id, role: result[0].role }, process.env.JWT_SECRET);
    res.json({ token, message: "Login successful" });
  });
};
