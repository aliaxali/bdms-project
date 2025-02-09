document.getElementById('medicalForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    
    const donorId = "YOUR_ACTUAL_DONOR_ID"; // Replace this with the actual donor ID you have
    const conditions = document.getElementById('conditions').value; // Get the value from the textarea

    try {
        // Send a PUT request to update the medical history
        const response = await fetch('/api/medical_history', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json' // Specify that we are sending JSON
            },
            body: JSON.stringify({ medicalConditions: conditions, donorId: donorId }) // Create the request body
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`); // Throw an error if response is not ok
        }

        // Handle success
        document.getElementById('message').innerText = 'Medical history updated successfully!';
    } catch (error) {
        console.error('Error updating medical history:', error); // Log the error
        document.getElementById('message').innerText = 'Error updating medical history.'; // Display error message
    }
});


