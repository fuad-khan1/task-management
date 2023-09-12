const regForm = document.getElementById("registrationForm");

regForm.addEventListener("submit", function (e) {
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

  function generateUniqueId() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
  const user = { id: generateUniqueId(), name, email, password };
  registeredUsers.push(user);

  localStorage.setItem("userId", user.id);

  const userProfile = { name, email };
  localStorage.setItem(user.id, JSON.stringify(userProfile));

  localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
  alert("Registration Successfull !");
  regForm.reset();

  // window.location.href = "login.html";
});
