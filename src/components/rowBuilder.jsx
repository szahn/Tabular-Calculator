import React from "react";
import seriesOrderingEnum from "../enums/seriesOrderingEnum";

var EmptyCell = ({cellWidth}) => <div className="cell empty" style={{width: cellWidth}}>
    <span className="cell-content"/>
</div>;

var Cell = ({cellWidth, cell}) => <div className="cell" style={{width: cellWidth}}>
    <span className="cell-content">{cell}</span>
</div>;

/**Builds cell elements from cell values on a grid. Returns table rows. */
module.exports = (columnCount, rowCount, cells, cellWidth, seriesOrder) => {
    if (!rowCount || !cells || !columnCount || !cellWidth){return [];}

    const rows = new Array(rowCount);
    
    let idx = 0;
    let isLeftToRight = (seriesOrder === seriesOrderingEnum.LeftToRightUp);
    for (let y = 0; y < rowCount;y++){
        const row = new Array(columnCount);
        
        for(let x = 0; x < columnCount;x++, idx++){
            const rowIdx = isLeftToRight ? x : (columnCount - 1) - x;
            const hasValue = idx < cells.length && cells[idx] !== null;

            row[rowIdx] = hasValue 
                ? <Cell key={idx} cell={cells[idx]} cellWidth={cellWidth}/>
                : <EmptyCell key={idx} cellWidth={cellWidth}/>;
        }

        rows[(rowCount - 1) - y] = row;
        isLeftToRight = !isLeftToRight;
    }

    return rows;
}