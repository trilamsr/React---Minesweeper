import Board from './Board';
import DashBoard from './DashBoard'
import SettingForm from './SettingForm'
import React, { Component } from 'react'
import settings, { DIFFICULTY, STATUS } from '../settings.json'

class Minesweeper extends Component {
    constructor(props) {
        super(props)
        this.state = {
            FLAG: 0,
            GAMECOUNT: 0,
            STATUS: STATUS.BEGIN,
            DIFFICULTY: DIFFICULTY.EASY,
        }
        this.baseState = this.state
    }

    handleFormChange = (key, val) => {
        this.setState({
            STATUS: STATUS.BEGIN,
            FLAG: settings[key][val].mines,
            DIFFICULTY: settings[key][val],
            GAMECOUNT: this.state.GAMECOUNT + 1,
        })
    }

    // Changing number of available flags
    changeFlag = (num) => {
        this.setState({FLAG: num})
    }
    
    //Setting status of the game
    // Can either be begin, running, victory, or lost
    setStatus = (condition) => {
        this.setState({STATUS: condition})
    }

    // Rendering children components
    render() {
        const {STATUS, GAMECOUNT, FLAG, DIFFICULTY} = this.state
        const {setStatus, handleFormChange, changeFlag} = this
        return (
            <div className="minesweeper">
                <DashBoard
                    status={STATUS}
                    remainingFlags={FLAG}
                    gameCount={GAMECOUNT}
                />
                <Board 
                    status={STATUS}
                    setStatus= {setStatus}
                    gamecount={GAMECOUNT}
                    changeFlag={changeFlag}
                    difficulty={DIFFICULTY}
                />
                <SettingForm
                    status={STATUS}
                    name="DIFFICULTY"
                    handleFormChange={handleFormChange}
                />
            </div>
        )
    }
}

export default Minesweeper;




