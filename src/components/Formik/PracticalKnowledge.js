import React, { useState } from "react";
import { useCurrentUser } from "../../containers/CurrentUser";
import GetPracticalKnowledge from "../../containers/GetPracticalKnowledge";
import PracticalKnowledgeForm from "./PracticalKnowledgeForm";
import PracticalKnowledgeSummary from "./PracticalKnowledgeSummary";

function Profile () {
    const currentUser = useCurrentUser();
    const practicalKnowledgeID = currentUser.practical_knowledge;
    const [practicalKnowledgeState, setPracticalKnowledgeState] = useState(true);

    if (practicalKnowledgeState === true && practicalKnowledgeID === null) {
        return <PracticalKnowledgeForm setPracticalKnowledgeState={setPracticalKnowledgeState} />
    } else {
        return (
            <GetPracticalKnowledge>
                <PracticalKnowledgeSummary />
            </GetPracticalKnowledge>
        )
    }
}

export default Profile;