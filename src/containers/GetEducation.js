import React, { useState, createContext } from "react";
import useEducation from "../hooks/useEducation";
export const EducationContext = createContext();

function GetEducation ({ children }) {
    const [educationID, setEducationID] = useState();
    const [loading, response, error] = useEducation(educationID);
    
    return (
        <EducationContext.Provider value={{ loading, response, error, setEducationID }}>
            {children}
        </EducationContext.Provider>
    )
}

export default GetEducation;