export default {
	//账号
	account: /^[0-9A-Za-z-_]{4,12}$/,
	accountError: '仅可以使用英文字母、数字、下划线和减号, 字数范围4-12！',
	searchAccount: /^[0-9A-Za-z-_]{0,12}$/,
	searchAccountError: '仅可以使用英文字母、数字、下划线和减号, 字数范围0-12！',
	//密码
	passwd: /^[a-zA-Z0-9!@#$%^&*()_+{}:"|<>?\-=\[\]'\;,./~`]{4,50}$/,
	passwdError: '仅可以使用英文字母、数字与一般常用符号, 字数范围4-50！',
	//姓名、名称
	name: /^[A-Za-z\s\u4E00-\u9FA5]{2,50}$/,
	nameError: '仅可以使用中英文字母、空白, 字数范围2-50！',
	SearchName: /^[A-Za-z\s\u4E00-\u9FA5]{0,50}$/,
	SearchNameError: '仅可以使用中英文字母、空白, 字数范围0-50！',
	//识别码
	IdCode: /^[0-9]{4}$/,
	IdCodeError: '仅可以使用数字，字数为4位！',
	//手机号码
	Phone86: /^1(3[0-9]|4[57]|5[0-35-9]|7[0135678]|8[0-9])\d{8}$/,
	Phone886: /^[0-9]{9}$/,
	PhoneError: '请输入合法的手机号码！',
	//电子邮箱
	Email: /^[0-9A-Za-z-_@\.]{5,100}$/,
	EmailError: '仅可以使用英文字母,数字,句号,@,下划线和减号, 字数范围5-100！',
	//阈值
	quota: /^\d+$/,
	quotaError: '仅可以使用正整数!',
	//公告消息
	News: /^[0-9A-Za-z-_\u4E00-\u9FA5\uff01|\u3011|\u300e！【】？，“”。!@#$%^&?\\s]{0,100}$/,
	NewsError: '仅可以使用中英文字母,数字,空白与一般常用符号,字数限制100！',
	//微信
	WeChat: /^[A-Za-z][A-Za-z0-9-_]{5,19}$/,
	WeChatError: '仅可以使用6—20个字母、数字、下划线和减号, 必须以字母开头！',
	//QQ
	qq: /^[0-9]{5,15}$/,
	qqError: '仅可以使用5—15个数字！',
	//备注
	Remarks:/^[0-9A-Za-z-_\u4E00-\u9FA5!@#$%^&?\\s]{0,100}$/,				
	RemarksError:'仅可以使用中英文字母,数字,空白与一般常用符号,字数限制100！',
}