import React from 'react';
import ReactDOM from 'react-dom';
// import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import reducer from './reducer'
import './config'

import Authroute from './component/authroute/authroute'
import Login from './container/login/login.js'
import Register from './container/register/register.js'

const store = createStore(reducer, compose(
	applyMiddleware(thunk),
	window.devToolsExtension?window.devToolsExtension():f=>f
))

ReactDOM.render(
	(
		<Provider store={store}>
			<BrowserRouter>
				<div>
					<Authroute></Authroute>
					<Route path='/login' component={Login}></Route>
					<Route path='/register' component={Register}></Route>
				</div>
			</BrowserRouter>
		</Provider>
	), document.getElementById('root'));
// registerServiceWorker();
