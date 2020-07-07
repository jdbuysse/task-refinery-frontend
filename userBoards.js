const tasksURL = `http://localhost:8001/tasks/`

//for now just grab all the tasks and then prune the object according to user

fetch(tasksURL)
    .then(response => response.json())
    .then(result => handleData(result))

const taskName = document.querySelector('#task-name')
const subtaskList = document.querySelector('#task-list')
const taskDropdown = document.querySelector('#task-select')
taskDropdown.addEventListener('change', selector)

function handleData(data){
    let userTasks = getUserTasks(data)
    createTaskDropdown(userTasks)
    //addTaskName(data[0].description)
    //addSubtasks(data[0].subtasks)
}

function getUserTasks(tasks){
    return tasks.filter(task => 
        task.owner == localStorage.getItem("username")
        )
}

function selector(event){
    console.log(JSON.parse(event.target.value))
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
