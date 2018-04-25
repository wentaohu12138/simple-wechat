import React, {Component} from 'react'
import {getUserList} from '../../redux/chatuser.redux'
import {connect} from 'react-redux'
import UserCard from '../usercard/usercard'


@connect(
	state=>state.chatuser,
	{getUserList}
)
class Genius extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.props.getUserList('boss')
	}

	render() {
		// console.log(this.state.data)
		// const Header = Card.Header
		return <UserCard userList={this.props.userList}></UserCard>
	}
}

export default Genius