
const loginForm = document.querySelector('#login')


loginForm.addEventListener("submit", handleLogin)

function handleLogin(event){
    event.preventDefault()
    const loginFormData = new FormData(event.target)
    const username = loginFormData.get('username')
    const password = loginFormData.get('password')
    sendFetch(username,password)
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

    // fetch("http://127.0.0.1:8001/login/", requestOptions)
    //   .then(response => response.text())
    //   .then(result => console.log(result))
    //   .catch(error => console.log('error', error));
    fetch("http://127.0.0.1:8001/login/", requestOptions)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        localStorage.setItem("token", result.access)
    })
    .catch(error => console.log('error', error));
}