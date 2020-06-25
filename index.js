

fetch('http://localhost:3000/challenges')
    .then(response => response.json())
    .then(result => handleData(result))
    .then(makeDraggable())

function handleData(data){
    console.log(data)
    data.forEach(challenge => createChallengeCard(challenge))
}

const challengeCardList = document.querySelector('#challenge-list')
const challengeHeader = document.querySelector('#challenge-header')


function createChallengeCard(challenge) {
    // createChallengeHeader(challenge)
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

function addTaskButton(task){
    let button = document.createElement("button")
    button.addEventListener("click", () => {
        task.removeChild(button);
        task.remove()
    })
    button.innerText = 'X'
    task.append(button)
}


//for now I'm going to focus on populating the columns and worry about
//persisting to a DB later
function getTaskList(){
    let taskInput = document.querySelector('#task-input')
    taskArray = formatTaskList(taskInput)
}

//turns the list of subtasks into an object
function formatTaskList(text){
    const taskObj = {}
    arr = text.value.split('\n')
    console.log(arr)
    arr.forEach( task => {
        taskObj['description'] = task 
        taskObj['completedness'] = 1
    })
    console.log(taskObj)
}

function addUserInputToColumns(taskArray){

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
