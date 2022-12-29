import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(
        // transform into a JSON for a bool, returns false if no variable in local storage
        JSON.parse(localStorage.getItem("user")) || null); 

    const login = async (inputs) => {
        const res = await axios.post("http://localhost:8800/api/auth/login", inputs, {
            withCredentials: true,
        });

        
        setCurrentUser(res.data);
    };

    useEffect(() => {
        // object must be stored as a string in local storage
        localStorage.setItem("user", JSON.stringify(currentUser)); 
    }, [currentUser]);

    return (                            // {{}} because its an object
        <AuthContext.Provider value={{currentUser, login}}>{children}</AuthContext.Provider>
    )
};