const express = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session');
const Admin = require('./models/Admin');
const router = express.Router();

// Middleware for handling body parsing and sessions if not already in server.js
router.use(express.urlencoded({ extended: true }));

// Login Page
router.get('/admin/login', (req, res) => {
    res.render('adminLogin', { error: null }); // Pass null as the default for error
});

// Handle Admin Login
router.post('/admin/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.render('adminLogin', { error: 'Invalid Username or Password!' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.render('adminLogin', { error: 'Invalid Username or Password!' });
        }

        // Successful login
        req.session.loggedin = true;
        req.session.username = admin.username;
        res.redirect('/admin/dashboard');
    } catch (error) {
        console.error('Login error:', error);
        res.render('adminLogin', { error: 'An error occurred. Please try again later.' });
    }
});

// Admin Dashboard Route
router.get('/admin/dashboard', (req, res) => {
    if (req.session.loggedin) {
        res.render('adminDashboard', { username: req.session.username });
    } else {
        res.redirect('/admin/login');
    }
});

// Admin statistics page
router.get('/statistics', (req, res) => {
    res.render('statistics'); // Make sure the EJS file is in the views/admin folder
});

// Manage Users page
router.get('/manageusers', (req, res) => {
    res.render('manageusers'); // EJS file for managing users
});

// Manage Donations page
router.get('/managedonations', (req, res) => {
    res.render('managedonations'); // EJS file for managing donations
});

// Database Details page
router.get('/database', (req, res) => {
    res.render('database'); // EJS file for database details
});

// Handle Logout
router.get('/admin/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/admin/login');
});

module.exports = router;
