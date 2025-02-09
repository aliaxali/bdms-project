const mongoose = require('mongoose');

// Define a donor schema
const donorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    dob: { type: Date, required: true },
    address: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    district: { type: String, required: true },
    pinCode: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    lastDonation: { type: Date },
    weight: { type: Number, required: true },
    medicalConditions: { type: String },
    bloodGroupReport: { type: String }, // path to uploaded file
    password: { type: String, required: true },
    profileCompleted: { type: Boolean, default: false },
    availability: { type: String, default: 'yes' },
    status: { type: String, default: 'Active' } // New status field
});





const Donor = mongoose.model('Donor', donorSchema);
module.exports = Donor;
