<template>
	<div>
		<div class="bg-color pd30">
			<div class="dis-inl-blk">
				<p>起始日期</p>
				<div class="mgt10">
					<el-date-picker v-model="Search.start" type="date" placeholder="请选择起始日期" :picker-options="pickerOptionsStart" value-format="yyyy-MM-dd" :editable="false"></el-date-picker>
				</div>
			</div>
			<div class="dis-inl-blk">
				<p>结束日期</p>
				<div class="mgt10">
					<el-date-picker v-model="Search.end" type="date" placeholder="请选择截止日期" :picker-options="pickerOptionsEnd" value-format="yyyy-MM-dd" :editable="false"></el-date-picker>
				</div>
			</div>
			<div class="dis-inl-blk mgl16">
				<p>交易类型</p>
				<div class="mgt10">
					<el-select v-model="Search.trade_type" placeholder="请选择交易类型">
						<el-option label="" value=""></el-option>
						<el-option label="游戏结算" value="1"></el-option>
						<el-option label="转入" value="2"></el-option>
						<el-option label="转出" value="3"></el-option>
					</el-select>
				</div>
			</div>
			<div class="dis-inl-blk mgl16">
				<p>订单号</p>
				<div class="mgt10">
					<el-input v-model="Search.trade_order" placeholder="请输入订单号"></el-input>
				</div>
			</div>
			<div class="dis-inl-blk mgl16">
				<p>最高代理账号</p>
				<div class="mgt10">
					<el-select placeholder="请选择最高代理账号" v-model="Search.agent_name">
						<el-option key="" label="" value=""></el-option>
						<el-option v-for="item in agentList" :key="item.agent_name" :label="item.agent_name" :value="item.agent_name"></el-option>
					</el-select>
				</div>
			</div>
			<div class="dis-inl-blk mgl16">
				<p>会员账号</p>
				<div class="mgt10">
					<el-input v-model="Search.player_name" placeholder="请输入会员账号"></el-input>
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
			<el-button type="success" icon="el-icon-search" class="v-a-btm" @click="_Search">查询</el-button>
		</div>
		<div class="pd30 clearfix">
			<div class="table-responsive">
				<table class="table table-bordered">
					<thead>
						<tr>
							<th>序号</th>
							<th>最高代理账号</th>
							<th>会员账号</th>
							<th>订单号</th>
							<th>交易类型</th>
							<th>游戏类型</th>
							<th>交易金额</th>
							<!--<th>交易前金额</th>
							<th>交易后金额</th>-->
							<th>交易时间</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody v-if="loadingList.length">
						<tr v-for="(item,index) in loadingList">
							<td>{{index+1+currentPage*10}}</td>
							<td>{{item.agent_name}}</td>
							<td>{{item.player_name}}</td>
							<td>{{item.trade_order}}</td>
							<td>{{item.trade_type_name}}</td>
							<td>{{item.game_name}}</td>
							<td :class="item.trade_amount<0? 'text-danger':''">{{item.trade_amount}}</td>
							<!--<td></td>
							<td></td>-->
							<td>{{item.created_at}}</td>
							<td>
								<button class="btn btn-info btn-sm" data-toggle="modal" data-target="#ResultList" @click="_SeeGameResults(item)" v-if="item.trade_type==1">查看</button>
							</td>
						</tr>
					</tbody>
					<tbody v-else>
						<tr>
							<td colspan="9">无数据</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="txt-rt">
				<!--分页-->
				<paging-main :pageInfor="pageInfor" @getPagingCont="getPagingCont"></paging-main>
			</div>
		</div>
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="ResultList" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog" style="width: 700px;">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title">游戏结果</h4>
					</div>
					<div class="modal-body">
						<div class="clearfix">
							<div class="col-lg-5">
								<table class="table">
									<thead>
										<tr>
											<td class="txt-lf">时间：{{CurrentItem.created_at}}</td>
										</tr>
										<tr>
											<td class="txt-lf">会员账号：{{CurrentItem.player_name}}</td>
										</tr>
										<tr>
											<td class="txt-lf">牌局编号：{{CurrentItem.trade_order}}</td>
										</tr>
										<tr>
											<td class="txt-lf">房间名称：{{CurrentItem.room_name}}</td>
										</tr>
										<tr>
											<td class="txt-lf">投注前金额：{{CurrentItem.before_balance}}</td>
										</tr>
										<tr>
											<td class="txt-lf">结算后金额：{{CurrentItem.after_balance}}</td>
										</tr>
										<tr>
											<td class="txt-lf">投注金额：{{CurrentItem.betting_amount}}</td>
										</tr>
										<tr>
											<td class="txt-lf">杀数：{{CurrentItem.money}}</td>
										</tr>
										<tr>
											<td class="txt-lf">中奖类别：{{CurrentItem.win_type}}</td>
										</tr>
										<tr>

											<td class="txt-lf">奖池获利：{{CurrentItem.is_jackpot}}</td>
										</tr>
										<tr>
											<td class="txt-lf">免费拉霸次数：{{CurrentItem.free_slot}}</td>
										</tr>
										<tr>
											<td class="txt-lf">免费拉霸中奖：<span v-html="CurrentItem.is_free > 0 ? CurrentItem.is_free:'否'"></span></td>
										</tr>
									</thead>
								</table>
							</div>
							<div class="form-group col-lg-7 clearfix">
								<div class="pull-right winning-infor border-color">
									<ul id="winning-infor">
										<li v-for="item in CurrentItem.cars" :style="'background-image: url(/static/images/numbers/'+item+'.png)'" class="border-color"></li>
									</ul>
									<i v-for="item in CurrentItem.line" :style="'background: url(/static/images/lines/line'+item.line+'.png)'"></i>
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
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
	export default {
		components: {
			PagingMain
		},
		data() {
			return {
				Search: {
					start: '',
					end: '',
					trade_type: '',
					trade_order: '',
					agent_name: '',
					player_name: '',
				},
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
				Regular: Regular,
				FV: FV,
				//初始化列表信息
				loadingList: [],
				//代理列表选项
				agentList: [],
				//当前数据信息
				CurrentItem: [],
				//分页
				pageInfor: {
					//总列表内容
					ListPage: [],
					//总共多少条数据
					Total: 0,
					//每页显示多少条
					pageSize: 10,
				},
				//当前页
				currentPage: 0,
			}
		},
		created() {
			//代理列表
			this._AgentList();
			this._LoadingList();
		},
		methods: {
			//获取分页信息
			getPagingCont(msg, page) {
				this.loadingList = msg;
				this.currentPage = page - 1;
			},
			//列表初始化
			_LoadingList() {
				let Url = Urls.Url + Urls.SysLogTrade;
				AxiosService.getRequest(Url).then((res) => {
					if(res.code == 200) {
						this.pageInfor.ListPage = res.data;
						this.pageInfor.Total = res.data.length;
					} else {
						console.log(res.msg);
					}
				});
			},
			//代理列表
			_AgentList() {
				let Url = Urls.Url + Urls.ProxyAllowFinance;
				AxiosService.postRequest(Url).then((res) => {
					if(res.code == 200) {
						this.agentList = res.data;
					} else {
						console.log(res);
					}
				});
			},
			//查询
			_Search() {
				let Url = Urls.Url + Urls.SysLogTrade;
				let dataObj = this.Search;
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
			//查看游戏结果
			_SeeGameResults(item) {
				this.CurrentItem = item;
				let items = item.line;
				if(items) {
					setTimeout(function() {
						for(let i = 0; i < items.length; i++) {
							for(let j = 0; j < items[i].element.length; j++) {
								$('#winning-infor > li').eq(items[i].element[j]).addClass('current');
							}
						}
					}, 200);
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