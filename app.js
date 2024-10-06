// Sample data to simulate blood requests (for demonstration purposes)
const bloodRequests = [
    { id: 1, bloodType: 'A+', quantity: 2, location: 'New York', status: 'Pending' },
    { id: 2, bloodType: 'B-', quantity: 1, location: 'Los Angeles', status: 'Approved' },
    { id: 3, bloodType: 'O+', quantity: 3, location: 'Chicago', status: 'Pending' }
];

// Function to search for available blood types
function searchBlood() {
    const bloodType = document.getElementById('blood-type').value.toUpperCase();
    const location = document.getElementById('location').value.toLowerCase();
    const resultsDiv = document.getElementById('results');

    // Clear previous results
    resultsDiv.innerHTML = '';

    // Filter requests based on search criteria
    const filteredRequests = bloodRequests.filter(request =>
        request.bloodType.toUpperCase().includes(bloodType) &&
        request.location.toLowerCase().includes(location)
    );

    // Display search results
    if (filteredRequests.length > 0) {
        filteredRequests.forEach(request => {
            const result = document.createElement('p');
            result.textContent = `Blood Type: ${request.bloodType}, Quantity: ${request.quantity}, Location: ${request.location}, Status: ${request.status}`;
            resultsDiv.appendChild(result);
        });
    } else {
        resultsDiv.textContent = 'No matching blood types found.';
    }
}

// Function to submit a blood request
function submitRequest() {
    const bloodType = document.getElementById('bloodType').value.toUpperCase();
    const quantity = document.getElementById('quantity').value;
    const location = document.getElementById('location').value;

    if (bloodType && quantity && location) {
        const newRequest = {
            id: bloodRequests.length + 1,
            bloodType,
            quantity: parseInt(quantity),
            location,
            status: 'Pending'
        };

        bloodRequests.push(newRequest);
        alert('Blood request submitted successfully!');
        document.getElementById('requestForm').reset(); // Clear form fields
    } else {
        alert('Please fill in all fields.');
    }
}

// Function to load blood requests in the "Manage Requests" page
function loadRequests() {
    const requestsTableBody = document.getElementById('requestsTableBody');
    requestsTableBody.innerHTML = ''; // Clear existing table rows

    bloodRequests.forEach(request => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${request.id}</td>
            <td>${request.bloodType}</td>
            <td>${request.quantity}</td>
            <td>${request.location}</td>
            <td>${request.status}</td>
            <td>
                <button onclick="approveRequest(${request.id})">Approve</button>
                <button onclick="deleteRequest(${request.id})">Delete</button>
            </td>
        `;

        requestsTableBody.appendChild(row);
    });
}

// Function to approve a blood request
function approveRequest(requestId) {
    const request = bloodRequests.find(req => req.id === requestId);
    if (request) {
        request.status = 'Approved';
        loadRequests(); // Refresh the requests table
        alert(`Request ID ${requestId} has been approved.`);
    }
}

// Function to delete a blood request
function deleteRequest(requestId) {
    const index = bloodRequests.findIndex(req => req.id === requestId);
    if (index !== -1) {
        bloodRequests.splice(index, 1);
        loadRequests(); // Refresh the requests table
        alert(`Request ID ${requestId} has been deleted.`);
    }
}

// Load requests when "Manage Requests" page is loaded
if (document.body.contains(document.getElementById('requestsTableBody'))) {
    loadRequests();
}
