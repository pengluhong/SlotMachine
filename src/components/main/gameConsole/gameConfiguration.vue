<template>
	<div>
		<div class="bg-color pd30">
			<el-button type="primary" icon="el-icon-arrow-left" @click="_Return">返回</el-button>
		</div>
		<div class="pd30 clearfix">
			<div v-for="(item,index) in loadingList">
				<div class="table-responsive">
					<table class="table table-bordered">
						<caption>
							<h1 class="color-white dis-inl-blk">配置{{index+1}}</h1>
							<button class="btn btn-default btn-xs mgl10" @click="item.bool=item.bool ? false:true" v-html="item.bool ? '打开表格':'收起表格'"></button>
						</caption>
					</table>
					<div class="clearfix gcTableList">
						<table class="table table-bordered pull-left" style="width: 19% !important;" v-for="(items,index) in item.elements" :style="index==0 ? 'margin-left:0' : 'margin-left:1%'">
							<thead>
								<tr>
									<th>第{{items.column}}列</th>
									<th>权重</th>
									<th>操作</th>
								</tr>
							</thead>
							<tbody v-show="!item.bool">
								<tr v-for="(itemss,index) in items.elements_arr">
									<td>
										<img src="/static/images/head.jpg" width="30" />
									</td>
									<td>
										<p v-if="!itemss.bool">{{itemss.element}}</p>
										<el-input-number size="mini" v-model="itemss.element" :min="0" :max="1000" v-if="itemss.bool"></el-input-number>
									</td>
									<td class="col-lg-4">
										<div>
											<button class="btn btn-warning btn-xs" v-if="!itemss.bool" @click="itemss.bool=true;_WeightModification(items.id,index)">修改</button>
										</div>
										<div v-if="itemss.bool">
											<button class="btn btn-success btn-xs" data-toggle="modal" data-target="#gc-WeightUpdate" @click="_DetermineButton(index,itemss.element)">确定</button>
											<button class="btn btn-xs btn-danger" @click="getLoadingList">取消</button>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="table-responsive clearfix">
					<table class="table table-bordered pull-left" style="width: 50% !important;">
						<thead>
							<tr>
								<th>共用设置</th>
								<th>出现概率</th>
								<th>操作</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(Arr,index) in item.arr">
								<td v-html="index==0? '美酒':'全盘奖'"></td>
								<td>
									<span v-show="!Arr.bool">{{Arr.value}}</span><span v-show="!Arr.bool">‰</span>
									<el-input-number size="mini" v-model="Arr.value" :min="0" :max="1000" v-show="Arr.bool"></el-input-number>
								</td>
								<td>
									<div v-show="!Arr.bool">
										<button class="btn btn-warning btn-xs" @click="Arr.bool=Arr.bool ? false:true;_settingClick(Arr.key)">修改</button>
									</div>
									<div v-show="Arr.bool">
										<button class="btn btn-success btn-xs" data-toggle="modal" data-target="#gc-WeightUpdate" @click="_DetermineButton(index,Arr.value)">确定</button>
										<button class="btn btn-xs btn-danger" @click="getLoadingList">取消</button>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
					<div class="col-lg-6 pull-left" style="margin-top: 40px;">
						<button class="btn btn-success" @click="_Calculation(item.type)">计算回报率</button>
						<b v-if="CoreType==item.type">：{{Core}}</b>
					</div>
				</div>
			</div>
		</div>
		<!--权重修改确认弹窗-->
		<div class="modal fade" id="gc-WeightUpdate" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
						<el-button type="primary" :plain="true" data-dismiss="modal" @click="WeightModification(CurrentData)">确认</el-button>
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
				//初始加载列表
				loadingList: '',
				//权重ID
				weightID: null,
				//第几个权重
				weightIndex: null,
				_type: null,
				//美酒、全盘奖
				overall_white: null,
				//回报率
				Core: '',
				CoreType: '',
				//修改之前获取当前项的信息
				Current: null,
				CurrentData: null,
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
			//初始化
			getLoadingList() {
				let Url = Urls.Url + Urls.GameConfiguration;
				AxiosService.getRequest(Url).then((res) => {
					if(res.code == 200) {
						this.loadingList = res.configs;
						console.log(res.msg);
					} else {
						console.log('返回失败');
					}
				});
			},
			//点击修改权重按钮
			_WeightModification(id, index) {
				this.weightID = id;
				this.weightIndex = index + 1;
				this._type = 1;
			},
			//点击修改公用设置
			_settingClick(k) {
				this.overall_white = k;
				this._type = 2;
			},
			//点击修改确定按钮
			_DetermineButton(index, item) {
				this.Current = index;
				this.CurrentData = item;
			},
			//修改配置元素权重设置 + 美酒和全盘奖设置
			WeightModification(val) {
				let Url = Urls.Url + Urls.WeightEdit;
				let dataObj;
				if(this._type == 1) {
					dataObj = {
						type: this._type,
						id: this.weightID,
						element: val,
						index: this.weightIndex
					}
				} else {
					dataObj = {
						type: this._type,
						value: val,
						key: this.overall_white
					}
				}
				console.log(dataObj);
				AxiosService.postRequest(Url, dataObj).then((res) => {
					if(res.code == 1) {
						this.getLoadingList();
						this.$message({
							message: '修改成功！',
							type: 'success'
						});
					} else {
						this.$message.error(res.msg);
					}
				});
			},
			//计算回报率
			_Calculation(type) {
				let Url = Urls.Url + Urls.GameRoce;
				let dataObj = {
					type: type
				};
				console.log(dataObj, Url);
				AxiosService.getRequest(Url, dataObj).then((res) => {
					if(res.code == 200) {
						this.Core = res.core.toFixed(2);
						this.CoreType = res.type;
						console.log(res.msg);
					} else {
						console.log(res.msg);
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