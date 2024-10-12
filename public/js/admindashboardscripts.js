// JavaScript code for admin dashboard interactivity

// Dummy data for demonstration (You can replace this with real API calls later)
const donors = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' }
];

const donations = [
    { id: 1, donorName: 'John Doe', donationDate: '2024-09-15', bloodType: 'O+', status: 'Completed' },
    { id: 2, donorName: 'Jane Smith', donationDate: '2024-09-20', bloodType: 'A-', status: 'Pending' }
];

// Display statistics data dynamically
document.getElementById('total-donors').innerText = donors.length;
document.getElementById('total-donations').innerText = donations.length;
document.getElementById('pending-requests').innerText = donations.filter(donation => donation.status === 'Pending').length;

// Function to populate Manage Users table
function populateUsersTable() {
    const tbody = document.querySelector('.manage-section table tbody');
    tbody.innerHTML = '';  // Clear the table before populating it

    donors.forEach(donor => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${donor.id}</td>
            <td>${donor.name}</td>
            <td>${donor.email}</td>
            <td>${donor.status}</td>
            <td>
                <button onclick="editUser(${donor.id})">Edit</button>
                <button onclick="deleteUser(${donor.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Function to edit a user's information (dummy function)
function editUser(userId) {
    const user = donors.find(d => d.id === userId);
    if (user) {
        const newName = prompt('Edit name:', user.name);
        if (newName) {
            user.name = newName;
            populateUsersTable();  // Re-render the table
        }
    }
}

// Function to delete a user (dummy function)
function deleteUser(userId) {
    const index = donors.findIndex(d => d.id === userId);
    if (index !== -1) {
        if (confirm(`Are you sure you want to delete ${donors[index].name}?`)) {
            donors.splice(index, 1);  // Remove user from array
            populateUsersTable();  // Re-render the table
        }
    }
}

// Initialize the page by populating the users table on load
window.onload = function() {
    populateUsersTable();
};

