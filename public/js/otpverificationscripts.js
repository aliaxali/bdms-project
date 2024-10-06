// otpscripts.js

// Function to handle the OTP verification form submission
document.getElementById("otp-verification-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the OTP from the input field
    const otpInput = document.getElementById("otp").value;

    // Validate the OTP input (simple validation)
    const otpPattern = /^[0-9]{6}$/; // Assuming OTP is a 6-digit number

    if (!otpPattern.test(otpInput)) {
        alert("Please enter a valid 6-digit OTP."); // Alert for invalid input
        return;
    }

    // Simulate OTP verification (you would normally make an API call here)
    alert(`OTP ${otpInput} has been verified successfully.`);

    // Optionally, redirect to the reset password page
    // window.location.href = "resetpassword.html";
});
