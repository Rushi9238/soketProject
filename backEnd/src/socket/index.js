import {Server} from 'socket.io'
import { handelUserEvents } from './events/users.js'

const initializeScocket=(server)=>{
const io= new Server(server,{
    cors:{
        origin:`${process.env.CORS_ORIGIN}`,
        methods: ["GET", "POST"],
    }
})

    io.on("connection",(socket)=>{
        // console.log('A user are connected and its id is',socket.id)

        // Add Events
        handelUserEvents(socket,io)

        socket.on("disconnect",()=>{
            // console.log("One user are disconnected and its id is ",socket.id)
        })
    })
}

export default initializeScocket