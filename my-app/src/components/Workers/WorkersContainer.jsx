import React from "react";
import {connect} from "react-redux";
import Workers from "./Workers";


class workersContainer extends React.Component {

    render () {
        if (this.props.workers) {
            return <Workers workers={this.props.workers}/>
        }
        else {
            return <p>Loading...Please wait</p>
        }
    }
}

let mapStateToProps = (state) => {
    return {
        workers: state.workerPage.workers
    }
}

export default connect(mapStateToProps,{})(workersContainer);