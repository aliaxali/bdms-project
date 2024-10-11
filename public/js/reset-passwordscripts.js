document.getElementById('reset-password-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the form from submitting immediately

    // Get the values of the password fields
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const phone = document.querySelector('input[name="phone"]').value; // Get phone from hidden input

    // Basic validation
    if (newPassword.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
    }

    if (newPassword !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return;
    }

    // If validation passes, send the data to the server
    const response = await fetch('/reset-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            phone: phone.trim(), // Ensure phone is trimmed
            password: newPassword // Use the correct key name
        })
    });

    // Handle the response
    const result = await response.json();
    if (response.ok) {
        alert(result.message); // Notify success
        window.location.href = '/login'; // Redirect to login
    } else {
        alert(result.message); // Notify error
    }
});
