import express from 'express'
import authRoutes from './routes/auth.route.js';
import dotenv from 'dotenv'
import {connectDB} from "./lib/db.js"
import cookieParser from 'cookie-parser'
const app = express()
app.use(express.json()) // this will allow you to extract json data from db
app.use(cookieParser())

app.use("/api/auth" , authRoutes)
dotenv.config()
app.get('/', (req , res)=>{
      res.send("hello world")
})

app.listen(5555 , ()=>{
      console.log("server is running on http://localhost:5555")
      connectDB()
})