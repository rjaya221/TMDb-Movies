import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { createStore,applyMiddleware } from 'redux';
import postReducer from './redux/reducer';
import { Provider } from 'react-redux';
import dataService from './middleware/dataservice'


//create store input reducer and middleware
console.log("index.js called");
const store = createStore(postReducer,{},applyMiddleware(dataService));
console.log("store created");
ReactDOM.render(<Provider store ={store} ><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root') || document.createElement('div'));
//ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
