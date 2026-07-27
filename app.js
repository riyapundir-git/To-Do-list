// 
// ===============================
// Select HTML Elements
// ===============================

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const searchInput = document.getElementById("searchInput");

const allBtn = document.getElementById("allBtn");
const completedBtn = document.getElementById("completedBtn");
const pendingBtn = document.getElementById("pendingBtn");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

// ===============================
// Variables
// ===============================

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";

// ===============================
// Save Tasks
// ===============================

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ===============================
// Update Counter
// ===============================

function updateCounter() {

    totalTasks.innerText = tasks.length;

    const completed = tasks.filter(task => task.completed).length;

    completedTasks.innerText = completed;

    pendingTasks.innerText = tasks.length - completed;

}

// ===============================
// Render Tasks
// ===============================

function renderTasks() {

    taskList.innerHTML = "";

    const searchText = searchInput.value.toLowerCase();

    tasks.forEach((task, index) => {

        // Search Filter

        if (!task.text.toLowerCase().includes(searchText)) {
            return;
        }

        // Status Filter

        if (currentFilter === "completed" && !task.completed) {
            return;
        }

        if (currentFilter === "pending" && task.completed) {
            return;
        }

        // Create LI

        const li = document.createElement("li");

        // Checkbox

        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.checked = task.completed;

        // Span

        const span = document.createElement("span");

        span.innerText = task.text;

        span.style.flex = "1";

        if (task.completed) {

            span.style.textDecoration = "line-through";

            span.style.color = "gray";

        }

        // Edit Button

        const editBtn = document.createElement("button");

        editBtn.innerText = "Edit";

        // Delete Button

        const deleteBtn = document.createElement("button");

        deleteBtn.innerText = "Delete";

        // =====================
        // Checkbox Event
        // =====================

        checkbox.addEventListener("change", () => {

            tasks[index].completed = checkbox.checked;

            saveTasks();

            renderTasks();

            updateCounter();

        });

        // =====================
        // Edit Event
        // =====================

        editBtn.addEventListener("click", () => {

            const newTask = prompt("Edit Task", task.text);

            if (newTask === null) return;

            if (newTask.trim() === "") {

                alert("Task cannot be empty.");

                return;

            }

            tasks[index].text = newTask.trim();

            saveTasks();

            renderTasks();

        });

        // =====================
        // Delete Event
        // =====================

        deleteBtn.addEventListener("click", () => {

            tasks.splice(index, 1);

            saveTasks();

            renderTasks();

            updateCounter();

        });

        // Add Elements

        li.appendChild(checkbox);

        li.appendChild(span);

        li.appendChild(editBtn);

        li.appendChild(deleteBtn);

        taskList.appendChild(li);

    });

}

// ===============================
// Add Task
// ===============================

function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {

        alert("Please enter a task.");

        return;

    }

    tasks.push({

        text: text,

        completed: false

    });

    taskInput.value = "";

    saveTasks();

    renderTasks();

    updateCounter();

}

// ===============================
// Button Click
// ===============================

addBtn.addEventListener("click", addTask);

// ===============================
// Enter Key
// ===============================

taskInput.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        addTask();

    }

});

// ===============================
// Search
// ===============================

searchInput.addEventListener("keyup", () => {

    renderTasks();

});

// ===============================
// Filter Buttons
// ===============================

allBtn.addEventListener("click", () => {

    currentFilter = "all";

    renderTasks();

});

completedBtn.addEventListener("click", () => {

    currentFilter = "completed";

    renderTasks();

});

pendingBtn.addEventListener("click", () => {

    currentFilter = "pending";

    renderTasks();

});

// ===============================
// Load App
// ===============================

renderTasks();

updateCounter();