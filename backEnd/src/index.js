import dotenv from 'dotenv'
import { app } from './app.js'
import connectDB from './db/index.js'
import {createServer} from 'http'
import initializeScocket from './socket/index.js'
import { createDefaultAdmin } from './db/createDefaultAdmin.js'

dotenv.config({
    path: './.env',
})

const PORT = process.env.PORT || 8000

connectDB()
.then(()=>{
    app.on("Error",(error)=>{
        console.log("Error listen after app listen start",error);
    });

     // Create the HTTP server
     const server = createServer(app);

     // Initialize Socket.IO
     const io = initializeScocket(server);

     // set admin details defualt 
    //  createDefaultAdmin()

     // Start the server
     server.listen(PORT, () => {
         console.log(`Server running on http://localhost:${PORT}`);
     });  
})
.catch((error)=>{
    console.log("Monogo DB connection failed",error);
})