import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, InputItem, Radio, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import {Redirect} from 'react-router-dom'
import Logo from '../../component/logo/logo'
import {register} from '../../redux/user.redux'
import imoocForm from '../../component/imooc-form/imooc-form'
import './register.css'


@connect(
	state=>state.user,
	{register}
)
@imoocForm
class Register extends Component {
	constructor(props) {
		super(props)
		this.state = {
			user: '',
			pwd: '',
			repeatpwd: '',
			type: 'genius' //0表示求職，1表示招聘
		}


		this._registerHandle = this._registerHandle.bind(this)
		console.log(this.props)
	}

	componentDidMount() {
		this.props.handleChange('type', 'genius')
	}

	_registerHandle(e) {
		this.props.register(this.props.state)
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
					<InputItem value={this.props.state.user} onChange={v=>this.props.handleChange('user',v)}>用戶名</InputItem>
					<WhiteSpace/>
					<InputItem type='password' value={this.props.state.pwd} onChange={v=>this.props.handleChange('pwd',v)}>密碼</InputItem>
					<WhiteSpace/>
					<InputItem type='password' value={this.props.state.repeatpwd} onChange={v=>this.props.handleChange('repeatpwd',v)}>重複密碼</InputItem>
					<WhiteSpace/>
					<RadioItem checked={this.props.state.type=='genius'} onChange={v=>this.props.handleChange('type', 'genius')}>求職</RadioItem>
					<RadioItem checked={this.props.state.type=='boss'} onChange={v=>this.props.handleChange('type', 'boss')}>招聘</RadioItem>
				</List>
				<WhiteSpace/>
				<Button  type='primary' onClick={this._registerHandle}>注冊</Button>
			</WingBlank>
		</div>
	}
}

export default Register