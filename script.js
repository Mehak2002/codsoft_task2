const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');

// Retrieve tasks from local storage or initialize an empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Display tasks on the page
function displayTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${task}
            <button class="editTask">Edit</button>
            <button class="deleteTask">Delete</button>
        `;
        li.querySelector('.editTask').addEventListener('click', () => editTask(index));
        li.querySelector('.deleteTask').addEventListener('click', () => deleteTask(index));
        taskList.appendChild(li);
    });
}

// Add a new task
function addTask() {
    const newTask = taskInput.value.trim();
    if (newTask !== '') {
        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value = '';
        displayTasks();
    }
}

// Edit a task
function editTask(index) {
    const updatedTask = prompt('Edit the task:', tasks[index]);
    if (updatedTask !== null) {
        tasks[index] = updatedTask;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
    }
}

// Delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

addTaskButton.addEventListener('click', addTask);
displayTasks();
