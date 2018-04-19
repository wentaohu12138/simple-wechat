import React,{Component} from 'react'
// import axios from 'axios' 
import {Card, WhiteSpace, WingBlank} from 'antd-mobile'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuser.redux'


@connect(
	state=>state.chatuser,
	{getUserList}
)
class Boss extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data:[]
		}
	}

	componentDidMount() {
		this.props.getUserList('0')
	}

	render() {
		// console.log(this.state.data)
		const Header = Card.Header
		return (
			<WingBlank size="lg">
				{this.props.userList.map((v, index)=>(
					v.avatar?<Card key={index}>
						<Card.Header
							title={v.user}
							thumb={require(`../imgs/${v.avatar}.jpg`)}
							extra={<span>{v.title}</span>}
						></Card.Header>
						<Card.Body>{v.desc.split('\n').map((v,i)=>(
							<div key={i}>{v}</div>
						))}</Card.Body>
					</Card>:null
				))}
			</WingBlank>
		)
	}
}

export default Boss