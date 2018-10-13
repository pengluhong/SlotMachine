<template>
	<div>
		<div class="bg-color pd30">
			<div class="dis-inl-blk">
				<p>游戏名称</p>
				<div class="mgt10">
					<el-input v-model="game_name" placeholder="请输入游戏名称"></el-input>
				</div>
			</div>
			<span class="dis-inl-blk error-dis">
					<el-tooltip 
						effect="dark" 
						:content="Regular.SearchNameError" 
						placement="top" 
						v-if="FV.commonFv(game_name,Regular.SearchName)">
						<i class="el-icon-error color-red ft12"></i>
					</el-tooltip>
				</span>
			<el-button type="success" icon="el-icon-search" class="v-a-btm" @click="_Search">查询</el-button>
		</div>
		<div class="pd30 clearfix">
			<div class="table-responsive">
				<table class="table table-bordered">
					<thead>
						<tr>
							<th>游戏名称</th>
							<th>全局配置</th>
							<th>游戏配置</th>
							<th>状态</th>
						</tr>
					</thead>
					<tbody v-if="loadingList.length">
						<tr v-for="item in loadingList">
							<td>{{item.name}}</td>
							<td>
								<button class="btn btn-warning btn-sm" @click="GlobalConfiguration(item.id)">修改</button>
							</td>
							<td>
								<button class="btn btn-warning btn-sm" @click="GameConfiguration(item.id)">修改</button>
							</td>
							<td>
								<span :class="{'text-danger':item.status==0,'text-success':item.status==1,'text-warning':item.status==2}" v-html="item.status==0? '关闭':(item.status==1? '正常':'维护')">
								</span>
							</td>
						</tr>
					</tbody>
					<tbody v-else>
						<tr>
							<td colspan="4">无数据</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="txt-rt">
				<!--分页-->
				<paging-main :pageInfor="pageInfor" @getPagingCont="getPagingCont"></paging-main>
			</div>
		</div>
	</div>
</template>
<script>
	import AxiosService from "@/assets/scripts/api/axiosService";
	import Urls from "@/assets/scripts/api/Urls";
	//分页
	import PagingMain from "@/components/sub/pagingMain/pagingMain";
	import Regular from "@/assets/scripts/js/regular";
	import FV from "@/assets/scripts/js/FormValidation";
	import Utils from "@/assets/scripts/js/utils";
	export default {
		components: {
			PagingMain
		},
		data() {
			return {
				loadingList: [],
				game_name: '',
				Regular: Regular,
				FV: FV,
				//分页
				pageInfor: {
					//总列表内容
					ListPage: [],
					//总共多少条数据
					Total: 0,
					//每页显示多少条
					pageSize: 10,
				},
			}
		},
		created() {
			//初始化列表信息
			this._LoadingList();
		},
		methods: {
			//获取分页信息
			getPagingCont(msg) {
				this.loadingList = msg;
			},
			//列表初始化
			_LoadingList() {
				let Url = Urls.Url + Urls.GameList;
				AxiosService.getRequest(Url).then((res) => {
					if(res.code == 200) {
						this.pageInfor.ListPage = res.data;
						this.pageInfor.Total = res.data.length;
					} else {
						console.log(res.msg);
					}
				});
			},
			//查询
			_Search() {
				let Url = Urls.Url + Urls.GameList;
				let dataObj = {
					name: this.game_name
				};
				console.log(dataObj);
				AxiosService.postRequest(Url, dataObj).then((res) => {
					if(res.code == 200) {
						this.pageInfor.ListPage = res.data;
						this.pageInfor.Total = res.data.length;
					} else {
						console.log(res.msg);
					}
				});
			},
			//修改全局配置
			GlobalConfiguration(id) {
				let dataObj = {
					id: id
				};
				this.$router.push({
					path: '/GameConsole/GlobalConfiguration',
					query: {
						data: Utils.Encrypt(dataObj)
					}
				});
			},
			//修改游戏配置
			GameConfiguration(id) {
				let dataObj = {
					id: id
				};
				this.$router.push({
					path: '/GameConsole/GameConfiguration',
					query: {
						data: Utils.Encrypt(dataObj)
					}
				});
			},
		},

	}
</script>