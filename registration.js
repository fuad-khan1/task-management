document.getElementById("registrationForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // You can add your registration logic here (e.g., send data to a server).

    // Redirect to login page after registration
    window.location.href = "login.html";
});
