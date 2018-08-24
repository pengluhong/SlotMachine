<template>
	<div class="pd30 clearfix">
		<div class="table-responsive">
			<table class="table table-bordered">
				<caption>
					<h1 class="color-white dis-inl-blk">资金流分配设置</h1>
					<button class="btn btn-default mgl15" v-if="ConfigsList.length" @click="c_bool=c_bool ? false:true" v-html="c_bool ? '打开表格':'收起表格'"></button>
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
					<tr v-for="item in ConfigsList">
						<td>
							<p v-show="!item.bool">{{item.scale_jackpot}}%</p>
							<div v-show="item.bool">
								<input type="text" class="form-control" v-model="item.scale_jackpot" />
							</div>
						</td>
						<td>
							<p v-show="!item.bool">{{item.scale_sys}}%</p>
							<div v-show="item.bool">
								<input type="text" class="form-control" v-model="item.scale_sys" />
							</div>
						</td>
						<td>
							<p v-show="!item.bool">{{item.scale_stock}}%</p>
							<div v-show="item.bool">
								<input type="text" class="form-control" v-model="item.scale_stock" />
							</div>
						</td>
						<td>
							<div v-show="!item.bool">
								<button class="btn btn-warning" @click="item.bool=item.bool ? false:true">修改</button>
							</div>
							<div v-show="item.bool">
								<button class="btn btn-success" @click="item.bool=item.bool ? false:true;AllocatioFundsUpdate()">确定</button>
								<button class="btn btn-danger" @click="item.bool=item.bool ? false:true">取消</button>
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
					<button class="btn btn-default mgl15" v-if="RoomsList.length" @click="r_bool=r_bool ? false:true" v-html="r_bool ? '打开表格':'收起表格'"></button>
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
								<input type="text" class="form-control" v-model="item.datum" />
							</div>
						</td>
						<td>{{item.multiple}}</td>
						<td>
							<p v-show="!item.bool">{{item.scale_jackpot}}</p>
							<div v-show="item.bool">
								<input type="text" class="form-control" v-model="item.scale_jackpot" />
							</div>
						</td>
						<td>
							<p v-show="!item.bool">{{item.chance_jackpot}}‰</p>
							<div v-show="item.bool">
								<input type="text" class="form-control" v-model="item.chance_jackpot" />
							</div>
						</td>
						<td>
							<p v-show="!item.bool">{{item.local_jackpot}}</p>
							<div v-show="item.bool">
								<input type="text" class="form-control" v-model="item.local_jackpot" />
							</div>
						</td>
						<td>
							<p v-show="!item.bool">{{item.inventory}}</p>
							<div v-show="item.bool">
								<input type="text" class="form-control" v-model="item.inventory" />
							</div>
						</td>
						<td>
							<div v-show="!item.bool">
								<button class="btn btn-warning" @click="item.bool=item.bool ? false:true;_RoomUpdate(item)">修改</button>
							</div>
							<div v-show="item.bool">
								<button class="btn btn-success" @click="item.bool=item.bool ? false:true;RoomSettingUpdate()">确定</button>
								<button class="btn btn-danger" @click="item.bool=item.bool ? false:true">取消</button>
							</div>
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
</template>

<script>
	import AxiosService from "@/assets/scripts/api/axiosService";
	import Urls from "@/assets/scripts/api/Urls";
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
			}
		},
		created() {
			//加载初始化列表数据
			this.getLoadingList();
		},
		methods: {
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
			//资金流分配设置修改
			AllocatioFundsUpdate() {
				let Url = Urls.Url + Urls.fundUpdate;
				let dataObj = this.ConfigsList[0];
				console.log(dataObj);
				AxiosService.postRequest(Url, dataObj).then((res) => {
					if(res.code == 1) {
						console.log(res.msg);
					} else {
						console.log(res.msg);
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
					if(res.code == 1) {
						console.log(res.msg);
					} else {
						console.log(res.msg);
					}
				});
			}
		}
	}
</script>

<style>

</style>