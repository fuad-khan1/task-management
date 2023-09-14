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
});

// ---------------------------------------------------------------------------------------- //

// ///////   Task Form   /////////////////////////////////
const createTaskForm = document.getElementById("createTaskForm");

const initialTaskList = JSON.parse(localStorage.getItem("taskList")) || [];

createTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // Get task data from the form
  const taskTitle = createTaskForm.querySelector("#taskTitle").value;
  const taskDescription =
    createTaskForm.querySelector("#taskDescription").value;
  const dueDate = createTaskForm.querySelector("#dueDate").value;
  const priority = createTaskForm.querySelector("#taskPriority").value;
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

  initialTaskList.push(task);
  updateTaskList(initialTaskList);
  localStorage.setItem("taskList", JSON.stringify(initialTaskList));
  createTaskForm.reset();
});

// Function updateTask-List
function updateTaskList(tasks, index) {
  const tableBody = document.querySelector("#taskList tbody");
  tableBody.innerHTML = "";
  tasks.forEach((task) => {
    const taskRow = document.createElement("tr");
    taskRow.className = "border-b";

    const titleData = document.createElement("td");
    titleData.innerHTML = task.title;
    titleData.className = "p-2  border";
    const descriptionData = document.createElement("td");
    descriptionData.innerHTML = task.description;
    descriptionData.className = "p-2 border-r";

    const dueDateData = document.createElement("td");
    dueDateData.innerHTML = task.dueDate;
    dueDateData.className = "p-2 border-r";

    const priorityData = document.createElement("td");
    priorityData.innerHTML = task.priority;
    priorityData.className = "p-2 border-r";

    const assigneeData = document.createElement("td");
    assigneeData.innerHTML = task.assignee;
    assigneeData.className = "p-2 border-r";

    const statusData = document.createElement("td");
    statusData.innerHTML = task.status;
    statusData.className = "p-2 border-r";

    taskRow.appendChild(titleData);
    taskRow.appendChild(descriptionData);
    taskRow.appendChild(dueDateData);
    taskRow.appendChild(priorityData);
    taskRow.appendChild(assigneeData);
    taskRow.appendChild(statusData);

    tableBody.appendChild(taskRow);
  });
}

updateTaskList(initialTaskList);
