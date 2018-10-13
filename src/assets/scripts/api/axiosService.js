import axios from 'axios';
import qs from 'qs';
export default {
	postRequest(Url, dataObj) {
		let headerArrs = '';
		if(localStorage.getItem('LoginToken')) {
			//延长登录时间，防止登出
			localStorage.setItem('logoutTime', new Date().getTime() + (15 * 60 * 1000));
			headerArrs = {
				headers: {
					Authorization: localStorage.getItem('LoginToken'),
				}
			}
		}
		let data = qs.stringify(dataObj);
		return axios.post(Url, data, headerArrs).then((res) => {
			console.log(res.data);
			let datas = res.data;
			//如果token过期则返回登录
			if(datas.code == 401) {
				localStorage.removeItem('LoginToken');
				location.href = '/Login';
				return;
			}
			if(datas.code == 500 || datas.code == 405) {
				return;
			}
			return Promise.resolve(res.data);
		}).catch((e) => {
			console.log(e);
		});
	},
	getRequest(Url, dataObj) {
		let headerArrs = '';
		if(localStorage.getItem('LoginToken')) {
			//延长登录时间，防止登出
			localStorage.setItem('logoutTime', new Date().getTime() + (15 * 60 * 1000));
			headerArrs = {
				headers: {
					Authorization: localStorage.getItem('LoginToken'),
				},
				params: dataObj
			}
		} else {
			headerArrs = {
				params: dataObj
			}
		}
		return axios.get(Url, headerArrs).then((res) => {
			console.log(res.data);
			let datas = res.data;
			//如果token过期则返回登录
			if(datas.code == 401) {
				localStorage.removeItem('LoginToken');
				location.href = '/Login';
				return;
			}
			if(datas.code == 500 || datas.code == 405) {
				return;
			}
			return Promise.resolve(res.data);
		}).catch((e) => {
			console.log(e);
		});
	}
}