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
import Login from './container/login/login'
import Register from './container/register/register'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import Dashboard from './container/dashboard/dashboard'

const store = createStore(reducer, compose(
	applyMiddleware(thunk),
	window.devToolsExtension?window.devToolsExtension():f=>f
))

// boss genius me msg 四個頁面
ReactDOM.render(
	(
		<Provider store={store}>
			<BrowserRouter>
				<div>
					<Authroute></Authroute>
					<Switch>
						<Route path='/bossinfo' component={BossInfo}></Route>
						<Route path='/geniusinfo' component={GeniusInfo}></Route>
						<Route path='/login' component={Login}></Route>
						<Route path='/register' component={Register}></Route>
						<Route component={Dashboard}></Route>
					</Switch>					
				</div>
			</BrowserRouter>
		</Provider>
	), document.getElementById('root'));
// registerServiceWorker();
