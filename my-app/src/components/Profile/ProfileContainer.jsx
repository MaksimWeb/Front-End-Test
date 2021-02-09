import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {setUserProfile} from "../../redux/profile-reducer";


class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 1;
        }
        let pro = this.props.workers.find(w => w.id == userId)
        this.props.setUserProfile(pro)
    }

    render() {
        return <Profile {...this.props} profile={this.props.profile}/>
    }
}

let mapStateToProps = (state) => ({
    workers: state.workerPage.workers,
    profile: state.profilePage.profile
})

let withURLDataContainer = withRouter(ProfileContainer);

export default connect(mapStateToProps, {setUserProfile})(withURLDataContainer);