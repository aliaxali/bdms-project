// forgotpasswordscripts.js

// Function to handle the form submission
document.getElementById("forgot-password-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the mobile number from the input field
    const phoneNumber = document.getElementById("phone").value;

    // Validate the mobile number format (simple validation)
    const phonePattern = /^[0-9]{10}$/; // Adjust the pattern based on your requirements

    if (!phonePattern.test(phoneNumber)) {
        alert("Please enter a valid 10-digit mobile number."); // Alert for invalid input
        return;
    }

    // Simulate sending an OTP (you would normally make an API call here)
    alert(`An OTP has been sent to ${phoneNumber}.`);

    // Optionally, redirect to the enter OTP page
    // window.location.href = "enterotp.html";
});
