import React, { useState } from "react";
import { useCurrentUser } from "../../containers/CurrentUser";
import GetProfile from "../../containers/GetProfile";
import ProfileForm from "./ProfileForm";
import ProfileSummary from "./ProfileSummary";

function Profile () {
    const currentUser = useCurrentUser();
    const cvID = currentUser.cv;
    const [profileFormState, setProfileFormState] = useState(true);

    if (profileFormState === true && cvID === null) {
        return <ProfileForm setProfileFormState={setProfileFormState} />
    } else {
        return (
            <GetProfile>
                <ProfileSummary />
            </GetProfile>
        )
    }
}

export default Profile;