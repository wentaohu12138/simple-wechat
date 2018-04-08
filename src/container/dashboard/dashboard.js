import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'
import NavLinkBar from '../../component/navlink/navlink.js'


function Boss () {
	return <h3>Boss 首頁</h3>
}

function Genius() {
	return <h3>牛人 首頁</h3>
}

function Msg() {
	return <h3>消息列表</h3>
}

function User() {
	return <h3>個人中心</h3>
}

@connect (
	state=>state
)
class Dashboard extends Component {

	constructor(props) {
		super(props)
	}


	render() {
		const {pathname} = this.props.location
		const user = this.props.user
		const navList = [
			{
				path: '/boss',
				text: '牛人',
				icon: 'boss',
				title: '牛人列表',
				component: Boss,
				hide:user.type=='1'
			},
			{
				path: '/genius',
				text: '牛人',
				icon: 'job',
				title: 'BOSS列表',
				component: Genius,
				hide:user.type=='0'
			},
			{
				path: '/msg',
				text: '消息',
				icon: 'msg',
				title: '消息列表',
				component: Msg				
			},
			{
				path: '/me',
				text: '個人中心',
				icon: 'user',
				title: '個人中心',
				component: User				
			}
		]
		return (
			<div>
				<NavBar mode='dard'>{navList.find(v=>v.path==pathname).title}</NavBar>		
			
				<NavLinkBar data={navList}></NavLinkBar>
			</div>
		)
	}
}

export default Dashboard