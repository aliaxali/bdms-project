document.addEventListener("DOMContentLoaded", function () {
    const addDonationButton = document.getElementById("add-donation-btn");
    const donationTableBody = document.querySelector("tbody");

    // Sample data array to simulate database
    let donations = [
        { donorName: "John Doe", donationDate: "2024-09-15", bloodType: "A+", status: "Processed" },
        { donorName: "Jane Smith", donationDate: "2024-09-16", bloodType: "O-", status: "Pending" },
    ];

    // Function to render donations in the table
    function renderDonations() {
        donationTableBody.innerHTML = ""; // Clear existing entries
        donations.forEach((donation, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${donation.donorName}</td>
                <td>${donation.donationDate}</td>
                <td>${donation.bloodType}</td>
                <td>${donation.status}</td>
                <td>
                    <button onclick="editDonation(${index})">Edit</button>
                    <button onclick="deleteDonation(${index})">Delete</button>
                </td>
            `;
            donationTableBody.appendChild(row);
        });
    }

    // Function to add a new donation
    addDonationButton.addEventListener("click", function () {
        const donorName = prompt("Enter Donor Name:");
        const donationDate = prompt("Enter Donation Date (YYYY-MM-DD):");
        const bloodType = prompt("Enter Blood Type:");
        const status = prompt("Enter Status (Processed/Pending):");

        if (donorName && donationDate && bloodType && status) {
            donations.push({ donorName, donationDate, bloodType, status });
            renderDonations(); // Re-render the donations table
        } else {
            alert("All fields are required.");
        }
    });

    // Function to edit a donation
    window.editDonation = function (index) {
        const donation = donations[index];
        const newDonorName = prompt("Edit Donor Name:", donation.donorName);
        const newDonationDate = prompt("Edit Donation Date (YYYY-MM-DD):", donation.donationDate);
        const newBloodType = prompt("Edit Blood Type:", donation.bloodType);
        const newStatus = prompt("Edit Status (Processed/Pending):", donation.status);

        if (newDonorName && newDonationDate && newBloodType && newStatus) {
            donations[index] = { donorName: newDonorName, donationDate: newDonationDate, bloodType: newBloodType, status: newStatus };
            renderDonations(); // Re-render the donations table
        } else {
            alert("All fields are required.");
        }
    };

    // Function to delete a donation
    window.deleteDonation = function (index) {
        if (confirm("Are you sure you want to delete this donation?")) {
            donations.splice(index, 1); // Remove the donation from the array
            renderDonations(); // Re-render the donations table
        }
    };

    // Initial render of donations
    renderDonations();
});
