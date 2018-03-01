import axios from 'axios'
import { Toast } from 'antd-mobile'

// 攔截請求
axios.interceptors.request.use(function(config) {
	Toast.loading('加載中', 0)
	return config
})

// 攔截相應
axios.interceptors.response.use(function(config) {
	Toast.hide()

	return config
})