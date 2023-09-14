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

  const taskList = JSON.parse(localStorage.getItem("taskList")) || [];
  taskList.push(task);
  localStorage.setItem("taskList", JSON.stringify(taskList));

  createTaskForm.reset();

  updateTaskList(taskList);
});

// Function updateTaskList
function updateTaskList(tasks, index) {
  const taskListDisplay = document.getElementById("taskList");
  taskListDisplay.innerHTML = "";

  tasks.forEach((task) => {
    const taskItem = document.createElement("div");
    taskItem.className = "border p-2 space-y-2 mb-2";

    const taskTitleElement = document.createElement("h3");
    taskTitleElement.textContent = "Title: " + task.title;

    const taskDescriptionElement = document.createElement("p");
    taskDescriptionElement.textContent = "Description: " + task.description;

    const dueDateElement = document.createElement("p");
    dueDateElement.textContent = "Due Date: " + task.dueDate;

    const priorityElement = document.createElement("p");
    priorityElement.textContent = "Priority: " + task.priority;

    const assigneeElement = document.createElement("p");
    assigneeElement.textContent = "Assignee: " + task.assignee;

    // Create task status element
    const taskStatusElement = document.createElement("p");
    taskStatusElement.textContent = "Status: " + task.status;

    // delete a task
    const deleteTaskButton = document.createElement("button");
    deleteTaskButton.innerHTML = `Remove Task`;
    deleteTaskButton.className = "bg-red-500 text-white py-1 px-1 rounded";
    deleteTaskButton.addEventListener("click", () => {
      tasks.splice(index, 1);

      localStorage.setItem("taskList", JSON.stringify(tasks));
      updateTaskList(tasks);
    });

    taskItem.appendChild(taskTitleElement);
    taskItem.appendChild(taskDescriptionElement);
    taskItem.appendChild(dueDateElement);
    taskItem.appendChild(priorityElement);
    taskItem.appendChild(assigneeElement);
    taskItem.appendChild(taskStatusElement);
    taskItem.appendChild(deleteTaskButton);

    taskListDisplay.appendChild(taskItem);
  });
}

const initialTaskList = JSON.parse(localStorage.getItem("taskList")) || [];
updateTaskList(initialTaskList);