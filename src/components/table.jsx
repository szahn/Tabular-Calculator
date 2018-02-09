import React from "react";
import rowBuilder from './rowBuilder.jsx';

/**Table element */
module.exports = ({cellWidth, rows, columns, cells, configuration}) => {
    const rowsElements = rowBuilder(columns, rows, cells, cellWidth, configuration.seriesOrder);
    return <div className="table-body">
        {rowsElements.map((r, i) => <div key={i} className="row">{r}</div>)}
    </div>;
}