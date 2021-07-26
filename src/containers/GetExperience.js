import React, { useState, createContext } from "react";
import useExperience from "../hooks/useExperience";
export const ExperienceContext = createContext();

function GetExperience ({ children }) {
    
    const [experienceID, setExperienceID] = useState();
    const [loading, response, error] = useExperience(experienceID);
    
    return (
        <ExperienceContext.Provider value={{ loading, response, error, setExperienceID }}>
            {children}
        </ExperienceContext.Provider>
    )
}

export default GetExperience;