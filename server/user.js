const express = require('express')
const utils = require('utility')
const Router = express.Router()
const models = require('./model')
const Chat = models.getModel('chat')
const User = models.getModel('user')

const _filter = {pwd:0, __v:0}

Router.get('/list', function(req, res) {
	const {type} = req.query
	// User.remove({},function(e,d){})
	User.find({type}, function(err, doc) {
		return res.json({code:0, data:doc})
	})
})

Router.get('/getmsglist',function(req,res){
	const user = req.cookies.userid
	// console.log(user)
	User.find({},function(e,userdoc){
		let users = {}
		userdoc.forEach(v=>{
			users[v._id] = {name:v.user, avatar:v.avatar}
		})
		Chat.find({'$or':[{from:user},{to:user}]},function(err,doc) {
		if(!err) {
			return res.json({code:0, msgs:doc, users:users})
		}
	})
	})


})

Router.post('/readmsg', function(req,res){
	const userid = req.cookies.userid
	const {from} = req.body
	console.log(userid, from)
	Chat.update(
		{from,to:userid},
		{'$set':{read:true}},
		{'multi':true},
		function(err, doc){
		console.log(doc)
		if(!err) {
			return res.json({code:0,num:doc.nModified})
		}
		return res.json({code:1,msg:'修改失敗'})
	})
})

Router.post('/update', function(req, res) {
	const userid = req.cookies.userid
	if(!userid) {
		return json.dumps({code:1})
	}
	const body = req.body
	User.findByIdAndUpdate(userid, body, function(err, doc) {
		const data = Object.assign({},{
			user:doc.user,
			type:doc.type
		},body)
		return res.json({code:0,data:data})
	})
})

Router.post('/login', function(req, res) {
	const {user, pwd} = req.body
	User.findOne({user, pwd:md5Pwd(pwd)}, _filter,function(err, doc) {
		if(!doc) {
			return res.json({code:1,msg:'用戶名或密碼錯誤'})
		}
		res.cookie('userid',doc._id)
		return res.json({code:0,data:doc})
	})
})

Router.post('/register', function(req, res) {
	console.log(req.body)
	const {user, pwd, type} = req.body
	User.findOne({user: user}, function(err, doc) {
		if(doc) {
			return res.json({code:1, msg:'用戶名已存在'})
		}

		const userModel = new User({user, type, pwd:md5Pwd(pwd)})

		userModel.save(function(e,d) {
			if(e) {
				return res.json({code:1, msg:"後端出錯"})
			}
			const {user, type, _id} = d
			res.cookie('userid', _id)
			return res.json({code:0, data:{user, type, _id}})
		})

		// User.create({user, pwd:md5Pwd(pwd), type}, function(e, d) {
		// 	if(e) {
		// 		return res.json({code:1, msg:'後端出錯'})
		// 	}
		// 	return res.json({code:0})
		// })
	})
})

Router.get('/info', function(req, res) {
	const {userid} = req.cookies

	if(!userid) {
		return res.json({code: 1})
	}
	User.findOne({_id:userid}, _filter, function(err, doc) {
		if(err) {
			return res.json({code:1, msg:"後端出錯"})
		}
		if(doc) {
			return res.json({code:0,data:doc})
		}
	})
})

function md5Pwd(pwd) {
	const salt = 'immoc_is_good_2354654!@#*^%&'
	return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router