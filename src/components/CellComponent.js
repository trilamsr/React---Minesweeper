import React from 'react';



const uselessClick = (e, func)=> {
    e.preventDefault();
    return func
}

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

const closeCase = (cell, action, ind) => {
    return (<div
        key={ind} 
        className="cell"
        onClick={action(true, cell)}
        onContextMenu={(e) => {
            e.preventDefault()
            action(false, cell)()
        }}
    >
        {cell.toString()}
    </div>)
}

const CellComponent = (cell, action, ind) => {
    if (cell.opened) return openCase(cell, ind)
    return closeCase(cell, action, ind)
}

export default CellComponent;