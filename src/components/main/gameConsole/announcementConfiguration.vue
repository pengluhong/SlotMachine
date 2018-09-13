<template>
	<div>
		<div class="bg-color pd30">
			<button class="btn btn-success mgl10 v-a-btm" data-toggle="modal" data-target="#ac-new-add" @click="_resetObj()">新增</button>
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
								<button class="btn btn-warning btn-sm" data-toggle="modal" data-target="#ac-new-add" @click="updateOperation(item.id,item.special_id,item.content)">修改</button>
								<button class="btn btn-danger btn-sm" data-toggle="modal" data-target="#ac-DeleteNew">删除</button>
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
						<h4 class="modal-title" v-html="update_id ? '修改':'新增'"></h4>
					</div>
					<div class="modal-body">
						<div class="form-group">
							<label for="name">触发条件</label>
							<el-select v-model="select_val" placeholder="请选择触发条件" style="width: 100%;">
								<el-option v-for="item in addLodingList" :key="item.id" :label="item.view_name" :value="item.id">
								</el-option>
							</el-select>
						</div>
						<div class="form-group">
							<label for="name">消息内容</label>
							<el-input type="textarea" v-model="content"></el-input>
						</div>
					</div>
					<div class="modal-footer">
						<el-button type="primary" :plain="true" data-toggle="modal" data-target="#ac-new-add-again">提交</el-button>
						<el-button data-dismiss="modal">关闭</el-button>
					</div>
				</div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal -->
		</div>
		<!--二次确认新增、修改公告-->
		<div class="modal fade bg-Again" id="ac-new-add-again" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title">提示</h4>
					</div>
					<div class="modal-body">
						<p v-if="update_id">是否确认修改公告！</p>
						<p v-else>是否确认新增公告！</p>
					</div>
					<div class="modal-footer">
						<el-button type="primary" :plain="true" data-dismiss="modal" @click="submitAdd">确认</el-button>
						<el-button data-dismiss="modal">取消</el-button>
					</div>
				</div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal -->
		</div>
		<!--删除角色-->
		<div class="modal fade" id="ac-DeleteNew" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<el-form label-width="0">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
							<h4 class="modal-title">删除公告</h4>
						</div>
						<div class="modal-body txt-ct">
							<p class="mgt10">您即将删除这条公告</p>
							<p class="mgt10">确认完毕，请在下方输入您的使用者密码</p>
							<div class="form-group" style="width: 50% !important; margin: 20px auto;">
								<el-form-item>
									<el-input type="password"></el-input>
								</el-form-item>
							</div>
						</div>
						<div class="modal-footer">
							<el-form-item class="mgb0">
								<el-button type="primary" :plain="true">确认</el-button>
								<el-button data-dismiss="modal">关闭</el-button>
							</el-form-item>
						</div>
					</el-form>
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
				console.log(dataObj);
				AxiosService.postRequest(Url, dataObj).then((res) => {
					if(res.code == 1) {
						//列表刷新
						this.getLoadingList();
						this.$message({
							message: this.update_id ? '修改成功！' : '新增成功！',
							type: 'success'
						});
						$('#ac-new-add').modal('hide');
					} else {
						this.$message.error(res.msg);
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
				this.select_val = 1;
				this.update_id = null;
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