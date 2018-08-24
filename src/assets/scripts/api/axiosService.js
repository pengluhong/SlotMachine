import axios from 'axios';
import qs from 'qs';
export default {
	postRequest(Url, dataObj) {
		let data = qs.stringify(dataObj);
		return axios.post(Url, data).then((res) => {
			console.log(res.data);
			return Promise.resolve(res.data);
		}).catch((e) => {
			console.log(e);
		});
	},
	getRequest(Url, dataObj) {
		return axios.get(Url, {
			params: dataObj
		}).then((res) => {
			console.log(res.data);
			return Promise.resolve(res.data);
		}).catch((e) => {
			console.log(e);
		});
	}
}