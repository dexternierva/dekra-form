import React, { useState, createContext } from "react";
import useProfile from "../hooks/useProfile";
export const ProfileContext = createContext();

function GetProfile ({ children }) {
    
    const [cvID, setCvID] = useState();
    const [loading, response, error] = useProfile(cvID);
    
    return (
        <ProfileContext.Provider value={{ loading, response, error, setCvID }}>
            {children}
        </ProfileContext.Provider>
    )
}

export default GetProfile;