import axios from 'axios'
import io from 'socket.io-client'
const socket = io(`ws://${window.location.hostname}:9093`)

// 獲取聊天列表
const MSG_LIST = 'MSG_LIST'
// 讀取信息
const MSG_RECV = 'MSG_RECV'
// 標識已讀
const MSG_READ = 'MSG_READ'

const initState = {
	chatmsg:[],
	users:{},
	unread: 0
}

export function chat(state=initState,action) {
	switch(action.type) {
		case MSG_LIST:
			return {...state, users:action.payload.users, chatmsg:action.payload.msgs, unread:action.payload.msgs.filter(v=>(!v.read&&v.to==action.payload.userid)).length}
		case MSG_RECV:
			let n = action.payload.msg.to == action.payload.userid?1:0
			return {...state, chatmsg:[...state.chatmsg,action.payload.msg], unread: state.unread+n}
		// case MSG_READ:
		default:
			return state;
	}
}

function msgList(msgs, users, userid) {
	return {type:MSG_LIST, payload: {msgs,users,userid}}
}

function msgRecv(msg,userid) {
	return {type:MSG_RECV, payload:{msg,userid}}
}

export function getMsgList() {
	return (dispatch, getState)=>{
		axios.get('/user/getmsglist')
			.then(res=>{

				if(res.status==200 && res.data.code == 0) {
					const userid = getState().user._id
					dispatch(msgList(res.data.msgs,res.data.users,userid))
				}
			})
	}
}

export function sendMsg({from, to, msg}) {
	return dispatch=>{
		socket.emit('sendmsg',{from, to, msg})
	}
}

export function recvMsg() {
	return (dispatch,getState)=>{
		socket.on('recvmsg',function(data){
			// console.log('recvmsg',data)
			const userid = getState().user._id
			dispatch(msgRecv(data,userid))
		})
	}
}

function msgRead(from,to,num) {
	return {type: MSG_READ, payload:{from,to,num}}
}

export function readMsg(from) {
	return (dispatch,getState)=>{
		axios.post('/user/readmsg',{from})
			.then(res=>{
				const userid=getState.user._id
				if(res.state==200 && res.data.code==0) {
					dispatch()
				}
			})	
	}
}