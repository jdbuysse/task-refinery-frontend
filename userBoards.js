fetch('http://127.0.0.1:8001/tasks/')
    .then(response => response.json())
    .then(result => handleData(result))

const taskName = document.querySelector('#task-name')
const subtaskList = document.querySelector('#task-list')

function handleData(data){
    console.log(data)
    addTaskName(data[0].description)
    addSubtasks(data[0].subtasks)
}

function addTaskName(name){
    taskName.textContent = name
}

function addSubtasks(subtasks){
    subtasks.forEach(sub => {
        renderTask(sub)
    })
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
