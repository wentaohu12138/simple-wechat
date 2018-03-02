import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

@withRouter
class AuthRoute extends Component {
	componentDidMount() {
		const publicList = ['/login', '/register']
		const pathName = this.props.location.pathname
		if(publicList.indexOf(pathName) > -1) {
			return null
		}
		// 獲取用戶信息
		axios.get('/user/info').
			then(res=>{
				if(res.status == 200) {
					if(res.data.code==0) {
						// 有登錄信息
					} else {
						this.props.history.push('/login')
					}
				}
			})
	}

	render() {
		return null
	}
}

export default AuthRoute