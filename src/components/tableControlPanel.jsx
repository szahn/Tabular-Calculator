import React from 'react';
import store from '../redux/store';
import actions from '../redux/actions';

module.exports = class TableControlPanel extends React.Component  {

    constructor(props){
        super();
        this.onOkLocal = this.onOk.bind(this);
        this.onCancelLocal = this.onCancel.bind(this);
        this.props = props;
        this.state = Object.assign({}, props.table.configuration || {});
    }

    componentWillReceiveProps(nextProps){
        this.setState(Object.assign({}, nextProps.table.configuration || {}));
    }

    validate(){
        let errors = [];

        const lowerBound = parseInt(this.state.lowerBound, 10);
        const upperBound = parseInt(this.state.upperBound, 10);
        const step = parseInt(this.state.step, 10);
        const widthPercent = parseInt(this.state.widthPercent, 10);
        
        if (!Number.isInteger(lowerBound)){
            errors.push("N must be a number.");
        }

        if (!Number.isInteger(upperBound)){
            errors.push("M must be a number.");
        }
        
        if (!Number.isInteger(step)){
            errors.push("X must be a number.");
        }

        if (step === 0){
            errors.push("X must be not be 0.");            
        }

        if (step > 0 && upperBound <= Math.min(upperBound, lowerBound)){
            errors.push("M must be greater than N.");            
        }

        if (!Number.isInteger(widthPercent)){
            errors.push("W must be a number.");
        }

        if (widthPercent < 10 || widthPercent > 90){
            errors.push("W must be between 10 and 90.");
        }

        if (!errors.length) {return true;}

        this.setState({
            validationSummary: errors.join(" ")
        });
    }

    onOk(e){
        e.stopPropagation();
        e.preventDefault();

        if (!this.validate()){return false;}

        var {lowerBound, upperBound, step, widthPercent, seriesOrder} = this.state;
        
        const payload = {
            tableIndex: this.props.tableIndex,
            lowerBound: parseInt(lowerBound, 10),
            upperBound: parseInt(upperBound, 10),
            widthPercent: parseInt(widthPercent, 10),
            seriesOrder: parseInt(seriesOrder, 10),
            step: parseInt(step, 10)
        };

        store.dispatch({
            type: actions.CALC_TABLE,
            payload: payload
        });

        return false;
    }

    onCancel(e){
        e.stopPropagation();
        e.preventDefault();

        store.dispatch({
            type: actions.CONFIGURE_TABLE,
            payload:{
                tableIndex: null
            }
        });

        return false;
    }

    onFieldChange(prop, e){
        const value = e.target.value;
        this.setState(s=>{
            s[prop] = value;
            return s;
        });
    }

    render(){
        const {table} = this.props;
        if (!table) return null;

        return <form>
            <fieldset>
                <legend>Table: <span className="uppercase" style={{color: table.color}}>{table.name}</span></legend>
                {this.state.validationSummary ? 
                    <p className="validation-summary">Error: {this.state.validationSummary}</p> : null}
                <div className="input-row">
                    <label htmlFor="n">N = </label>
                    <input type="text" name="n" id="inputN" value={this.state.lowerBound} 
                        onChange={this.onFieldChange.bind(this, 'lowerBound')}/>
                </div>
                <div className="input-row">
                    <label htmlFor="x">X = </label>
                    <input type="text" name="x" id="inputX" value={this.state.step}
                        onChange={this.onFieldChange.bind(this, 'step')}/>
                </div>
                <div className="input-row">
                    <label htmlFor="m">M = </label>
                    <input type="text" name="m" id="inputM" value={this.state.upperBound}
                        onChange={this.onFieldChange.bind(this, 'upperBound')}/>
                </div>
                <div className="input-row">
                    <label htmlFor="w">W = </label>
                    <input type="text" name="w" id="inputW" value={this.state.widthPercent}
                        onChange={this.onFieldChange.bind(this, 'widthPercent')}/>%
                </div>
                <div className="input-row">
                    <label htmlFor="d">D = </label>
                    <select name="d" value={this.state.seriesOrder} onChange={this.onFieldChange.bind(this, 'seriesOrder')}>
                        <option value="0">LTR-UP</option>
                        <option value="1">RTL-UP</option>
                    </select>
                </div>
                <div className="block">
                    <button className="margin-5" onClick={this.onOkLocal}>OK</button>
                    <button className="margin-5" onClick={this.onCancelLocal}>Cancel</button>
                </div>
            </fieldset>
        </form>;
    }
}