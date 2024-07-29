

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  
} from "react-router-dom";

import './App.css'

import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Login from "./pages/Login";
import { useState } from "react";
import RefreshHandler from "./pages/RefreshHandler";
function App() {
 
      const [isAuthenticated , setIsAuthenticated] = useState(false)
        
      const PrivateRoute = ({element}) =>{
        return isAuthenticated ? element : <Navigate to="/Login" />
      }
      

  return (
    <>
      <div className="App">
     
          <Router>
          <RefreshHandler setIsAuthenticated={setIsAuthenticated}/> 
            <Routes>
              <Route path="/" element={<Navigate to="/Login" />} />
              <Route path='/Login' element={<Login/>}></Route>
              <Route path='/SignIn' element={<SignIn/>}></Route> 
              <Route path='/Home' element={<PrivateRoute element={<Home/>}/>}></Route> 
            </Routes>
          </Router>
      </div>
    </>
  )
}

export default App
