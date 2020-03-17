import React, { Component } from "react";
import BoardClass from '../Class/BoardClass';
import CellComponent from './Cell';
import { STATUS } from '../settings.json';


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
        if(this.props.status === STATUS.BEGIN) {
            this.props.setStatus(STATUS.RUNNING)
        }
        this.board.open(row, col);
        this.props.changeFlag(this.board.availableFlags);
        this.setStatus(true, row, col);
    }

    // React level to flag a cell. Separate class abstraction
    flag = (row, col) => {   
        if(this.props.status === STATUS.BEGIN) {
            this.props.setStatus(STATUS.RUNNING);
        } 
        this.board.flag(row, col);
        this.props.changeFlag(this.board.availableFlags);
        this.setStatus(false, row, col);
    }
    
    // Check if the game has ended in win/lost after every move
    setStatus = (isOpen, row, col) => {
        const gameStatus = this.board.gameStatus(isOpen, row, col)
        this.props.setStatus(gameStatus);
    }

    // Map is to render JSX
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
        const JSX = this.map(this.board.board)
        return (
            <div className="body">
                {JSX}
            </div>
        )
    }
}

export default Board;
