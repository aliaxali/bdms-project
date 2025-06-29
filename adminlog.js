const express = require('express');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const Donor = require('./models/Donor');
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
        res.redirect('/statistics');
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
router.get('/manageusers', async (req, res) => {
    try {
        const donors = await Donor.find();
        res.render('manageusers', { donors });
    } catch (error) {
        res.status(500).send('Error retrieving users');
    }
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

router.put('/api/users/:id', async (req, res) => {
    try {
        const { name, email, phone, dob, address, state, city, district, pinCode, bloodGroup, weight, medicalConditions } = req.body;
        const updatedUser = await Donor.findByIdAndUpdate(req.params.id, {
            name, email, phone, dob, address, state, city, district, pinCode, bloodGroup, weight, medicalConditions
        }, { new: true });

        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Error updating user' });
    }
});

// Delete a user
router.delete('/api/users/:id', async (req, res) => {
    try {
        await Donor.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Error deleting user' });
    }
});

router.get('/api/statistics', async (req, res) => {
    try {
        const totalDonors = await Donor.countDocuments();
        const activeDonors = await Donor.countDocuments({ availability: 'yes' });

        const bloodGroupCounts = await Donor.aggregate([
            {
                $group: {
                    _id: "$bloodGroup", // Group by blood group
                    count: { $sum: 1 } // Count the number of each blood group
                }
            }
        ]);
        
        // Convert bloodGroupCounts to an object for easier access
        const bloodGroupCountsObj = {};
        bloodGroupCounts.forEach(bg => {
            bloodGroupCountsObj[bg._id] = bg.count;
        });

        res.json({
            totalDonors,
            activeDonors,
            bloodGroupCounts: bloodGroupCountsObj
        });
    } catch (error) {
        console.error('Error fetching statistics:', error);
        res.status(500).json({ error: 'Error fetching statistics' });
    }
});



module.exports = router;
