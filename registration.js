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
    regForm.reset();
    return;
  }


  if (password.length < 5) {
    alert("Password must be at least 5 characters long.");
    return;
  }
  const passStrength = /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\\-|=]).{5,}$/;
  if (!passStrength.test(password)) {
    alert("Password must contain at least one special character.");
    return;
  }

  
  function generateUniqueId() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
  const user = { id: generateUniqueId(), name, email, password };
  registeredUsers.push(user);

  localStorage.setItem("userId", user.id);

  const userProfile = { name, email, bio: "" };
  localStorage.setItem(user.id, JSON.stringify(userProfile));

  localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
  alert("Registration Successfull.");
  regForm.reset();

  // window.location.href = "login.html";
});
