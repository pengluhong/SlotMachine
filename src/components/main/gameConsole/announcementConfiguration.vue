<template>
	<div>
		<div class="bg-color pd30">
			<button class="btn btn-success mgl10 v-a-btm" data-toggle="modal" data-target="#ac-new-add">新增</button>
		</div>
		<div class="pd30 clearfix">
			<div class="table-responsive">
				<table class="table table-bordered">
					<thead>
						<tr>
							<th>公告信息类型</th>
							<th>触发条件</th>
							<th>消息内容</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody v-if="loadingList.length">
						<tr v-for="item in loadingList">
							<td>拉霸</td>
							<td>{{item.special_name}}</td>
							<td v-html="item.content">{{item.content}}</td>
							<td>
								<button class="btn btn-warning" data-toggle="modal" data-target="#ac-new-add" @click="updateOperation(item.id,item.special_id,item.content)">修改</button>
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
		</div>
		<!-- 新增、修改公告 -->
		<div class="modal fade" id="ac-new-add" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel">新增</h4>
					</div>
					<div class="modal-body">
						<div class="form-group">
							<label for="name">触发条件</label>
							<select class="form-control" v-model="select_val">
								<option v-for="item in addLodingList" :value="item.id">{{item.view_name}}</option>
							</select>
						</div>
						<div class="form-group">
							<label for="name">消息内容</label>
							<textarea class="form-control" rows="3" style="resize: none;" v-model="content"></textarea>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
						<button type="button" class="btn btn-primary" data-dismiss="modal" @click="submitAdd">提交</button>
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
	export default {
		data() {
			return {
				//初始加载列表
				loadingList: [],
				//新增、修改初始数据
				addLodingList: [],
				content: '',
				special_id: 1,
				select_val: 1,
				update_id: null
			}
		},
		created() {
			//加载初始化列表数据
			this.getLoadingList();
		},
		methods: {
			getLoadingList() {
				let Url = Urls.Url + Urls.Notice;
				AxiosService.getRequest(Url).then((res) => {
					if(res.code == 200) {
						this.loadingList = res.configs.list;
						this.addLodingList = res.configs.add_tmp;
						console.log(res.msg);
					} else {
						console.log(res.msg);
					}
				});
			},
			_hello() {
				console.log('nihaoa');
			},
			//提交新增、修改
			submitAdd() {
				const that = this;
				let Url = Urls.Url + Urls.AddNotice;
				let dataObj;
				if(this.update_id) {
					//修改
					dataObj = {
						id: this.update_id, //修改必填
						special_id: this.special_id,
						content: this.content
					}
				} else {
					//新增
					dataObj = {
						special_id: this.special_id,
						content: this.content
					}
				}
				AxiosService.postRequest(Url, dataObj).then((res) => {
					if(res.code == 1) {
						//列表刷新
						that.getLoadingList();
						this._resetObj();
						console.log(res.msg);
					} else {
						console.log(res.msg);
					}
				});
			},
			//点击修改按钮
			updateOperation(id, s_id, cont) {
				this.update_id = id;
				this.select_val = s_id;
				this.content = cont;
			},
			//重置
			_resetObj() {
				this.content = '';
				this.special_id = 1;
				this.select_val = 1
			}
		},
		watch: {
			select_val(val) {
				//获取ID
				this.special_id = val;
			}
		}
	}
</script>

<style>

</style>