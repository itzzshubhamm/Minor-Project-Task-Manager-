const taskInput = document.getElementById("task-input");
const addBtn = document.querySelector(".add-btn");
const taskList = document.querySelector(".task-items");
const clearAll = document.querySelector(".clear-tasks");
const searchInput = document.querySelector("#search");

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
  const tasks = [];
  document.querySelectorAll(".task").forEach(function(taskItem) {
    tasks.push(taskItem.querySelector(".taskDisabled").value);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(function(taskText) {
    addTaskToList(taskText);
  });
}

// Add task to the list
function addTaskToList(taskText) {
  const newLi = document.createElement("li");
  newLi.className = "task";
  newLi.style.margin = ".5rem 0rem";

  const task = document.createElement("input");
  task.disabled = true;
  task.type = "text";
  task.className = "taskDisabled";
  task.value = taskText;

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.innerText = "Delete";

  const editBtn = document.createElement("button");
  editBtn.className = "edit-btn";
  editBtn.innerText = "Edit";

  newLi.appendChild(task);
  newLi.appendChild(deleteBtn);
  newLi.appendChild(editBtn);
  taskList.appendChild(newLi);
}

// Load tasks from local storage when the page loads
document.addEventListener("DOMContentLoaded", function() {
  loadTasksFromLocalStorage();
});

// Add task event listener
addBtn.addEventListener("click", function(e) {
  e.preventDefault();

  const taskText = taskInput.value.trim();

  if (taskInput.value !== "") {
    addTaskToList(taskText);
    taskInput.value = "";
    saveTasksToLocalStorage(); // Save tasks to local storage
  } else {
    const err = document.querySelector(".err");
    err.style.display = "block";
    setTimeout(() => {
      err.style.display = "none";
    }, 2000);
  }
});

// Delete task event listener
taskList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    e.target.parentElement.remove();
    saveTasksToLocalStorage(); // Save tasks to local storage after deletion
  }
});

// Edit task event listener
taskList.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-btn")) {
    const input = e.target.parentElement.querySelector('input[type="text"]');
    input.disabled = !input.disabled;
    if (!input.disabled) {
      input.focus();
    }
  }
});

// Clear all tasks event listener
clearAll.addEventListener("click", function(e) {
  e.preventDefault();
  taskList.innerHTML = "";
  localStorage.removeItem("tasks"); // Remove tasks from local storage
});

// Search task event listener
searchInput.addEventListener("keyup", (e) => {
  e.preventDefault();
  let searchedWord = e.target.value.toLowerCase();

  const taskItems = document.querySelectorAll(".task");
  taskItems.forEach((taskItem) => {
    let taskText = taskItem.querySelector(".taskDisabled").value.toLowerCase();

    if (taskText.indexOf(searchedWord) !== -1) {
      taskItem.style.display = "block";
    } else {
      taskItem.style.display = "none";
    }
  });
});
