document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const registeredUsers =
    JSON.parse(localStorage.getItem("registeredUsers")) || [];
  // Check  email and password matching
  const user = registeredUsers.find(
    (user) => user.email === email && user.password === password
  );
  if (user) {
    alert("Login Successful !");
    localStorage.setItem("authenticated", "true");
    localStorage.setItem("userId", user.id);

    window.location.href = "tasks.html";
  } else {
    alert("Invalid email or password !");
  }
});
