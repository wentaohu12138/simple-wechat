import React from 'react'
import {List, InputItem} from 'antd-mobile'
import io from 'socket.io-client'
const socket = io('ws://localhost:9093')

class Chat extends React.Component {
	constructor(props) {
		super(props)
		this.state={text:'',msg:[]}
	}
	componentDidMount() {
		socket.on('recmsg',(data)=>{
			this.setState({
				msg:[...this.state.msg,data.text]
			})
		})
	}
	handleSubmit() {
		socket.emit('sendmsg',{text:this.state.text})
		// console.log(this.state.text)
		this.setState({
			text:''
		})
	}
	render() {
		return (
			<div>
				<h2>{this.state.msg}</h2>
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
							extra={<span onClick={()=>this.handleSubmit()}>發送</span>}
						>信息</InputItem>
					</List>
				</div>				
			</div>
		)
	}
}

export default Chat