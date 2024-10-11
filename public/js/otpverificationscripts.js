document.getElementById("otp-verification-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the OTP from the input field
    const otpInput = document.getElementById("otp").value;
    const phone = document.getElementById("phone").value; // Assuming you store phone number during OTP send

    // Validate the OTP input (simple validation)
    const otpPattern = /^[0-9]{6}$/; // Assuming OTP is a 6-digit number

    if (!otpPattern.test(otpInput)) {
        alert("Please enter a valid 6-digit OTP."); // Alert for invalid input
        return;
    }

    // Verify OTP with the server
    fetch('/verify-otp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, otp: otpInput }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.message === 'OTP verified successfully!') {
            window.location.href = "/reset-password"; // Redirect to reset password page
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
