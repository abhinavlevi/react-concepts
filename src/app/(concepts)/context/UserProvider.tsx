"use client"

import { useState } from "react"
import { UserContext } from "./UserContext"

export default function UserProvider({
    children,
}: {
    children: React.ReactNode;
}) {

    const [user, setUser] = useState(
        {
            name: "Abhinav",
            email: "abhinav@kapable.club"
        }
    );
    return (
        <>
            <UserContext.Provider value={{ user, setUser }}>
                {children}
            </UserContext.Provider>
        </>
    )
}