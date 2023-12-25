import { useState, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
    const [token, setToken] = useState(localStorage.token);
    return (
        <UserContext.Provider value={{token, setToken}}>
            {props.children}
        </UserContext.Provider>
    )
}