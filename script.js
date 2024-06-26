Swal.fire({
    imageUrl: "https://c7.alamy.com/comp/PT1NXG/hand-holding-pencil-writing-on-notepad-PT1NXG.jpg",
    imageHeight: 200,
    title: "Bienvenidos a la agenda de Bryan", 
    text: "Si desea gestionar sus tareas aquí presione OK", 
    icon: "success",
 });
 
 const dateNumber = document.getElementById('dateNumber');
 const dateText = document.getElementById('dateText');
 const dateMonth = document.getElementById('dateMonth');
 const dateYear = document.getElementById('dateYear');
 
 const tasksContainer = document.getElementById('tasksContainer');
 
 const setDate = () => {
     const date = new Date();
     dateNumber.textContent = date.toLocaleDateString('es', { day: 'numeric' });
     dateText.textContent = date.toLocaleDateString('es', { weekday: 'long' });
     dateMonth.textContent = date.toLocaleDateString('es', { month: 'short' });
     dateYear.textContent = date.toLocaleDateString('es', { year: 'numeric' });
 };
 
 const addNewTask = event => {
     event.preventDefault();
     const { value } = event.target.taskText;
     if (!value) return;
     const task = document.createElement('div');
     task.classList.add('task', 'roundBorder');
     task.addEventListener('click', changeTaskState);
     task.textContent = value;
     tasksContainer.prepend(task);
     event.target.reset();
     saveTasksToLocalStorage(); 
 };
 
 const changeTaskState = event => {
     event.target.classList.toggle('done');
     saveTasksToLocalStorage(); 
 };
 
 const order = () => {
     const done = [];
     const toDo = [];
     tasksContainer.childNodes.forEach(el => {
         el.classList.contains('done') ? done.push(el) : toDo.push(el);
     });
     return [...toDo, ...done];
 };
 
 const renderOrderedTasks = () => {
     order().forEach(el => tasksContainer.appendChild(el));
 };
 
 const saveTasksToLocalStorage = () => {
     const tasks = [];
     tasksContainer.childNodes.forEach(taskElement => {
         if (!taskElement.classList.contains('done')) {
             tasks.push({
                 text: taskElement.textContent,
                 done: false 
             });
         }
     });
     localStorage.setItem('tasks', JSON.stringify(tasks));
 };
 
 const loadTasksFromLocalStorage = () => {
     const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
     savedTasks.forEach(task => {
         const taskElement = document.createElement('div');
         taskElement.classList.add('task', 'roundBorder');
         taskElement.textContent = task.text;
         taskElement.addEventListener('click', changeTaskState);
         tasksContainer.appendChild(taskElement);
     });
 };
 

 loadTasksFromLocalStorage();

 renderOrderedTasks();
 
 setDate();
 