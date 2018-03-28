const express = require('express')
const utils = require('utility')
const Router = express.Router()
const models = require('./model')

const User = models.getModel('user')
Router.get('/list', function(req, res) {
	// User.remove({},function(e,d){})
	User.find({}, function(err, doc) {
		return res.json(doc)
	})
})

Router.post('/login', function(req, res) {
	const {user, pwd} = req.body
	User.findOne({user, pwd:md5Pwd(pwd)}, {pwd: 0},function(err, doc) {
		if(!doc) {
			return res.json({code:1,msg:'用戶名或密碼錯誤'})
		}
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
		User.create({user, pwd:md5Pwd(pwd), type}, function(e, d) {
			if(e) {
				return res.json({code:1, msg:'後端出錯'})
			}
			return res.json({code:0})
		})
	})
})

Router.get('/info', function(req, res) {
	return res.json({code: 1})
})

function md5Pwd(pwd) {
	const salt = 'immoc_is_good_2354654!@#*^%&'
	return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router