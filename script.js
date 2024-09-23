document.getElementById("addButton").onclick = function() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value;
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const taskList = document.getElementById("taskList");
    const listItem = document.createElement("li");

    listItem.innerHTML = `
        ${taskText}
        <button class="deleteButton">X</button>
    `;

    taskList.appendChild(listItem);
    taskInput.value = "";

    // Save tasks to local storage
    saveTasks();

    // Add event listener for delete button
    listItem.querySelector(".deleteButton").onclick = function() {
        taskList.removeChild(listItem);
        saveTasks();
    };

    // Toggle completed state
    listItem.onclick = function() {
        listItem.classList.toggle("completed");
        saveTasks();
    };
};

// Function to save tasks in local storage
function saveTasks() {
    const taskList = document.getElementById("taskList");
    const tasks = [];
    for (let i = 0; i < taskList.children.length; i++) {
        tasks.push({
            text: taskList.children[i].childNodes[0].nodeValue,
            completed: taskList.children[i].classList.contains("completed")
        });
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskList = document.getElementById("taskList");

    tasks.forEach(task => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            ${task.text}
            <button class="deleteButton">X</button>
        `;
        if (task.completed) {
            listItem.classList.add("completed");
        }
        taskList.appendChild(listItem);

        // Add event listener for delete button
        listItem.querySelector(".deleteButton").onclick = function() {
            taskList.removeChild(listItem);
            saveTasks();
        };

        // Toggle completed state
        listItem.onclick = function() {
            listItem.classList.toggle("completed");
            saveTasks();
        };
    });
}

// Load tasks on page load
loadTasks();
