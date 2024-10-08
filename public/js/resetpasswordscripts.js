document.getElementById('reset-password-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting immediately

    // Get the values of the password fields
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Basic validation
    if (newPassword.length < 8) {
        alert("Password must be at least 8 characters long.");
        return;
    }

    if (newPassword !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return;
    }

    // If validation passes, you can submit the form
    this.submit();
});
