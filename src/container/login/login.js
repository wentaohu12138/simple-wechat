import React, { Component } from 'react'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'

import Logo from '../../component/logo/logo'


class Login extends Component {
	constructor(props) {
		super(props)
	}

	register() {
		console.log(this.props)
		this.props.history.push('/register')
	}

	render() {
		return (
			<div>
				<Logo></Logo>
				<h2>登陸頁</h2>	
				<WingBlank>
					<List>
						<InputItem>用戶名</InputItem>
						<WhiteSpace></WhiteSpace>
						<InputItem>密碼</InputItem>
					</List>
					<Button type='primary'>登陸</Button>
					<WhiteSpace/>
					<Button onClick={this.register.bind(this)} type='primary'>注冊</Button>
				</WingBlank>
			</div>
			)
	}
}

export default Login