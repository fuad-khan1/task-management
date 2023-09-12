const isAuthenticated = localStorage.getItem("authenticated") === "true";

const userId = localStorage.getItem("userId");


// Retrieve the user's profile data using the email
const userProfile = JSON.parse(localStorage.getItem(userId));

const userNameElement = document.getElementById("userName");

if (userProfile && userNameElement) {
    userNameElement.textContent = userProfile.name;
}

if (!isAuthenticated) {
  window.location.href = "index.html";
}
document.getElementById("logoutLink").addEventListener("click", () => {
  localStorage.setItem("authenticated", "false");
});
