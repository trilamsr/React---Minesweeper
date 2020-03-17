class CellClass {
    constructor () {
        this.neighborMine = 0;
        this.isMine = false;
        this.flagged = false;
        this.opened = false;
        this.i = -1;
        this.j = -1;
    }
    incrementMine () {
        this.neighborMine += 1
    }
    toString() {
        if (this.opened) {
            return this.isMine ? "⚠" : `${this.neighborMine === 0 ? " " : this.neighborMine}`
        }
        return this.flagged ? "⚐" : " "
    }
}

export default CellClass