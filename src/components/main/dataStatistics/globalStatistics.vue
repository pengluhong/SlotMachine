<template>
	<div>
		<div class="bg-color pd30">
			<el-radio-group v-model="DateInterval" @change="_DateInterval(DateInterval)">
				<el-radio-button label="今日">今日</el-radio-button>
				<el-radio-button label="本周">本周</el-radio-button>
				<el-radio-button label="本月">本月</el-radio-button>
				<el-radio-button label="上月">上月</el-radio-button>
			</el-radio-group>
			<div class="dis-inl-blk mgl16">
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
			<div class="dis-inl-blk mgl16">
				<p>最高代理账号</p>
				<div class="mgt10">
					<el-select placeholder="请选择最高代理账号" v-model="agent_name">
						<el-option key="" label="" value=""></el-option>
						<el-option v-for="item in agentList" :key="item.agent_name" :label="item.agent_name" :value="item.agent_name"></el-option>
					</el-select>
				</div>
			</div>
			<!--<div class="dis-inl-blk mgl16">
				<p>会员账号</p>
				<div class="mgt10">
					<el-input placeholder="请输入会员账号"></el-input>
				</div>
			</div>-->
			<span class="dis-inl-blk error-dis">
				<!--<el-tooltip effect="dark" :content="Regular.searchAccountError" placement="top" v-if="FV.commonFv(agent_name,Regular.searchAccount)"><i class="el-icon-error color-red ft12"></i></el-tooltip>-->
			</span>
			<el-button type="success" icon="el-icon-search" class="v-a-btm" @click="_Search">查询</el-button>
		</div>
		<div class="pd30 clearfix">
			<div class="table-responsive">
				<table class="table table-bordered">
					<thead>
						<tr>
							<th>代理账号</th>
							<th>会员投资金额</th>
							<th>系统收入</th>
							<th>奖池入金</th>
							<th>库存入金</th>
							<th>会员人数</th>
							<th>会员局数</th>
							<th>会员中奖率</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody v-if="loadingList.length">
						<tr v-for="item in loadingList">
							<td><a href="javascript:;" class="text-success" @click="_AgentName(item.agent_name)">{{item.agent_name}}</a></td>
							<td>{{item.betting_amount}}</td>
							<td>{{item.recovery_amount}}</td>
							<td>{{item.jackpot_amount}}</td>
							<td>{{item.stock_amount}}</td>
							<td>{{item.member_num}}</td>
							<td>{{item.member_inning}}</td>
							<td>{{item.w_rate}}%</td>
							<td>
								<b class="btn btn-info btn-sm" @click="InDetail(item.agent_name)">详细</b>
							</td>
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
	export default {
		components: {
			PagingMain
		},
		data() {
			return {
				//日期区间
				DateInterval: '',
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
				loadingList:[],
				agentList:[],
				//最高代理账号
				agent_name:'',
			}
		},
		created(){
			//初始化列表
			this._LoadingList();
			//代理列表
			this._AgentList();
		},
		methods: {
			//获取分页信息
			getPagingCont(msg) {
				this.loadingList = msg;
			},
			//初始化列表
			_LoadingList() {
				let Url = Urls.Url + Urls.AgentStatisticsSum;
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
			//代理列表
			_AgentList(){
				let Url = Urls.Url + Urls.ProxyAllowFinance;
				AxiosService.postRequest(Url).then((res) => {
					if(res.code == 200) {
						this.agentList = res.data;
						console.log(res.msg);
					} else {
						console.log(res);
					}
				});
			},
			_Search(){
				let Url = Urls.Url + Urls.AgentStatisticsSum;
				let dataObj = {
					agent_name:this.agent_name,
					start_time:this.startDate,
					end_time:this.endDate
				}
				console.log(dataObj);
				AxiosService.postRequest(Url,dataObj).then((res) => {
					if(res.code == 200) {
						this.pageInfor.ListPage = res.data;
						this.pageInfor.Total = res.data.length;
					} else {
						console.log(res);
					}
				});
			},
			//详细
			InDetail(agentName){
				let dataObj = {
					agent_name:agentName,
					start:this.startDate,
					end:this.endDate
				}
				this.$router.push({
					path: '/DataStatistics/GlobalStatisticsEveryDay',
					query: {
						data: Utils.Encrypt(dataObj)
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
			//选择日期区间
			_DateInterval(val) {
				let now = new Date();
				//当前时间时间戳
				let nowTime = now.getTime();
				//本周第几天
				let nowDayWeek = now.getDay();
				//当前日
				let nowDay = now.getDate();
				//当前月
				let nowMonth = now.getMonth();
				//当前年
				let nowYear = now.getYear();
				nowYear += (nowYear < 2000) ? 1900 : 0;
				//上月
				let lastMonth = nowMonth - 1;

				//获得某月的天数 
				function getMonthDays(myMonth) {
					let monthStartDate = new Date(nowYear, myMonth, 1);
					let monthEndDate = new Date(nowYear, myMonth + 1, 1);
					let days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
					return days;
				}

				switch(val) {
					case '今日':
						this.startDate = nowTime;
						this.endDate = nowTime;
						break;
					case '本周':
						this.startDate = nowTime - (nowDayWeek - 1) * 24 * 3600 * 1000;
						this.endDate = nowTime;
						break;
					case '本月':
						this.startDate = nowTime - (nowDay - 1) * 24 * 3600 * 1000;
						this.endDate = nowTime;
						break;
					case '上月':
						this.startDate = new Date(nowYear, lastMonth, 1).getTime();
						this.endDate = new Date(nowYear, lastMonth, getMonthDays(lastMonth)).getTime();;
						break;
				}
			},
		},
	}
</script>

<style>
	.el-radio-group {
		vertical-align: bottom;
	}
	
	.el-radio-group label {
		margin-bottom: 0;
	}
</style>