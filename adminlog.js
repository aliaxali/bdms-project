// app.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');
const bodyParser = require('body-parser');
const Admin = require('./models/Admin');
require('dotenv').config();
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/adminid', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Serve login page
app.get('/', (req, res) => {
    res.render('login'); // Render login.ejs
});

// Handle login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.send('<div class="alert alert-danger">Invalid Username or Password!</div>');
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.send('<div class="alert alert-danger">Invalid Username or Password!</div>');
        }

        // Successful login
        req.session.loggedin = true;
        req.session.username = admin.username;
        res.redirect('/dashboard');
    } catch (error) {
        console.error('Login error:', error);
        res.send('<div class="alert alert-danger">An error occurred. Please try again later.</div>');
    }
});

// Dashboard route
app.get('/dashboard', (req, res) => {
    if (req.session.loggedin) {
        res.send(`Welcome, ${req.session.username}! <a href="/logout">Logout</a>`);
    } else {
        res.send('Please login to view this page!');
    }
});

// Logout route
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


