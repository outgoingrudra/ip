import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react'
import React from 'react'

export default function App() {
  return (
    <div>Welcome to the App ! 
    <SignedOut>
        <SignInButton mode='modal'>
          <button className="">Sign Up Please </button>
        </SignInButton>
    </SignedOut>
    <SignedIn>
      <SignOutButton/>
    </SignedIn>
    <UserButton/>
    </div>
  )
}
