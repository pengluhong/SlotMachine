<template>
	<div class="clearfix">
		<!--头部-->
		<sub-header></sub-header>
		<!--导航-->
		<navigation></navigation>
		<div class="container-main">
			<div class="bg-color">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
	import SubHeader from "@/components/sub/header/header";
	import Navigation from "@/components/sub/Navigation/Navigation";
	export default {
		components: {
			SubHeader,
			Navigation
		},
		mounted() {
			//计算导航以及内容区域高度
			let h;
			_h();
			function _h() {
				h = $(window).height();
				$('.nav-main').height(h - 70); //70为头部高度
				$('.container-main > div').css({
					'min-height': h - 70 - 20 * 2 + 'px'
				}) //20为上下padding值
			}
			//改变浏览器窗口大小
			$(window).resize(function() {
				_h();
			});
		}
	}
</script>

<style>
	@import 'bootstrap/dist/css/bootstrap.min.css';
	@import 'element-ui/lib/theme-chalk/index.css';
	@import '../../../assets/styles/reset';
	@import '../../../assets/styles/styles';
</style>