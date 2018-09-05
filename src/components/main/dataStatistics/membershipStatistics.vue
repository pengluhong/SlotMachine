<template>
	<div>
		<div class="bg-color pd30">
			<div class="dis-inl-blk mgl10">
				<p>代理商名称</p>
				<div class="mgt10">
					<input type="text" class="form-control" placeholder="请输入代理商名称" v-model="agent_name">
				</div>
			</div>
			<div class="dis-inl-blk mgl10">
				<p>会员名称</p>
				<div class="mgt10">
					<input type="text" class="form-control" placeholder="请输入会员名称" v-model="player_name">
				</div>
			</div>
			<div class="dis-inl-blk mgl10">
				<p>起始日期</p>
				<div class="mgt10">
					<el-date-picker v-model="startDate" type="date" placeholder="请选择起始日期" :picker-options="pickerOptionsStart"></el-date-picker>
				</div>
			</div>
			<div class="dis-inl-blk mgl10">
				<p>结束日期</p>
				<div class="mgt10">
					<el-date-picker v-model="endDate" type="date" placeholder="请选择截止日期" :picker-options="pickerOptionsEnd"></el-date-picker>
				</div>
			</div>
			<button class="btn btn-success mgl10 v-a-btm" @click="_Search">查询</button>
		</div>
		<div class="pd30 clearfix">
			<div class="table-responsive">
				<table class="table table-bordered">
					<thead>
						<tr>
							<th>时间</th>
							<th>所属代理商</th>
							<th>会员名称</th>
							<th>玩局数</th>
							<th>中奖次数</th>
							<th>中奖率</th>
							<th>免费拉霸</th>
							<th>消耗金币</th>
							<th>获得金币</th>
							<th>回报率</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody v-if="loadingList.length">
						<tr v-for='item in loadingList'>
							<td>{{item.created_at | formatDate}}</td>
							<td>{{item.agent_name}}</td>
							<td>{{item.player_name}}</td>
							<td>{{item.game_number}}</td>
							<td>{{item.win_number}}</td>
							<td>{{item.win_rate}}%</td>
							<td>{{item.free_slot}}</td>
							<td>{{item.betting_amount}}</td>
							<td>{{item.win_money}}</td>
							<td>{{item.return_rate}}%</td>
							<td>
								<button class="btn btn-info" @click="DetailedOperation(item.player_id)">详细</button>
							</td>
						</tr>
					</tbody>
					<tbody v-else>
						<tr>
							<td colspan="11">无数据</td>
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

	import { TimeStamp, formatDate } from "@/assets/scripts/js/TimeStamp";
	import Utils from "@/assets/scripts/js/utils";
	//分页
	import PagingMain from "@/components/sub/pagingMain/pagingMain";
	export default {
		components: {
			PagingMain
		},
		data() {
			return {
				//起始日期
				startDate: '',
				pickerOptionsStart: {
					disabledDate: (time) => {
						if(this.endDate != "") {
							return time.getTime() > Date.now() || time.getTime() > this.endDate;
						} else {
							return time.getTime() > Date.now();
						}

					}
				},
				//结束日期
				endDate: '',
				pickerOptionsEnd: {
					disabledDate: (time) => {
						return time.getTime() < this.startDate || time.getTime() > Date.now();
					}
				},
				//初始加载列表
				loadingList: '',
				agent_name: '',
				player_name: '',
				//分页
				pageInfor: {
					//总列表内容
					ListPage: [],
					//总共多少条数据
					Total: 0,
					//每页显示多少条
					pageSize: 10,
				}
			}
		},
		created() {
			//加载初始化列表数据
			this.getLoadingList();
		},
		methods: {
			//获取分页信息
			getPagingCont(msg) {
				this.loadingList = msg;
			},
			getLoadingList() {
				let Url = Urls.Url + Urls.MemberStatistics;
				AxiosService.postRequest(Url).then((res) => {
					if(res.code == 200) {
						this.pageInfor.ListPage = res.data;
						this.pageInfor.Total = res.data.length;
						console.log(res.msg);
					} else {
						console.log(res.msg);
					}
				});
			},
			//查询
			_Search() {
				let dataObj = {
					agent_name: this.agent_name,
					player_name: this.player_name,
					start_time: TimeStamp(this.startDate),
					end_time: TimeStamp(this.endDate)
				}
				const that = this;
				let Url = Urls.Url + Urls.MemberStatistics;
				AxiosService.postRequest(Url, dataObj).then((res) => {
					if(res.code == 200) {
						this.pageInfor.ListPage = res.data;
						this.pageInfor.Total = res.data.length;
						console.log(res.msg);
					} else {
						console.log(res);
					}
				});
			},
			//点击详细按钮
			DetailedOperation(id) {
				localStorage.clear();
				let dataObj = {
					player_id: id
				};
				this.$router.push({
					path: '/MembershipStatisticsDetails',
					query: {
						data: Utils.Encrypt(dataObj)
					}
				});
			},
		},
		filters: { //时间戳转换为日期
			formatDate(time) {
				var date = new Date(parseInt(time) * 1000);
				//return formatDate(date, 'yyyy-MM-dd hh:mm');
				return formatDate(date, 'yyyy-MM-dd');
			}
		}
	}
</script>

<style>

</style>