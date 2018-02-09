import React from "react";
import store from '../redux/store';
import actions from '../redux/actions';

/**Calculate grid column and row count based on table pixel width */
const calcDimensions = (tableWidth, cellWidth, cellCount) => {
    const columns = Math.max(0, (tableWidth / cellWidth).toFixed(0) -1);
    const rows = Math.max(0, Math.ceil(cellCount / columns));
    return {columns, rows};
}

/**Table container */
module.exports = class TableResisizer extends React.Component {
    tableEl;

    constructor(props){
        super();
        this.props = props;
        this.onResizeLocal = this.onResize.bind(this);
    }

    componentDidMount(){
        window.addEventListener('resize', this.onResizeLocal)
        this.calcGridSize(this.props.cellWidth, this.props.cells, this.props.tableIndex, this.tableEl.clientWidth);
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.onResizeLocal)        
    }

    onResize(){
        if (!this.tableEl){return;}
        const clientWidth = Math.round(this.tableEl.clientWidth);
        if (clientWidth === this.props.absoluteWidth) {return;}
        this.calcGridSize(this.props.cellWidth, this.props.cells, this.props.tableIndex, this.tableEl.clientWidth);
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.cells && nextProps.cells !== this.props.cells)
        {
            this.calcGridSize(nextProps.cellWidth, nextProps.cells, nextProps.tableIndex, this.tableEl.clientWidth);
        }
    }

    componentDidUpdate(prevProps, prevState){
        if (this.props.cells && prevProps.configuration.widthPercent !== this.props.configuration.widthPercent)
        {
            this.calcGridSize(this.props.cellWidth, this.props.cells, this.props.tableIndex, this.tableEl.clientWidth);
        }
    }

    calcGridSize(cellWidth, cells, tableIndex, tableWidth){
        if (!cellWidth || !cells) {return;}

        const {columns, rows} = calcDimensions(tableWidth, cellWidth, cells.length);

        store.dispatch({
            type: actions.RESIZE_TABLE,
            payload:{
                absoluteWidth: tableWidth,
                columns: columns,
                rows: rows,
                tableIndex: tableIndex
            }
        });

    }

    render(){
        return <div id={this.props.name} className="table-container" 
            style={{width: `${this.props.configuration.widthPercent}%`, "borderColor": this.props.color}} 
            ref={(el)=> {this.tableEl = el;}}>
            {this.props.children}
        </div>;
    }

} 