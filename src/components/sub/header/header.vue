<template>
	<div class="bg-color header clearfix">
		<div class="header-logo pull-left">老虎机后台系统</div>
		<div class="pull-right">
			<a href="javascript:;" class="header-infor pull-left">
				<div class="header-img">
					<img src="/static/images/head.jpg" width="40" height="40" />
				</div>
				<p>{{UserName}}</p>
			</a>
			<div class="header-return pull-left" @click="SignOut">退出</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				UserName: localStorage.getItem('LoginAccount'),
			}
		},
		methods: {
			//退出登录
			SignOut() {
				localStorage.removeItem('LoginAccount');
				localStorage.removeItem('LoginCode');
				localStorage.removeItem('LoginTime');
				this.$router.replace('Login');
			}
		}
	}
</script>

<style>

</style>