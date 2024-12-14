import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_APP_SOKET_URL; // Replace with your backend URL
const socket = io(SOCKET_URL, {
    autoConnect: false, // Connect manually after initialization
});

export default socket;
