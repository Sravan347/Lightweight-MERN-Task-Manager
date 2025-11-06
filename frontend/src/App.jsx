import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Tasks from '../pages/Tasks'
import Homepage from '../pages/HomePage'
import Nav from '../components/Nav'

const App = () => {
  return (
    <>
    <Nav/>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/tasks' element={<Tasks/>}/>


    </Routes>
     
    </>
  )
}

export default App
