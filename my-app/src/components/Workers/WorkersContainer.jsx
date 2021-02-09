import React from "react";
import {connect} from "react-redux";
import Workers from "./Workers";


class workersContainer extends React.Component {
    render () {
        return <Workers workers={this.props.workers}/>
    }
}

let mapStateToProps = (state) => {
    return {
        workers: state.workerPage.workers
    }
}

export default connect(mapStateToProps,{})(workersContainer);