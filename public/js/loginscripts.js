// scripts.js
document.getElementById("login-form").addEventListener("submit", function(event) {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if (email === "" || password === "") {
        alert("Please fill in both email and password.");
        event.preventDefault(); // Prevent form submission
    }
});
