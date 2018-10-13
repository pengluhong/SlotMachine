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
				<p>开始时间</p>
				<div class="mgt10">
					<el-date-picker v-model="Search.start_time" type="date" placeholder="请选择开始日期" :picker-options="pickerOptionsStart" value-format="timestamp" :editable="false"></el-date-picker>
				</div>
			</div>
			<div class="dis-inl-blk">
				<p>结束时间</p>
				<div class="mgt10">
					<el-date-picker v-model="Search.end_time" type="date" placeholder="请选择结束日期" :picker-options="pickerOptionsEnd" value-format="timestamp" :editable="false"></el-date-picker>
				</div>
			</div>
			<div class="dis-inl-blk mgl16">
				<p>用户账号</p>
				<div class="mgt10">
					<el-input v-model="Search.user_name" placeholder="请输入用户账号"></el-input>
				</div>
			</div>
			<span class="dis-inl-blk error-dis">
				<el-tooltip 
						effect="dark" 
						:content="Regular.searchAccountError" 
						placement="top" 
						v-if="FV.commonFv(Search.user_name,Regular.searchAccount)">
						<i class="el-icon-error color-red ft12"></i>
					</el-tooltip>
			</span>
			<div class="dis-inl-blk mgl16">
				<p>项目</p>
				<div class="mgt10">
					<el-select placeholder="请选择项目" v-model="Search.menu_pid">
						<el-option key="" label="" value=""></el-option>
						<el-option v-for="item in operationProjectList" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</div>
			</div>
			<div class="dis-inl-blk mgl16">
				<p>类型</p>
				<div class="mgt10">
					<el-select placeholder="请选择类型" v-model="Search.result_id">
						<el-option key="" label="" value=""></el-option>
						<el-option v-for="item in operationTypeList" :key="item" :label="item" :value="item"></el-option>
					</el-select>
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
							<th>操作人</th>
							<th>操作项目</th>
							<th>操作类型</th>
							<th>IP</th>
							<th>操作记录</th>
						</tr>
					</thead>
					<tbody v-if="loadingList.length">
						<tr v-for="item in loadingList">
							<td>{{item.create_at | formatDate}}</td>
							<td>{{item.user_name}}</td>
							<td>{{item.menu_pids}}</td>
							<td>{{item.menu_type}}</td>
							<td>{{item.ip}}</td>
							<td>{{item.action}}</td>
						</tr>
					</tbody>
					<tbody v-else>
						<tr>
							<td colspan="6">无数据</td>
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
	import { formatDate } from "@/assets/scripts/js/TimeStamp";
	export default {
		components: {
			PagingMain
		},
		data() {
			return {
				pickerOptionsStart: {
					disabledDate: (time) => {
						if(this.Search.end_time != "") {
							return time.getTime() > Date.now() || time.getTime() > this.Search.end_time;
						} else {
							return time.getTime() > Date.now();
						}

					}
				},
				pickerOptionsEnd: {
					disabledDate: (time) => {
						return time.getTime() < this.Search.start_time || time.getTime() > Date.now();
					}
				},
				loadingList: [],
				//项目类型列表
				operationProjectList: [],
				operationTypeList: [],
				//日期区间
				DateInterval: '',
				//搜索
				Search: {
					user_name: '',
					//开始时间
					start_time: '',
					//结束时间
					end_time: '',
					menu_pid: '',
					result_id: '',
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
			//项目类型
			this._operationProjectList();
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
				let Url = Urls.Url + Urls.SysLogGet;
				AxiosService.getRequest(Url).then((res) => {
					if(res.code == 200) {
						this.pageInfor.ListPage = res.data;
						this.pageInfor.Total = res.data.length;
					} else {
						console.log(res.msg);
					}
				});
			},
			//项目类型列表
			_operationProjectList() {
				let Url = Urls.Url + Urls.SysLogTree;
				AxiosService.getRequest(Url).then((res) => {
					if(res.code == 200) {
						this.operationProjectList = res.data[0];
						this.operationTypeList = res.data[1];
					} else {
						console.log(res.msg);
					}
				});
			},
			//查询
			_Search() {
				let Url = Urls.Url + Urls.SysLogGet;
				let dataObj = {
					user_name: this.Search.user_name,
					//开始时间
					start_time: this.Search.start_time / 1000,
					//结束时间
					end_time: this.Search.end_time / 1000,
					menu_pid: this.Search.menu_pid,
					result_id: this.Search.result_id,
				};
				console.log(dataObj);
				AxiosService.postRequest(Url, dataObj).then((res) => {
					if(res.code == 200) {
						this.pageInfor.ListPage = res.data;
						this.pageInfor.Total = res.data.length;
					} else {
						console.log(res);
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
						this.Search.start_time = nowTime;
						this.Search.end_time = nowTime;
						break;
					case '本周':
						this.Search.start_time = nowTime - (nowDayWeek - 1) * 24 * 3600 * 1000;
						this.Search.end_time = nowTime;
						break;
					case '本月':
						this.Search.start_time = nowTime - (nowDay - 1) * 24 * 3600 * 1000;
						this.Search.end_time = nowTime;
						break;
					case '上月':
						this.Search.start_time = new Date(nowYear, lastMonth, 1).getTime();
						this.Search.end_time = new Date(nowYear, lastMonth, getMonthDays(lastMonth)).getTime();;
						break;
				}
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