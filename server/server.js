const express = require('express')
const app = express()
const cors = require('cors')
const { router } = require('./Routes/authRouter')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Productrouter = require('./Routes/ProductRouter')
dotenv.config()
mongoose.connect(process.env.str)
.then(()=>{
    console.log("mongoose connected successfully")
})
.catch((error)=>{
    console.log("show error ",error)
})



app.use(express.json()) 
const port = process.env.port
app.use(express.json())
app.use(cors()) //different server request accept work
app.get("/api",(req,res)=>{
    res.json({"Users":["MOHIT sharma","UserTwo","userThree"]})
})

app.use("/auth",router) 
app.use("/products",Productrouter) 
app.listen(port,()=>{
    console.log("api listen successfully"+port)
})



