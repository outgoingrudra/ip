import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton, useUser } from '@clerk/clerk-react'
import React from 'react'
import {Routes , Route, Navigate} from "react-router"
import Home from './pages/Home'
import About from './pages/About'
import ProblemsPage from './pages/ProblemsPage'
import {Toaster} from "react-hot-toast"

export default function App() {

  const {isSignedIn} = useUser()

  return (
   <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
       <Route path='/problems' element={isSignedIn ? <ProblemsPage/> : <Navigate to={"/"}/>} />

      </Routes>  
        
        <Toaster toastOptions={{duration : 3000}}/>


   </>
  )
}
