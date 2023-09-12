document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const registeredUsers =
    JSON.parse(localStorage.getItem("registeredUsers")) || [];
  // Check if the email and password match any registered user
  const user = registeredUsers.find(
    (user) => user.email === email && user.password === password
  );
  if (user) {
    alert("Login Successful !");
    localStorage.setItem("authenticated", "true");
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid email or password !");
  }
});
