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
        const li = document.createElement('li')
        li.innerText = task.description
        li.setAttribute('task-id', '1') //dummy value for now
        li.setAttribute('data-draggable', 'item')
        li.setAttribute('draggable', 'true')
        li.textContent = task.description
        addTaskButton(li)
        taskList.append(li)
    })
}

function addTaskButton(task){
    let button = document.createElement("button")
    button.addEventListener("click", () => {
        task.removeChild(button);
        task.remove()
    })
    button.innerText = 'X'
    task.append(button)
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

function addChallengeButton(card, challenge) {
    const button = document.createElement('button')
    button.setAttribute('data-id', challenge.id)
    button.textContent = 'Add task'
    card.appendChild(button)
}

function addTasks(card, challenge) {
    challenge.tasks.forEach( task => {
        let tasks = document.createElement('li')
        tasks.setAttribute('task-id', task.id)
        tasks.setAttribute('data-draggable', 'item')
        tasks.setAttribute('draggable', 'true')
        tasks.textContent = task.description
        addTaskButton(tasks)
        card.appendChild(tasks)
    })

}
const taskInput = document.querySelector('#task-input-form')
taskInput.addEventListener('submit', (event) => captureFormEvent(event))

//for now I'm going to focus on populating the columns and worry about
//persisting to a DB later
function captureFormEvent(event){
    console.log(event)
    event.preventDefault()
    const formData = new FormData(taskInput)
    const newTasks = formData.get('tasks')
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
