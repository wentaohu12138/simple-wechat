export function getRedirectPath({type, avatar}) {

	//根據用戶信息 返回跳轉地址
	let url = (type === "boss")?'/boss': '/genius'
	if(!avatar) {
		url += 'info'
	}
	return url
}