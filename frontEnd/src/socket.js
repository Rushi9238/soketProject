import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:8000'; // Replace with your backend URL
const socket = io(SOCKET_URL, {
    autoConnect: false, // Connect manually after initialization
});

export default socket;
