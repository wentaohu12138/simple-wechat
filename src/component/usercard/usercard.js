import React,{Component} from 'react'
import {Card, WhiteSpace, WingBlank} from 'antd-mobile'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

@withRouter
class UserCard extends Component {
	static propTypes ={
		userList: PropTypes.array.isRequired
	}
	handleClick(v) {
		this.props.history.push(`/chat/${v._id}`)
	}
	render() {
		return (
			<WingBlank size="lg">
				{this.props.userList.map((v, index)=>(
					v.avatar?<Card key={index} 
					onClick={()=>this.handleClick(v)}>
						<Card.Header
							title={v.user}
							thumb={require(`../imgs/${v.avatar}.jpg`)}
							extra={<span>{v.title}</span>}
						></Card.Header>
						<Card.Body>
							{v.type=='boss'?<div>公司:{v.company}</div>:null}
							{v.desc.split('\n').map((d,i)=>(
								<div key={i}>{d}</div>
							))}
							{v.type=='boss'?<div>薪資:{v.money}</div>:null}
						</Card.Body>
					</Card>:null
				))}
			</WingBlank>
		)
	}
}

export default UserCard