<template>
	<div>
		<div class="bg-color pd30">
			<div class="dis-inl-blk">
				<p>玩家账号</p>
				<div class="mgt10">
					<el-input v-model="Search.player_name" placeholder="请输入玩家账号"></el-input>
				</div>
			</div>
			<span class="dis-inl-blk error-dis">
				<el-tooltip 
						effect="dark" 
						:content="Regular.searchAccountError" 
						placement="top" 
						v-if="FV.commonFv(Search.player_name,Regular.searchAccount)">
						<i class="el-icon-error color-red ft12"></i>
					</el-tooltip>
			</span>
			<div class="dis-inl-blk">
				<p>代理账号</p>
				<div class="mgt10">
					<el-input v-model="Search.agent_name" placeholder="请输入代理账号"></el-input>
				</div>
			</div>
			<span class="dis-inl-blk error-dis">
				<el-tooltip 
						effect="dark" 
						:content="Regular.searchAccountError" 
						placement="top" 
						v-if="FV.commonFv(Search.agent_name,Regular.searchAccount)">
						<i class="el-icon-error color-red ft12"></i>
					</el-tooltip>
			</span>
			<div class="dis-inl-blk">
				<p>注册时间（开始）</p>
				<div class="mgt10">
					<el-date-picker v-model="Search.start" type="date" placeholder="请选择开始日期" :picker-options="pickerOptionsStart" value-format="yyyy-MM-dd" :editable="false"></el-date-picker>
				</div>
			</div>
			<div class="dis-inl-blk">
				<p>注册时间（结束）</p>
				<div class="mgt10">
					<el-date-picker v-model="Search.end" type="date" placeholder="请选择结束日期" :picker-options="pickerOptionsEnd" value-format="yyyy-MM-dd" :editable="false"></el-date-picker>
				</div>
			</div>
			<el-button type="success" icon="el-icon-search" class="v-a-btm mgl16" @click="_Search">查询</el-button>
		</div>
		<div class="pd30 clearfix">
			<div class="table-responsive">
				<table class="table table-bordered">
					<thead>
						<tr>
							<th>玩家账号</th>
							<th>所属代理</th>
							<th>账户余额</th>
							<th>注册时间</th>
							<th>最近登录时间</th>
						</tr>
					</thead>
					<tbody v-if="loadingList.length">
						<tr v-for="item in loadingList">
							<td>{{item.player_name}}</td>
							<td>{{item.agent_name}}</td>
							<td>{{item.balance}}</td>
							<td>{{item.created_at}}</td>
							<td>{{item.last_login_time}}</td>
						</tr>
					</tbody>
					<tbody v-else>
						<tr>
							<td colspan="5">无数据</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="txt-rt">
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
	export default {
		data() {
			return {
				pickerOptionsStart: {
					disabledDate: (time) => {
						if(this.Search.end != "") {
							return time.getTime() > Date.now() || time.getTime() > this.Search.end;
						} else {
							return time.getTime() > Date.now();
						}

					}
				},
				pickerOptionsEnd: {
					disabledDate: (time) => {
						return time.getTime() < this.Search.start || time.getTime() > Date.now();
					}
				},
				//初始列表
				loadingList: [],
				//搜索
				Search: {
					//玩家账号
					player_name: '',
					//代理账号
					agent_name: '',
					//开始时间
					start: '',
					//结束时间
					end: '',
				},
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
			this._LoadingList();
		},
		methods: {
			//获取分页信息
			getPagingCont(msg) {
				this.loadingList = msg;
			},
			//页面初始化加载
			_LoadingList() {
				let Url = Urls.Url + Urls.GamePlayers;
				AxiosService.getRequest(Url).then((res) => {
					if(res.code == 200) {
						this.pageInfor.ListPage = res.list;
						this.pageInfor.Total = res.list.length;
					} else {
						console.log(res);
					}
				});
			},
			//搜索
			_Search() {
				if(FV.commonFv(this.Search.agent_name, Regular.searchAccount) || FV.commonFv(this.Search.player_name, Regular.searchAccount)) {
					this.$message.error('请输入正确的内容，消除栏位错误后重新查询！');
					return;
				}
				let Url = Urls.Url + Urls.GamePlayers;
				let dataObj = this.Search;
				console.log(dataObj);
				AxiosService.postRequest(Url, dataObj).then((res) => {
					if(res.code == 200) {
						this.pageInfor.ListPage = res.list;
						this.pageInfor.Total = res.list.length;
					} else {
						console.log(res);
					}
				});
			},
		},
		components: {
			PagingMain
		},
	}
</script>