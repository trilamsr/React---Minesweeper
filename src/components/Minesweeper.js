import Board from './Board';
import DashBoard from './DashBoard'
import SettingForm from './SettingForm'
import React, { Component } from 'react'
import { difficultyValidation } from './Auxiliary'
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

    changeFlag = (num) => {
        this.setState({FLAG: num})
    }
    
    start = () => {
        this.setState({STATUS: settings.STATUS.RUNNING})
    }
    
    end = () => {
        this.setState({STATUS: settings.STATUS.ENDED})
    }

    victory = () => {
        this.end()
        this.setState({STATUS: settings.STATUS.VICTORY})
    }
    
    lost = () => {
        this.end()
        this.setState({STATUS: settings.STATUS.LOST})
    }

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




