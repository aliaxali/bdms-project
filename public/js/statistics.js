// statistics.js
async function fetchStatistics() {
    const response = await fetch('http://localhost:4000/api/statistics'); // Ensure this matches the server's endpoint
    if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return response.json();
}

// Load statistics function
async function loadStatistics() {
    try {
        const stats = await fetchStatistics();
        document.getElementById('total-donors').textContent = stats.totalDonors;
        document.getElementById('active-donors').textContent = stats.activeDonors;

        const bloodGroupCounts = stats.bloodGroupCounts;
        const bloodGroupList = document.getElementById('blood-group-counts');
        bloodGroupList.innerHTML = ''; // Clear existing list

        for (const [bloodGroup, count] of Object.entries(bloodGroupCounts)) {
            const li = document.createElement('li');
            li.textContent = `${bloodGroup} : ${count}`;
            bloodGroupList.appendChild(li);
        }
    } catch (error) {
        console.error('Error fetching statistics:', error);
        document.getElementById('total-donors').textContent = 'Error loading data';
        document.getElementById('active-donors').textContent = 'Error loading data';
        document.getElementById('blood-group-counts').innerHTML = '<li>Error loading data</li>'; // Display error message
    }
}

// Call loadStatistics when the page loads
window.onload = loadStatistics;
