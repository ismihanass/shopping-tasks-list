const items = [];
const tasks = [];

// Create a button element
function createButton(text, onClick) {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", onClick);
    return button;
  }
  
  // Render the list of items or tasks
  function renderList(arr, listId, classPrefix, toggleKey, editFunction, saveFunction, renderFunction) {
    const list = document.getElementById(listId);
    list.innerHTML = "";
  
    arr.forEach((obj, index) => {
      const itemElement = document.createElement("div");
      itemElement.className = `${classPrefix} ${obj[toggleKey] ? toggleKey : ""}`;
  
      itemElement.appendChild(createButton("Toggle", () => toggleStatus(index, arr, toggleKey, renderFunction, saveFunction)));
      itemElement.appendChild(createButton("Delete", () => deleteItem(index, arr, renderFunction, saveFunction)));
      itemElement.appendChild(createButton("Edit", () => editFunction(index)));
  
      const nameSpan = document.createElement("span");
      nameSpan.textContent = obj.name;
      itemElement.prepend(nameSpan);
  
      list.appendChild(itemElement);
    });
  }
  
  // Add a new item or task to the list
  function addItemToList(arr, inputId, statusKey, renderFunction, saveFunction) {
    const input = document.getElementById(inputId);
    const name = input.value.trim();
  
    if (name) {
      arr.push({ name: name, [statusKey]: false });
      input.value = "";
      renderFunction();
      saveFunction();
    }
  }
  
  // Edit an existing item or task in the list
  function editItemInList(arr, index, statusKey, renderFunction, saveFunction) {
    const newName = prompt("Edit name:", arr[index].name);
  
    if (newName) {
      arr[index].name = newName;
      renderFunction();
      saveFunction();
    }
  }
  
  // Clear the list of items or tasks
  function clearList(arr, renderFunction, saveFunction) {
    arr.length = 0;
    renderFunction();
    saveFunction();
  }
  
  // Toggle the status of an item or task
  function toggleStatus(index, arr, key, renderFunction, saveFunction) {
    if (arr[index]) {
      arr[index][key] = !arr[index][key];
      renderFunction();
      saveFunction();
    }
  }
  
  // Delete an item or task from the list
  function deleteItem(index, arr, renderFunction, saveFunction) {
    if (index >= 0 && index < arr.length) {
      arr.splice(index, 1);
      renderFunction();
      saveFunction();
    }
  }
  
  // Save the items to localStorage
  function saveItemsToLocalStorage() {
    localStorage.setItem("items", JSON.stringify(items));
  }
  
  // Load the items from localStorage
  function loadItemsFromLocalStorage() {
    const storedItems = JSON.parse(localStorage.getItem("items"));
    if (storedItems) {
      items.length = 0;
      items.push(...storedItems);
      renderItems();
    }
  }
  
  // Save the tasks to localStorage
  function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  
  // Load the tasks from localStorage
  function loadTasksFromLocalStorage() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      tasks.length = 0;
      tasks.push(...storedTasks);
      renderTasks();
    }
  }
  
  // Render the list of items
  function renderItems() {
    renderList(
      items,
      "shoppingList",
      "item",
      "bought",
      (index) => editItemInList(items, index, "bought", renderItems, saveItemsToLocalStorage),
      saveItemsToLocalStorage,
      renderItems
    );
  }
  
  // Render the list of tasks
  function renderTasks() {
    renderList(
      tasks,
      "taskList",
      "task",
      "completed",
      (index) => editItemInList(tasks, index, "completed", renderTasks, saveTasksToLocalStorage),
      saveTasksToLocalStorage,
      renderTasks
    );
  }

  //Event Listeners
  
  document.getElementById("addItemBtn").addEventListener("click", () =>
    addItemToList(items, "itemInput", "bought", renderItems, saveItemsToLocalStorage)
  );
  
  document.getElementById("addTaskBtn").addEventListener("click", () =>
    addItemToList(tasks, "taskInput", "completed", renderTasks, saveItemsToLocalStorage)
  );
  
  document.getElementById("clearItemsBtn").addEventListener("click", () =>
    clearList(items, renderItems, saveItemsToLocalStorage)
  );
  
  document.getElementById("clearTasksBtn").addEventListener("click", () =>
    clearList(tasks, renderTasks, saveItemsToLocalStorage)
  );
  
  window.onload = function () {
    loadItemsFromLocalStorage();
    loadTasksFromLocalStorage();
    renderItems();
    renderTasks();
  };
  