import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, InputItem, Radio, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import Logo from '../../component/logo/logo'
import {register} from '../../redux/user.redux'


@connect(
	state=>state.user,
	{register}
)
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
		this._changeTypeF = this._changeTypeF.bind(this)
		this._changeTypeS = this._changeTypeS.bind(this)
		this._registerHandle = this._registerHandle.bind(this)
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

	_changeTypeS() {
		this.setState({userType: '1'})
	}

	_changeTypeF() {
		this.setState({userType: '0'})
	}

	_registerHandle(e) {
		this.props.register(this.state)
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
					<RadioItem checked={this.state.userType=='0'} onChange={this._changeTypeF}>求職</RadioItem>
					<RadioItem checked={this.state.userType=='1'} onChange={this._changeTypeS}>招聘</RadioItem>
				</List>
				<WhiteSpace/>
				<Button  type='primary' onClick={this._registerHandle}>注冊</Button>
			</WingBlank>
		</div>
	}
}

export default Register