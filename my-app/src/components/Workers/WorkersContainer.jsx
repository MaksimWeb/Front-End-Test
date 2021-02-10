import React from "react";
import {connect} from "react-redux";
import Workers from "./Workers";


class workersContainer extends React.Component {

    render () {
        if (this.props.isChanged) {
            return <Workers workers={this.props.newArr}/>
        }
        else {
            if (this.props.workers) {
                return <Workers workers={this.props.workers}/>
            }
            else {
                return <p>Loading...Please wait</p>
            }
        }

    }
}

let mapStateToProps = (state) => {
    return {
        workers: state.workerPage.workers,
        isChanged: state.workerPage.isChanged,
        newArr: state.workerPage.newArr
    }
}

export default connect(mapStateToProps,{})(workersContainer);