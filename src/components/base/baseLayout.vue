<template>
	<div>
		<router-view></router-view>
	</div>
</template>
<script>
	import 'bootstrap/dist/css/bootstrap.min.css';
	import 'element-ui/lib/theme-chalk/index.css';
	import '@/assets/styles/reset.css';
	import '@/assets/styles/styles.css';
	import '@/assets/styles/Color/black.css';
	import '@/assets/styles/Color/white.css';
	import '@/assets/styles/Color/pink.css';
	import '@/assets/styles/Color/green.css';

	import EventBus from '@/assets/scripts/js/EventBus';

	export default {
		mounted(){
			//默认颜色风格
			document.documentElement.id = 'BlackStyle';
		},
		created() {
			const that = this;
			EventBus.$on('afterLogin', () => {
				that.LoginCount();
			});
		},
		methods: {
			//开始登出计时
			LoginCount() {
				const that = this;
				//计算登出时间，时间到就登出
				if(localStorage.getItem('LoginTime') < new Date().getTime()) {
					//移除相关资料
					localStorage.removeItem('LoginAccount');
					localStorage.removeItem('LoginToken');
					localStorage.removeItem('LoginTime');
					localStorage.removeItem('Menus');
				} else {
					setTimeout(function() {
						that.LoginCount();
					}, 60000);
				}
			}
		},
		beforeDestroy() {
			EventBus.$off('afterLogin');
		},
	}
</script>