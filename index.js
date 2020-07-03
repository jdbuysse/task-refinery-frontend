fetch('http://127.0.0.1:8001/tasks/')
    .then(response => response.json())
    .then(result => handleData(result))
    .then(makeDraggable())


function handleData(data){
    console.log(data)
    return data.forEach(challenge => renderTasks(challenge.tasks))
}

const taskStorageArray = []

function populateStorage(tasks) {
    tasks.forEach(task => {
        taskStorageArray.push(task)
    })
    console.log('tsa',taskStorageArray)
    localStorage.setItem("tasks", JSON.stringify(taskStorageArray))
    retrieveStorage()
}

function retrieveStorage(){
    return JSON.parse(localStorage.getItem("tasks") || "[]")
}

const challengeHeader = document.querySelector('#challenge-header')
const taskList = document.querySelector('#task-list')

//renders an array of task objects
function renderTasks(tasks) {
    tasks.forEach(task => {
        renderTask(task)
    })
}

//takes single task obj
function renderTask(task) {
    const li = document.createElement('li')
    li.innerText = task.description
    li.setAttribute('task-id', '1') //dummy value for now
    li.setAttribute('data-draggable', 'item')
    li.setAttribute('draggable', 'true')
    li.textContent = task.description
    addTaskDeleteButton(li, task)
    addTaskEditButton(li)
    taskList.append(li)
}

function addTaskDeleteButton(li,task){
    let button = document.createElement("button")
    button.addEventListener("click", () => {
        event.preventDefault()
        console.log('td', task)
        removeFromTaskStorageArray(task)
        li.remove()
    })
    button.innerText = 'X'
    li.append(button)
}

function removeFromTaskStorageArray(task){
    console.log('task remove', task)
    let removeIndex = taskStorageArray.map( item => {
        return item.description 
    }).indexOf(task.description)
    taskStorageArray.splice(removeIndex, 1)
}

function addTaskEditButton(task) {
    let button = document.createElement("button")
    button.addEventListener("click", (event, task) => {
        editTask(event, task);
    })
    button.innerText = 'Edit'
    task.append(button)
}

function editTask(event) {
    event.target.parentNode.innerHTML = `
        <form id='update-task'>
            <input type='text' value='${event.target.parentNode.innerText.slice(0, -5)}'/>
        </form> 
    `
    const updateTask = document.querySelector('#update-task')
    updateTask.addEventListener('submit', (e) =>{
        handleUpdateTask(e)
    })
}

function makeTaskObject(value){
    let obj = {}
    obj['description'] = value 
    obj['completedness'] = 1 //dumy var
    return obj
}

function handleUpdateTask(event) {
    event.preventDefault()
    obj = makeTaskObject(event.target.children[0].value)
    renderTask(obj)
    event.target.parentNode.remove()
}

function createChallengeCard(challenge) {
    createChallengeHeader(challenge)
    const card = document.createElement('li')
    addTasks(card, challenge)
    challengeCardList.appendChild(card)
}

function createChallengeHeader(challenge) {
    const title = document.createElement('h2')
    title.setAttribute('challenge-id', challenge.id)
    title.textContent = challenge.name
    addChallengeButton(title, challenge)
    challengeHeader.appendChild(title)
}

const taskInput = document.querySelector('#task-input-form')

taskInput.addEventListener('submit', (event) => captureFormEvent(event))

function captureFormEvent(event){
    event.preventDefault()
    const formData = new FormData(taskInput)
    const newTasks = formData.get('tasks')
    taskObj = formatTaskList(newTasks)
    //console.log('tobj',taskObj)
    populateStorage(taskObj)
    renderTasks(taskObj)
}

function captureUpdateEvent(event){
    event.preventDefault()
    const formData = new FormData(updateTask)
    const newTasks = formData.get('update-tasks')
    taskObj = formatTaskList(newTasks)
    renderTasks(taskObj)
}

//turns the list of subtasks into an array of objects
function formatTaskList(text){
    arr = text.split('\n')
    return arr.map(task => {
        let obj = {}
        obj['description'] = task 
        obj['completedness'] = 1 //all tasks start at 1
        return obj
    })
}

//eventually need to update completedness between columns
function makeDraggable() {
    for (let items = document.querySelectorAll('[data-draggable="item"]'),
        len = items.length,
        i = 0; i < len; i++) {
        items[i].setAttribute('draggable', 'true');
    }

    let item = null;

    document.addEventListener('dragstart', e => {
        item = e.target;
        e.dataTransfer.setData('text', '');
    }, false);

    document.addEventListener('dragover', e => {
        if (item) {
            e.preventDefault();
        }
    }, false);


    document.addEventListener('drop', e => {
        if (e.target.getAttribute('data-draggable') == 'target') {
            e.target.appendChild(item);
            e.preventDefault();
        }
    }, false);

    document.addEventListener('dragend', () => {
        item = null;
    }, false);
}	
