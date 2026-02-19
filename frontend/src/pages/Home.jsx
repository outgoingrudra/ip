import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react'
import React from 'react'
import toast from 'react-hot-toast'

export default function Home() {
  return (
    <div>
      <h1 className="">Home Page</h1>

      <button className="btn btn-primary" onClick={()=>{toast.success("Hurray!")}}>Toast</button>
      <SignedOut>
        <SignInButton mode = "modal">
          <button className="btn btn-primary">Login</button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <SignOutButton/>
      </SignedIn>
      <UserButton/>


    </div>
  )
}
