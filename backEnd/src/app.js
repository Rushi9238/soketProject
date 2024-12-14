import express from 'express'
import cors from 'cors'
import cookiesParser from 'cookie-parser'



export const app=express()

app.use(
    cors({
        origin:process.env.CORS_ORIGIN,
        credentials:true
    })
)

app.use(
    express.json({
        limit: '100kb',
    })
)

app.use(
    express.urlencoded({
        extended:true,
        limit: '100kb',
    })
)
app.use(express.static("public"))
app.use(cookiesParser())


// Routes Start

import { userRoutes } from './routes/user.routes.js'
import { API_START, VERSION_V1 } from './constants.js'

app.use("/api/v1/user",userRoutes)