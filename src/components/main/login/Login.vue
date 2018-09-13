<template>
	<div class="bg-color pd30 login-main">
		<h1 class="txt-ct">老虎机后台登录</h1>
		<el-form :model="LoginForm" status-icon :rules="rulesLoginForm" ref="LoginForm" label-width="0" class="demo-ruleForm">
			<div class="mgt30">
				<el-form-item prop="account">
					<el-input placeholder="请输入账号" v-model="LoginForm.account">
						<template slot="prepend">
							<i class="glyphicon glyphicon-user"></i>
						</template>
					</el-input>
				</el-form-item>
			</div>
			<div class="mgt30">
				<el-form-item prop="password">
					<el-input type="password" placeholder="请输入密码" v-model="LoginForm.password">
						<template slot="prepend">
							<i class="glyphicon glyphicon-lock"></i>
						</template>
					</el-input>
				</el-form-item>
			</div>
			<div class="mgt30 clearfix">
				<el-col :span="17">
					<el-form-item prop="code">
						<el-input placeholder="请输入验证码" v-model="LoginForm.code">
							<template slot="prepend">
								<i class="glyphicon glyphicon-lock"></i>
							</template>
						</el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<b class="mgl15" style="margin-top: 1px;"  ref="dataIMG"></b>
					<!--{{dataImg}}-->
					<!--<img height="40" width="100" title="点击刷新" class="mgl15" :src="CodeSrc" @click="ObtainCode" style="margin-top: 1px;" />-->
				</el-col>
			</div>
			<div class="mgt40 txt-ct">
				<el-form-item>
					<el-button type="primary" @click="submitForm('LoginForm')">提交</el-button>
					<el-button @click="resetForm('LoginForm')">重置</el-button>
				</el-form-item>
			</div>
		</el-form>
	</div>
</template>

<script>
	import AxiosService from "@/assets/scripts/api/axiosService";
	import Urls from "@/assets/scripts/api/Urls";
	export default {
		data() {
			return {
				LoginForm: {
					account: 'admin',
					password: '123456',
					code: '暂时不用输入',
				},
				rulesLoginForm: {
					account: [{
						required: true,
						message: '请输入账号',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}],
					code: [{
						required: true,
						message: '请输入验证码',
						trigger: 'blur'
					}],
				},
				//验证码地址
				CodeSrc: null,
				dataImg:''
			}
		},
		mounted() {
			this.ObtainCode();
		},
		methods: {
			ObtainCode() {
				//this.CodeSrc = Urls.Url + Urls.AdminCaptcha + '/' + Math.random();
				let Url = Urls.Url + Urls.AdminCaptcha + '/' + Math.random();
				AxiosService.getRequest(Url).then((res) => {
					this.dataImg = res.img;
					//$('#dataIMG').html(this.dataImg);
					this.$refs.dataIMG.innerHTML = this.dataImg;
					//console.log(res.img)
				});
			},
			submitForm(formName) {
				let Url = Urls.Url + Urls.AdminLogin;
				let dataObj = this.LoginForm;
				console.log(dataObj);
				this.$refs[formName].validate((valid) => {
					if(valid) {
						AxiosService.postRequest(Url, dataObj).then((res) => {
							if(res.code == 1) {
								localStorage.setItem('LoginAccount',this.LoginForm.account);
								localStorage.setItem('LoginCode',res.code);
								localStorage.setItem('LoginTime', new Date().getTime() + (15 * 60 * 1000));
								this.$message({
									message: res.msg,
									type: 'success'
								});
								//登录成功后跳转到网站首页
								this.$router.replace('/');
							} else {
								this.$message.error(res.msg);
							}
						});
					} else {
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		},
	}
</script>