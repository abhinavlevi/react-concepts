import { createContext } from "react"

type user = {
    name: string
    email: string
}

type UserContextType = {
    user: user;
    setUser : React.Dispatch<React.SetStateAction<user>>
}

export const UserContext = createContext<UserContextType | null > (null)
