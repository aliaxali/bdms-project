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

    // Send OTP request to server
    fetch('/forgot-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: phoneNumber }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        window.location.href = "/otp-verification"; // Redirect to OTP verification page
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
