"use client"
import UserProvider from "./UserProvider"
import Navbar from "./navbar/page"
import ProfileEditor from "./ProfileEditor/page"

const page = () => {
    return (
        <UserProvider>
            <Navbar />
            <ProfileEditor />
        </UserProvider>
    )
}

export default page