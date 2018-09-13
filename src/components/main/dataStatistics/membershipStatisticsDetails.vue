<template>
	<div>
		<div class="bg-color pd30">
			<router-link to="/MembershipStatistics" class="btn btn-warning">返回</router-link>
		</div>
		<div class="pd30 clearfix">
			<div class="table-responsive">
				<table class="table table-bordered">
					<thead>
						<tr>
							<!--<th>时间</th>-->
							<th>牌局号</th>
							<th>房间名称</th>
							<th>开局前金额</th>
							<th>开局后金额</th>
							<th>押注金额</th>
							<th>赔付金额</th>
							<th>中奖类别</th>
							<th>是否获得奖池</th>
							<th>获得免费拉霸次数</th>
							<th>是否免费拉霸</th>
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
							<td>{{item.is_free}}</td>
							<td>
								<button class="btn btn-info btn-sm" data-toggle="modal" data-target="#ResultList" @click="_SeeGameResults(item.cards)">查看</button>
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
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
							<h4 class="modal-title" id="myModalLabel">查看结果</h4>
						</div>
						<div class="modal-body">
							<div class="form-group">
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
			_SeeGameResults(cards) {
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
						List[i].list.push(cards[j]);
					}
				}
				this.GameResults = List;
			}
		}
	}
</script>

<style>

</style>