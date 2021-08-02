import React, { useState, createContext } from "react";
import useTraining from "../hooks/useTraining";
export const TrainingContext = createContext();

function GetTraining ({ children }) {
    const [trainingID, setTrainingID] = useState();
    const [loading, response, error] = useTraining(trainingID);
    
    return (
        <TrainingContext.Provider value={{ loading, response, error, setTrainingID }}>
            {children}
        </TrainingContext.Provider>
    )
}

export default GetTraining;