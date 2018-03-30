import React, {Component} from 'react'
import {Grid, List} from 'antd-mobile'
import PropTypes from 'prop-types'


class AvatarSelector extends Component {
	static propTypes = {
		selectAvatar: PropTypes.func.isRequired
	}
	constructor(props) {
		super(props)
		 this.state = {
		 	avatar: ''
		 }

		 this.selectHandle = this.selectHandle.bind(this)
	}

	selectHandle(ele) {
		this.setState({
			'avatar':ele.icon
		})
		this.props.selectAvatar(ele.text)		
	}

	render() {
		const avatarList = 'boy,girl,jitui,qie,shangdi,tiger,yun,zongzi'
							.split(',')
							.map(v=>({
								icon:require(`../imgs/${v}.jpg`),
								text:v
							}))
		const gridHeader = this.state.avatar
							? (<div>
								<span>已選擇頭像</span>
								<img style={{width:30,verticalAlign: "middle" }} src={this.state.avatar} alt=""/>
								</div>
							): '請選擇頭像'
		return (
			<div>
				<List renderHeader={()=>gridHeader}>
					<Grid data={avatarList}
					      renderItem={dataItem => (
					        <div style={{ padding: '12.5px' }}>
					          <img src={dataItem.icon} style={{ width: '75px', height: '75px' }} alt="" />
					          <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
					          </div>
					        </div>
					      )}
						onClick={this.selectHandle}
					/>				
				</List>			
			</div>
		)


	}
}

export default AvatarSelector