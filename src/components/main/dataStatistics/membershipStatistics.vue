<template>
	<div>
		<div class="bg-color pd30">
			<div class="dis-inl-blk">
				<p>代理商名称</p>
				<div class="mgt10">
					<el-input placeholder="请输入代理商名称" v-model="agent_name"></el-input>
				</div>
			</div>
			<span class="dis-inl-blk error-dis">
				<el-tooltip 
						effect="dark" 
						:content="Regular.searchAccountError" 
						placement="top" 
						v-if="FV.commonFv(agent_name,Regular.searchAccount)">
						<i class="el-icon-error color-red ft12"></i>
					</el-tooltip>
			</span>
			<div class="dis-inl-blk">
				<p>会员名称</p>
				<div class="mgt10">
					<el-input placeholder="请输入会员名称" v-model="player_name"></el-input>
				</div>
			</div>
			<span class="dis-inl-blk error-dis">
				<el-tooltip 
						effect="dark" 
						:content="Regular.searchAccountError" 
						placement="top" 
						v-if="FV.commonFv(player_name,Regular.searchAccount)">
						<i class="el-icon-error color-red ft12"></i>
					</el-tooltip>
			</span>
			<div class="dis-inl-blk">
				<p>起始日期</p>
				<div class="mgt10">
					<el-date-picker v-model="startDate" type="date" placeholder="请选择起始日期" :picker-options="pickerOptionsStart" value-format="timestamp" :editable="false"></el-date-picker>
				</div>
			</div>
			<div class="dis-inl-blk">
				<p>结束日期</p>
				<div class="mgt10">
					<el-date-picker v-model="endDate" type="date" placeholder="请选择截止日期" :picker-options="pickerOptionsEnd" value-format="timestamp" :editable="false"></el-date-picker>
				</div>
			</div>
			<el-button type="success" icon="el-icon-search" class="v-a-btm mgl16" @click="_Search">查询</el-button>
		</div>
		<div class="pd30 clearfix">
			<div class="table-responsive">
				<table class="table table-bordered">
					<thead>
						<tr>
							<th>时间</th>
							<th>代理账号</th>
							<th>会员账号</th>
							<th>局数</th>
							<th>中奖次数</th>
							<th>中奖率</th>
							<th>免费拉霸</th>
							<th>投注金币</th>
							<th>杀数</th>
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
								<button class="btn btn-info btn-sm" @click="DetailedOperation(item.player_id)">详细</button>
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

	import {formatDate } from "@/assets/scripts/js/TimeStamp";
	import Utils from "@/assets/scripts/js/utils";
	//分页
	import PagingMain from "@/components/sub/pagingMain/pagingMain";
	import Regular from "@/assets/scripts/js/regular";
	import FV from "@/assets/scripts/js/FormValidation";
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
				}
			}
		},
		created() {
			let q_data = this.$route.query.data;
			if(q_data) {
				//如果由会员统计页进入该页面
				this.agent_name = Utils.Decrypt(q_data).agent_name;
				this._Search();
				return;
			}
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
				if(FV.commonFv(this.agent_name, Regular.searchAccount) || FV.commonFv(this.player_name, Regular.searchAccount)) {
					this.$message.error('请输入正确的内容，消除栏位错误后重新查询！');
					return;
				}
				let dataObj = {
					agent_name: this.agent_name,
					player_name: this.player_name,
					start_time: this.startDate,
					end_time: this.endDate
				}
				const that = this;
				let Url = Urls.Url + Urls.MemberStatistics;
				AxiosService.postRequest(Url, dataObj).then((res) => {
					if(res.code == 200) {
						this.pageInfor.ListPage = res.data;
						this.pageInfor.Total = res.data.length;
						console.log(res.msg);
					} else {
						console.log(res.msg);
					}
				});
			},
			//点击详细按钮
			DetailedOperation(id) {
				let dataObj = {
					player_id: id
				};
				this.$router.push({
					path: '/DataStatistics/MembershipStatisticsDetails',
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
		},
		watch: {
			$route() {
				this.agent_name = '';
				//重新加载初始化列表数据
				this.getLoadingList();
			}
		}
	}
</script>

<style>

</style>