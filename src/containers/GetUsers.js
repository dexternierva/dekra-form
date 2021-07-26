import React, { useState, createContext } from "react";
import useUsers from "../hooks/useUsers";
export const UserContext = createContext();

function GetUsers ({ children }) {
    
    const [userID, setUserID] = useState();
    const [loading, response, error] = useUsers(userID);
    
    return (
        <UserContext.Provider value={{ loading, response, error, setUserID }}>
            {children}
        </UserContext.Provider>
    )
}

export default GetUsers;