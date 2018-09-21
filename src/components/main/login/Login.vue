<template>
	<div class="bg-color pd30 login-main">
		<h1 class="txt-ct color-white">老虎机后台登录</h1>
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
					<b style="margin-top: 2px;margin-left: 14px;" ref="CodeSrc" @click="ObtainCode"></b>
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
	import EventBus from '@/assets/scripts/js/EventBus';
	export default {
		data() {
			let codeCheck = (rule, value, callback) => {
				if(value !== this.Rep) {
					this.ObtainCode();
					return callback(new Error('验证码错误！'));
				}
				callback();
			};
			return {
				//验证码
				Rep: '',
				LoginForm: {
					account: 'admin',
					password: '123456',
					code: '',
					token: '',
				},
				rulesLoginForm: {
					account: [{
						required: true,
						message: '请填写账号！',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '请填写密码！',
						trigger: 'blur'
					}],
					code: [{
						validator: codeCheck,
						trigger: 'blur'
					}],
				},
			}
		},
		mounted() {
			this.ObtainCode();
		},
		methods: {
			//获取验证码
			ObtainCode() {
				let Url = Urls.Url + Urls.AdminCaptcha + '/' + Math.random();
				AxiosService.getRequest(Url).then((res) => {
					this.$refs.CodeSrc.innerHTML = res.img;
					this.LoginForm.token = res.token;
					this.Rep = res.rep;
				});
			},
			//登录
			submitForm(formName) {
				let Url = Urls.Url + Urls.AdminLogin;
				let dataObj = this.LoginForm;
				this.$refs[formName].validate((valid) => {
					if(valid) {
						AxiosService.postRequest(Url, dataObj).then((res) => {
							if(res.code == 200) {
								localStorage.setItem('LoginAccount', this.LoginForm.account);
								localStorage.setItem('LoginToken', res.token);
								localStorage.setItem('LoginTime', new Date().getTime() + (15 * 60 * 1000));
								this.$message({
									message: res.msg,
									type: 'success'
								});
								//登录成功后跳转到网站首页
								this.$router.replace('/');
								//获取导航菜单
								this.ForNavigation();
								EventBus.$emit('afterLogin');
							} else {
								this.$message.error(res.msg);
								this.ObtainCode();
							}
						});
					} else {
						return false;
					}
				});
			},
			//重置
			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.ObtainCode();
			},
			//获取网站导航
			ForNavigation() {
				let Url = Urls.Url + Urls.GameIndex;
				AxiosService.getRequest(Url).then((res) => {
					if(res.code == 200) {
						let menus = JSON.stringify(res.menus);
						localStorage.setItem('Menus', menus);
						this.$store.commit('_Menus');
					} else {
						console.log(res);
					}
				});
			},
		},
	}
</script>