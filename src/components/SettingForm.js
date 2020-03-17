import React, { Component } from "react";

class SettingForm extends Component {
    changeData = e => {
        e.preventDefault()
        this.props.handleChange(this.props.name, e.target.difficulty.value);
    }

    componentDidMount () {
        this.props.handleChange(this.props.name, "Easy");
    }

    render () {
        const {status, name} = this.props
        const winStatus = status === 3 ? "VICTORY" : status === 4 ? "GAME OVER" : ""
        return (
            <div className="footer">
                <h2>{winStatus}</h2>
                <h4>{name}</h4>
                <form onSubmit={this.changeData} >
                    <div className="select">
                        <select name="difficulty">
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                        </select>
                    </div>
                    <input type="submit" value="Restart" className="button"/>
                </form>
            </div>
        )
    }
}

export default SettingForm;
