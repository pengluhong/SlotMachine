<template>
	<div class="nav-main bg-color">
		<div class="nav-content">
			<ul>
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
			</ul>
		</div>
	</div>
</template>

<script>
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
		}
	}
</script>

<style>

</style>