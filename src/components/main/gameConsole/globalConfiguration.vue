<template>
	<div>
		<div class="bg-color pd30">
			<el-button type="primary" icon="el-icon-arrow-left" @click="_Return">返回</el-button>
		</div>
		<div class="pd30 clearfix">
			<div class="table-responsive">
				<table class="table table-bordered">
					<caption>
						<h1 class="color-white dis-inl-blk">资金流分配设置</h1>
						<button class="btn btn-default btn-xs mgl10" v-if="ConfigsList.length" @click="c_bool=c_bool ? false:true" v-html="c_bool ? '打开表格':'收起表格'"></button>
					</caption>
					<thead>
						<tr>
							<th>进入奖池（%）</th>
							<th>系统回收（%）</th>
							<th>库存（%）</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody v-if="ConfigsList.length" v-show="!c_bool">
						<tr v-for="(item,index) in ConfigsList">
							<td>
								<p v-show="!item.bool">{{item.scale_jackpot}}%</p>
								<div v-show="item.bool">
									<el-input-number size="mini" v-model="item.scale_jackpot" :min="0" :max="100"></el-input-number>
								</div>
							</td>
							<td>
								<p v-show="!item.bool">{{item.scale_sys}}%</p>
								<div v-show="item.bool">
									<el-input-number size="mini" v-model="item.scale_sys" :min="0" :max="100"></el-input-number>
								</div>
							</td>
							<td>
								<p v-show="!item.bool">{{item.scale_stock}}%</p>
								<div v-show="item.bool">
									<el-input-number size="mini" v-model="item.scale_stock" :min="0" :max="100"></el-input-number>
								</div>
							</td>
							<td>
								<div v-show="!item.bool">
									<button class="btn btn-warning btn-sm" @click="item.bool=true">修改</button>
								</div>
								<div v-show="item.bool">
									<button class="btn btn-success btn-sm" data-toggle="modal" data-target="#gc-AllocatioFundsUpdate" @click="_DetermineButton(index)">确定</button>
									<button class="btn btn-danger btn-sm" @click="getLoadingList">取消</button>
								</div>
							</td>
						</tr>
					</tbody>
					<tbody v-else>
						<tr>
							<td colspan="4">无数据</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="table-responsive">
				<table class="table table-bordered">
					<caption>
						<h1 class="color-white dis-inl-blk">房间设置</h1>
						<button class="btn btn-default btn-xs mgl10" v-if="RoomsList.length" @click="r_bool=r_bool ? false:true" v-html="r_bool ? '打开表格':'收起表格'"></button>
					</caption>
					<thead>
						<tr>
							<th>房间名</th>
							<th>准入金</th>
							<th>房间倍数</th>
							<th>奖池临建值</th>
							<th>奖池中奖概率</th>
							<th>当前奖池金额</th>
							<th>库存金额</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody v-if="RoomsList.length" v-show="!r_bool">
						<tr v-for="(item,index) in RoomsList">
							<td>{{item.name}}</td>
							<td>
								<p v-show="!item.bool">{{item.datum}}</p>
								<div v-show="item.bool">
									<el-input-number size="mini" v-model="item.datum" :precision="2" :min="0" :max="100000000"></el-input-number>
								</div>
							</td>
							<td>{{item.multiple}}</td>
							<td>
								<p v-show="!item.bool">{{item.scale_jackpot}}</p>
								<div v-show="item.bool">
									<el-input-number size="mini" v-model="item.scale_jackpot" :precision="2" :min="0" :max="2000000000"></el-input-number>
								</div>
							</td>
							<td>
								<p v-show="!item.bool">{{item.chance_jackpot}}‰</p>
								<div v-show="item.bool">
									<el-input-number size="mini" v-model="item.chance_jackpot" :min="0" :max="1000"></el-input-number>
								</div>
							</td>
							<td>
								<p v-show="!item.bool">{{item.local_jackpot}}</p>
								<div v-show="item.bool">
									<el-input-number size="mini" v-model="item.local_jackpot" :precision="2" :min="0" :max="2000000000"></el-input-number>
								</div>
							</td>
							<td>
								<p v-show="!item.bool">{{item.inventory}}</p>
								<div v-show="item.bool">
									<el-input-number size="mini" v-model="item.inventory" :precision="2" :min="0" :max="2000000000"></el-input-number>
								</div>
							</td>
							<td>
								<!--<button class="btn btn-success btn-sm">启动</button>
							<button class="btn btn-danger btn-sm">关闭</button>-->
								<button v-show="!item.bool" class="btn btn-warning btn-sm" @click="item.bool=true;_RoomUpdate(item)">修改</button>
								<button v-show="item.bool" class="btn btn-success btn-sm" data-toggle="modal" data-target="#gc-RoomSettingUpdate" @click="_DetermineButton(index)">确定</button>
								<button v-show="item.bool" class="btn btn-danger btn-sm" @click="getLoadingList">取消</button>
							</td>
						</tr>
					</tbody>
					<tbody v-else>
						<tr>
							<td colspan="8">无数据</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<!--资金流分配设置修改确认弹窗-->
		<div class="modal fade" id="gc-AllocatioFundsUpdate" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title">提示</h4>
					</div>
					<div class="modal-body">
						<p>是否确认修改？</p>
					</div>
					<div class="modal-footer">
						<el-button type="primary" :plain="true" data-dismiss="modal" @click="ConfigsList[Current].bool=false;AllocatioFundsUpdate()">确认</el-button>
						<el-button data-dismiss="modal" @click="getLoadingList">取消</el-button>
					</div>
				</div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal -->
		</div>
		<!--房间设置修改确认弹窗-->
		<div class="modal fade" id="gc-RoomSettingUpdate" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title">提示</h4>
					</div>
					<div class="modal-body">
						<p>是否确认修改？</p>
					</div>
					<div class="modal-footer">
						<el-button type="primary" :plain="true" data-dismiss="modal" @click="RoomsList[Current].bool=false;RoomSettingUpdate()">确认</el-button>
						<el-button data-dismiss="modal" @click="getLoadingList">取消</el-button>
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
	import Utils from "@/assets/scripts/js/utils";
	export default {
		data() {
			return {
				//资金流分配设置列表
				ConfigsList: [],
				c_bool: false,
				//房间设置列表
				RoomsList: [],
				r_bool: false,
				RoomData: null,
				Current: null,
			}
		},
		created() {
			//获取上级页面传过来的ID
			/*if(!this.$route.query.data) {
				return;
			}
			let Obj = Utils.Decrypt(this.$route.query.data);*/
			//加载初始化列表数据
			this.getLoadingList();
		},
		methods: {
			//初始化列表信息
			getLoadingList() {
				let Url = Urls.Url + Urls.GlobalConfiguration;
				AxiosService.getRequest(Url).then((res) => {
					if(res.code == 200) {
						this.ConfigsList = res.configs;
						this.c_bool = this.ConfigsList.bool;
						this.RoomsList = res.rooms;
						this.r_bool = this.RoomsList.bool;
						console.log(res.msg);
					} else {
						console.log(res.msg);
					}
				});
			},
			//点击资金流分配设置和房间设置确定按钮
			_DetermineButton(index) {
				this.Current = index;
			},
			//资金流分配设置修改
			AllocatioFundsUpdate() {
				let Url = Urls.Url + Urls.fundUpdate;
				let dataObj = this.ConfigsList[0];
				console.log(dataObj);
				AxiosService.postRequest(Url, dataObj).then((res) => {
					this.getLoadingList();
					if(res.code == 1) {
						this.$message({
							message: '修改成功！',
							type: 'success'
						});
					} else {
						this.$message.error(res.msg);
					}
				});
			},
			//点击房间设置修改按钮
			_RoomUpdate(data) {
				this.RoomData = data;
			},
			//房间设置修改
			RoomSettingUpdate() {
				let Url = Urls.Url + Urls.roomUpdate;
				let dataObj = this.RoomData;
				console.log(dataObj);
				AxiosService.postRequest(Url, dataObj).then((res) => {
					this.getLoadingList();
					if(res.code == 1) {
						this.$message({
							message: '修改成功！',
							type: 'success'
						});
					} else {
						this.$message.error(res.msg);
					}
				});
			},
			//返回
			_Return() {
				this.$router.push({
					path: '/GameConsole/GameList'
				})
			},
		}
	}
</script>

<style>

</style>