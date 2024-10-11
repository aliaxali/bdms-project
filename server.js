
const express =require('express')
const mongoose = require('mongoose')
const app=express()
const port=4000

const bodyParser =require('body-parser')
const multer = require('multer');
const Donor = require('./models/Donor');

const bcrypt =require('bcrypt')
const session = require('express-session')
const saltRounds = 10;  // For bcrypt hashing


app.set('view engine','ejs')
app.get('/',(req,res)=>{
    res.render('index')
})

// Redirect to login page on "/donate-blood"

//routes
app.get('/login', (req, res) => {
    
    res.render('login',{ success: null,error: null }); // Render login.ejs for the login page
});

// Redirect to login page on "/donate-blood"
app.get('/donate-blood', (req, res) => {
    res.redirect('/login'); // Redirect to login page
});

app.get('/registration', (req, res) => {
    res.render('registrationpage'); // Render login.ejs for the login page
});
app.get('/registration', (req, res) => {
    res.redirect('registrationpage'); // Render login.ejs for the login page
});

app.get('/forgotpassword', (req, res) => {
    res.render('forgotpassword'); // Render login.ejs for the login page
});
app.get('/donor_search', (req, res) => {
    res.render('donor_search'); // Render login.ejs for the login page
});


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Setup express-session
app.use(session({
    secret: 'yourSecretKey',  // Change this secret for production
    resave: false,
    saveUninitialized: false,
    
    cookie: { maxAge: 10 * 60 * 1000 }
  //  cookie: { maxAge: 120000 }  // Cookie lasts for 1 minute
}));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bloodDonationDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log("Error connecting to MongoDB: ", err));

//multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Handle Donor Registration
app.post('/register-donor', upload.single('blood-group-report'), async (req, res) => {
    try {
        const { name, email, phone, dob, address, state, city, district, password, 'blood-group': bloodGroup, 'last-donation': lastDonation, weight, 'medical-conditions': medicalConditions, 'pin-code': pinCode } = req.body;

        // Check if email already exists
        const existingDonor = await Donor.findOne({ email });
        if (existingDonor) 
            {
            return res.render('registrationpage', {success:null, error: 'Email already registered.' });
            }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Save new donor
        const donorData = new Donor({
            name,
            email,
            phone,
            dob,
            address,
            state,
            city,
            district,
            pinCode,
            bloodGroup,
            lastDonation,
            weight,
            medicalConditions,
            bloodGroupReport: req.file.path,  // Store file path for blood-group-report
            password: hashedPassword,
            profileCompleted: false  // Set profile as incomplete initially
        });

        await donorData.save();

        // Redirect to login with success message
        res.render('login', { success: 'Registration successful! Please log in.', error: null });

    } catch (err) {
        console.log(err);
        res.status(500).send('Error saving donor information.');
    }
});

// Handle Donor Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find donor by email
        const donor = await Donor.findOne({ email });
        if (!donor) {
            return res.render('login', { error: 'Invalid email or password.', success: null });
        }

        // Check password
        const match = await bcrypt.compare(password, donor.password);
        if (!match) {
            return res.render('login', { error: 'Invalid password.', success: null });
        }

        // Create session for logged-in donor
        req.session.donorId = donor._id;

        // Redirect to profile completion on first login
        if (!donor.profileCompleted) {
            return res.redirect(`/donor_profile?firstLogin=true`);
        }

        res.redirect('/donor_profile');  // Redirect to the dashboard on subsequent logins
    } catch (err) {
        console.log(err);
        res.render('login', { success: null, error: 'An error occurred during login. Please try again.' });
    }
});

// Fetch donor data and render donor_profile
app.get('/donor_profile', async (req, res) => {
    if (!req.session.donorId) {
        return res.redirect('/login');  // Redirect if not logged in
    }

    try {
        // Fetch the donor data from the database
        const donor = await Donor.findById(req.session.donorId);
        if (!donor) {
            return res.redirect('/login'); // Redirect if donor not found
        }

        const { firstLogin } = req.query;

           res.render('donor_profile', { 
            success: firstLogin === 'true' ? 'Please complete your profile.' : 'Welcome back!', 
            error: null, // Ensure this is defined
            firstLogin: firstLogin === 'true', 
            donor 
        });

    } catch (err) {
        console.error(err);
        res.render('login', { 
            success: null, 
            error: 'Error loading profile',  // Provide a default error message
            firstLogin: false, 
            donor: null  // Pr
        // res.redirect('/login');
        });
    }
});

// Handle profile update
app.post('/update-profile', async (req, res) => {
    const { donorId, name, email, phone, address } = req.body;

    try {
        // Update donor information
        await Donor.findByIdAndUpdate(donorId, {
            name,
            email,
            phone,
            address,
            profileCompleted: true // Mark profile as completed
        });

        res.redirect('/donor_profile?success=Profile updated successfully!');
    } catch (err) {
        console.error(err);
        res.redirect('/donor_profile?error=Failed to update profile');
    }
});



// Handle availability update
app.post('/update-availability', async (req, res) => {
    const { donorId, availability } = req.body;

    try {
        // Update availability
        await Donor.findByIdAndUpdate(donorId, { availability });
        res.redirect('/donor_profile?success=Availability updated successfully!');
    } catch (err) {
        console.error(err);
        res.redirect('/donor_profile?error=Failed to update availability');
    }
});


// Logout Route
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/donor_profile');
        }
        res.redirect('/login');
    });
});
const twilio = require('twilio');

// Twilio configuration (replace with your credentials)
const accountSid = 'AC2eeef6fbdeadcd1c63250fc0e43cff1f'; // Your Twilio Account SID
const authToken = '6448e0bf66b03239c2a3ecb72a736483'; // Your Twilio Auth Token
const client = new twilio(accountSid, authToken);


    

// Route to render the OTP Verification page
app.get('/otp-verification', (req, res) => {
    const { phone , message} = req.query; // Extract phone number from the query
    if (!phone) {
        return res.redirect('/forgot-password');
    }
    res.render('otpverification', { phone , message }); // Render OTP verification page and pass phone number
});
app.post('/forgot-password', async (req, res) => {
    const { phone } = req.body;

    // Log the phone number to ensure it's correct
    console.log(`Phone number received for OTP: ${phone}`);

    // Ensure the phone number starts with '+'
    if (!phone.startsWith('+')) {
        return res.status(400).send('Invalid phone number format. Please include the country code.');
    }

    try {
        const verification = await client.verify.v2.services('VA9616225836a0cf153e9e8d937dbb49fe')
            .verifications
            .create({ to: phone, channel: 'sms' });

        console.log(`OTP sent to ${phone}: ${verification.sid}`);
        res.redirect(`/otp-verification?phone=${phone}&message=OTP sent successfully.`);
    } catch (error) {
        console.error('Failed to send OTP:', error);
        res.status(500).send('Failed to send OTP. Please check your Twilio setup and try again.');
    }
});
app.post('/verify-otp', async (req, res) => {
    const { phone, otp } = req.body;

    // Ensure the phone number is in E.164 format
    const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`;

    try {
        // Call Twilio to verify the OTP
        const verification_check = await client.verify.v2.services('VA9616225836a0cf153e9e8d937dbb49fe')
            .verificationChecks
            .create({ to: formattedPhone, code: otp });

        if (verification_check.status === 'approved') {
            // OTP is valid, redirect to the reset password page
            res.redirect(`/reset-password?phone=${formattedPhone}`);
        } else {
            return res.status(400).json({ success: false, message: 'Invalid or expired OTP.' });
        }
    } catch (error) {
        console.error('OTP verification failed:', error);
        return res.status(500).json({ success: false, message: 'OTP verification failed.' });
    }
});

app.get('/reset-password', (req, res) => {
    const { phone } = req.query; // Extract phone number from the query
    if (!phone) {
        return res.redirect('/forgot-password'); // Redirect if phone number is not provided
    }
    res.render('reset-password', { phone }); // Render the reset password page and pass the phone number
});
// Route to handle password reset submission

app.post('/reset-password', async (req, res) => {
    let { phone, password, confirmPassword } = req.body;

    // Trim the phone number to remove any extra spaces
    phone = phone.trim();

    // Check if the phone number starts with '+' and prepend if missing
    if (phone.length > 0 && !phone.startsWith('+')) {
        phone = '+' + phone; // Prepend '+' if it's not present
    }

    // Validate inputs
    if (!phone || !password) {
        return res.status(400).json({ message: 'Phone number and password are required.' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match.' });
    }

    try {
        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Find the user by phone number and update the password
        const result = await Donor.findOneAndUpdate({ phone }, { password: hashedPassword });

        if (!result) {
            return res.status(404).json({ message: 'User not found.' });
        }

        console.log(`Password for ${phone} has been successfully reset.`);
        
        // Redirect to login with a success message
        res.redirect(`/login?success=Password reset successfully!`);
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Error resetting password.' });
    }
});

app.get('/search', async (req, res) => {
    const { bloodType, location } = req.query;

    console.log(`Received - Blood Type: '${bloodType}', Location: '${location}'`);

    if (!bloodType || !location) {
        return res.status(400).json({ message: 'Blood type and location are required.' });
    }

    try {
        const donors = await Donor.find({
            bloodGroup: bloodType, // Match the bloodGroup field correctly
            $or: [
                { city: { $regex: location, $options: 'i' } }, // Match by city (case insensitive)
                { district: { $regex: location, $options: 'i' } }, // Match by district
                { state: { $regex: location, $options: 'i' } } // Match by state
            ]
        });

        console.log('Donors Found:');
        res.json(donors);
    } catch (error) {
        console.error('Error searching donors:', error);
        res.status(500).json({ message: 'An error occurred while searching for donors.' });
    }
});

app.use(express.static('public'))
app.listen((port),() => {console.log(`Server running on Port :${port}`)})