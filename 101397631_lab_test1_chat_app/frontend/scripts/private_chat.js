const socket = io.connect("http://localhost:3000");
let username = localStorage.getItem('username');

if (!username) {
    window.location.href = "login.html";
} else {
    document.getElementById('user').innerText = username;
}

let privateRoom = null;
let recipientUser = null;
let typingTimer;
const TYPING_TIMER_LENGTH = 3000;

// Join Private Room
function joinPrivateRoom() {
    recipientUser = document.getElementById('private-room').value.trim();

    if (!recipientUser) {
        alert("Please enter the recipient's username!");
        return;
    }

    privateRoom = [username, recipientUser].sort().join('_'); 
    document.getElementById('private-room-name').innerText = `Chat with ${recipientUser}`;
    document.getElementById('private-chat-area').style.display = 'block';
    document.getElementById('private-chat-setup').style.display = 'none';

    socket.emit('joinRoom', { username, room: privateRoom });

    fetch(`http://localhost:3000/api/chat/private/${username}/${recipientUser}`)
        .then(res => res.json())
        .then(messages => {
            document.getElementById('private-messages').innerHTML = messages
                .map(msg => `<div class="private-message"><b>${msg.from_user}:</b> ${msg.message}</div>`)
                .join('');
        });
}

// Leave Private Room
function leaveRoom() {
    if (!privateRoom) return;

    socket.emit('leaveRoom', { username, room: privateRoom });

    document.getElementById('private-chat-area').style.display = 'none';
    document.getElementById('private-chat-setup').style.display = 'block';
    document.getElementById('private-room').value = '';
    document.getElementById('private-messages').innerHTML = '';
    document.getElementById('private-typing-status').innerText = '';

    privateRoom = null;
    recipientUser = null;
}

// Send Private Message
function sendPrivateMessage() {
    const message = document.getElementById('private-message').value.trim();

    if (!message || !privateRoom || !recipientUser) {
        alert("Enter a valid message and recipient username.");
        return;
    }

    const messageData = { 
        from_user: username, 
        to_user: recipientUser, 
        room_id: privateRoom, 
        message
    };

    // Display message instantly for sender
    displayPrivateMessage(messageData);

    socket.emit('privateMessage', messageData);
    document.getElementById('private-message').value = '';
}

// Function to display private messages instantly
function displayPrivateMessage(msg) {
    document.getElementById('private-messages').innerHTML += 
        `<div class="private-message"><b>${msg.from_user}:</b> ${msg.message}</div>`;
}

// Typing Indicator Functions
function startPrivateTyping() {
    if (privateRoom) {
        socket.emit('typing', { username, room: privateRoom });
    }

    clearTimeout(typingTimer);
    typingTimer = setTimeout(stopPrivateTyping, TYPING_TIMER_LENGTH);
}

function stopPrivateTyping() {
    if (privateRoom) {
        socket.emit('stopTyping', { username, room: privateRoom });
    }
}

// Listen for Private Messages 
socket.on('privateMessage', (msg) => {
    displayPrivateMessage(msg);
});

// Listen for Typing Indicator
socket.on('typing', (data) => {
    if (data.username !== username) {
        document.getElementById('private-typing-status').innerText = `${data.username} is typing...`;
    }
});

socket.on('stopTyping', () => {
    document.getElementById('private-typing-status').innerText = '';
});
