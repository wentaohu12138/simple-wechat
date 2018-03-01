import React, { Component } from 'react'
import logo from './logo.jpg'
import './logo.css'

class Logo extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return <div className="logo-container"><img src={logo}/></div>
	}
}

export default Logo