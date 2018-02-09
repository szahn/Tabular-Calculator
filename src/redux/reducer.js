import calcTable from './calcTable';
import actions from './actions';

module.exports = (state, action) => {
    switch (action.type){
        case actions.CONFIGURE_TABLE:{

            if (action.payload.tableIndex === null){
                state.controlPanel = null;
            }
            else{
                state.controlPanel = {
                    tableIndex: action.payload.tableIndex
                }
            }

            return state;
        }
        case actions.CALC_TABLE:{
            const config = action.payload;
            const {cells, cellWidth} = calcTable(config);

            state.tables[config.tableIndex] = Object.assign({}, state.tables[config.tableIndex], {
                configuration: config,
                cells: cells,
                cellWidth: cellWidth,
                columns: null, 
                rows: null
            });

            state.controlPanel = null;
            return state;
        }
        case actions.RESIZE_TABLE:{
            const {absoluteWidth, columns, rows, tableIndex} = action.payload;
            state.tables[tableIndex] = Object.assign({}, state.tables[tableIndex], {
                absoluteWidth: absoluteWidth,
                columns: columns,
                rows: rows,
            });

            return state;
        }
        default:
        {
            return state;
        }
    }
}