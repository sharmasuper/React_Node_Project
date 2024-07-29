const { ensureauthenticated } = require('../Middleware/Auth');

const Productrouter = require('express').Router()
Productrouter.get("/",ensureauthenticated,(req,res)=>{
    // console.log("----logged user ",req.user)
    res.status(200).json([
        {
            name : "mobbile",
            price : 100000
        },
        {
            name : "tv",
            price : 500000
        }
    ])
})

module.exports = Productrouter; 
