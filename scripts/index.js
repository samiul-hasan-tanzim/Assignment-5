const inputUsername = document.getElementById('username')
const inputPassword = document.getElementById('password')

const login = (username, password) => {
    if (username.value === 'admin' && password.value === 'admin123') {
        window.location.assign('home.html')
    }
    else {
        alert("Username or Password is not correct")
        return
    }
    inputUsername.value = ''
    inputPassword.value = ''
}

document.getElementById('login-btn').addEventListener('click', () => login(inputUsername, inputPassword))

const keyEvent = [inputUsername, inputPassword]
keyEvent.forEach(key => {
    key.addEventListener('keyup', (k) => {
        if (k.key === 'Enter') login(inputUsername, inputPassword)
    })
});