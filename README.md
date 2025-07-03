
# 🩸 Blood Donation Management System (BDMS)

A full-stack web application designed to digitize and manage the process of blood donation—from donor registration to donation tracking and admin control. Built using **Node.js**, **Express**, **MongoDB**, and **EJS**, BDMS provides a seamless interface for both donors and administrators.

🔗 **Live Demo:** [Visit BDMS on Render](https://bdms-4rai.onrender.com/)  


---

## 📌 Problem Statement

Blood banks and hospitals often face challenges in maintaining real-time records of donors, managing donor eligibility, and locating suitable blood types quickly during emergencies. Manual systems are inefficient, error-prone, and lack scalability.

---

## ✅ Our Solution

The **BDMS** application solves these issues by:

- Creating a secure platform for donor registration and authentication.
- Allowing donors to maintain medical and donation history online.
- Providing admins with tools to manage donor data, view donation records, and filter/search based on blood group, location, etc.
- Implementing OTP-based password recovery for better security and accessibility.

---

## 🚀 Features

### 👤 Donor Module
- Secure Donor Registration & Login
- First-time Profile Completion
- View & Edit Profile
- Medical History & Donation History
- OTP-Based Password Recovery
- Dashboard with Notifications

### 🧑‍💼 Admin Module
- Admin Login (via MongoDB-stored credentials)
- View/Add/Delete Donors
- Search & Filter by Blood Group, Location, Activity
- View Donation Records
- Admin Dashboard with Summary Stats

---

## 🛠️ Tech Stack

| Layer          | Technology                      |
|----------------|---------------------------------|
| Frontend       | HTML, CSS, JavaScript, EJS      |
| Backend        | Node.js, Express.js             |
| Database       | MongoDB (Mongoose)              |
| Security       | bcrypt, express-session, Twilio |
| Hosting        | Render                          |

---


## ⚙️ Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/aliaxali/bdms-project.git
   cd bdms-project
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run MongoDB**  
   Ensure MongoDB is running locally or connect via MongoDB Atlas.

4. **Configure Admin**
   Insert an admin user manually into the `admins` collection via MongoDB Compass or shell.

5. **Start the Server**
   ```bash
   node server.js
   ```

6. **Open in Browser**
   ```
   http://localhost:3000
   ```

---

## 🔒 Security Features

- Password Hashing (bcrypt)
- OTP Verification for Forgot Password
- Session-based Access Control
- Input Validation

---

## ✨ Enhancements Implemented

- ✅ OTP-based Password Recovery  
- ✅ Donor Search & Filter for Admin  
- ✅ Medical & Donation History Tracking  
- ✅ Live Hosting on Render

---

## 📸 Screenshots

🔗 [Click here to view screenshots folder](https://drive.google.com/drive/folders/1JJbN1-GXn2Uvgou3vu4YfXjGxgskkzfe)  


---

## 🤝 Contribution

Contributions are welcome!  
To contribute:
- Fork the repo
- Create a new branch
- Submit a pull request

---

## 👩‍💻 Team Members

- 👩‍💻 Aliya Abid Ali – Project Lead & Backend Developer  
- 👩‍💻 Anagha S – Frontend Developer 
- 👩‍💻 Amisha Shaney – Frontend Developer
- 👩‍💻 Anila Mathai – Documentation Head & Tester

---



