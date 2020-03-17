import React, { Component } from "react";
import BoardClass from './BoardClass';
import CellComponent from './CellComponent';
import settings from '../settings.json';


// func: victory, lost, status, difficulty, flag_delta

class Board extends Component {
    constructor(props) {
        super(props);
        this.restart();
    }

    componentDidUpdate = (preProp, preState) => {
        if (this.props.status === settings.STATUS.ENDED && preProp.status === settings.STATUS.RUNNING){
            this.board.flipBoard();
            this.forceUpdate();
        }
        if (preProp.gamecount === this.props.gamecount) return;
        this.restart();
    }

    restart = () => {
        const {width, height, mines} = this.props.difficulty
        this.board = new BoardClass(width, height, mines)
        this.forceUpdate()
    }


    action = (isOpen, cell) => {
        const {i, j} = cell
        return () => {
            if (isOpen) {
                this.open(i, j)
            } else {
                this.flag(i, j)
            }
            this.forceUpdate()
        }
    }
    
    open = (row, col) => {
        if(this.props.status === settings.STATUS.BEGIN) {
            this.props.start();
        }
        this.board.open(row, col)
        this.props.changeFlag(this.board.availableFlags);
        if (this.board.validateLost(row, col)) this.props.lost();
    }

    flag = (row, col) => {   
        if(this.props.status === settings.STATUS.BEGIN) {
            this.props.start();
        } 
        this.board.flag(row, col)
        this.props.changeFlag(this.board.availableFlags);
        if (this.board.validateVictory()) this.props.victory();
    }

    map = (grid) => {
        const mapCell = (cell, ind) => {
            let cellComponent = CellComponent(cell, this.action, ind)
            return cellComponent
        }
        const mapRow = (row, ind) => {
            const col = row.map(mapCell)
            return (<div key={ind} className="row">{col}</div>)
        }
        return grid.map(mapRow)
    }

    
    render () {
        const mapping = this.map(this.board.board)
        return (
            <div className="body">
                {mapping}
            </div>
        )
    }
}

export default Board;
