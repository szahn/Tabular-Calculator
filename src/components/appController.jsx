import React from "react";
import Table from "./table.jsx";
import TableContainer from "./tableContainer.jsx";
import ControlPanel  from "./tableControlPanel.jsx";
import store from '../redux/store';
import actions from '../redux/actions';

const TernaryComponent = ({isVisible, onVisible, onHidden}) =>  isVisible 
    ? (onVisible ? onVisible() : null) 
    : (onHidden ? onHidden() : null);

module.exports = class AppController extends React.Component{
    onStoreChangedUnsubscriber;   

    constructor(){
        super();
        this.onStoreChangedLocal = this.onStoreChanged.bind(this);
        this.state = {};
    }

    componentWillMount(){
        this.onStoreChangedUnsubscriber = store.subscribe(this.onStoreChangedLocal);
        this.onStoreChanged();
    }

    componentDidMount(){
        this.calcAllTables();
    }

    /**Calculate the data for each table */
    calcAllTables(){
        for (let i = 0; i <this.state.tables.length;i++){
            store.dispatch({
                type: actions.CALC_TABLE,
                payload: Object.assign({}, this.state.tables[i].configuration, {tableIndex: i})
            });                            
        }
    }

    componentWillUnmount(){
        this.onStoreChangedUnsubscriber();
    }

    onStoreChanged(){
        const state = store.getState();
        this.setState(state);
    }

    onConfigureClicked(tableIndex, e){
        e.stopPropagation();
        e.preventDefault();

        store.dispatch({
            type: actions.CONFIGURE_TABLE,
            payload:{
                tableIndex: tableIndex
            }
        });

        return false;
    }

    render(){
        const {tables, controlPanel} = this.state;
        if (!tables) {return null;}

        return <div>
            {tables.map((table, i) => 
                <TableContainer key={i} tableIndex={i} {...table}>
                    <TernaryComponent isVisible={table.cells} 
                        onVisible={()=><Table {...table}/>}
                        onHidden={()=><span>No cells to render.</span>}/>                    
                    <div className="control-panel">
                        <button onClick={this.onConfigureClicked.bind(this, i)}>Configure</button>
                        <span className="float-right">{table.configuration.widthPercent}%</span>
                    </div>                
                </TableContainer>
            )}
            
            <TernaryComponent isVisible={controlPanel && Number.isInteger(controlPanel.tableIndex)} 
                onVisible={() => <ControlPanel tableIndex={controlPanel.tableIndex} 
                    table={this.state.tables[controlPanel.tableIndex]}/>}/>
        </div>;        
    }

}
