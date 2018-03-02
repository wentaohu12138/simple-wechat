import React, { Component } from 'react'
import axios from 'axios'

class AuthRoute extends Component {
	componentDidMount() {
		// 獲取用戶信息
		axios.get('/user/info').
			then(res=>{
				if(res.status == 200) {
					console.log(res.data)
				}
			})
	}

	render() {
		return null
	}
}

export default AuthRoute