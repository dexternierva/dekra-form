import React, { useState } from "react";
import { useCurrentUser } from "../../containers/CurrentUser";
import GetPracticalActivity from "../../containers/GetPracticalActivity";
import PracticalActivitiesForm from "./PracticalActivitiesForm";
import PracticalActivitiesSummary from "./PracticalActivitiesSummary";

function PracticalActivities () {
    const currentUser = useCurrentUser();
    const practicalActivityID = currentUser.practical_activity;
    const [practicalActivitiesState, setPracticalActivitiesState] = useState(true);

    if (practicalActivitiesState === true && practicalActivityID === null) {
        return <PracticalActivitiesForm setPracticalActivitiesState={setPracticalActivitiesState} />
    } else {
        return (
            <GetPracticalActivity>
                <PracticalActivitiesSummary />
            </GetPracticalActivity>
        )
    }
}

export default PracticalActivities;