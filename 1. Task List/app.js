// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load All Event Listeners
loadEventListeners();

function loadEventListeners(){
  // DOM Load Event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove Task Event
  taskList.addEventListener('click', removeTask);
  // Clear Task Event
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks event
  filter.addEventListener('keyup', filtertasks);
}

// Get the Tasks From Local Storage
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(task));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to the li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);
  });
}

// Add Task
function addTask(e){
  if(taskInput.value === ''){
    alert('Add a task');
  }

  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to the li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  // Store in LS
  storeTaskInLocalStorage(taskInput.value);

  // Clear input
  taskInput.value = '';

  e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are You Sure?')){
    e.target.parentElement.parentElement.remove();

    // Remove From LS
    removeTaskFromLocalStorage(e.target.parentElement.parentElement)
    }
  }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks(){
  // taskList.innerHTML = '';

  // Faster
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }

  // Difference between both methods
  // https://jsperf.com/innerhtml-vs-removechild/47

  // Clear from Ls
  clearTasksFromLocalStorage();
}

// Clear Tasks From LS
function clearTasksFromLocalStorage(){
  localStorage.clear();
}

// Filter Tasks
function filtertasks(e){
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) !== -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}