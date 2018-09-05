<template>
	<div class="preferential_scroll_box nav-main bg-color" id="nav_main">
		<div class="preferential_list nav-content">
			<ul>
				<li>
					<a href="javascript:;" class="bg-color">
						最高代理
						<i class="glyphicon glyphicon-chevron-down pull-right"></i>
					</a>
					<ul>
						<li>
							<router-link to="/AgencyManagement">代理管理</router-link>
						</li>
					</ul>
				</li>
				<li>
					<a href="javascript:;" class="bg-color">
						游戏控制台
						<i class="glyphicon glyphicon-chevron-down pull-right"></i>
					</a>
					<ul>
						<li>
							<router-link to="/">全局配置</router-link>
						</li>
						<li>
							<router-link to="/GameConfiguration">游戏配置</router-link>
						</li>
						<li>
							<router-link to="/AnnouncementConfiguration">公告推送配置</router-link>
						</li>
					</ul>
				</li>
				<li>
					<a href="javascript:;" class="bg-color">
						数据统计
						<i class="glyphicon glyphicon-chevron-down pull-right"></i>
					</a>
					<ul>
						<li>
							<router-link to="/GlobalStatistics">全局统计</router-link>
						</li>
						<li>
							<router-link to="/RoomStatistics">房间统计</router-link>
						</li>
						<li>
							<router-link to="/MembershipStatistics">会员统计</router-link>
						</li>
					</ul>
				</li>
				<li>
					<a href="javascript:;" class="bg-color">
						系统管理
						<i class="glyphicon glyphicon-chevron-down pull-right"></i>
					</a>
					<ul>
						<li>
							<router-link to="/RoleManagement">角色管理列表</router-link>
						</li>
						<li>
							<router-link to="/PersonnelManagement">后台人员管理列表</router-link>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import "@/assets/scripts/common/mousewheel";
	import "@/assets/scripts/common/perfectScrollbar";
	export default {
		mounted() {
			//导航收缩
			$('.nav-content li > a').click(function() {
				if($(this).siblings('ul').css('display') == 'none') {
					$(this).siblings('ul').slideDown();
					$(this).find('.glyphicon').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
				} else {
					$(this).siblings('ul').slideUp();
					$(this).find('.glyphicon').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
				}
			});
			/*侧边导航调用滚动条插件*/
			$('#nav_main').perfectScrollbar();
		}
	}
</script>

<style>

</style>