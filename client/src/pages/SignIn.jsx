import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../Utils';
import axios from 'axios'
function SignIn() {
  //hooks 
   const Navigate = useNavigate()
   const [SigninInfo,setSigninInfo] = useState({
    name: '',
    email: '',
    password: '', 
   })
  
   const handleSubmit = async(e) =>{
    e.preventDefault()
       
      const {name,email,password} = SigninInfo;
     if(!name || !email || !password){
      return handleError("name,email,and password are required")
     }
     //api call started 
     try{
          const response =  await axios.post("/api/auth/signup",{name : name,email : email,password : password}) 
          const result = await response.data
            // console.log("show response ",response)          
      if(result){
          handleSuccess(result.message) 
         setTimeout(()=>{
          Navigate('/login') 
         },3000)
      }
     }catch(error){
      if(error.response.data.message){
    
       handleError(error.response.data.message) 
    }else{
     
      handleError(error.response.message) 
    }
   }
  }
   const handleChange = (e) =>{
   const {name , value} = e.target 
   const copySigninInfo = {...SigninInfo}
   copySigninInfo[name] = value 
   setSigninInfo(copySigninInfo) ; //updating the state with the new value  // this will re-render the component with the updated state  // the component will then display the new values in the input fields  // this is how we achieve controlled components in react  // controlled components are components that manage their own state and update it based on user input  // in this case, the state is managed by the 'loginInfo' state variable and updated using the 'handleChange' function
  
   } 
  
  return (
    <div className='container'>
      <h1>SignIn</h1>
      <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor='name'>Name</label> 
            <input type='text' name='name' onChange={handleChange} autoFocus placeholder='Enter your name ...'/>
        </div>
        <div>
            <label htmlFor='email'>Email</label> 
            <input type='email' name='email' onChange={handleChange} autoFocus placeholder='Enter your email ...'/>
        </div>
        <div>
            <label htmlFor='password'>Password</label> 
            <input type='password' name='password' onChange={handleChange} autoFocus placeholder='Enter your password ...'/>
        </div>
        <button type='submit'>SignIn</button>
        <span>Already have an account ?
            <Link to="/Login">Login</Link>
        </span>
      </form>
      <ToastContainer/>
    </div>
  );
}

export default SignIn;
