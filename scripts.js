// Array to store tasks
let tasks = [];

// Function to add or edit a task
function addEditTask() {
    // Get values from the input fields
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('due-date').value;
    const priority = document.getElementById('priority').value;

    // Validate inputs
    if (!title || !dueDate || !priority) {
        alert('Please fill in all required fields.');
        return;
    }

    // Create a task object and push it to the tasks array
    const task = { title, description, dueDate, priority, completed: false };
    tasks.push(task);

    // Display tasks and clear the form
    displayTasks();
    clearForm();
}

// Function to display tasks based on filters
function displayTasks() {
    // Get filter values
    const filterStatus = document.getElementById('filter-status').value;
    const filterPriority = document.getElementById('filter-priority').value;

    // Get the task list element
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    // Iterate through tasks and display based on filters
    tasks.forEach((task, index) => {
        if (
            (filterStatus === 'all' || (filterStatus === 'completed' && task.completed) || (filterStatus === 'incomplete' && !task.completed)) &&
            (filterPriority === 'all' || filterPriority === task.priority)
        ) {
            // Create task item element
            const taskItem = document.createElement('li');
            taskItem.className = `task ${task.completed ? 'completed-task' : ''} priority-${task.priority}`;
            taskItem.innerHTML = `
                <div style="padding: 10px;">
                    <strong>${task.title}</strong>
                    <p>${task.description}</p>
                    <p>Due Date: ${formatDueDate(task.dueDate)}</p>
                    <p>Priority:   ${getPriorityIcon(task.priority)} ${task.priority}</p>
                    <div style="display: flex; gap: 20px;">
                        <button onclick="editTask(${index})"><i class="fas fa-edit"></i></button>
                        <button onclick="deleteTask(${index})"><i class="fas fa-trash-alt"></i></button>
                        <button onclick="toggleComplete(${index})">${task.completed ? '<i class="fas fa-undo"></i>' : '<i class="fas fa-check"></i>'}</button>
                    </div>
                </div>
            `;
            // Append task item to the task list
            taskList.appendChild(taskItem);
        }
    });
}

// Function to edit a task
function editTask(index) {
    // Get the task at the specified index
    const task = tasks[index];
    
    // Populate form fields with task details
    document.getElementById('title').value = task.title;
    document.getElementById('description').value = task.description;
    document.getElementById('due-date').value = task.dueDate;
    document.getElementById('priority').value = task.priority;

    // Remove the task from the tasks array and display updated tasks
    tasks.splice(index, 1);
    displayTasks();
}

// Function to delete a task
function deleteTask(index) {
    // Ask for confirmation before deletion
    const confirmation = confirm('Are you sure you want to delete this task?');

    // Delete the task if confirmed and display updated tasks
    if (confirmation) {
        tasks.splice(index, 1);
    }
    displayTasks();
}

// Function to toggle the completion status of a task
function toggleComplete(index) {
    // Toggle the 'completed' property of the task at the specified index
    tasks[index].completed = !tasks[index].completed;
    // Display updated tasks
    displayTasks();
}

// Function to clear the form fields
function clearForm() {
    document.getElementById('task-form').reset();
}

// Function to handle task filtering
function filterTasks() {
    displayTasks();
}

// Function to change colors based on user input
function changeColors() {
    // Get color values from input fields
    const backgroundColor = document.getElementById('background-color').value;
    const headerColor = document.getElementById('header-color').value;
    const completedTaskColor = document.getElementById('completed-task-color').value;

    // Apply colors to the body, header, and completed tasks
    document.body.style.backgroundColor = backgroundColor;
    document.querySelector('header').style.backgroundColor = headerColor;
    document.querySelectorAll('.completed-task').forEach(task => {
        task.style.backgroundColor = completedTaskColor;
    });
}

// Function to change the application name
function changeAppName() {
    // Get custom app name from input field
    const customAppName = document.getElementById('custom-app-name').value;
    // Set the app title to the custom name or default to 'Task Manager'
    document.getElementById('app-title').innerText = customAppName || 'Task Manager';
}

// Function to get a priority icon based on priority level
function getPriorityIcon(priority) {
    // Return different icons based on priority level
    switch (priority) {
        case 'high':
            return '<i class="fas fa-arrow-up"></i>';
        case 'medium':
            return '<i class="fas fa-minus"></i>';
        case 'low':
            return '<i class="fas fa-arrow-down"></i>';
        default:
            return '';
    }
}

// Initial display of tasks
displayTasks();

// Default values for application name, header color, and completed task color
let appName = "Task Manager";
let headerColor = "#0086D0";
let completedTaskColor = "#d4edda";

// Function to open the settings modal
function openSettings() {
    document.getElementById('settings-modal').style.display = 'block';
}

// Function to close the settings modal
function closeSettings() {
    document.getElementById('settings-modal').style.display = 'none';
}

// Function to apply user settings
function applySettings() {
    // Get values from settings modal
    appName = document.getElementById('app-name').value || appName;
    headerColor = document.getElementById('header-color').value || headerColor;
    completedTaskColor = document.getElementById('completed-task-color').value || completedTaskColor;

    // Apply settings to the UI
    document.getElementById('app-title').innerText = appName;
    document.querySelector('header').style.backgroundColor = headerColor;
    document.querySelectorAll('.completed-task').forEach(task => {
        task.style.backgroundColor = completedTaskColor;
    });

    // Close the settings modal
    closeSettings();
}

// Apply initial settings
document.getElementById('app-title').innerText = appName;
document.querySelector('header').style.backgroundColor = headerColor;
document.querySelectorAll('.completed-task').forEach(task => {
    task.style.backgroundColor = completedTaskColor;
});

// Function to format due date for display
function formatDueDate(dateString) {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    const dateObject = new Date(dateString);
    return dateObject.toLocaleDateString(undefined, options);
}
