fetch('http://localhost:3000/challenges')
    .then(response => response.json())
    .then(result => handleData(result))
    .then(makeDraggable())


function handleData(data){
    return data.forEach(challenge => renderTasks(challenge.tasks))
}

// const challengeCardList = document.querySelector('#challenge-list')
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
    addTaskDeleteButton(li)
    addTaskEditButton(li)
    taskList.append(li)
}

function addTaskDeleteButton(task){
    let button = document.createElement("button")
    button.addEventListener("click", () => {
        event.preventDefault()
        task.remove()
    })
    button.innerText = 'X'
    task.append(button)
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
    console.log('submit tasks',event)
    event.preventDefault()
    const formData = new FormData(taskInput)
    const newTasks = formData.get('tasks')
    taskObj = formatTaskList(newTasks)
    console.log(taskObj)
    renderTasks(taskObj)
}

function captureUpdateEvent(event){
    //console.log('update task',event)
    //console.log('targ', event.target.children[0])
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
        obj['completedness'] = 1
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
