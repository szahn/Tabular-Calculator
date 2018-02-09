import {createStore} from 'redux';
import reducer from './reducer';
import initialState from './initialState';

module.exports = createStore(reducer, initialState);
