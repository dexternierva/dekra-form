import React, { useState, createContext } from "react";
import usePracticalKnowledge from "../hooks/usePracticalKnowledge";
export const PracticalKnowledgeContext = createContext();

function GetPracticalKnowledge ({ children }) {
    
    const [practicalKnowledgeID, setPracticalKnowledgeID] = useState();
    const [loading, response, error] = usePracticalKnowledge(practicalKnowledgeID);
    
    return (
        <PracticalKnowledgeContext.Provider value={{ loading, response, error, setPracticalKnowledgeID }}>
            {children}
        </PracticalKnowledgeContext.Provider>
    )
}

export default GetPracticalKnowledge;