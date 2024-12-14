import { User } from "../../models/user.model.js";
import jwt from "jsonwebtoken";

const onlineUsers = new Map();

export const handelUserEvents = async(socket, io) => {
  const users = await User.find().select("-password");
  // User Sign-In Event
  socket.on("userSignIn", async (token) => {
    try {
      // Decode the JWT token
      const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const userId = decodeToken._id;

      // Add the user to the online users map
     await onlineUsers.set(userId, socket.id);

      // Log the updated onlineUsers map
      console.log("User signed in:", userId);
      console.log("Current online users:", Array.from(onlineUsers.keys()));

      // Fetch all users and emit the updated user and online list
      io.emit("updateUserList", {
        users,
        onlineUsers: Array.from(onlineUsers.keys()),
      });
    } catch (error) {
      console.error("Error during userSignIn:", error);
    }
  });

  // User Disconnect Event
  socket.on("disconnect", async () => {
    try {
      // Find and remove the user from the online users map
      const userId = [...onlineUsers.entries()].find(([, id]) => id === socket.id)?.[0];
      if (userId) {
        onlineUsers.delete(userId);

        // Log the updated onlineUsers map
        console.log("User disconnected:", userId);
        console.log("Current online users:", Array.from(onlineUsers.keys()));

        // Fetch all users and emit the updated user and online list
        const users = await User.find().select("-password");
        io.emit("updateUserList", {
          users,
          onlineUsers: Array.from(onlineUsers.keys()),
        });
      }
    } catch (error) {
      console.error("Error during disconnect:", error);
    }
  });

  socket.on("userSignOut", async (id) => {
    try {
      
      const userId = [...onlineUsers.entries()].find(([, id]) => id === id)?.[0];
      if (userId) {
       await onlineUsers.delete(userId);

       
        console.log("User disconnected11:", userId);
        console.log("Current online users:", Array.from(onlineUsers.keys()));

        
        const users = await User.find().select("-password");
        io.emit("updateUserList", {
          users,
          onlineUsers: Array.from(onlineUsers.keys()),
        });
      }
    } catch (error) {
      console.error("Error during disconnect:", error);
    }
  });
};
