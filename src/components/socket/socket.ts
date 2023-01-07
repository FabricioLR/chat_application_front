import { io } from "socket.io-client";

const socket = io("https://chatapplication.onrender.com/")

export default socket