import { createAsyncThunk } from "@reduxjs/toolkit";
import socket from "../../../socket";

import { setOnlineUsers, setSocketConnected } from "./soketSlice";

export const initializeSocket = createAsyncThunk(
  "soket/initialize",
  async (_, { dispatch }) => {
    socket.connect();
    socket.on("connect", () => {
      dispatch(setSocketConnected(true));
      console.log("Socket connect", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnect", socket.id);
      dispatch(setSocketConnected(false));
    });
    socket.on("updateUserList", ({ users, onlineUsers }) => {
      console.log("user list update");
      dispatch(setOnlineUsers({ users, onlineUsers }));
    });

    return socket.id;
  }
);

export const userSignIn = createAsyncThunk(
  "socket/userSignIn",
  async userId => {
    socket.emit("userSignIn", userId);
  }
);

export const userSignOut = createAsyncThunk("socket/userSignOut", async () => {
  // localStorage.removeItem("isAdmin")
  // localStorage.removeItem("user_logined")
  socket.disconnect();
});

export const userSignOut2= createAsyncThunk("socket/userSignOut2",async()=>{
  console.log("user sign out function call")
socket.emit("userSignOut",socket.id)
})
