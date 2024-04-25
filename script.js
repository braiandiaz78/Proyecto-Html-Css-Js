const dateNumber = document.getElementById('dateNumber');
const dateText = document.getElementById('dateText');
const dateMonth = document.getElementById('dateMonth');
const dateYear = document.getElementById('dateYear');

const tasksContainer = document.getElementById('tasksContainer');

const setDate = () => {
    const date = new Date();
    dateNumber.textContent = date.toLocaleString('es', { day: 'numeric' });
    dateText.textContent = date.toLocaleString('es', { weekday: 'long' });
    dateMonth.textContent = date.toLocaleString('es', { month: 'short' });
    dateYear.textContent = date.toLocaleString('es', { year: 'numeric' });
};

const saveTasksToLocalStorage = tasks => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const getTasksFromLocalStorage = () => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
};

const loadTasks = () => {
    const savedTasks = getTasksFromLocalStorage();
    savedTasks.forEach(task => {
        const taskElement = createTaskElement(task);
        tasksContainer.appendChild(taskElement);
    });
};

const order = () => {
    const done = [];
    const toDo = [];
    tasksContainer.childNodes.forEach(el => {
        if (el.classList.contains('task')) {
            el.classList.contains('done') ? done.push(el) : toDo.push(el);
        }
    });
    return [...toDo, ...done];
};

const addNewTask = event => {
    event.preventDefault();
    const { value } = event.target.taskText;
    if (!value) return;

    const taskElement = createTaskElement(value);
    tasksContainer.prepend(taskElement);

   
    const tasks = getTasksFromLocalStorage();
    tasks.push(value);
    saveTasksToLocalStorage(tasks);

    event.target.reset();
};

const createTaskElement = taskText => {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task', 'roundBorder');
    taskElement.addEventListener('click', changeTaskState);
    taskElement.textContent = taskText;
    return taskElement;
};

const changeTaskState = event => {
    event.target.classList.toggle('done');
    updateLocalStorage();
};

const updateLocalStorage = () => {
    const taskElements = tasksContainer.querySelectorAll('.task');
    const tasks = Array.from(taskElements).map(taskElement => taskElement.textContent);
    saveTasksToLocalStorage(tasks);
};

loadTasks();

setDate();
