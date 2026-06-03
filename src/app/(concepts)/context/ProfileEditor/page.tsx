"use client"
import React, { use, useContext } from 'react'
import { UserContext } from '../UserContext'

const page = () => {
  const { user, setUser } = useContext(UserContext)!;


  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const {name , value} = e.target
    setUser(prev => ({...prev, [name]:value}))
  }

  return (
    <div>
      <input name='name' value={user.name} onChange={handleInputChange} />
      <input name='email' value={user.email} onChange={handleInputChange} />
    </div>
  )
}

export default page