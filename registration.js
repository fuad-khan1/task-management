document
  .getElementById("registrationForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Check if the email is already registered
    const registeredUsers =
      JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const isEmailRegistered = registeredUsers.some(
      (user) => user.email === email
    );
    if (isEmailRegistered) {
      alert("Email Already Registered ! Please log in");
      return;
    }
    // Register the user (store in local storage)
    const user = { name, email, password };
    registeredUsers.push(user);
    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));

    // Redirect to login page after registration
    window.location.href = "login.html";
  });
