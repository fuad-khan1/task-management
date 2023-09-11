const usernameInput = document.getElementById("usernameInput");
const bioInput = document.getElementById("bioInput");
const loginButton = document.getElementById("loginButton");
const logoutButton = document.getElementById("logoutButton");
const updateProfileButton = document.getElementById("updateProfileButton");
const createTaskButton = document.getElementById("createTaskButton");
const registerButton = document.getElementById("registerButton");
// local storage
const localStorageKey = "Data";

let userData = JSON.parse(localStorage.getItem(localStorageKey)) || {
  isAuthenticated: false,
  username: "",
  bio: "",
  tasks: [],
};

// updateUI function
function updateUI() {
  document.getElementById("profilePic").src = userData.profilePictureURL;
  if (userData.isAuthenticated) {
    usernameInput.value = userData.username;
    bioInput.value = userData.bio;
    loginButton.disabled = true;
    logoutButton.disabled = false;
    updateProfileButton.disabled = false;
    createTaskButton.disabled = false;
  } else {
    usernameInput.value = "";
    bioInput.value = "";
    loginButton.disabled = false;
    logoutButton.disabled = true;
    updateProfileButton.disabled = true;
    createTaskButton.disabled = true;
  }

  // Display tasks in the task list
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  userData.tasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.className="mb-2 border border-black p-2 w-2/5"
    listItem.innerHTML = `
             Task ${index + 1}:
             <br>Title: ${task.title}
             <br>Description: ${task.description}
             <br>Due Date: ${task.dueDate}
             <br>Priority: ${task.priority}
             <br>Status: ${task.status}
         `;
    taskList.appendChild(listItem);
  });
}

// save user data
function saveUserData() {
  localStorage.setItem(localStorageKey, JSON.stringify(userData));
}

//  Register button
registerButton.addEventListener("click", () => {
  const email = document.getElementById("emailInput").value;
  const password = document.getElementById("passwordInput").value;
    const profilePicture = document.getElementById("profilePictureInput")
      .files[0];

  // Create a new user object with the provided data
  userData = {
    isAuthenticated: true,
    username: "",
    bio: "",
    email,
    password,
    profilePicture,
    profilePictureURL: "",
    tasks: [],
  };

  // Update the UI
  updateUI();
  saveUserData();
});

// Log in button
loginButton.addEventListener("click", () => {
  userData.isAuthenticated = true;
  updateUI();
  saveUserData();
});

//  Log Out button
logoutButton.addEventListener("click", () => {
  userData.isAuthenticated = false;
  updateUI();
  saveUserData();
});

//  Update Profile button
updateProfileButton.addEventListener("click", () => {
  const username = usernameInput.value;
  const bio = bioInput.value;
  userData.username = username;
  userData.bio = bio;
  updateUI();
  saveUserData();
});

//  Create Task button
createTaskButton.addEventListener("click", () => {
  const title = prompt("Enter title:");
  const description = prompt("Enter description:");
  const dueDate = prompt("Enter due date:");
  const priority = prompt("Enter priority (high/medium/low):");
  const status = "Pending";
  userData.tasks.push({ title, description, dueDate, priority, status });
  updateUI();
  saveUserData();
});

updateUI();
