import React from 'react';

// To ensure left and right clicking does not have side effects
const uselessClick = e => {
    e.preventDefault();
}

// If cell is already open. Do nothing when clicked
const openCase = (cell, ind) => {
    const string = cell.toString();
    return (
        <div
            key={ind}
            className="cell opened"
            onClick={uselessClick}
            onContextMenu={uselessClick}
        >{string}</div>
    )
}

// Handling click when cell is not open
const closeCase = (cell, action, ind) => {
    return (<div
        key={ind} 
        className="cell"
        onClick={
            action(true, cell)
        }
        onContextMenu={(e) => {
            e.preventDefault()
            action(false, cell)()
        }}
    >{cell.toString()}
    </div>)
}

// Stateless function React component for cell
const CellComponent = (cell, action, ind) => {
    if (cell.opened) return openCase(cell, ind)
    return closeCase(cell, action, ind)
}

export default CellComponent;