import React, { Component } from 'react';
import { STATUS } from '../settings.json';
import { transformTime } from './Auxiliary';


class DashBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            time: 0,
        }
    }

    runClock = () => {
        const status = this.props.status
        if (status === STATUS.RUNNING) {
            const startTime = Date.now() - this.state.time;
            this.intervalKey = setInterval(() => {
            this.setState({time: Date.now() - startTime });
            });
        }
    }

    stopClock = () => {
        clearInterval(this.intervalKey);
    }

    // Memory Leak Case
    componentWillUnmount = () => {
        clearInterval(this.intervalKey);
    }

    clearClock = () => {
        this.stopClock()
        this.setState({time: 0})
    }

    componentDidUpdate(preProp, preState) {
        if (preProp.status === this.props.status) return;
        const status = this.props.status
        if (status === STATUS.BEGIN) {
            this.clearClock();
        } else if (status === STATUS.RUNNING) {
            this.runClock();
        } else {
            this.stopClock();
        }
    }

    render () {
        return (
            <div className="header">
                <div>
                    Flags: {this.props.remainingFlags||0}
                </div>
                <div>
                    Game Passed: {this.props.gameCount||0}
                </div>
                <div>
                    Time: {transformTime(this.state.time)}
                </div>
            </div>
        )
    }
}

export default DashBoard;