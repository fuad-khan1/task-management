// Authentication    ////////////////
const isAuthenticated = localStorage.getItem("authenticated") === "true";

const userId = localStorage.getItem("userId");

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
  window.location.href = "login.html";

});

//////// Update Profile Form Submission   ///////////////////////////////////
const updateProfileForm = document.getElementById("updateProfileForm");
const nameInput = document.getElementById("name");
const bioInput = document.getElementById("bio");
const profilePictureInput = document.getElementById("profilePicture");

nameInput.value = userProfile.name;
bioInput.value = userProfile.bio;

updateProfileForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const updatedName = nameInput.value;
  const updatedBio = bioInput.value;

  userProfile.name = updatedName;
  userProfile.bio = updatedBio;


  



  localStorage.setItem(userId, JSON.stringify(userProfile));

  alert("Profile updated successfully!");

  userNameElement.textContent = updatedName;
});