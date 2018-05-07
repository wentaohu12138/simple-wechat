import React from 'react'
import {List, InputItem, NavBar, Icon, Grid} from 'antd-mobile'
import {connect} from 'react-redux'
import {getMsgList,sendMsg,recvMsg,readMsg} from '../../redux/chat.redux'
import {getChatId} from '../../util'

@connect(
	state=>state,
	{getMsgList,sendMsg,recvMsg,readMsg}
)
class Chat extends React.Component {
	constructor(props) {
		super(props)
		this.state={text:'',showEmoji:false,msg:[]}
	}
	componentDidMount() {
		if(!this.props.chat.chatmsg.length) {
			this.props.getMsgList()
			this.props.recvMsg()
		}
		// socket.on('recmsg',(data)=>{
		// 	this.setState({
		// 		msg:[...this.state.msg,data.text]
		// 	})
		// })
		
		this.fixCarousel()
		document.body.scrollIntoView(false)
	}
	componentWillUnmount() {
		const toId = this.props.match.params.user
		this.props.readMsg(toId)
	}
	componentDidUpdate() {
		console.log(document.body.innerHeight)
		document.body.scrollIntoView(false)
	}
	fixCarousel(){
		setTimeout(function(){
			window.dispatchEvent(new Event('resize'))
		},0)
	}
	handleSubmit() {
		// socket.emit('sendmsg',{text:this.state.text})
		// // console.log(this.state.text)

		const from = this.props.user._id
		const to = this.props.match.params.user
		const msg = this.state.text
		this.props.sendMsg({from, to, msg})
		this.setState({text:'',showEmoji:false})		
	}
	render() {
		const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
										.split(' ')
										.filter(v=>v)
										.map(v=>({text:v}))

		const userid = this.props.match.params.user
		const Item = List.Item
		const users = this.props.chat.users
		if(!users[userid]) {
			return null
		}
		const chatid = getChatId(userid, this.props.user._id)
		const chatmsg = this.props.chat.chatmsg.filter(v=>v.chatid==chatid)
		return (
			<div id='chat-page'>
				<NavBar 
					mode='dark'
					icon={<Icon type="left" />}
					onLeftClick={() =>this.props.history.goBack()}
				>
					{users[userid].name}
				</NavBar>
				<div className="chat-msg">
					{chatmsg.map((v)=>{
						const avatar=require(`../imgs/${users[v.from].avatar}.jpg`)
						return v.from==userid?(
							//對方發的
							<List key={v._id}>
								<Item
									thumb={avatar}
								>{v.content}</Item>
							</List>
						):(
							//自己發的
							<List key={v._id}>
								<Item className='chat-me'
									extra={<img src={avatar}/>}
								>{v.content}</Item>
							</List>
						) 
					})}
				</div>
				<div className="stick-footer">
					<List>
						<InputItem
							placeholder='請輸入'
							value={this.state.text}
							onChange={
								v=>{
									this.setState({text:v})
								}
							}
							extra={
								<div>
									<span 
										style={{marginRight:15}}
										onClick={()=>{
											this.setState({
												showEmoji:!this.state.showEmoji
											})
											this.fixCarousel()
										}}
									>😄</span>
									<span onClick={()=>this.handleSubmit()}>發送</span>									
								</div>
							}
						></InputItem>
					</List>
					{
						this.state.showEmoji?<Grid
							data={emoji}
							columNum={9}
							carouselMaxRow={4}
							isCarousel={true}
							onClick={(e)=>{
								this.setState({
									text:this.state.text+e.text
								})
							}}
						/>:null
					}
					
				</div>				
			</div>
		)
	}
}

export default Chat