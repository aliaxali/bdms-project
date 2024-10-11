// Example array of users for demonstration (this will be dynamic in a real project)
let users = [
    { id: 1, name: "John Doe", email: "john@example.com", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Inactive" },
    { id: 3, name: "Sam Wilson", email: "sam@example.com", status: "Active" },
];

let currentPage = 1;
const usersPerPage = 2;

function displayUsers(page) {
    const userTableBody = document.getElementById("userTableBody");
    userTableBody.innerHTML = "";

    let start = (page - 1) * usersPerPage;
    let end = start + usersPerPage;
    let paginatedUsers = users.slice(start, end);

    paginatedUsers.forEach(user => {
        const row = `<tr>
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>${user.status}</td>
                        <td>
                            <button class="edit-btn" onclick="editUser(${user.id})">Edit</button>
                            <button class="delete-btn" onclick="deleteUser(${user.id})">Delete</button>
                        </td>
                    </tr>`;
        userTableBody.insertAdjacentHTML('beforeend', row);
    });
}

function nextPage() {
    if (currentPage * usersPerPage < users.length) {
        currentPage++;
        displayUsers(currentPage);
        document.getElementById("page-info").innerText = "Page " + currentPage;
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayUsers(currentPage);
        document.getElementById("page-info").innerText = "Page " + currentPage;
    }
}

// Search function
function filterUsers() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchInput) || 
        user.email.toLowerCase().includes(searchInput)
    );
    users = filteredUsers;
    displayUsers(1);
}

// Function to edit user (opens modal)
function editUser(userId) {
    const user = users.find(u => u.id === userId);
    document.getElementById("editName").value = user.name;
    document.getElementById("editEmail").value = user.email;
    document.getElementById("editStatus").value = user.status;
    document.getElementById("editModal").style.display = "block";
}

// Function to delete user
function deleteUser(userId) {
    users = users.filter(user => user.id !== userId);
    displayUsers(currentPage);
}

// Close modal function
function closeModal() {
    document.getElementById("editModal").style.display = "none";
}

// Function to save changes to user (in modal)
function updateUser() {
    // Logic to update user information
    closeModal();
}

// Initial display of users
displayUsers(currentPage);
