import React,{Component} from 'react'
// import axios from 'axios' 
// import {Card, WhiteSpace, WingBlank} from 'antd-mobile'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuser.redux'
import UserCard from '../usercard/usercard'


@connect(
	state=>state.chatuser,
	{getUserList}
)
class Boss extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.props.getUserList('genius')
	}

	render() {
		// console.log(this.state.data)
		// const Header = Card.Header
		return <UserCard userList={this.props.userList}></UserCard>
	}
}

export default Boss