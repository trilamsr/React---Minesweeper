import React, { Component } from "react";
import BoardClass from '../Class/BoardClass';
import CellComponent from './Cell';
import settings from '../settings.json';


class Board extends Component {
    constructor(props) {
        super(props);
        this.restart();
    }

    // Check to refresh board upon player pressing restart
    componentDidUpdate = (preProp, preState) => {
        if (preProp.gamecount === this.props.gamecount) return;
        this.restart();
    }

    // Welcome to new board
    restart = () => {
        const {width, height, mines} = this.props.difficulty
        this.board = new BoardClass(width, height, mines)
        this.forceUpdate()
    }

    // Closure wrapper function. Passed to cell component for handling clicks
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
    
    // React level to flip a cell. Separate class abstraction
    open = (row, col) => {
        if(this.props.status === settings.STATUS.BEGIN) {
            this.props.start();
        }
        this.board.open(row, col)
        this.props.changeFlag(this.board.availableFlags);
        if (this.board.validateLost(row, col)) this.props.lost();
    }

    // React level to flag a cell. Separate class abstraction
    flag = (row, col) => {   
        if(this.props.status === settings.STATUS.BEGIN) {
            this.props.start();
        } 
        this.board.flag(row, col)
        this.props.changeFlag(this.board.availableFlags);
        if (this.board.validateVictory()) this.props.victory();
    }

    // Map is to render display
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
