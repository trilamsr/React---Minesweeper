import CellClass from './CellClass';
import { gridIterator, swapGrid, neighborCoordinate } from './Utilities';
import { STATUS } from '../settings.json';

class BoardClass {
    constructor (width = 10, height = 10, mines = 10) {
        this.width = width;
        this.height = height;
        this.usedFlag = 0;
        this.mines = mines;
        this.goodFrag =  0;
        this.setGame();
    }
    // To display flags left to plant
    get availableFlags() {
        return this.mines - this.usedFlag
    }

    // Set game create grid add mines sequentially, shuffle the board, then set neighbors' values
    setGame() {
        const {width, height, mines} = this
        this.makeGrid(height, width).addMine(mines).shuffle().setNeighbor()
        return this
    }

    makeGrid(height, width) {
        this.board = [];
        for (let i = 0; i < height; i++){
            let row = [];
            for (let j = 0; j < width; j++){
                row.push(new CellClass())
            }
            this.board.push(row);
        }
        return this;
    }

    addMine(mines) {
        const boardSize = this.width*this.height
        const count = mines <= boardSize ? mines : boardSize;
        const iter = gridIterator(this.board);
        for (let cur = 0; cur < count; cur++) {
            const [i, j] = iter.next().value
            this.board[i][j].isMine = true;
        }
        return this;
    }

    shuffle() {
        const {width, height} = this
        for (let [i, j] of gridIterator(this.board)) {
            const row = Math.floor(Math.random()*height) ;
            const col = Math.floor(Math.random()*width) ;
            swapGrid(this.board, i, j, row, col);
        }
        return this;
    }

    setNeighbor() {
        for (let [i, j] of gridIterator(this.board)) {
            let curCell = this.board[i][j]
            curCell.i = i; curCell.j = j;
            if (!curCell.isMine) continue;
            for (let [neiI, neiJ] of neighborCoordinate(i, j)) {
                if (!this.inbound(neiI, neiJ)) continue;
                let neiCell = this.board[neiI][neiJ];
                neiCell.incrementMine();
            }
        }
        return this;
    }
    
    // Check for out of bound condition. So (-1, 0) is out of bound
    inbound(i, j) {
        const height = 0 <= i && i < this.height;
        const width = 0 <= j && j < this.width;
        return height && width;
    }
    
    // Flip cell action using dfs
    open(i, j) {
        let curCell = this.board[i][j];
        if (curCell.isMine || curCell.opened) return 
        if (curCell.flagged) this.usedFlag -= 1;
        curCell.opened = true;
        if (curCell.neighborMine === 0) {
            for ( let [neiI, neiJ] of neighborCoordinate(i, j)) {
                if (!this.inbound(neiI, neiJ)) continue;
                if (this.board[neiI][neiJ].opened) continue;
                this.open(neiI, neiJ);
            }
        }
    }

    // Flagging action
    flag(i, j) {
        const cell = this.board[i][j]
        if (cell.isMine) {
            this.goodFrag = cell.flagged ? this.goodFrag - 1 : this.goodFrag + 1;
        }
        if (!cell.flagged && this.availableFlags === 0) return;
        this.usedFlag = cell.flagged ? this.usedFlag - 1 : this.usedFlag + 1
        cell.flagged = !cell.flagged;
    }

    // Check win-lost condition
    gameStatus (isOpen, row, col) {
        const cell = this.board[row][col];
        const lostCondition = cell.isMine && isOpen;
        const winCondition = this.goodFrag === this.mines
        if (winCondition || lostCondition) this.flipBoard ();
        return lostCondition ? STATUS.LOST :
            winCondition ? STATUS.VICTORY : STATUS.RUNNING
    }

    // Turn everything over when game end
    flipBoard() {
        for (let [i, j] of gridIterator(this.board)) {
            this.board[i][j].opened = true;
        }
    }
}

export default BoardClass