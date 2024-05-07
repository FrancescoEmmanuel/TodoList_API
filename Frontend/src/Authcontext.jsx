import React, { useContext, useState } from 'react'
import { auth } from "./Firebase"

const Authcontext = React.createContext

export function useAuth(){
    return useContext(Authcontext)
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState()

    function login (email,password){
        return auth.cr
    }

    const value = {
        currentUser
    }
    
  return (
    <Authcontext.Provider value={value}>
        { children }
    </Authcontext.Provider>
  )
}

export default Authcontext