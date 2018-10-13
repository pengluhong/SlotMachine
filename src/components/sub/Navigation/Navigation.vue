<template>
	<div class="preferential_scroll_box nav-main bg-color" id="nav_main">
		<div class="preferential_list nav-content">
			<ul>
				<li v-for="item in Menus">
					<a href="javascript:;" class="color bg-color">
						{{item.menu_name}}
						<i class="el-icon-arrow-up pull-right"></i>
					</a>
					<ul style="display: none;">
						<li v-for="items in item.ChildNodes">
							<router-link :to="items.front_url" class="color">{{items.menu_name}}</router-link>
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

	import AxiosService from "@/assets/scripts/api/axiosService";
	import Urls from "@/assets/scripts/api/Urls";
	export default {
		data() {
			return {
				Menus: [],
			}
		},
		mounted() {
			this.MenusOperation();
		},
		created() {
			this.LoadingMenus();
		},
		methods: {
			LoadingMenus() {
				this.Menus = JSON.parse(localStorage.getItem('Menus'));
			},
			//菜单导航操作
			MenusOperation() {
				//导航收缩
				$('.nav-content li > a').click(function() {
					if($(this).siblings('ul').css('display') == 'none') {
						$(this).siblings('ul').stop().slideDown();
						$(this).find('>i').removeClass('el-icon-arrow-up').addClass('el-icon-arrow-down');
					} else {
						$(this).siblings('ul').stop().slideUp();
						$(this).find('>i').removeClass('el-icon-arrow-down').addClass('el-icon-arrow-up');
					}
				});
				/*侧边导航调用滚动条插件*/
				$('#nav_main').perfectScrollbar();
			}
		},
		computed: {
			getMenus() {
				return this.$store.state.Menus
			}
		},
		watch: {
			getMenus(menus) {
				this.Menus = menus;
				const that = this;
				setTimeout(function() {
					that.MenusOperation();
				}, 200);
			}
		}
	}
</script>

<style>

</style>