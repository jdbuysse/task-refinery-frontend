

let tasksURL = `http://localhost:8001/tasks/`
const userID = localStorage.getItem("user_id")
const taskName = document.querySelector('#task-name')
const subtaskList = document.querySelector('#task-list')
const taskDropdown = document.querySelector('#task-select')
taskDropdown.addEventListener('change', selector)

if (userID){
    console.log('using user tasks', userID)
    tasksURL = `http://localhost:8001/users/${userID}`
}
else{
    taskName.innerText = "You don't have any tasks yet"
}

fetch(tasksURL)
    .then(response => response.json())
    .then(result => handleData(result))



function handleData(data){
    createTaskDropdown(data.tasks)
}

function getUserTasks(tasks){
    return tasks.filter(task => 
        task.owner == localStorage.getItem("username")
        )
}

function selector(event){
    clearTasks()
    task = JSON.parse(event.target.value)
    localStorage.setItem("selected_task", task.id)
    addTaskName(task.title)
    addSubtasks(task.subtasks)
}


function createTaskDropdown(tasks){
    tasks.forEach(task => {
        console.log(task)
        let option = document.createElement('option')
        option.innerText = task.title
        option.value = JSON.stringify(task)
        taskDropdown.appendChild(option)
    })
}

function clearTasks(){
    subtaskList.innerHTML = ``
}

function addTaskName(name){
    taskName.textContent = name
}

function addSubtasks(subtasks){
    subtasks.forEach(sub => {
        renderTask(sub)
    })
}

function newBoard(){
    localStorage.setItem("selected_task") = 0
}

function saveBoard(){
    let subtasks = Array.from(subtaskList.children).map(item => {
        return item.innerText
    })
    if (localStorage.getItem("selected_task") === "0") {
        saveNewTask(subtasks)
    }
    else {
        updateExistingTask(subtasks)
    }
}

function updateExistingTask(subtasks){
    task_id = localStorage.getItem("selected_task")
    console.log("saving an already existing task at", task_id)
}

function saveNewTask(subtasks){
    title = taskName
    console.log("saving this as new task", subtasks)
    fetchNewTask(title)
    //this log happens too quickly for the fetch. what to do?
    console.log(localStorage.getItem("selected_task"))
}

function fetchNewTask(){
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    let urlencoded = new URLSearchParams();
    urlencoded.append("description", "placeholder");
    urlencoded.append("title", title);

    let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
    };

    fetch("http://127.0.0.1:8001/tasks/", requestOptions)
    .then(response => response.text())
    .then(result => returnNewTaskID(result))
    .catch(error => console.log('error', error));
}

function returnNewTaskID(result){
    obj = JSON.parse(result)
    localStorage.setItem("selected_task", obj.id)
    console.log('new task ID',obj.id)
}

function renderTask(task) {
    const li = document.createElement('li')
    li.innerText = task.description
    li.setAttribute('task-id', '1') //dummy value for now
    li.setAttribute('data-draggable', 'item')
    li.setAttribute('draggable', 'true')
    li.textContent = task.content
    //addTaskDeleteButton(li, task)
    //addTaskEditButton(li)
    subtaskList.append(li)
}
