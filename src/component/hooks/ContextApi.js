import React, { createContext } from "react";
import useFirebase from "./firebase";

export const MyContext = createContext();

const AuthContext = ({children})=>{
    const firebase = useFirebase() 
    return (
        <MyContext.Provider value={firebase}>
            {children}
        </MyContext.Provider>
    )
}
export default AuthContext
