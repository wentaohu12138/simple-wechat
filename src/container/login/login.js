import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'

import {login} from '../../redux/user.redux' 
import Logo from '../../component/logo/logo'

@connect(
	state=>state.user,
	{login}
)
class Login extends Component {
	constructor(props) {
		super(props)
		this.state = {
			user: '',
			pwd: ''
		}

		this._inputUserName = this._inputUserName.bind(this)
		this._inputPwd = this._inputPwd.bind(this)
		this._login = this._login.bind(this)
	}

	register() {
		console.log(this.props)
		this.props.history.push('/register')
	}

	_inputUserName(value) {
		this.setState({user:value})
	}

	_inputPwd(value) {
		this.setState({pwd:value})
	}

	_login() {
		this.props.login(this.state)
	}

	render() {
		return (
			<div>
				{this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null}
				<Logo></Logo>
				<h2>登陸頁</h2>	
				<WingBlank>
					<List>
						<p className='res-msg'>{this.props.msg}</p>
						<InputItem value={this.state.user} onChange={this._inputUserName}>用戶名</InputItem>
						<WhiteSpace></WhiteSpace>
						<InputItem value={this.state.pwd} onChange={this._inputPwd} type='password'>密碼</InputItem>
					</List>
					<Button type='primary' onClick={this._login}>登陸</Button>
					<WhiteSpace/>
					<Button onClick={this.register.bind(this)} type='primary'>注冊</Button>
				</WingBlank>
			</div>
			)
	}
}

export default Login