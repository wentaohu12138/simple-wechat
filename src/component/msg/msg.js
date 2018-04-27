import React from 'react'
import {connect} from 'react-redux'
import {List,Badge} from 'antd-mobile'

@connect(
	state=>state
)
class Msg extends React.Component {
	constructor(props){
		super(props)
	}

	getLast(v){
		return v[v.length-1]
	}
	render() {
		// console.log(this.props.chat.chatmsg)
		const Item = List.Item
		const Brief = Item.Brief
		const userid = this.props.user._id
		const userInfo = this.props.chat.users
		const msgGroup = {}
		this.props.chat.chatmsg.forEach(v=>{
			msgGroup[v.chatid] = msgGroup[v.chatid]||[]
			msgGroup[v.chatid].push(v)
		})
		// console.log(msgGroup)
		const chatList = Object.values(msgGroup)
		chatList.sort((a,b)=>{
			const a_last = this.getLast(a).create_time
			const b_last = this.getLast(b).create_time
			return b_last-a_last
		})
		return (
			<div id='chat-list'>
				{
					chatList.map(v=>{
						const lastMsg = this.getLast(v)
						const targetId = lastMsg.from==userid?lastMsg.to:lastMsg.from
						const unread = v.filter(v=>!v.read&&v.to==userid).length
						console.log(v)
						if(!userInfo[targetId]){
							return null
						}
						return (
							<List key={lastMsg._id}>
								<Item
									extra={<Badge text={unread}></Badge>}
									thumb={require(`../imgs/${userInfo[targetId].avatar}.jpg`)}
									arrow="horizontal"
									onClick={()=>{
										this.props.history.push(`/chat/${targetId}`)
									}}
								>
									{lastMsg.content}
									<Brief>{userInfo[targetId].name}</Brief>
								</Item>
							</List>
						)
					})	
				}
			</div>
		)
	}

}

export default Msg