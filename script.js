const items = [];
const tasks = [];

// Helper functions

function createButton(text, onClick) {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", onClick);
    return button;
}

// Render Shopping List
function renderItems() {
    const list = document.getElementById("shoppingList");
    list.innerHTML = "";

    items.forEach((item, i) => {
        const itemElement = document.createElement("div");
        itemElement.className = `item ${item.bought ? 'bought' : ''}`;

        itemElement.appendChild(createButton("Toggle Bought", () => toggleBought(i)));
        itemElement.appendChild(createButton("Delete", () => deleteItem(i)));
        itemElement.appendChild(createButton("Edit", () => editItem(i)));

        const nameSpan = document.createElement("span");
        nameSpan.textContent = item.name;
        itemElement.prepend(nameSpan);

        list.appendChild(itemElement);
    });
}

// Render Task List
function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, i) => {
        const taskElement = document.createElement("div");
        taskElement.className = `task ${task.completed ? 'completed' : ''}`;

        taskElement.appendChild(createButton("Complete", () => toggleCompleted(i)));
        taskElement.appendChild(createButton("Delete", () => deleteTask(i)));
        taskElement.appendChild(createButton("Edit", () => editTask(i)));

        const nameSpan = document.createElement("span");
        nameSpan.textContent = task.name;
        taskElement.prepend(nameSpan);

        list.appendChild(taskElement);
    });
}

// Add Item to Shopping List
function addItem() {
    let input = document.getElementById("itemInput");
    let item = input.value.trim();
    if (item) {
        items.push({ name: item, bought: false });
        input.value = "";
        renderItems();
        saveItemsToLocalStorage();
    }
}

// Toggle Bought Status of Item
function toggleBought(index) {
    if (items[index]) {
        items[index].bought = !items[index].bought;
        renderItems();
        saveItemsToLocalStorage();
    }
}

// Delete Item from Shopping List
function deleteItem(index) {
    if (index >= 0 && index < items.length) {
        items.splice(index, 1);
        renderItems();
        saveItemsToLocalStorage();
    }
}

// Edit Item Name
function editItem(index) {
    const newName = prompt("Edit item name:", items[index].name);
    if (newName) {
        items[index].name = newName;
        renderItems();
        saveItemsToLocalStorage();
    }
}

// Save Shopping List to Local Storage
function saveItemsToLocalStorage() {
    localStorage.setItem("items", JSON.stringify(items));
}

// Load Shopping List from Local Storage
function loadItemsFromLocalStorage() {
    const storedItems = JSON.parse(localStorage.getItem("items"));
    if (storedItems) {
        items.length = 0;
        items.push(...storedItems);
        renderItems();
    }
}

// Clear All Items from Shopping List
function clearItems() {
    items.length = 0;
    renderItems();
    saveItemsToLocalStorage();
}

// Add Task to Task List
function addTask() {
    let input = document.getElementById("taskInput");
    let task = input.value.trim();
    if (task) {
        tasks.push({ name: task, completed: false });
        input.value = "";
        renderTasks();
        saveTasksToLocalStorage();
    }
}

// Toggle Completed Status of Task
function toggleCompleted(index) {
    if (tasks[index]) {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
        saveTasksToLocalStorage();
    }
}

// Delete Task from Task List
function deleteTask(index) {
    if (index >= 0 && index < tasks.length) {
        tasks.splice(index, 1);
        renderTasks();
        saveTasksToLocalStorage();
    }
}

// Edit Task Name
function editTask(index) {
    const newName = prompt("Edit task name:", tasks[index].name);
    if (newName) {
        tasks[index].name = newName;
        renderTasks();
        saveTasksToLocalStorage();
    }
}

// Save Task List to Local Storage
function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load Task List from Local Storage
function loadTasksFromLocalStorage() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
        tasks.length = 0;
        tasks.push(...storedTasks);
        renderTasks();
    }
}

// Clear All Tasks from Task List
function clearTasks() {
    tasks.length = 0;
    renderTasks();
    saveTasksToLocalStorage();
}

// Event Listeners
document.getElementById("addItemBtn").addEventListener("click", addItem);
document.getElementById("addTaskBtn").addEventListener("click", addTask);
document.getElementById("clearItemsBtn").addEventListener("click", clearItems);
document.getElementById("clearTasksBtn").addEventListener("click", clearTasks);

// On Page Load
window.onload = function () {
    loadItemsFromLocalStorage();
    loadTasksFromLocalStorage();
    renderItems();
    renderTasks();
};
