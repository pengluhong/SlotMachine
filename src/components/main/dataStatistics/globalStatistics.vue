<template>
	<div>
		<div class="bg-color pd30">
			<div class="dis-inl-blk mgl10">
				<p>代理名称</p>
				<div class="mgt10">
					<input type="text" class="form-control" placeholder="请输入代理名称" v-model="agent_name">
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
							<!--<th>时间</th>-->
							<th>代理名称</th>
							<th>会员消耗金</th>
							<th>系统回收金</th>
							<th>进入彩池金</th>
							<th>进入库存金</th>
							<th>会员人数</th>
							<th>会员局数</th>
							<th>会员中奖率</th>
						</tr>
					</thead>
					<tbody v-if="loadingList.length">
						<tr v-for="item in loadingList">
							<!--<td>2018/08/01 16:00</td>-->
							<td>{{item.agent_name}}</td>
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
	import { TimeStamp } from "@/assets/scripts/js/TimeStamp";
	//分页
	import PagingMain from "@/components/sub/pagingMain/pagingMain";
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
				let dataObj = {
					agent_name: this.agent_name,
					start_time: TimeStamp(this.startDate),
					end_time: TimeStamp(this.endDate)
				}
				const that = this;
				console.log(dataObj);
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
		}
	}
</script>