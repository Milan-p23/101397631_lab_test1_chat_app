require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const connectDB = require('./config/db');
const GroupMessage = require('./models/GroupMessage');
const PrivateMessage = require('./models/PrivateMessage'); 

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

app.use(express.json());
app.use(cors({ origin: "*" }));

connectDB();

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    
    socket.on('joinRoom', ({ username, room }) => {
        socket.join(room);
        io.to(room).emit('message', { from_user: 'System', message: `${username} has joined the chat`, room });
    });

   
    socket.on('typing', ({ username, room }) => {
        socket.to(room).emit('typing', { username });
    });

    socket.on('stopTyping', ({ username, room }) => {
        socket.to(room).emit('stopTyping');
    });

    // Store & Send Group Chat Messages
    socket.on('sendMessage', async ({ from_user, room, message }) => {
        io.to(room).emit('message', { from_user, message, room });
        await GroupMessage.create({ from_user, room, message });
    });

// Store & Send Private Chat Messages
socket.on('privateMessage', async ({ from_user, to_user, room_id, message }) => {
    console.log(`Private message from ${from_user} to ${to_user}: ${message}`);

    // Send message to recipient only
    socket.to(room_id).emit('privateMessage', { from_user, message });

    // Save message to MongoDB
    await PrivateMessage.create({ from_user, to_user, room_id, message });
});





    socket.on('disconnect', () => {
        console.log("User disconnected:", socket.id);
    });
});

server.listen(3000, () => console.log('✅ Server running on port 3000'));
