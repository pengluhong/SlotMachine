<template>
	<div>
		<div class="bg-color pd30">
			<router-link to="/DataStatistics/MembershipStatistics" class="btn btn-warning">返回</router-link>
		</div>
		<div class="pd30 clearfix">
			<div class="table-responsive">
				<table class="table table-bordered">
					<thead>
						<tr>
							<!--<th>时间</th>-->
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
							<!--<td>2018/08/01 16:00</td>-->
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
								<div class="form-group col-lg-7">
									<div class="table-responsive">
										<table class="table table-bordered">
											<tbody>
												<tr v-for="item in GameResults">
													<td v-for="items in item.list">
														<img :src="'/static/images/numbers/'+items+'.png'" />
													</td>
												</tr>
											</tbody>
										</table>
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
				//游戏结果
				GameResults: [],
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
				let Obj = Utils.Decrypt(this.$route.query.data);
				let Url = Urls.Url + Urls.MemberInfor;
				let dataObj = {
					player_id: Obj.player_id
				}
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
				let List = [{
					list: []
				}, {
					list: []
				}, {
					list: []
				}];
				for(let i = 0; i < List.length; i++) {
					let z = (i + 1) * 5;
					for(let j = z - 5; j < z; j++) {
						List[i].list.push(item.cards[j]);
					}
				}
				this.GameResults = List;
			}
		}
	}
</script>

<style>

</style>