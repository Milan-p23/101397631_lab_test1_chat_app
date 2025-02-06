const socket = io.connect("http://localhost:3000");
let username = localStorage.getItem('username');

if (!username) {
    window.location.href = "login.html";
} else {
    document.getElementById('user').innerText = username;
}

let currentRoom = null;
let typingTimer;
const TYPING_TIMER_LENGTH = 3000;

// Join Room
function joinRoom() {
    const room = document.getElementById('room').value;
    document.getElementById('room-name').innerText = room;
    document.getElementById('chat-area').style.display = 'block';
    document.getElementById('room-selection').style.display = 'none';
    currentRoom = room;

    socket.emit('joinRoom', { username, room });

    // Load previous messages from MongoDB
    fetch(`http://localhost:3000/api/chat/messages/${room}`)
        .then(res => res.json())
        .then(messages => {
            document.getElementById('messages').innerHTML = messages
                .map(msg => `<div class="message"><b>${msg.from_user}:</b> ${msg.message}</div>`)
                .join('');
        });
}

// Leave Room
function leaveRoom() {
    socket.emit('leaveRoom', { username, room: currentRoom });
    currentRoom = null;
    document.getElementById('chat-area').style.display = 'none';
    document.getElementById('room-selection').style.display = 'block';
    document.getElementById('messages').innerHTML = '';
}

// Send Group Message
function sendMessage() {
    const message = document.getElementById('message').value.trim();
    if (message && currentRoom) {
        socket.emit('sendMessage', { from_user: username, room: currentRoom, message });

        document.getElementById('message').value = '';
        stopTyping();
    }
}

// Typing Indicator
function startTyping() {
    if (currentRoom) {
        socket.emit('typing', { username, room: currentRoom });
    }
    clearTimeout(typingTimer);
    typingTimer = setTimeout(stopTyping, TYPING_TIMER_LENGTH);
}

function stopTyping() {
    if (currentRoom) {
        socket.emit('stopTyping', { username, room: currentRoom });
    }
}

// Listen for Typing Events
socket.on('typing', (data) => {
    if (data.username !== username) {
        document.getElementById('typing-status').innerText = `${data.username} is typing...`;
    }
});

socket.on('stopTyping', () => {
    document.getElementById('typing-status').innerText = '';
});

// Receive Group Messages
socket.on('message', (msg) => {
    if (msg.room === currentRoom) {
        document.getElementById('messages').innerHTML += `<div class="message"><b>${msg.from_user}:</b> ${msg.message}</div>`;
    }
});

// Logout
function logout() {
    localStorage.removeItem('username');
    window.location.href = "login.html";
}

function openPrivateChat() {
    window.open("private_chat.html", "_blank", "width=500,height=600");
}


// Redirect Unauthorized Users
if (!localStorage.getItem('username')) {
    window.location.href = "login.html";
}
