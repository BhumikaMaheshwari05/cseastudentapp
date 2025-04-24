import { useState } from 'react'
import './App.css'
import Login from './component/Login'
import Register from './component/Register'
import Home from './component/Home'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Dashboard from './component/Dashboard'
function App() {
   

  return (
    <>
     {/* <Login/>
     <Register/> */}
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
     </Routes>
      
     </BrowserRouter>
    </>
  )
}

export default App
