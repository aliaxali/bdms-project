document.addEventListener("DOMContentLoaded", function() {
    fetchDonations();

    function fetchDonations() {
        fetch('fetch_donations.php') // Endpoint to fetch donations data
            .then(response => response.json())
            .then(data => {
                const donationData = document.getElementById('donation-data');
                donationData.innerHTML = ''; // Clear existing data

                data.forEach(donation => {
                    const row = `
                        <tr>
                            <td>${donation.id}</td>
                            <td>${donation.donor_name}</td>
                            <td>${donation.receiver_name}</td>
                            <td>${donation.blood_group}</td>
                            <td>${donation.donation_date}</td>
                        </tr>
                    `;
                    donationData.innerHTML += row;
                });
            })
            .catch(error => {
                console.error('Error fetching donations:', error);
            });
    }
});
