const bcrypt = require('bcrypt');
const { UserModel } = require('../Models/db');
const dotenv = require('dotenv')
dotenv.config();
const jwt = require("jsonwebtoken")
const signup = async(req,res) =>{
    try{
       const {name, email, password} = req.body;
      const user = await UserModel.findOne({email})
      if(user){
        return res.status(400).json({message: "user is already exists,you can login"});  
      }else{
        const newUser = await UserModel.create({name : name ,email : email,password : password}) 
          // send user object in response instead of password
        newUser.password = await bcrypt.hash(password,10)  
           res.status(201).json({message : "Signup successfully",success : true}) 
         await  newUser.save()
    } 
    }catch(error){
        res.status(500).json({message: "Internal server error ",success : false}); 
    } 
}


const login = async(req,res) =>{
    try{
       const { email, password} = req.body;
       console.log("show body",email,password)
      const user = await UserModel.findOne({email:email})
      const errorMsg = "auth failed email or password is wrong"
      if(!user){
        return res.status(403).json({message: errorMsg}); 
      }
      const isPassEqual = await bcrypt.compare(password , user.password)
      if(!isPassEqual){
        return res.status(403).json({message: errorMsg,success : false}); 
      }
      const maxAge = 3 * 24 * 60 * 60; // 3 days
      //create token in jwt
     const jwtToken = jwt.sign({email : user.email,_id : user._id},process.env.JWT_SECRET,{expiresIn:maxAge})
      res.status(200).json({message : "Login Success",success: true,jwtToken:jwtToken, email:user.email,name : user.name})   
    }catch(error){
        res.status(500).json({message: "Internal server error ",success : false}); 
    } 
}



module.exports = {signup,login}