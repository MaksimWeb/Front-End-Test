import React, {useState, useEffect} from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {convertToDollars, setUserProfile} from "../../redux/profile-reducer";
import {
    changeProfileData,
    deleteUser,
    toggleIsChanging,
    toggleIsDeleting
} from "../../redux/worker-reducer";

const ProfileContainer = (props) => {

    let userId = props.match.params.userId;
        if (!userId) {
            userId = 1;
        }

        let pro = props.workers.workers.find(w => w.id == userId)


    let [profile, setProfile] = useState(pro);

    useEffect(() => {
        props.setUserProfile(profile)
    },[pro])

    if (profile) {
        return <Profile {...props} profile={profile}/>
    } else {
        return <p>Loading...Please wait</p>
    }

}


let mapStateToProps = (state) => ({
    workers: state.workerPage,
    profile: state.profilePage.profile,
})

let withURLDataContainer = withRouter(ProfileContainer);

export default connect(mapStateToProps,
    {
        setUserProfile,
        deleteUser, toggleIsDeleting,
        changeProfileData,
        toggleIsChanging,

    })(withURLDataContainer);