class Cell {
    constructor () {
        this.neighborMine = 0;
        this.isMine = false;
        this.flagged = false;
        this.opened = false;
        this.i = -1;
        this.j = -1;
    }

    // Change neighborMine count when setting the game
    incrementMine () {
        this.neighborMine += 1
    }

    // What to display on board
    toString() {
        if (this.opened) {
            return this.isMine ? "⚠" : `${this.neighborMine === 0 ? " " : this.neighborMine}`
        }
        return this.flagged ? "⚐" : " "
    }
}

export default Cell