<template>
	<div class="nav-main bg-color">
		<div class="nav-content">
			<ul>
				<li>
					<a href="javascript:;" class="bg-color">
						会员管理
						<i class="glyphicon glyphicon-chevron-down pull-right"></i>
					</a>
					<ul>
						<li>
							<router-link to="/MemberInfor">会员信息查询</router-link>
						</li>
						<li>
							<router-link to="/MemberCard">会员牌局查询</router-link>
						</li>
					</ul>
				</li>
				<li>
					<a href="javascript:;" class="bg-color">
						<span class="pull-left">游戏类型</span>
						<i class="glyphicon glyphicon-chevron-down pull-right"></i>
					</a>
					<ul>
						<li>
							<router-link to="/GameDetails">游戏名称</router-link>
						</li>
					</ul>
				</li>
				<li>
					<a href="javascript:;" class="bg-color">
						<span class="pull-left">控制台</span>
						<i class="glyphicon glyphicon-chevron-down pull-right"></i>
					</a>
					<ul>
						<li>
							<router-link to="/ProbabilityControl">概率游戏控制台</router-link>
						</li>
					</ul>
				</li>
				<li>
					<a href="javascript:;" class="bg-color">
						<span class="pull-left">公告</span>
						<i class="glyphicon glyphicon-chevron-down pull-right"></i>
					</a>
					<ul>
						<li>
							<router-link to="/Notice">公告</router-link>
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