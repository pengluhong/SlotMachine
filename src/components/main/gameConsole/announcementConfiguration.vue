<template>
	<div>
		<div class="bg-color pd30">
			<div class="clearfix">
				<div class="dis-inl-blk">
					<p>阈值</p>
					<div class="mgt10">
						<el-input placeholder="请输入阈值" v-model="quota"></el-input>
					</div>
				</div>
				<span class="dis-inl-blk error-dis">
					<el-tooltip effect="dark" :content="Regular.quotaError" placement="top" v-if="FV.commonFv(quota,Regular.quota)"><i class="el-icon-error color-red ft12"></i></el-tooltip>
				</span>
				<el-button type="success" icon="el-icon-search" class="v-a-btm" @click="SearchNotice">查询</el-button>
			</div>
			<el-button type="success" icon="el-icon-plus" class="v-a-btm mgt10" data-toggle="modal" data-target="#ac-new-add" @click="_resetObj()">新增</el-button>
		</div>
		<div class="pd30 clearfix">
			<div class="table-responsive">
				<table class="table table-bordered">
					<thead>
						<tr>
							<th>序号</th>
							<th>模板</th>
							<th>阈值</th>
							<th>状态</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody v-if="loadingList.length">
						<tr v-for="(item,index) in loadingList">
							<td>{{index+1}}</td>
							<td>{{item.content}}</td>
							<td>{{item.quota}}</td>
							<td>
								<span :class="item.status==0? 'text-danger':'text-success'" v-html="item.status==0? '停用':'启用'"></span>
							</td>
							<td>
								<button class="btn btn-warning btn-sm" data-toggle="modal" data-target="#ac-new-add" @click="updateOperation(item)">编辑</button>
								<button class="btn btn-danger btn-sm" data-toggle="modal" data-target="#ac-DeleteOperation" @click="_NoticeDel(item)">删除</button>
							</td>
						</tr>
					</tbody>
					<tbody v-else>
						<tr>
							<td colspan="5">无数据</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="txt-rt">
				<paging-main :pageInfor="pageInfor" @getPagingCont="getPagingCont"></paging-main>
			</div>
		</div>
		<!-- 新增、编辑公告 -->
		<div class="modal fade" id="ac-new-add" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<el-form :model="NoticeFrom" :rules="rulesNoticeFrom" ref="NoticeFrom" label-width="100px">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="_NewNoticeRest('NoticeFrom')">&times;</button>
							<h4 class="modal-title" v-html="NoticeFrom.id ? '编辑':'新增'"></h4>
						</div>
						<div class="modal-body">
							<div class="alert alert-warning">
								<p class="mg"><strong><b v-html="NoticeFrom.id ? '编辑':'新增'"></b>注意事项！</strong>模板文字必须包含此二项替换文字！</p>
								<p class="mgt10" style="line-height: 24px;">
									<b>替换字符：</b> 太幸运了！恭喜玩家
									<span class="text-danger">【XXX】</span>在水浒传中获得<span class="text-danger"> XXX </span>金币！
								</p>
							</div>
							<el-form-item label="状态" prop="status">
								<el-radio-group v-model="NoticeFrom.status">
									<el-radio :label="1">启用</el-radio>
									<el-radio :label="0">停用</el-radio>
								</el-radio-group>
							</el-form-item>
							<el-form-item label="触发金额" prop="quota">
								<el-input v-model="NoticeFrom.quota" placeholder="请输入一个正整数"></el-input>
							</el-form-item>
							<el-form-item label="消息内容" prop="content">
								<el-input type="textarea" v-model="NoticeFrom.content" placeholder="示例：太幸运了！恭喜玩家【XXX】在水浒传中获得XXX金币！"></el-input>
							</el-form-item>
						</div>
						<div class="modal-footer">
							<el-button type="primary" :plain="true" @click="_NewNotice('NoticeFrom')">提交</el-button>
							<el-button data-dismiss="modal" @click="_NewNoticeRest('NoticeFrom')">关闭</el-button>
						</div>
					</el-form>
				</div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal -->
		</div>
		<!--二次确认新增、编辑公告-->
		<div class="modal fade bg-Again" id="ac-new-add-again" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title">提示</h4>
					</div>
					<div class="modal-body">
						<p v-if="NoticeFrom.id">是否确认修改公告！</p>
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
		<!--删除公告-->
		<div class="modal fade" id="ac-DeleteOperation" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<el-form :model="UserPasswordForm" :rules="UserPasswordRules" ref="UserPasswordForm" label-width="0">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
							<h4 class="modal-title">删除公告</h4>
						</div>
						<div class="modal-body txt-ct">
							<p class="mgt10">您即将删除该条公告</p>
							<p class="mgt10">确认完毕，请在下方輸入您的使用者密码</p>
							<div class="form-group" style="width: 50% !important; margin: 20px auto;">
								<el-form-item prop="UserPassword">
									<el-input type="password" v-model="UserPasswordForm.UserPassword"></el-input>
								</el-form-item>
							</div>
						</div>
						<div class="modal-footer">
							<el-form-item class="mgb0">
								<el-button type="primary" :plain="true" @click="_Operation('UserPasswordForm')">确认</el-button>
								<el-button data-dismiss="modal" @click="_OperationRest('UserPasswordForm')">关闭</el-button>
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
	import Regular from "@/assets/scripts/js/regular";
	import FV from "@/assets/scripts/js/FormValidation";
	//分页
	import PagingMain from "@/components/sub/pagingMain/pagingMain";
	export default {
		data() {
			return {
				//初始加载列表
				loadingList: [],
				//搜索阈值
				quota: '',
				Regular: Regular,
				FV: FV,
				NoticeFrom: {
					//状态,默认为启用
					status: 1,
					//触发金额
					quota: '',
					//消息内容
					content: '',
					//游戏ＩＤ，目前后台固定为１，后续加入游戏时为活动值
					game_id: 1,
				},
				rulesNoticeFrom: {
					status: [{
						required: true,
						message: '请选择状态！',
						trigger: 'change'
					}],
					quota: [{
						required: true,
						validator: FV.quotaCheck,
						trigger: 'blur'
					}],
					content: [{
						required: true,
						validator: FV.NewsCheck,
						trigger: 'blur'
					}],
				},
				//当前公告信息
				CurrentItem: [],
				UserPasswordForm: {
					//使用者密码
					UserPassword: '',
				},
				UserPasswordRules: {
					UserPassword: [{
						required: true,
						message: '请填写密码！',
						trigger: 'blur'
					}]
				},
				//分页
				pageInfor: {
					//总列表内容
					ListPage: [],
					//总共多少条数据
					Total: 0,
					//每页显示多少条
					pageSize: 12,
				},
			}
		},
		created() {
			//加载初始化列表数据
			this.getLoadingList();
		},
		methods: {
			//获取分页信息
			getPagingCont(msg) {
				this.loadingList = msg;
			},
			getLoadingList() {
				let Url = Urls.Url + Urls.Notice;
				AxiosService.getRequest(Url).then((res) => {
					if(res.code == 200) {
						this.pageInfor.ListPage = res.configs.list;
						this.pageInfor.Total = res.configs.list.length;
						console.log(res.msg);
					} else {
						console.log(res.msg);
					}
				});
			},
			//点击新增确认按钮
			_NewNotice(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						$('#ac-new-add-again').modal('show');
					} else {
						return false;
					}
				});
			},
			//点击关闭按钮
			_NewNoticeRest(formName) {
				this.$refs[formName].resetFields();
			},
			//提交新增、编辑
			submitAdd() {
				let Url = Urls.Url + Urls.AddNotice;
				let dataObj = this.NoticeFrom;
				AxiosService.postRequest(Url, dataObj).then((res) => {
					if(res.code == 1) {
						//列表刷新
						this.getLoadingList();
						this.$message({
							message: dataObj.id ? '修改成功！' : '新增成功！',
							type: 'success'
						});
						$('#ac-new-add').modal('hide');
					} else {
						this.$message.error(res.msg);
					}
				});
			},
			//搜索
			SearchNotice() {
				if(FV.commonFv(this.quota, Regular.quota)) {
					this.$message.error('请输入正确的内容，消除栏位错误后重新查询！');
					return;
				}
				let Url = Urls.Url + Urls.Notice;
				let dataObj = {
					quota: this.quota
				};
				AxiosService.postRequest(Url, dataObj).then((res) => {
					if(res.code == 200) {
						this.pageInfor.ListPage = res.configs.list;
						this.pageInfor.Total = res.configs.list.length;
					} else {
						console.log(res.msg);
					}
				});
			},
			//点击修改按钮
			updateOperation(item) {
				$.extend(this.NoticeFrom, item);
			},
			//点击删除按钮
			_NoticeDel(item) {
				this.CurrentItem = item;
				//清空密码
				this.UserPasswordForm.UserPassword = '';
			},
			//重置
			_resetObj() {
				this.NoticeFrom = {
					//状态,默认为启用
					status: 1,
					//触发金额
					quota: '',
					//消息内容
					content: '',
					//游戏ＩＤ，目前后台固定为１，后续加入游戏时为活动值
					game_id: 1,
				}
			},
			//删除公告
			_Operation(formName) {
				let Url = Urls.Url + Urls.GameNoticeDel;
				let dataObj = {
					id: this.CurrentItem.id,
					password: this.UserPasswordForm.UserPassword,
				}
				console.log(dataObj);
				this.$refs[formName].validate((valid) => {
					if(valid) {
						AxiosService.postRequest(Url, dataObj).then((res) => {
							if(res.code == 1) {
								$('#ac-DeleteOperation').modal('hide');
								this.$message({
									message: '删除成功！',
									type: 'success'
								});
								//修改成功，更新列表
								this.getLoadingList();
							} else {
								this.$message.error(res.msg);
							}
						});
					} else {
						return false;
					}
				});
			},
			_OperationRest(formName) {
				this.$refs[formName].resetFields();
			},
		},
		watch: {
			select_val(val) {
				//获取ID
				this.special_id = val;
			}
		},
		components: {
			PagingMain
		},
	}
</script>

<style>

</style>