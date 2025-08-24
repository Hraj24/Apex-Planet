// Toggle Dark/Light Mode
function toggleMode() {
  document.body.classList.toggle("dark-mode");
}

// -------- Contact Form Validation --------
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const formMessage = document.getElementById("formMessage");

  if (name === "" || email === "" || message === "") {
    formMessage.style.color = "red";
    formMessage.innerText = "⚠️ Please fill in all fields!";
    return;
  }

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.match(emailPattern)) {
    formMessage.style.color = "red";
    formMessage.innerText = "⚠️ Please enter a valid email!";
    return;
  }

  formMessage.style.color = "green";
  formMessage.innerText = "✅ Form submitted successfully!";
  document.getElementById("contactForm").reset();
});

// -------- To-Do List with localStorage --------
const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");

window.onload = function () {
  loadTasks();
};

// Add Task
function addTask() {
  const taskValue = taskInput.value.trim();
  if (taskValue === "") {
    alert("⚠️ Please enter a task!");
    return;
  }

  createTaskElement(taskValue, false);
  saveTask(taskValue, false);
  taskInput.value = "";
}

// Create Task Element
function createTaskElement(taskText, completed) {
  const li = document.createElement("li");
  if (completed) li.classList.add("completed");

  li.innerHTML = `
    <div style="display:flex; align-items:center;">
      <input type="checkbox" ${
        completed ? "checked" : ""
      } onclick="toggleTask(this)">
      <span>${taskText}</span>
    </div>
    <button onclick="removeTask(this)">❌</button>
  `;
  taskList.appendChild(li);
}

// Toggle Task Completion
function toggleTask(checkbox) {
  const li = checkbox.closest("li");
  const text = li.querySelector("span").innerText;

  li.classList.toggle("completed");
  updateTaskStatus(text, li.classList.contains("completed"));
}

// Remove Task
function removeTask(button) {
  const li = button.closest("li");
  const text = li.querySelector("span").innerText;

  li.remove();
  deleteTask(text);
}

// Save Task
function saveTask(task, completed) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: task, completed: completed });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Update Task Status
function updateTaskStatus(task, completed) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.map((t) => (t.text === task ? { ...t, completed } : t));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Delete Task
function deleteTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((t) => t.text !== task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load Tasks
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((t) => createTaskElement(t.text, t.completed));
}
