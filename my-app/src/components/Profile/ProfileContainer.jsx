import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {setUserProfile} from "../../redux/profile-reducer";
import {
    changeProfileData,
    deleteUser,
    isChanging,
    toggleIsChanging,
    toggleIsDeleting
} from "../../redux/worker-reducer";


class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 1;
        }

        let pro = this.props.workers.workers.find(w => w.id == userId)
        this.props.setUserProfile(pro)
    }

    render() {

        if (this.props.profile) {
            return  <Profile {...this.props} profile={this.props.profile}/>
        }
        else {
            return <p>Loading...Please wait</p>
        }
    }
}

let mapStateToProps = (state) => ({

    workers: state.workerPage,
    profile: state.profilePage.profile
})

let withURLDataContainer = withRouter(ProfileContainer);

export default connect(mapStateToProps, {setUserProfile, deleteUser, toggleIsDeleting, changeProfileData, isChanging, toggleIsChanging})(withURLDataContainer);