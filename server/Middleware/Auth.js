const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
dotenv.config()
const ensureauthenticated = (req,res,next) =>{
    const auth = req.headers["authorization"];
    if(!auth){
        return res.status(403).json({'message':"unauthorized , JWT token is require"})
    }
    try{
       const decoded = jwt.verify(auth,process.env.JWT_SECRET);
       req.user = decoded
      
       next() 
      
    }catch(error){
        // console.log("show error authrized",error)
        return res.status(403).json({'message':"unauthorized , JWT token wrong or expired"}) 
    }
}

module.exports = {ensureauthenticated}
