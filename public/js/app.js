function searchBlood(event) {
    event.preventDefault(); // Prevent form from submitting normally

    const bloodType = document.getElementById('blood-type').value.trim();
    const location = document.getElementById('location').value.trim();

    // Check if both fields are filled
    if (!bloodType || !location) {
        alert("Please fill in both fields.");
        return;
    }

    // Perform AJAX request
    fetch(`/search?bloodType=${encodeURIComponent(bloodType)}&location=${encodeURIComponent(location)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const resultsSection = document.getElementById('results');
            
            resultsSection.innerHTML = ''; // Clear previous results
            if (data.length > 0) {
                resultsSection.innerHTML += '<h2>Available Blood Types</h2>';
            }
            if (data.length === 0) {
                resultsSection.innerHTML = '<p>No matching donors found.</p>';
            } else {
                data.forEach(donor => {
                    resultsSection.innerHTML += `
                   
                        <div class="donor-profile">
                            <h3>${donor.name}</h3>
                            <p>Email: ${donor.email}</p>
                            <p>Phone: ${donor.phone}</p>
                            <p>Location: ${donor.city}, ${donor.state}</p>
                            <p class="blood-group">Blood Group: ${donor.bloodGroup}</p>
                            <p>Last Donation: ${donor.lastDonation ? new Date(donor.lastDonation).toLocaleDateString() : 'N/A'}</p>
                        </div>
                    `;
                });
            }
        })
        .catch(error => {
            console.error("Error fetching donor data:", error);
        });
}
