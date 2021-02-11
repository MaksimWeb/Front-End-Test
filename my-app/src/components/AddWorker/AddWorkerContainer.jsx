import React from "react";
import {connect} from "react-redux";
import AddWorker from "./AddWorker";
import {addUser} from "../../redux/worker-reducer";


class addWorkerContainer extends React.Component {

    render () {
        return <AddWorker workers={this.props.workers} addUser={this.props.addUser} changeData={this.props.changeData}/>
    }
}

let mapStateToProps = (state) => {
    return {
        workers: state.workerPage
    }
}

export default connect(mapStateToProps,{addUser})(addWorkerContainer);