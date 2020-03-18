// Maximum time to display is 100 minutes or 99:59. Then reset
function transformTime (milisec) {
    const sec = Math.floor(milisec/1000)
    const overFlow = sec%6000
    const minute = Math.floor(overFlow/60)
    const second = overFlow - minute*60
    const left = minute > 9 ? `${minute}` : `0${minute}` 
    const right = second > 9 ? `${second}` : `0${second}`
    return `${left}:${right}`
}

// Yielding all i, j coordinates of a grid
function* gridIterator(grid) {
    const [width, height] = [grid[0].length, grid.length];
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            yield [i, j]
        }
    }
}

// Provide a coordinate to get neighbors'
function* neighborCoordinate(i, j) {
    for (let di = -1; di <= 1; di++){
        for (let dj = -1; dj <= 1; dj++){
            if (di === dj && di=== 0) continue;
            yield [i+di, j+dj]
        }
    }
}

// Swapping element inside a board
function swapGrid(grid, i, j, row, col) {
    [grid[i][j], grid[row][col]] = [grid[row][col], grid[i][j]] 
}

module.exports = {
    transformTime, gridIterator, swapGrid, neighborCoordinate
}