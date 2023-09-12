document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // You can add your login logic here (e.g., check credentials with a server).

    // Redirect to dashboard page after successful login
    window.location.href = "dashboard.html";
});
