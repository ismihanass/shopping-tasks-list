const items = [];
const tasks = [];

// Helper functions
function createButton(text, onClick) {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", onClick);
    return button;
}

// Reusable render function for both lists
function renderList(arr, listId, classPrefix, toggleKey, editFn, saveFn, renderFn) {
    const list = document.getElementById(listId);
    list.innerHTML = "";

    arr.forEach((obj, i) => {
        const element = document.createElement("div");
        element.className = `${classPrefix} ${obj[toggleKey] ? toggleKey : ''}`;

        element.appendChild(createButton("Toggle", () => toggleStatus(i, arr, toggleKey, renderFn, saveFn)));
        element.appendChild(createButton("Delete", () => deleteRow(i, arr, renderFn, saveFn)));
        element.appendChild(createButton("Edit", () => editFn(i)));

        const nameSpan = document.createElement("span");
        nameSpan.textContent = obj.name;
        element.prepend(nameSpan);

        list.appendChild(element);
    });
}

// Reusable Add function
function addItemToList(arr, inputId, nameKey, renderFn, saveFn) {
    let input = document.getElementById(inputId);
    let name = input.value.trim();
    if (name) {
        arr.push({ name: name, [nameKey]: false });
        input.value = "";
        renderFn();
        saveFn();
    }
}

// Reusable Edit function
function editItemInList(arr, index, nameKey, renderFn, saveFn) {
    const newName = prompt("Edit name:", arr[index].name);
    if (newName) {
        arr[index].name = newName;
        renderFn();
        saveFn();
    }
}

// Reusable Clear function
function clearList(arr, renderFn, saveFn) {
    arr.length = 0;
    renderFn();
    saveFn();
}

// Render Shopping List
function renderItems() {
    renderList(items, "shoppingList", "item", "bought", (i) => editItemInList(items, i, "bought", renderItems, saveItemsToLocalStorage), saveItemsToLocalStorage, renderItems);
}

// Render Task List
function renderTasks() {
    renderList(tasks, "taskList", "task", "completed", (i) => editItemInList(tasks, i, "completed", renderTasks, saveTasksToLocalStorage), saveTasksToLocalStorage, renderTasks);
}

// Toggle Function
function toggleStatus(index, arr, key, render, save) {
    if (arr[index]) {
        arr[index][key] = !arr[index][key];
        render();
        save();
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

// Delete function
function deleteRow(index, arr, render, save) {
    if (index >= 0 && index < arr.length) {
        arr.splice(index, 1);
        render();
        save();
    }
}

// Event Listeners
document.getElementById("addItemBtn").addEventListener("click", () => addItemToList(items, "itemInput", "bought", renderItems, saveItemsToLocalStorage));
document.getElementById("addTaskBtn").addEventListener("click", () => addItemToList(tasks, "taskInput", "completed", renderTasks, saveTasksToLocalStorage));
document.getElementById("clearItemsBtn").addEventListener("click", () => clearList(items, renderItems, saveItemsToLocalStorage));
document.getElementById("clearTasksBtn").addEventListener("click", () => clearList(tasks, renderTasks, saveTasksToLocalStorage));

// On Page Load
window.onload = function () {
    loadItemsFromLocalStorage();
    loadTasksFromLocalStorage();
    renderItems();
    renderTasks();
};
