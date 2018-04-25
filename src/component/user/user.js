import React from 'react'
import {connect} from 'react-redux'
import {Result, List, WhiteSpace, Modal} from 'antd-mobile'
import browserCookie from 'browser-cookies'
import {logoutSubmit} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'

@connect(
	state=>state.user,
	{logoutSubmit}
)
class User extends React.Component {
	constructor(props) {
		super(props)
		this.logout = this.logout.bind(this)
	}
	logout() {
		// browserCookie.erase('userid')
		// window.location.href = window.location.href
		const alert = Modal.alert

		alert('注銷','確認退出登錄？？', [
			{text: '取消', onPress: ()=>console.log('cancel')},
			{text: '確認', onPress:()=>{
				browserCookie.erase('userid')
				this.props.logoutSubmit()				
			}}
		])
	}
	render(){
		const props = this.props
		const Item = List.Item
		const Brief = Item.Brief
		return props.user?(
			<div>
				<Result
					img={<img src={require(`../imgs/${props.avatar}.jpg`)} alt=""/>}
					title={props.user}
					message={props.type=='boss'?props.company:null}
				/>
				<List renderHeader={()=>'簡介'}>
					<Item
						multipleLine
					>
						{props.title}
						{props.desc.split('\n').map((item, index)=>{
							
							return(<Brief key={index}>{item}</Brief>)
						})}
						{props.money?<Brief>薪資:{props.money}</Brief>:null}
					</Item>
				</List>
				<WhiteSpace></WhiteSpace>
				<List>
					<Item onClick={this.logout}>退出登录</Item>
				</List>
			</div>

		):<Redirect to={props.redirectTo}/>
	}
}

export default User