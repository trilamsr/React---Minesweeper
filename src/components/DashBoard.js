import React, { Component } from 'react';
import { STATUS } from '../settings.json';
import { transformTime } from '../Scripts/Utilities';


class DashBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            time: 0,
        }
    }

    // Start the clock
    runClock = () => {
        const status = this.props.status
        if (status === STATUS.RUNNING) {
            const startTime = Date.now() - this.state.time;
            this.intervalKey = setInterval(() => {
            this.setState({time: Date.now() - startTime });
            });
        }
    }

    // Stop the clock
    stopClock = () => {
        clearInterval(this.intervalKey);
    }

    // In case of memory leak
    componentWillUnmount = () => {
        clearInterval(this.intervalKey);
    }

    // Reset the clock
    clearClock = () => {
        this.stopClock()
        this.setState({time: 0})
    }

    // Receive instruction from parent component about status of the game and perform action accordingly
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
                    Current Game: {this.props.gameCount||0}
                </div>
                <div>
                    Time: {transformTime(this.state.time)}
                </div>
            </div>
        )
    }
}

export default DashBoard;