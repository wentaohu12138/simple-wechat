import React, { Component } from 'react'
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'
import AvatarSelector from '../../component/avatarSelector/avatarSelector'

class BossInfo extends Component {
	constructor(props) {
		super(props)
		this.state = {
			title: '',
			avatar: ''
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
		return (
		<div>
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
			<Button type='primary'>提交</Button>
		</div>
		)
	}
}

export default BossInfo