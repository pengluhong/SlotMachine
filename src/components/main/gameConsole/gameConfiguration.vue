<template>
	<div class="pd30 clearfix">
		<div v-for="(item,index) in loadingList">
			<div class="table-responsive">
				<table class="table table-bordered">
					<caption>
						<h1 class="color-white dis-inl-blk">配置{{index+1}}</h1>
						<button class="btn btn-default mgl15" @click="item.bool=item.bool ? false:true" v-html="item.bool ? '打开表格':'收起表格'"></button>
					</caption>
				</table>
				<div class="clearfix gcTableList">
					<table class="table table-bordered pull-left" style="width: 20% !important;" v-for="items in item.elements">
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
									<input type="text" class="form-control" v-if="itemss.bool" v-model="itemss.element" />
								</td>
								<td class="col-lg-4">
									<div>
										<button class="btn btn-warning btn-xs" v-if="!itemss.bool" @click="itemss.bool=true;_WeightModification(items.id,index)">修改</button>
									</div>
									<div v-if="itemss.bool">
										<button class="btn btn-xs btn-success" id="sbs+index" @click="itemss.bool=false;WeightModification(itemss.element)">确定</button>
										<button class="btn btn-xs btn-danger" @click="itemss.bool=false">取消</button>
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
								<input type="text" class="form-control" v-show="Arr.bool" v-model="Arr.value" />
							</td>
							<td>
								<div v-show="!Arr.bool">
									<button class="btn btn-warning btn-xs" @click="Arr.bool=Arr.bool ? false:true;_settingClick(Arr.key)">修改</button>
								</div>
								<div v-show="Arr.bool">
									<button class="btn btn-xs btn-success" @click="Arr.bool=Arr.bool ? false:true;WeightModification(Arr.value)">确定</button>
									<button class="btn btn-xs btn-danger" @click="Arr.bool=Arr.bool ? false:true">取消</button>
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
</template>

<script>
	import AxiosService from "@/assets/scripts/api/axiosService";
	import Urls from "@/assets/scripts/api/Urls";
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
				CoreType: ''
			}
		},
		created() {
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
			//点击修公用设置
			_settingClick(k) {
				this.overall_white = k;
				this._type = 2;
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
						console.log(res.msg);
					} else {
						console.log(res.msg);
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
			}
		}
	}
</script>

<style>

</style>