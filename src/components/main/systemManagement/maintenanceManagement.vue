<template>
	<div>
		<div class="bg-color pd30">
			<div class="clearfix">
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
					<p>维护种类</p>
					<div class="mgt10">
						<el-select placeholder="请选择维护种类" v-model="Search.M_type">
							<el-option key="" label="" value=""></el-option>
						</el-select>
					</div>
				</div>
				<div class="dis-inl-blk mgl16">
					<p>维护状态</p>
					<div class="mgt10">
						<el-select placeholder="请选择维护状态" v-model="Search.M_status">
							<el-option key="" label="" value=""></el-option>
						</el-select>
					</div>
				</div>
				<el-button type="success" icon="el-icon-search" class="v-a-btm mgl16" @click="_Search">查询</el-button>
			</div>
			<el-button type="success" icon="el-icon-plus" class="v-a-btm mgt10" data-toggle="modal" data-target="#mm-NewMaintain">新增</el-button>
		</div>
		<div class="pd30 clearfix">
			<div class="table-responsive">
				<table class="table table-bordered">
					<thead>
						<tr>
							<th>维护种类</th>
							<th>维护时间</th>
							<th>维护原因</th>
							<th>维护范围</th>
							<th>维护状态</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody v-if="loadingList.length">
						<tr v-for="item in loadingList">
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
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
		<!--新增维护 -->
		<div class="modal fade" id="mm-NewMaintain" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title">新增</h4>
					</div>
					<div class="modal-body txt-ct">
						<div class="alert alert-warning">
							<strong>维护管理注意事项！</strong>维护申请关乎游戏的运行，请谨慎处理。
						</div>
						<div class="el-form-item txt-lf el-form-item--feedback">
							<label class="el-form-item__label" style="width: 100px;">维护种类</label>
							<el-radio-group v-model="MaintenanceTypes">
								<el-radio-button label="全站">全站维护</el-radio-button>
								<el-radio-button label="游戏">游戏维护</el-radio-button>
								<el-radio-button label="房间">房间维护</el-radio-button>
							</el-radio-group>
						</div>
						<!--全站维护-->
						<el-form :model="allMaintain" status-icon ref="allMaintain" label-width="100px" v-if="MaintenanceTypes=='全站'">
							<el-form-item label="游戏开始时间" class="txt-lf">
								<el-date-picker v-model="allMaintain.game_start_time" type="date" placeholder="请选择游戏开始时间" value-format="timestamp" :editable="false"></el-date-picker>
							</el-form-item>
							<el-form-item label="开始时间" class="txt-lf">
								<el-date-picker v-model="allMaintain.start_time" type="date" placeholder="请选择开始时间" value-format="timestamp" :editable="false"></el-date-picker>
							</el-form-item>
							<el-form-item label="结束时间" class="txt-lf">
								<el-date-picker v-model="allMaintain.end_time" type="date" placeholder="请选择结束时间" value-format="timestamp" :editable="false"></el-date-picker>
							</el-form-item>
							<el-form-item label="维护页网址">
								<el-input v-model="allMaintain.maintainUrl"></el-input>
							</el-form-item>
							<el-form-item label="维护原因">
								<el-input type="textarea" v-model="allMaintain.maintainCause"></el-input>
							</el-form-item>
							<div class="clearfix">
								<el-form-item class="pull-right">
									<el-button type="primary" :plain="true">确认</el-button>
									<el-button data-dismiss="modal">关闭</el-button>
								</el-form-item>
							</div>
						</el-form>
						<!--游戏维护-->
						<el-form :model="gamesMaintain" status-icon ref="gamesMaintain" label-width="100px" v-if="MaintenanceTypes=='游戏'" id="mm-gamesMaintain">
							<el-form-item label="开始时间" class="txt-lf">
								<el-date-picker v-model="gamesMaintain.start_time" type="date" placeholder="请选择开始时间" value-format="timestamp" :editable="false"></el-date-picker>
							</el-form-item>
							<el-form-item label="结束时间" class="txt-lf">
								<el-date-picker v-model="gamesMaintain.end_time" type="date" placeholder="请选择结束时间" value-format="timestamp" :editable="false"></el-date-picker>
							</el-form-item>
							<el-form-item label="游戏名称" class="txt-lf">
								<el-checkbox-group v-model="gamesMaintain.game_name">
									<el-checkbox label="老虎机"></el-checkbox>
									<el-checkbox label="小玛丽"></el-checkbox>
									<el-checkbox label="梭哈"></el-checkbox>
									<el-checkbox label="三公"></el-checkbox>
								</el-checkbox-group>
							</el-form-item>
							<el-form-item label="维护原因">
								<el-input type="textarea" v-model="gamesMaintain.maintainCause"></el-input>
							</el-form-item>
							<div class="clearfix">
								<el-form-item class="pull-right">
									<el-button type="primary" :plain="true">确认</el-button>
									<el-button data-dismiss="modal">关闭</el-button>
								</el-form-item>
							</div>
						</el-form>
						<!--房间维护-->
						<el-form :model="roomsMaintain" status-icon ref="roomsMaintain" label-width="100px" v-if="MaintenanceTypes=='房间'">
							<el-form-item label="开始时间" class="txt-lf">
								<el-date-picker v-model="roomsMaintain.start_time" type="date" placeholder="请选择开始时间" value-format="timestamp" :editable="false"></el-date-picker>
							</el-form-item>
							<el-form-item label="结束时间" class="txt-lf">
								<el-date-picker v-model="roomsMaintain.end_time" type="date" placeholder="请选择结束时间" value-format="timestamp" :editable="false"></el-date-picker>
							</el-form-item>
							<el-form-item label="选择游戏" class="txt-lf">
								<el-select v-model="roomsMaintain.tingArr" placeholder="请选择">
									<el-option key="" label="" value=""></el-option>
								</el-select>
								<el-select v-model="roomsMaintain.romms" placeholder="请选择">
									<el-option key="" label="" value=""></el-option>
								</el-select>
								<el-button type="success">新增</el-button>
							</el-form-item>
							<el-form-item label="维护房间" class="txt-lf">
								<div class="table-responsive">
									<table class="table table-bordered">
										<thead>
											<tr>
												<th>需要维护的房间</th>
												<th>动作</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>梁山伯</td>
												<td>
													<button class="btn btn-danger btn-sm">删除</button>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</el-form-item>
							<el-form-item label="维护原因">
								<el-input type="textarea" v-model="roomsMaintain.maintainCause"></el-input>
							</el-form-item>
							<div class="clearfix">
								<el-form-item class="pull-right">
									<el-button type="primary" :plain="true">确认</el-button>
									<el-button data-dismiss="modal">关闭</el-button>
								</el-form-item>
							</div>
						</el-form>
					</div>
					<!--<div class="modal-footer">
							<el-form-item class="mgb0">
								<el-button type="primary" :plain="true">确认</el-button>
								<el-button data-dismiss="modal">关闭</el-button>
							</el-form-item>
						</div>-->
				</div>
			</div>
		</div>
		<!--二次确认新增维护 -->
		<div class="modal fade bg-Again" id="mm-NewMaintainAgain" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title">提示</h4>
					</div>
					<div class="modal-body">
						<p class="mgt10">确定新增维护管理吗？</p>
					</div>
					<div class="modal-footer">
						<!--<el-button type="primary" @click="_NewAgentAgain">确定</el-button>-->
						<el-button type="primary">确定</el-button>
						<el-button data-dismiss="modal">取消</el-button>
					</div>
				</div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal -->
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
				Regular: Regular,
				FV: FV,
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
				//日期区间
				DateInterval: '',
				//搜索
				Search: {
					//开始时间
					start_time: '',
					//结束时间
					end_time: '',
					//维护种类
					M_status: '',
					//维护状态
					M_type: '',
				},
				//维护种类
				MaintenanceTypes: '全站',
				//全站维护
				allMaintain: {
					//游戏开始时间
					game_start_time: '',
					//开始时间
					start_time: '',
					//结束时间
					end_time: '',
					//维护页网址
					maintainUrl: '',
					//维护原因
					maintainCause: '',
				},
				//游戏维护
				gamesMaintain: {
					//开始时间
					start_time: '',
					//结束时间
					end_time: '',
					game_name: ['老虎机', '小玛丽'],
					//维护原因
					maintainCause: '',
				},
				//房间维护
				roomsMaintain: {
					//开始时间
					start_time: '',
					//结束时间
					end_time: '',
					tingArr: '老虎机',
					romms: '梁山伯',
					//维护原因
					maintainCause: '',
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
			_LoadingList() {},
			//查询
			_Search() {},
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
<style>
	.el-radio-group {
		vertical-align: bottom;
	}
	
	.el-radio-group label {
		margin-bottom: 0;
	}
	
	#mm-gamesMaintain .el-checkbox {
		margin-left: 0 !important;
		margin-right: 15px;
	}
</style>