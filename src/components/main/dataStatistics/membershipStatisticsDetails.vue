<template>
	<div>
		<div class="bg-color pd30">
			<el-button type="primary" icon="el-icon-arrow-left" @click="_Return">返回</el-button>
		</div>
		<div class="pd30 clearfix">
			<div class="table-responsive">
				<table class="table table-bordered">
					<thead>
						<tr>
							<th>时间</th>
							<th>会员账号</th>
							<th>牌局编号</th>
							<th>房间名称</th>
							<th>投注前金额</th>
							<th>结算后金额</th>
							<th>投注金额</th>
							<th>杀数</th>
							<th>中奖类别</th>
							<th>奖池获利</th>
							<th>免费拉霸次数</th>
							<th>免费拉霸中奖</th>
							<th>本局结果</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="item in loadingList">
							<td>{{item.start_time | formatDate}}</td>
							<td>{{item.player_name}}</td>
							<td>{{item.card_no}}</td>
							<td>{{item.room_name}}</td>
							<td>{{item.before_balance}}</td>
							<td>{{item.after_balance}}</td>
							<td>{{item.betting_amount}}</td>
							<td>{{item.money}}</td>
							<td>{{item.win_type}}</td>
							<td>{{item.is_jackpot}}</td>
							<td>{{item.free_slot}}</td>
							<td v-html="item.is_free > 0 ? item.is_free:'否'"></td>
							<td>
								<button class="btn btn-info btn-sm" data-toggle="modal" data-target="#ResultList" @click="_SeeGameResults(item)">查看</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="txt-rt">
				<!--分页-->
				<paging-main :pageInfor="pageInfor" @getPagingCont="getPagingCont"></paging-main>
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
												<td class="txt-lf">时间：{{CurrentItem.start_time | formatDate}}</td>
											</tr>
											<tr>
												<td class="txt-lf">会员账号：{{CurrentItem.player_name}}</td>
											</tr>
											<tr>
												<td class="txt-lf">牌局编号：{{CurrentItem.card_no}}</td>
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
											<li v-for="item in CurrentItem.cards" :style="'background-image: url(/static/images/numbers/'+item+'.png)'" class="border-color"></li>
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
	</div>
</template>

<script>
	import AxiosService from "@/assets/scripts/api/axiosService";
	import Urls from "@/assets/scripts/api/Urls";
	import Utils from "@/assets/scripts/js/utils";
	import { formatDate } from "@/assets/scripts/js/TimeStamp";
	//分页
	import PagingMain from "@/components/sub/pagingMain/pagingMain";
	export default {
		components: {
			PagingMain
		},
		data() {
			return {
				loadingList: [],
				//当前牌局信息
				CurrentItem: [],
				player_name: '',
				startDate: '',
				endDate: '',
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
				if(!this.$route.query.data) {
					return;
				}
				let Obj = Utils.Decrypt(this.$route.query.data);
				this.player_name = Obj.player_name;
				this.startDate = Obj.start_time;
				this.endDate = Obj.end_time;
				let Url = Urls.Url + Urls.MemberInfor;
				let dataObj = {
					player_id: Obj.player_id,
					created_at: Obj.created_at
				}
				console.log(dataObj);
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
			//查看游戏结果
			_SeeGameResults(item) {
				this.CurrentItem = item;
				let items = item.line;
				if(items) {
					for(let i = 0; i < items.length; i++) {
						for(let j = 0; j < items[i].element.length; j++) {
							$('#winning-infor > li').eq(items[i].element[j]).addClass('current');
						}
					}
				}
			},
			//返回
			_Return() {
				if(this.player_name == '') {
					return;
				}
				let dataObj = {
					player_name: this.player_name,
					start_time: this.startDate,
					end_time: this.endDate
				}
				this.$router.push({
					path: '/DataStatistics/MembershipStatisticsEveryDay',
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