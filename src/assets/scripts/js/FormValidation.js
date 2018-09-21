import Regular from "@/assets/scripts/js/regular";
export default {
	//验证搜索项
	commonFv(data, re) {
		if(data === '') {
			return false;
		}
		return !re.test(data);
	},
	//账号
	accountCheck(rule, value, callback) {
		if(!Regular.account.test(value)) {
			return callback(new Error(Regular.accountError));
		}
		callback();
	},
	//密码
	passwordCheck(rule, value, callback) {
		if(!Regular.passwd.test(value)) {
			return callback(new Error(Regular.passwdError));
		}
		callback();
	},
	//姓名、名称
	nameCheck(rule, value, callback) {
		if(!Regular.name.test(value)) {
			return callback(new Error(Regular.nameError));
		}
		callback();
	},
	//识别码
	codeCheck(rule, value, callback) {
		if(!Regular.IdCode.test(value)) {
			return callback(new Error(Regular.IdCodeError));
		}
		callback();
	},
	//手机号码
	phoneCheck(rule, value, callback) {
		if(!Regular.Phone86.test(value)) {
			return callback(new Error(Regular.PhoneError));
		}
		callback();
		/*if(code === '86') {
			//+86
			if(!Regular.Phone86.test(value)) {
				return callback(new Error(Regular.PhoneError));
			}
			callback();
		} else if(code === '886') {
			//+886
			if(!Regular.Phone886.test(value)) {
				return callback(new Error(Regular.PhoneError));
			}
			callback();
		}*/
	},
	//电子邮箱
	emailCheck(rule, value, callback) {
		if(!Regular.Email.test(value)) {
			return callback(new Error(Regular.EmailError));
		}
		callback();
	},
	//阈值
	quotaCheck(rule, value, callback) {
		if(!Regular.quota.test(value)) {
			return callback(new Error(Regular.quotaError));
		}
		callback();
	},
	//公告消息
	NewsCheck(rule, value, callback) {
		if(value == '' || !Regular.News.test(value)) {
			return callback(new Error(Regular.NewsError));
		}
		callback();
	},
	//说明、消息、信息
	RemarksCheck(rule, value, callback) {
		if(value == '' || !Regular.Remarks.test(value)) {
			return callback(new Error(Regular.RemarksError));
		}
		callback();
	},
	//电子邮箱-选填
	emailCheck2(rule, value, callback) {
		if(value !== '') {
			if(!Regular.Email.test(value)) {
				return callback(new Error(Regular.EmailError));
			}
		}
		callback();
	},
	//微信-选填
	WeChatCheck2(rule, value, callback) {
		if(value !== '') {
			if(!Regular.WeChat.test(value)) {
				return callback(new Error(Regular.WeChatError));
			}
		}
		callback();
	},
	//QQ-选填
	qqCheck2(rule, value, callback) {
		if(value !== '') {
			if(!Regular.qq.test(value)) {
				return callback(new Error(Regular.qqError));
			}
		}
		callback();
	},
	//备注-选填
	RemarksCheck2(rule, value, callback) {
		if(!Regular.Remarks.test(value)) {
			return callback(new Error(Regular.RemarksError));
		}
		callback();
	},
}