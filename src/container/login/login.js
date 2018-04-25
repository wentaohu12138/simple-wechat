import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'

import {login} from '../../redux/user.redux' 
import Logo from '../../component/logo/logo'
import imoocForm from '../../component/imooc-form/imooc-form'


@connect(
	state=>state.user,
	{login}
)
@imoocForm
class Login extends Component {
	constructor(props) {
		super(props)


		this._login = this._login.bind(this)
	}

	register() {
		console.log(this.props)
		this.props.history.push('/register')
	}


	_login() {
		this.props.login(this.props.state)
	}

	render() {
		return (
			<div>
				{this.props.redirectTo&&this.props.redirectTo!=='/login'?<Redirect to={this.props.redirectTo}/>:null}
				<Logo></Logo>
				<h2>登陸頁</h2>	
				<WingBlank>
					<List>
						<p className='res-msg'>{this.props.msg}</p>
						<InputItem value={this.props.state.user} onChange={v=>this.props.handleChange('user',v)}>用戶名</InputItem>
						<WhiteSpace></WhiteSpace>
						<InputItem value={this.props.state.pwd} onChange={v=>this.props.handleChange('pwd',v)} type='password'>密碼</InputItem>
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