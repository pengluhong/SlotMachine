import CryptoJS from 'crypto-js';

const _key = '1234567890123456';
const _iv = "CB3EC842D7C69578";

function AESEncryptWithBase64(SData, Key) {
	const EData = CryptoJS.enc.Utf8.parse(SData);
	const EKey = CryptoJS.enc.Utf8.parse(Key);
	const EIV = CryptoJS.enc.Utf8.parse(_iv);
	const EncryptObj = CryptoJS.AES.encrypt(EData, EKey, {
		iv: EIV,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7
	});
	return EncryptObj.toString();
}

function AESDecryptToObj(SData, Key) {
	if(!SData) {
		return undefined;
	}
	const EKey = CryptoJS.enc.Utf8.parse(Key);
	const EIV = CryptoJS.enc.Utf8.parse(_iv);
	const DecryptObt = CryptoJS.AES.decrypt(SData, EKey, {
		iv: EIV,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7
	});
	return JSON.parse(CryptoJS.enc.Utf8.stringify(DecryptObt));
}

//加密方法
function Encrypt(Obj) {
	const Base64Str = AESEncryptWithBase64(JSON.stringify(Obj), _key);
	return Base64Str;
}

//解密方法
function Decrypt(UrlParameter) {
	const RetObj = AESDecryptToObj(UrlParameter, _key);
	return RetObj;
}

export default {
	Encrypt,
	Decrypt
}