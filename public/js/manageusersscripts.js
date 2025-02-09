// Function to fetch users from the database
async function fetchUsers() {
    const response = await fetch('/api/users'); // Adjust the endpoint as needed
    const users = await response.json();
    return users;
}

// Display users with the fetched data
async function displayUsers(page) {
    const userTableBody = document.getElementById("userTableBody");
    userTableBody.innerHTML = "";

    const users = await fetchUsers(); // Fetch latest users from the database

    let start = (page - 1) * usersPerPage;
    let end = start + usersPerPage;
    let paginatedUsers = users.slice(start, end);

    paginatedUsers.forEach(user => {
        const row = `<tr id="user-${user._id}">
                        <td>${user._id}</td>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>${user.availability}</td>
                        <td>${user.city}</td>
                        <td>${user.district}</td>
                        <td>${user.state}</td>
                        <td>${user.bloodGroup}</td>
                        <td>
                           
                            <button class="delete-btn" onclick="deleteUser('${user._id}')">Delete</button>
                        </td>
                    </tr>`;
        userTableBody.insertAdjacentHTML('beforeend', row);
    });
}

// Update the delete user function for instant deletion in the frontend
async function deleteUser(userId) {
    try {
        const response = await fetch(`/api/users/${userId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            // Remove the user row from the table instantly without re-fetching all users
            const userRow = document.getElementById(`user-${userId}`);
            if (userRow) {
                userRow.remove();
            }
        } else {
            console.error("Failed to delete user");
            alert("Could not delete user. Please try again.");
        }
    } catch (error) {
        console.error("Error deleting user:", error);
        alert("An error occurred while deleting the user.");
    }
}

function filterItem(event) {
    const searchText = event.target.value.toLowerCase(); // Get the search input
    const userTableBody = document.getElementById("userTableBody");
    const items = userTableBody.querySelectorAll('tr'); // Select all user rows

    items.forEach((item) => {
        // Get the user name and email from the row
        const userName = item.cells[1].textContent.toLowerCase().trim();
        const userEmail = item.cells[2].textContent.toLowerCase().trim();

        // Check if either name or email contains the search text
        if (userName.includes(searchText) || userEmail.includes(searchText)) {
            item.style.display = 'table-row'; // Show row
        } else {
            item.style.display = 'none'; // Hide row
        }
    });
}

// Add event listener for search input
document.getElementById('search').addEventListener('input', filterItem);

// Call this function initially to load users on page load
window.onload = function() {
    displayUsers(currentPage);
};
