import { createContext, useEffect, useState } from "react";

export const DarkModeContext = createContext();

export const DarkModeContextProvider = ({children}) => {
    const [darkMode, setDarkMode] = useState(
        // transform into a JSON for a bool, returns false if no variable in local storage
        JSON.parse(localStorage.getItem("darkMode")) || false); 

    const toggle = () => {
        setDarkMode(!darkMode);
    };

    useEffect(() => {
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode])

    return (                            // {{}} because its an object
        <DarkModeContext.Provider value={{darkMode, toggle}}>{children}</DarkModeContext.Provider>
    )
};