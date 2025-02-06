async function signup() {
    const user = {
        username: document.getElementById('username').value,
        firstname: document.getElementById('firstname').value,
        lastname: document.getElementById('lastname').value,
        password: document.getElementById('password').value
    };

    const response = await fetch('http://localhost:3000/api/auth/signup', { 

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });

    const data = await response.json();
    alert(data.message || data.error);
    if (data.message) window.location.href = "login.html";
}

async function login() {
    const user = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };

    const response = await fetch('http://localhost:3000/api/auth/login', { 

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });

    const data = await response.json();
    if (data.message) {
        localStorage.setItem('username', user.username);
        window.location.href = "chat.html";
    } else {
        alert(data.error);
    }
}



