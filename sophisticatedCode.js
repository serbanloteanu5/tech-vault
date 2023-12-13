/*
 * Filename: sophisticatedCode.js
 * Description: This code demonstrates a complex and elaborate solution for creating a web-based chat application,
 * incorporating features such as user authentication, real-time messaging, and chat room management.
 * Author: John Doe
 * Date: September 1, 2021
 */

// Import necessary libraries and dependencies
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

// Initialize Express and HTTP server
const app = express();
const server = http.createServer(app);

// Configure the server and enable JSON body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define the secret key for JWT
const secretKey = 'mySecretKey';

// Define user and chat room data structures
let users = [];
let chatRooms = [];

// User registration endpoint
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { id: uuidv4(), username, password: hashedPassword };
  users.push(user);
  res.status(201).json({ message: 'User registered successfully' });
});

// User login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user) return res.status(401).json({ message: 'Invalid username or password' });
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(401).json({ message: 'Invalid username or password' });
  const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
  res.status(200).json({ token });
});

// Chat room creation endpoint
app.post('/chatRooms', authenticateToken, (req, res) => {
  const { name } = req.body;
  const chatRoom = { id: uuidv4(), name, users: [req.user.username] };
  chatRooms.push(chatRoom);
  res.status(201).json({ message: 'Chat room created successfully' });
});

// Join an existing chat room endpoint
app.post('/chatRooms/:id/join', authenticateToken, (req, res) => {
  const chatRoom = chatRooms.find((room) => room.id === req.params.id);
  if (!chatRoom) return res.status(404).json({ message: 'Chat room not found' });
  if (chatRoom.users.includes(req.user.username)) {
    return res.status(400).json({ message: 'User already joined this chat room' });
  }
  chatRoom.users.push(req.user.username);
  res.status(200).json({ message: 'User joined the chat room' });
});

// Socket.IO setup and event handling
const io = socketio(server);

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) return next(new Error('Authentication error'));
  jwt.verify(token, secretKey, (err, user) => {
    if (err) return next(new Error('Authentication error'));
    socket.user = user;
    next();
  });
});

io.on('connection', (socket) => {
  console.log(`User ${socket.user.username} connected`);

  // Joining a chat room
  socket.on('join', (chatRoomId) => {
    const chatRoom = chatRooms.find((room) => room.id === chatRoomId);
    if (!chatRoom) return socket.emit('error', 'Chat room not found');
    if (!chatRoom.users.includes(socket.user.username)) {
      return socket.emit('error', 'User not authorized to join this chat room');
    }
    socket.join(chatRoom.id);
    io.to(chatRoom.id).emit('message', `User ${socket.user.username} joined the chat room`);
    console.log(`User ${socket.user.username} joined the chat room: ${chatRoom.name}`);
  });

  // Sending messages
  socket.on('message', (message) => {
    const chatRoom = chatRooms.find((room) => room.id === message.chatRoomId);
    if (!chatRoom) return socket.emit('error', 'Chat room not found');
    if (!chatRoom.users.includes(socket.user.username)) {
      return socket.emit('error', 'User not authorized to send messages in this chat room');
    }
    io.to(chatRoom.id).emit('message', `User ${socket.user.username}: ${message.text}`);
    console.log(`User ${socket.user.username} sent a message in chat room ${chatRoom.name}`);
  });

  // Disconnecting
  socket.on('disconnect', () => {
    console.log(`User ${socket.user.username} disconnected`);
  });
});

// Middleware function for JWT authentication
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access token not found' });
  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired access token' });
    req.user = user;
    next();
  });
}

// Start the server
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});