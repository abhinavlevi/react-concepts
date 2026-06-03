import React, { useContext } from 'react'
import { UserContext } from '../UserContext'

const page = () => {

    const { user } = useContext(UserContext)!;


    return (
        <div><h1>Hello {user.name}, Your email is {user.email}</h1></div>
    )
}

export default page