
const loginForm = document.querySelector('#login')
const getUsersPage = document.querySelector('#get-userpage')
const createAccountForm = document.querySelector('#create-account')
const accountCreatedMessage = document.querySelector('#create-account-message')

loginForm.addEventListener("submit", handleLogin)
getUsersPage.addEventListener("click", handleUserPage)
createAccountForm.addEventListener("submit", createAccount)

function handleUserPage(){
    fetch("http://127.0.0.1:8000/users/1", {
        headers: {
            "Authorization": `Bearer ${localStorage.token}`
        }
    }).then(response => response.json())
      .then(console.log)
}


function handleLogin(event){
    event.preventDefault()
    const loginFormData = new FormData(event.target)
    const username = loginFormData.get('username')
    const password = loginFormData.get('password')
    sendFetch(username,password)
    event.target.reset()
}


function createAccount(event){
    event.preventDefault()
    const loginFormData = new FormData(event.target)
    const username = loginFormData.get('username')
    const password = loginFormData.get('password')
    createAccountFetch(username,password)
    event.target.reset()
}


function sendFetch(username, password){
    let formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);
    
    let requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch("http://127.0.0.1:8001/login/", requestOptions)
    .then(response => response.json())
    .then(result => {
        localStorage.setItem("user_id", parseJwt(result.access).user_id)
        localStorage.setItem("token", result.access)
        window.location.replace("http://localhost:3000/userBoards.html")
    })
    .catch(error => console.log('error', error));
}

function createAccountFetch(username, password){
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    let urlencoded = new URLSearchParams();
    urlencoded.append("username", username);
    urlencoded.append("password", password);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
    
    fetch("http://127.0.0.1:8001/create/", requestOptions)
      .then(response => response.json())
      .then(result => accountCreated(result))
}

function accountCreated(result){
    if (result.id != undefined) {
        accountCreatedMessage.textContent = 
        `Welcome, ${result.username}, your account has
        been successfully created`
        localStorage.setItem("user_id", result.id)
    }
    accountCreatedMessage.textContent = `Account could not be created: ${result.username}`
}


function parseJwt(token){
    let base64Url = token.split('.')[1]
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
    return JSON.parse(jsonPayload)
}