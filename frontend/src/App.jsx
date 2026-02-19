import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton, useUser } from '@clerk/clerk-react'
import React from 'react'
import {Routes , Route, Navigate} from "react-router"
import Home from './pages/Home'

import ProblemsPage from './pages/ProblemsPage'
import {Toaster} from "react-hot-toast"
import DashboardPage from './pages/DashboardPage'

export default function App() {

  const {isSignedIn, isLoaded} = useUser()
  if(!isLoaded) return null

  return (
   <>
      <Routes>
        <Route path='/' element={!isSignedIn ? <Home/> : <Navigate to={"/dashboard"}/>} />
        <Route path='/dashboard' element={isSignedIn ? <DashboardPage/> : <Navigate to={"/"}/>} />
        
       <Route path='/problems' element={isSignedIn ? <ProblemsPage/> : <Navigate to={"/"}/>} />

      </Routes>  
        
        <Toaster toastOptions={{duration : 3000}}/>


   </>
  )
}
