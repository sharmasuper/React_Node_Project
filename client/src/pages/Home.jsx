import React, { useEffect, useState, } from 'react';
import { handleError, handleSuccess } from '../Utils';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import axios from 'axios'
function Home() {

 const [showLoggetUser,setShowLoggetUser] = useState('')
 const [giveData,setgiveData] = useState("")
 const navigate = useNavigate()
 useEffect(()=>{
     setShowLoggetUser(localStorage.getItem('loggedUser'))
 },[])

 const handleLogout = () =>{
  localStorage.removeItem('loggedUser')
  localStorage.removeItem('token')
  handleSuccess("Logout successfully ") 
  setTimeout(()=>{
    navigate("/Login")
  },1000)
 }

const fetchProducts = async() =>{
  try{
    const headers = {
      headers : {
        "Authorization" : localStorage.getItem('token') 
      }
    }
     const response = await axios.get("/api/products/",headers)
     const data = await response.data
      setgiveData(data)
      //  console.log(data)
  }catch(error){
    console.log("error ",error)
    handleError(error.message)
  }  
}

 useEffect(()=>{
  fetchProducts()
 })



  return (
    <div>
      <h1>Home page local user = {showLoggetUser}</h1>
       {giveData&&giveData.map((item,index)=><h1 key={index}>name is {item.name} and price is {item.price}</h1>)} 

      <button onClick={handleLogout}>Logout</button>
      <ToastContainer/>
    </div>
  );
}

export default Home;
