const items = [];
const tasks = [];

document.getElementById("addItemBtn").addEventListener("click", addItem); // Event listener for adding item
document.getElementById("addTaskBtn").addEventListener("click", addTask); // Event listener for adding task
document.getElementById("clearItemsBtn").addEventListener("click", clearItems); // Event listener for clearing items
document.getElementById("clearTasksBtn").addEventListener("click", clearTasks); // Event listener for clearing tasks


function renderItems() { // Function to render the shopping list
    const list = document.getElementById("shoppingList");
    list.innerHTML = "";

    items.forEach((item, i) => {
        let itemElement = document.createElement("div");
        itemElement.className = "item";
        if (item.bought) itemElement.classList.add("bought");

        let nameSpan = document.createElement("span");
        nameSpan.textContent = item.name;

        let toggleBtn = document.createElement("button");
        toggleBtn.textContent = "Toggle Bought";
        toggleBtn.addEventListener("click", () => {
            toggleBought(i);
        });

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => {
            deleteItem(i);
        });

        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", () => {
            editItem(i);
        });

        itemElement.append(nameSpan, toggleBtn, deleteBtn, editBtn);
        list.appendChild(itemElement);
    });

}
function addItem() { // Function to add item to the shopping list
    let input = document.getElementById("itemInput");
    let item = input.value.trim();
    if (item) {
        items.push({ name: item, bought: false });
        input.value = "";
        renderItems();
        saveItemsToLocalStorage();
    } 
}

function toggleBought(index) { // Function to toggle the "bought" status of an item
    if (items[index]) {
        items[index].bought = !items[index].bought;
        renderItems();
        saveItemsToLocalStorage();
    }
}

function deleteItem(index) { // Function to delete an item from the shopping list
    if (index >= 0 && index < items.length) {
        items.splice(index, 1);
        renderItems();
        saveItemsToLocalStorage();
    }
}

function editItem(index) { // Function to edit an item's name
    const newName = prompt("Edit item name:", items[index].name);
    if (newName) {
        items[index].name = newName;
        renderItems();
        saveItemsToLocalStorage();
    }
}

function saveItemsToLocalStorage() { // Function to save the shopping list to localStorage
    localStorage.setItem("items", JSON.stringify(items));
}

function loadItemsFromLocalStorage() { // Function to load the shopping list from localStorage
    const storedItems = JSON.parse(localStorage.getItem("items"));
    if (storedItems) {
        items.length = 0;
        items.push(...storedItems);
        renderItems();
    }
}

function clearItems() { // Function to clear all items from the shopping list
    items.length = 0;
    renderItems();
    saveItemsToLocalStorage();
}

function addTask() { // Function to add a task to the task list
    let input = document.getElementById("taskInput");
    let task = input.value.trim();
    if (task) {
        tasks.push({ name: task, completed: false });
      
        input.value = "";
        renderTasks();
        saveTasksToLocalStorage();
    } 
}

function renderTasks() { // Function to render the task list
  
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, i) => {
        let taskElement = document.createElement("div");
        taskElement.className = "task";
        if (task.completed) taskElement.classList.add("completed");

        let nameSpan = document.createElement("span");
        nameSpan.textContent = task.name;

        let toggleBtn = document.createElement("button");
        toggleBtn.textContent = "Complete";
        toggleBtn.addEventListener("click", () => {
            toggleCompleted(i);
        });

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = 'deleteBtn';
        deleteBtn.addEventListener("click", () => {
            deleteTask(i);
        });

        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", () => {
            editTask(i);
        });

        taskElement.append(nameSpan, toggleBtn, deleteBtn, editBtn);
        list.appendChild(taskElement);
    });
}

function toggleCompleted(index) { // Function to toggle the "completed" status of a task
    if (tasks[index]) {
        tasks[index].completed = !tasks[index].completed;
        
        renderTasks();
        saveTasksToLocalStorage();
    }
}

function deleteTask(index) { // Function to delete a task from the task list
    if (index >= 0 && index < tasks.length) {
        tasks.splice(index, 1);
        renderTasks();
        saveTasksToLocalStorage();
    }
}

function editTask(index) { // Function to edit a task's name
    const newName = prompt("Edit task name:", tasks[index].name);
    if (newName) {
        tasks[index].name = newName;
        renderTasks();
        saveTasksToLocalStorage();
    }
}

function saveTasksToLocalStorage() { // Function to save the task list to localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() { // Function to load the task list from localStorage
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
        tasks.length = 0;
        tasks.push(...storedTasks);
        renderTasks();
    }
}

function clearTasks() { // Function to clear all tasks from the task list
    tasks.length = 0;
    renderTasks();
    saveTasksToLocalStorage();
}

window.onload = function () { // Function to load saved data on page load
    loadItemsFromLocalStorage();
    loadTasksFromLocalStorage();
    renderItems();
    renderTasks();
};
