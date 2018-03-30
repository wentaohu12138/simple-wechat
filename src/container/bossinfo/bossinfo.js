import React, { Component } from 'react'
import {NavBar, InputItem, TextareaItem, Button, WingBlank} from 'antd-mobile'
import AvatarSelector from '../../component/avatarSelector/avatarSelector'
import {connect} from "react-redux"
import {update} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'


@connect(
	state=>state.user,
	{update}
)
class BossInfo extends Component {
	constructor(props) {
		super(props)
		this.state = {
			title: '',
			avatar: '',
			company: '',
			money: '',
			desc: ''
		}
	}

	onChange(key, val) {
		this.setState({
			[key]:val
		})
	}

	selectAvatar(imageName) {
		this.setState({
			avatar:imageName
		})
	}

	render() {
		const path = this.props.location.pathName
		const redirect = this.props.redirectTo
		return (
		<div>
			{redirect && redirect !== path?<Redirect to={redirect}/>:null}
			<NavBar mode="dark">BOSS信息完善</NavBar>
			<AvatarSelector 
				selectAvatar = {this.selectAvatar.bind(this)}
			></AvatarSelector>
			<InputItem onChange={(v)=>this.onChange('title',v)}>招聘職位</InputItem>
			<InputItem onChange={(v)=>this.onChange('company',v)}>公司名稱</InputItem>
			<InputItem onChange={(v)=>this.onChange('money',v)}>職位薪資</InputItem>
			<TextareaItem onChange={(v)=>this.onChange('desc',v)}
				rows={3}
				autoHeight
				title='職位要求'
			></TextareaItem>
			<WingBlank>
				<Button 
					onClick={()=>this.props.update(this.state)}
					type='primary'>提交</Button>
			</WingBlank>		
		</div>
		)
	}
}

export default BossInfo