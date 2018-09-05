<template>
	<div>
		<div class="bg-color pd30">
			<div class="dis-inl-blk mgl10">
				<p>房间名称</p>
				<div class="mgt10">
					<input type="text" class="form-control" placeholder="请输入房间名称" v-model="room_name">
				</div>
			</div>
			<div class="dis-inl-blk mgl10">
				<p>起始日期</p>
				<div class="mgt10">
					<el-date-picker v-model="startDate" type="date" placeholder="请选择起始日期" :picker-options="pickerOptionsStart">
					</el-date-picker>
				</div>
			</div>
			<div class="dis-inl-blk mgl10">
				<p>结束日期</p>
				<div class="mgt10">
					<el-date-picker v-model="endDate" type="date" placeholder="请选择截止日期" :picker-options="pickerOptionsEnd">
					</el-date-picker>
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
							<th>房间名称</th>
							<th>玩家人数</th>
							<th>玩家局数</th>
							<th>普通线中奖局数</th>
							<th>普通线中奖派彩</th>
							<th>全盘奖中奖局数</th>
							<th>全盘奖中奖派彩</th>
							<th>奖池中奖局数</th>
							<th>奖池中奖派彩</th>
							<th>中奖率</th>
							<th>获得免费拉霸次数</th>
							<th>回报率</th>
						</tr>
					</thead>
					<tbody v-if="loadingList.length">
						<tr v-for="item in loadingList">
							<!--<td>2018/08/01 16:00</td>-->
							<td>{{item.room_name}}</td>
							<td>{{item.member_num}}</td>
							<td>{{item.member_inning}}</td>
							<td>{{item.general_win_number}}</td>
							<td>{{item.general_win_sum}}</td>
							<td>{{item.special_win_number}}</td>
							<td>{{item.special_win_sum}}</td>
							<td>{{item.jackpot_win_number}}</td>
							<td>{{item.jackpot_win_sum}}</td>
							<td>{{item.win_rate}}%</td>
							<td>{{item.free_slot_number}}</td>
							<td>{{item.return_rate}}%</td>
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
				loadingList: '',
				room_name: '',
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
				let Url = Urls.Url + Urls.RoomStatistics;
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
					room_name: this.room_name,
					start_time: TimeStamp(this.startDate),
					end_time: TimeStamp(this.endDate)
				}
				const that = this;
				let Url = Urls.Url + Urls.RoomStatistics;
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

<style>

</style>