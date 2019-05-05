import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from './store/epics';
import thunk from 'redux-thunk';
import Reducer from './store/reducer';
import App from './app';
import './index.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk, createEpicMiddleware(rootEpic)];
const store = createStore(Reducer, composeEnhancers(applyMiddleware(...middleware)));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
