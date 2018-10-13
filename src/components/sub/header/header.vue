<template>
	<div>
		<div class="bg-color header clearfix">
			<router-link to="/" class="header-logo pull-left">老虎机后台系统</router-link>
			<div class="pull-right">
				<el-dropdown class="pull-left" trigger="click">
					<p class="el-dropdown-link header-setting"><i class="el-icon-setting"></i></p>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item disabled>选择颜色风格</el-dropdown-item>
						<el-dropdown-item v-for="(item,index) in Colors" :divided="index==0" :class="{'color-current':CurrentColor==item.id}">
							<p @click="SelectColor(item.id)">{{item.name}}</p>
						</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
				<a href="javascript:;" class="header-infor pull-left">
					<div class="header-img">
						<img src="/static/images/head.jpg" width="40" height="40" />
					</div>
					<p class="color">{{UserName}}</p>
				</a>
				<div class="header-return pull-left" data-toggle="modal" data-target="#h_IsSignOut">退出</div>
			</div>
		</div>
		<!--确认是否退出登录弹窗-->
		<div class="modal fade bg-Again" id="h_IsSignOut" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<el-form label-width="0">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
							<h4 class="modal-title">提示</h4>
						</div>
						<div class="modal-body">
							<p>是否确认退出登录？</p>
						</div>
						<div class="modal-footer">
							<el-form-item class="mgb0">
								<el-button type="primary" :plain="true" data-dismiss="modal" @click="SignOut">确认</el-button>
								<el-button data-dismiss="modal">关闭</el-button>
							</el-form-item>
						</div>
					</el-form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import AxiosService from "@/assets/scripts/api/axiosService";
	import Urls from "@/assets/scripts/api/Urls";
	export default {
		data() {
			return {
				UserName: localStorage.getItem('LoginAccount'),
				Colors: [{
					id: 'BlackStyle',
					name: '酷炫黑'
				}, {
					id: 'WhiteStyle',
					name: '云朵白'
				}, {
					id: 'PinkStyle',
					name: '梦幻粉'
				}, {
					id: 'GreenStyle',
					name: '护眼绿'
				}],
				//当前颜色风格，默认黑色
				CurrentColor: 'BlackStyle',
			}
		},
		created() {
			this.LoadingColor();
		},
		methods: {
			//退出登录
			SignOut() {
				let Url = Urls.Url + Urls.AdminLogout;
				AxiosService.getRequest(Url).then((res) => {
					if(res.code === 200) {
						localStorage.removeItem('LoginAccount');
						localStorage.removeItem('LoginToken');
						localStorage.removeItem('LoginTime');
						localStorage.removeItem('Menus');
						this.$store.commit('_Menus');
						this.$router.replace('/Login');
						this.$message({
							message: res.msg,
							type: 'success'
						});
					} else {
						this.$message.error('操作失败！');
					}
				});
			},
			//选择颜色风格
			SelectColor(color) {
				let Url = Urls.Url + Urls.GameTheme;
				let dataObj = {
					theme: color
				}
				AxiosService.postRequest(Url, dataObj).then((res) => {
					if(res.code !== 1) {
						this.$message.error(res.msg);
						return;
					}
					this.CurrentColor = color;
				});
				document.documentElement.id = color;
			},
			//加载网站颜色风格
			LoadingColor() {
				let Url = Urls.Url + Urls.GameTheme;
				AxiosService.getRequest(Url).then((res) => {
					if(res.code == 200) {
						this.CurrentColor = res.data.theme
						document.documentElement.id = res.data.theme;
					}
				});
			},
		}
	}
</script>

<style>
	.color-current {
		color: #409eff;
		color: rgba(64, 158, 255, .8);
		background: #ecf5ff;
		background: rgba(64, 158, 255, .1);
	}
</style>