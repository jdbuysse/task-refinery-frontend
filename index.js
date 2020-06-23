fetch('http://localhost:3000/challenges')
    .then(response => response.json())
    .then(result => handleData(result))

function handleData(data){
    console.log(data)
    data.forEach(challenge => createChallengeCard(challenge))
}

const challengeCardList = document.querySelector('#challenge-list')
const challengeHeader = document.querySelector('#challenge-header')


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
    addTaskButton(title, challenge)
    challengeHeader.appendChild(title)
}

function addTaskButton(card, challenge) {
    const button = document.createElement('button')
    button.setAttribute('data-id', challenge.id)
    button.textContent = 'Add task'
    card.appendChild(button)
}

function addTasks(card, challenge) {
    challenge.tasks.forEach( task => {
        let tasks = document.createElement('li')
        tasks.setAttribute('task-id', task.id)
        tasks.textContent = task.description
        card.appendChild(tasks)
    })
}

(function()
{

	//get the collection of draggable items and add their draggable attribute
	for(let items = document.querySelectorAll('[data-draggable="item"]'), 
		len = items.length, 
		i = 0; i < len; i ++)
	{
		items[i].setAttribute('draggable', 'true');
	}

	//variable for storing the dragging item reference 
	//this will avoid the need to define any transfer data 
	//which means that the elements don't need to have IDs 
	var item = null;

	//dragstart event to initiate mouse dragging
	document.addEventListener('dragstart', function(e)
	{
		//set the item reference to this element
		item = e.target;
		
		//we don't need the transfer data, but we have to define something
		//otherwise the drop action won't work at all in firefox
		//most browsers support the proper mime-type syntax, eg. "text/plain"
		//but we have to use this incorrect syntax for the benefit of IE10+
		e.dataTransfer.setData('text', '');
	
	}, false);

	//dragover event to allow the drag by preventing its default
	//ie. the default action of an element is not to allow dragging 
	document.addEventListener('dragover', function(e)
	{
		if(item)
		{
			e.preventDefault();
		}
	
	}, false);	

	//drop event to allow the element to be dropped into valid targets
	document.addEventListener('drop', function(e)
	{
		//if this element is a drop target, move the item here 
		//then prevent default to allow the action (same as dragover)
		if(e.target.getAttribute('data-draggable') == 'target')
		{
			e.target.appendChild(item);
			
			e.preventDefault();
		}
	
	}, false);
	
	//dragend event to clean-up after drop or abort
	//which fires whether or not the drop target was valid
	document.addEventListener('dragend', function(e)
	{
		item = null;
	
	}, false);

})();	
