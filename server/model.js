const mongoose = require('mongoose')

// 鏈接mongo 并且使用imooc這個集合
const DB_URL = 'mongodb://localhost:27017/imooc'
mongoose.connect(DB_URL)

const models = {
	user:{
		'user': {type:String, require:true},
		'pwd': {type:String, require:true},
		'type': {type:String, require:true},
		//頭像
		'avatar': {'tyep': String},
		//個人簡介
		'desc': {type: String},
		'title': {'type': String},

		//如果是boss 還有兩個字段
		'company': {'type': String},
		'money': {'type': String}
	},
	chat:{
		'chatid':{'type':String,require:true},
		'from':{'type':String,require:true},
		'to': {'type':String,require:true},
		'read':{'type':Boolean,default:false},
		'content':{'type':String,require:true,default:''},
		'create_time':{'type':Number, default:new Date().getTime()}
	}
}

for (let m in models) {
	mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
	getModel: function(name) {
		return mongoose.model(name)
	}
}