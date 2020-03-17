import Board from './Board';
import DashBoard from './DashBoard'
import SettingForm from './SettingForm'
import React, { Component } from 'react'
import { difficultyValidation } from '../Class/Utilities';
import settings from '../settings.json'

class Minesweeper extends Component {
    constructor(props) {
        super(props)
        this.state = {
            FLAG: 0,
            GAMECOUNT: 0,
            STATUS: settings.STATUS.BEGIN,
            DIFFICULTY: settings.DIFFICULTY.EASY,
        }
        this.baseState = this.state
    }

    handleFormChange = (k, v) => {
        const key = k.toUpperCase();
        const val = v.toUpperCase();
        if (difficultyValidation(key, val)) {
            this.setState({
                STATUS: settings.STATUS.BEGIN,
                FLAG: settings[key][val].mines,
                DIFFICULTY: settings[key][val],
                GAMECOUNT: this.state.GAMECOUNT + 1,
            })
        }
    }

    // Changing number of available flags
    changeFlag = (num) => {
        this.setState({FLAG: num})
    }
    
    // Start the game
    start = () => {
        this.setState({STATUS: settings.STATUS.RUNNING})
    }
    
    // Game finished when victory/lost
    end = () => {
        this.setState({STATUS: settings.STATUS.ENDED})
    }

    // Change status to victory
    victory = () => {
        this.end()
        this.setState({STATUS: settings.STATUS.VICTORY})
    }
    
    // Change status to lost
    lost = () => {
        this.end()
        this.setState({STATUS: settings.STATUS.LOST})
    }

    // Rendering children components
    render() {
        const {STATUS, GAMECOUNT, FLAG, DIFFICULTY} = this.state
        const {victory, lost, flag_delta, handleFormChange, changeFlag, start} = this
        return (
            <div className="minesweeper">
                <DashBoard
                    status={STATUS}
                    remainingFlags={FLAG}
                    gameCount={GAMECOUNT}
                />
                <Board 
                    lost={lost} 
                    start= {start}
                    status={STATUS}
                    victory={victory}
                    gamecount={GAMECOUNT}
                    changeFlag={changeFlag}
                    difficulty={DIFFICULTY}
                    flag_delta ={flag_delta}
                />
                <SettingForm
                    status={STATUS}
                    name="Difficulty"
                    handleChange={handleFormChange}
                />
            </div>
        )
    }
}

export default Minesweeper;




