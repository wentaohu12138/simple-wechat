import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, InputItem, Radio, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import {Redirect} from 'react-router-dom'
import Logo from '../../component/logo/logo'
import {register} from '../../redux/user.redux'

import './register.css'


@connect(
	state=>state.user,
	{register}
)
class Register extends Component {
	constructor(props) {
		super(props)
		this.state = {
			user: '',
			pwd: '',
			repeatpwd: '',
			type: '0' //0表示求職，1表示招聘
		}

		this._inputNameHandle = this._inputNameHandle.bind(this)
		this._inputPassHandle = this._inputPassHandle.bind(this)
		this._inputRePassHandle = this._inputRePassHandle.bind(this)
		this._changeTypeF = this._changeTypeF.bind(this)
		this._changeTypeS = this._changeTypeS.bind(this)
		this._registerHandle = this._registerHandle.bind(this)
		console.log(this.props)
	}

	_inputNameHandle(value) {
		// console.log(value)
		this.setState({user: value});
	}

	_inputPassHandle(value) {
		this.setState({pwd: value})
	}

	_inputRePassHandle(value) {
		this.setState({repeatpwd: value})
	}

	_changeTypeS() {
		this.setState({type: '1'})
	}

	_changeTypeF() {
		this.setState({type: '0'})
	}

	_registerHandle(e) {
		this.props.register(this.state)
	}

	render() {
		const RadioItem = Radio.RadioItem
		return <div>
			{this.props.redirectTo? <Redirect to={this.props.redirectTo} />: null}
			<Logo/>
			<h2>注冊頁</h2>
			<WingBlank>
				<List>
					<p className='res-msg'>{this.props.msg}</p>
					<InputItem value={this.state.user} onChange={this._inputNameHandle}>用戶名</InputItem>
					<WhiteSpace/>
					<InputItem type='password' value={this.state.pwd} onChange={this._inputPassHandle}>密碼</InputItem>
					<WhiteSpace/>
					<InputItem type='password' value={this.state.repeatpwd} onChange={this._inputRePassHandle}>重複密碼</InputItem>
					<WhiteSpace/>
					<RadioItem checked={this.state.type=='0'} onChange={this._changeTypeF}>求職</RadioItem>
					<RadioItem checked={this.state.type=='1'} onChange={this._changeTypeS}>招聘</RadioItem>
				</List>
				<WhiteSpace/>
				<Button  type='primary' onClick={this._registerHandle}>注冊</Button>
			</WingBlank>
		</div>
	}
}

export default Register