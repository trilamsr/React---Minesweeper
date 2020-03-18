import React, { Component } from 'react';
import { DIFFICULTY } from '../settings.json';

class SettingForm extends Component {
    // Handling changing difficulty
    changeData = e => {
        const {name} = this.props
        e.preventDefault()
        this.props.handleFormChange(name, e.target[name].value);
    }

    // JSX for forms
    render () {
        const {status, name} = this.props
        const winStatus = status === 3 ? "VICTORY" : status === 4 ? "GAME OVER" : ""
        const selections = Object.keys(DIFFICULTY).map((key, ind )=> <option key={ind}>{key}</option>)
        return (
            <div className="footer">
                <h2>{winStatus}</h2>
                <h4>{name}</h4>
                <form onSubmit={this.changeData} >
                    <div className="select">
                        <select name={name}>
                            {selections}
                        </select>
                    </div>
                    <input type="submit" value="Restart" className="button"/>
                </form>
            </div>
        )
    }
}

export default SettingForm;
