import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import axios from 'axios'
import { handleError, handleSuccess } from '../Utils';
function Login() {
  //hooks 
   const Navigate = useNavigate()
   const [LoginInfo,setLoginInfo] = useState({ 
    email: '',
    password: '', 
   })
  
   const handleSubLogin = async(e) =>{
    e.preventDefault()
      // console.log(SigninInfo) 
      const {email,password} = LoginInfo; 
      
     if( !email || !password){
      return handleError("email,and password are required")
     }
     //api call started 
     try{
          const response =  await axios.post("/api/auth/login",{email:email,password : password}) 
          const result = await response.data

          const {message,success,jwtToken,name} = result 
            // console.log("show response ",response)          
      if(success){
       
        localStorage.setItem("token",jwtToken)
        localStorage.setItem("loggedUser",name) 
          handleSuccess(message) 
         setTimeout(()=>{
          Navigate('/Home') 
         },3000)
      }
     }catch(error){
      console.log("show error ",error)
      if(error.response.data.message){
      console.log("show error ",error)
       handleError(error.response.data.message) 
    }else{
      console.log(error)
      handleError(error.response.message) 
    }
   }
  }
   const handleChange = (e) =>{
   const {name , value} = e.target 
   const copySigninInfo = {...LoginInfo}
   copySigninInfo[name] = value 
   setLoginInfo(copySigninInfo) ; //updating the state with the new value  // this will re-render the component with the updated state  // the component will then display the new values in the input fields  // this is how we achieve controlled components in react  // controlled components are components that manage their own state and update it based on user input  // in this case, the state is managed by the 'loginInfo' state variable and updated using the 'handleChange' function
  
   } 
  
  return (
    <div className='container'>
      <h1>Login Page</h1>
      <form onSubmit={handleSubLogin}>
      
        <div>
            <label htmlFor='email'>Email</label> 
            <input type='email' name='email' onChange={handleChange} autoFocus placeholder='Enter your email ...'/>
        </div>
        <div>
            <label htmlFor='password'>Password</label> 
            <input type='password' name='password' onChange={handleChange} autoFocus placeholder='Enter your password ...'/>
        </div>
        <button type='submit'>Login</button>
        <span>Already have an account ?
            <Link to="/SignIn">SignIn</Link>
        </span>
      </form>
      <ToastContainer/> 
    </div>
  );
}

export default Login;
