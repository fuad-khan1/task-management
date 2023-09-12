// Authentication
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
});

// Update Profile Form Submission
const updateProfileForm = document.getElementById("updateProfileForm");
const nameInput = document.getElementById("name");
const bioInput = document.getElementById("bio");

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

// ///////   Task Form   /////////////////////////////////
const createTaskForm = document.getElementById("createTaskForm");
createTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // Get task data from the form
  const taskTitle = createTaskForm.querySelector("#taskTitle").value;
  const taskDescription =
    createTaskForm.querySelector("#taskDescription").value;
  const dueDate = createTaskForm.querySelector("#dueDate").value;
  const priority = createTaskForm.querySelector("#priority").value;
  const assignee = createTaskForm.querySelector("#assignee").value;

  // Create a task object
  const task = {
    title: taskTitle,
    description: taskDescription,
    dueDate: dueDate,
    priority: priority,
    assignee: assignee,
    status: "pending",
  };

  const taskList = JSON.parse(localStorage.getItem("taskList")) || [];
  taskList.push(task);
  localStorage.setItem("taskList", JSON.stringify(taskList));

  createTaskForm.reset();

  updateTaskList(taskList);
});

// Function updateTaskList
function updateTaskList(tasks) {
  const taskListDisplay = document.getElementById("taskList");
  taskListDisplay.innerHTML = "";

  tasks.forEach((task) => {
    const taskItem = document.createElement("div");
    taskItem.className =
      "mb-4 p-4 border rounded flex justify-between items-center";

    const taskTitleElement = document.createElement("h3");
    taskTitleElement.textContent = task.title;

    const taskDescriptionElement = document.createElement("p");
    taskDescriptionElement.textContent = task.description;

    const dueDateElement = document.createElement("p");
    dueDateElement.textContent = "Due Date: " + task.dueDate;

    const priorityElement = document.createElement("p");
    priorityElement.textContent = "Priority: " + task.priority;

    const assigneeElement = document.createElement("p");
    assigneeElement.textContent = "Assignee: " + task.assignee;

    // Create task status element
    const taskStatusElement = document.createElement("p");
    taskStatusElement.textContent = "Status: " + task.status;

    taskItem.appendChild(taskTitleElement);
    taskItem.appendChild(taskDescriptionElement);
    taskItem.appendChild(dueDateElement);
    taskItem.appendChild(priorityElement);
    taskItem.appendChild(assigneeElement);
    taskItem.appendChild(taskStatusElement);

    taskListDisplay.appendChild(taskItem);
  });
}

const initialTaskList = JSON.parse(localStorage.getItem("taskList")) || [];
updateTaskList(initialTaskList);
