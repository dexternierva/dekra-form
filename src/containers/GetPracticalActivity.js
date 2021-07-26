import React, { useState, createContext } from "react";
import usePracticalActivity from "../hooks/usePracticalActivities";
export const PracticalActivityContext = createContext();

function GetPracticalActivity ({ children }) {
    
    const [practicalActivityID, setPracticalActivityID] = useState();
    const [loading, response, error] = usePracticalActivity(practicalActivityID);
    
    return (
        <PracticalActivityContext.Provider value={{ loading, response, error, setPracticalActivityID }}>
            {children}
        </PracticalActivityContext.Provider>
    )
}

export default GetPracticalActivity;