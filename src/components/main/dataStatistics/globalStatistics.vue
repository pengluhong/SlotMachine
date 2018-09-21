<template>
	<div>
		<div class="bg-color pd30">
			<div class="dis-inl-blk">
				<p>代理名称</p>
				<div class="mgt10">
					<el-input placeholder="请输入代理名称" v-model="agent_name"></el-input>
				</div>
			</div>
			<span class="dis-inl-blk error-dis">
				<el-tooltip effect="dark" :content="Regular.searchAccountError" placement="top" v-if="FV.commonFv(agent_name,Regular.searchAccount)"><i class="el-icon-error color-red ft12"></i></el-tooltip>
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
							<!--<th>时间</th>-->
							<th>代理账号</th>
							<th>会员投资金额</th>
							<th>系统收入</th>
							<th>奖池入金</th>
							<th>库存入金</th>
							<th>会员人数</th>
							<th>会员局数</th>
							<th>会员中奖率</th>
						</tr>
					</thead>
					<tbody v-if="loadingList.length">
						<tr v-for="item in loadingList">
							<!--<td>2018/08/01 16:00</td>-->
							<td>
								<a href="javascript:;" class="text-success" @click="_AgentName(item.agent_name)">{{item.agent_name}}</a>
							</td>
							<td>{{item.betting_amount}}</td>
							<td>{{item.recovery_amount}}</td>
							<td>{{item.jackpot_amount}}</td>
							<td>{{item.stock_amount}}</td>
							<td>{{item.member_num}}</td>
							<td>{{item.member_inning}}</td>
							<td>{{item.win_rate}}%</td>
						</tr>
					</tbody>
					<tbody v-else>
						<tr>
							<td colspan="12">无数据</td>
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
	import Utils from "@/assets/scripts/js/utils";
	import Regular from "@/assets/scripts/js/regular";
	import FV from "@/assets/scripts/js/FormValidation";
	export default {
		components: {
			PagingMain
		},
		data() {
			return {
				startDate: '',
				endDate: '',
				pickerOptionsStart: {
					disabledDate: (time) => {
						if(this.endDate != "") {
							return time.getTime() > Date.now() || time.getTime() > this.endDate;
						} else {
							return time.getTime() > Date.now();
						}

					}
				},
				pickerOptionsEnd: {
					disabledDate: (time) => {
						return time.getTime() < this.startDate || time.getTime() > Date.now();
					}
				},
				//分页
				pageInfor: {
					//总列表内容
					ListPage: [],
					//总共多少条数据
					Total: 0,
					//每页显示多少条
					pageSize: 10,
				},
				//初始加载列表
				loadingList: [],
				agent_name: '',
				Regular: Regular,
				FV: FV,
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
			_LoadingList() {
				let Url = Urls.Url + Urls.AgentStatistics;
				AxiosService.postRequest(Url).then((res) => {
					if(res.code == 200) {
						this.pageInfor.ListPage = res.data;
						this.pageInfor.Total = res.data.length;
						console.log(res.msg);
					} else {
						console.log(res);
					}
				});
			},
			//查询
			_Search() {
				if(FV.commonFv(this.agent_name, Regular.searchAccount)) {
					this.$message.error('请输入正确的内容，消除栏位错误后重新查询！');
					return;
				}
				let dataObj = {
					agent_name: this.agent_name,
					start_time: this.startDate,
					end_time: this.endDate
				}
				let Url = Urls.Url + Urls.AgentStatistics;
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
			_AgentName(name) {
				let dataObj = {
					agent_name: name
				};
				this.$router.push({
					path: '/DataStatistics/MembershipStatistics',
					query: {
						data: Utils.Encrypt(dataObj)
					}
				});
			},
		}
	}
</script>