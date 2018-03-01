import React, { Component } from 'react'
import { List, InputItem, Radio, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import Logo from '../../component/logo/logo'



class Register extends Component {
	constructor(props) {
		super(props)
		this.state = {
			userName: '',
			userPassword: '',
			userRePass: '',
			userType: '0' //0表示求職，1表示招聘
		}

		this._inputNameHandle = this._inputNameHandle.bind(this)
		this._inputPassHandle = this._inputPassHandle.bind(this)
		this._inputRePassHandle = this._inputRePassHandle.bind(this)
	}

	_inputNameHandle(value) {
		console.log(value)
		this.setState({userName: value});
	}

	_inputPassHandle(value) {
		this.setState({userPassword: value})
	}

	_inputRePassHandle(value) {
		this.setState({userRePass: value})
	}

	render() {
		const RadioItem = Radio.RadioItem
		return <div>
			<Logo/>
			<h2>注冊頁</h2>
			<WingBlank>
				<List>
					<InputItem value={this.state.userName} onChange={this._inputNameHandle}>用戶名</InputItem>
					<WhiteSpace/>
					<InputItem type='password' value={this.state.userPassword} onChange={this._inputPassHandle}>密碼</InputItem>
					<WhiteSpace/>
					<InputItem type='password' value={this.state.userRePass} onChange={this._inputRePassHandle}>重複密碼</InputItem>
					<WhiteSpace/>
					<RadioItem checked={this.state.userType=='0'}>求職</RadioItem>
					<RadioItem checked={this.state.userType=='1'}>招聘</RadioItem>
				</List>
				<WhiteSpace/>
				<Button  type='primary'>注冊</Button>
			</WingBlank>
		</div>
	}
}

export default Register