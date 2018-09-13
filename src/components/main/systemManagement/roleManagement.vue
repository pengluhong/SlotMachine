<template>
	<div class="Role-Management">
		<div class="bg-color pd30 clearfix">
			<button class="btn btn-success" data-toggle="modal" data-target="#rm_NewRole" @click="_NewButton">新增角色</button>
		</div>
		<div class="pd30 clearfix">
			<div class="table-responsive">
				<table class="table table-bordered">
					<thead>
						<tr>
							<th>序号</th>
							<th>角色</th>
							<th>角色说明</th>
							<th>状态</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody v-if="loadingList.length">
						<tr v-for="item in loadingList">
							<td>{{item.id}}</td>
							<td>{{item.name}}</td>
							<td>{{item.remark}}</td>
							<td>
								<span :class="item.status==0? 'text-danger':'text-success'" v-html="item.status==0? '停用':'启用'"></span>
							</td>
							<td>
								<button class="btn btn-danger btn-sm" data-toggle="modal" data-target="#rm-StateOperation" @click="_StateButton(item)" v-if="item.status!=0">停用</button>
								<button class="btn btn-success btn-sm" data-toggle="modal" data-target="#rm-StateOperation" @click="_StateButton(item)" v-else>启用</button>
								<button class="btn btn-warning btn-sm" data-toggle="modal" data-target="#rm_NewRole" @click="_ModifyRole(item.id)">编辑</button>
								<button class="btn btn-danger btn-sm" data-toggle="modal" data-target="#rm-StateOperation" @click="_DeletePersonnel(item)">删除</button>
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
		<!--新增、修改角色-->
		<div class="modal fade" id="rm_NewRole" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<el-form :model="RoleForm" :rules="rulesRoleForm" ref="RoleForm" label-width="100px">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
							<h4 class="modal-title" v-if="!RoleForm.id">新增角色</h4>
							<h4 class="modal-title" v-else>修改角色</h4>
						</div>
						<div class="modal-body">
							<el-form-item label="角色名" prop="name">
								<el-input v-model="RoleForm.name" placeholder="请输入角色名"></el-input>
							</el-form-item>
							<el-form-item label="角色说明" prop="remark">
								<el-input v-model="RoleForm.remark" placeholder="请输入角色说明"></el-input>
							</el-form-item>
							<el-form-item label="权限" prop="menus">
								<el-collapse accordion>
									<el-collapse-item v-for="item in Menus">
										<template slot="title">{{item.menu_name}}</template>
										<table class="table">
											<caption class="txt-rt" style="padding-right: 7px;">
												<el-checkbox @change="AllChoiceJurisdiction(item)" :data-choice="item.isChoice=_IsAllChoice(item)" v-model="item.isChoice">全选</el-checkbox>
											</caption>
											<tbody>
												<tr v-for="items in item.ChildNodes">
													<th class="txt-lf">{{items.menu_name}}</th>
													<td class="txt-rt">
														<p class="dis-inl-blk mgl10">
															<el-checkbox-group v-model="RoleForm.menus" @change="ChoiceJurisdiction">
																<el-checkbox v-for="itemss in items.ChildNodes" :label="itemss.id" :key="itemss.menu_name">{{itemss.menu_name}}</el-checkbox>
															</el-checkbox-group>
														</p>
													</td>
												</tr>
											</tbody>
										</table>
									</el-collapse-item>
								</el-collapse>
							</el-form-item>
						</div>
						<div class="modal-footer">
							<el-form-item class="mgb0">
								<el-button type="primary" :plain="true" @click="_NewRole('RoleForm')">确认</el-button>
								<el-button data-dismiss="modal">关闭</el-button>
							</el-form-item>
						</div>
					</el-form>
				</div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal -->
		</div>
		<!--新增、修改二次确认弹窗-->
		<div class="modal fade bg-Again" id="rm_AgainNewRole" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<el-form label-width="0">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
							<h4 class="modal-title">提示</h4>
						</div>
						<div class="modal-body">
							<p v-if="!RoleForm.id">确认新增角色？</p>
							<p v-else>确认修改角色？</p>
						</div>
						<div class="modal-footer">
							<el-form-item class="mgb0">
								<el-button type="primary" :plain="true" @click="AgainNewRole">确认</el-button>
								<el-button data-dismiss="modal">关闭</el-button>
							</el-form-item>
						</div>
					</el-form>
				</div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal -->
		</div>
		<!--状态修改以及删除 -->
		<div class="modal fade" id="rm-StateOperation" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<el-form :model="UserPasswordForm" :rules="UserPasswordRules" ref="UserPasswordForm" label-width="0">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
							<h4 class="modal-title" v-if="OperationCont==1">修改状态</h4>
							<h4 class="modal-title" v-else>删除角色</h4>
						</div>
						<div class="modal-body txt-ct">
							<p class="mgt10" v-if="OperationCont==1">您即将将
								<b class="text-primary">{{CurrentItem.name}}</b> 的状态设定为
								<span :class="CurrentItem.status!=0? 'text-danger':'text-success'" v-html="CurrentItem.status!=0? '停用':'启用'"></span></p>
							<p class="mgt10" v-else>您即将删除该角色</p>
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
	//分页
	import PagingMain from "@/components/sub/pagingMain/pagingMain";
	export default {
		data() {
			return {
				//初始列表
				loadingList: [],
				//权限菜单
				Menus: [],
				//所有权限ID
				AllJurisdiction: [],
				RoleForm: {
					//角色名
					name: '',
					//角色说明
					remark: '',
					//权限
					menus: [],
				},
				rulesRoleForm: {
					name: [{
						required: true,
						message: '角色名不能为空！',
						trigger: 'blur'
					}],
					remark: [{
						required: true,
						message: '角色说明不能为空！',
						trigger: 'blur'
					}]
				},
				//当前角色信息
				CurrentItem: [],
				UserPasswordForm: {
					//使用者密码
					UserPassword: '',
				},
				UserPasswordRules: {
					UserPassword: [{
						required: true,
						message: '密码不能为空',
						trigger: 'blur'
					}]
				},
				//判断是修改状态还是删除操作,1为状态修改，0为删除
				OperationCont: null,
				//分页
				pageInfor: {
					//总列表内容
					ListPage: [],
					//总共多少条数据
					Total: 0,
					//每页显示多少条
					pageSize: 10,
				},
			}
		},
		created() {
			this._LoadingList();
			this._LoadingMenu();
		},
		methods: {
			//获取分页信息
			getPagingCont(msg) {
				this.loadingList = msg;
			},
			//页面初始化加载
			_LoadingList() {
				let Url = Urls.Url + Urls.GameRole;
				AxiosService.getRequest(Url).then((res) => {
					if(res.code == 200) {
						this.pageInfor.ListPage = res.roles;
						this.pageInfor.Total = res.roles.length;
					} else {
						console.log(res);
					}
				});
			},
			//获取权限菜单
			_LoadingMenu() {
				let Url = Urls.Url + Urls.GameMenus;
				AxiosService.getRequest(Url).then((res) => {
					if(res.code == 200) {
						this.Menus = res.menus;
						for(let i = 0; i < this.Menus.length; i++) {
							let childNodes = this.Menus[i].ChildNodes;
							for(let j = 0; j < childNodes.length; j++) {
								let childNodess = childNodes[j].ChildNodes; 
								for(let z = 0; z < childNodess.length; z++) {
									this.AllJurisdiction.push(childNodess[z].id);
								}
							}
						}
					} else {
						console.log(res);
					}
				});
			},
			//点击修改状态按钮
			_StateButton(item) {
				this.CurrentItem = item;
				this.OperationCont = 1;
				//清空密码
				this.UserPasswordForm.UserPassword = '';
			},
			//点击删除按钮
			_DeletePersonnel(item) {
				this.CurrentItem = item;
				this.OperationCont = 0;
				//清空密码
				this.UserPasswordForm.UserPassword = '';
			},
			//状态修改以及删除操作
			_Operation(formName) {
				let Url = Urls.Url,
					dataObj = null;
				if(this.OperationCont === 1) {
					//状态修改
					Url = Url + Urls.GameRoleStatus;
					dataObj = {
						id: this.CurrentItem.id,
						status: this.CurrentItem.status,
						password: this.UserPasswordForm.UserPassword,
					}
				} else {
					//删除
					Url = Url + Urls.GameRoleDel;
					dataObj = {
						id: this.CurrentItem.id,
						password: this.UserPasswordForm.UserPassword,
					}
				}
				this.$refs[formName].validate((valid) => {
					if(valid) {
						AxiosService.postRequest(Url, dataObj).then((res) => {
							if(res.code == 1) {
								$('#rm-StateOperation').modal('hide');
								this.$message({
									message: res.msg,
									type: 'success'
								});
								//修改成功，更新列表
								this._LoadingList();
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
			//选择权限
			ChoiceJurisdiction(val) {
				this.RoleForm.menus = val;
			},
			//全选权限
			AllChoiceJurisdiction(item) {
				let childNodes = item.ChildNodes;
				let arrs = [];
				let isChoice = true;
				for(let i = 0; i < childNodes.length; i++) {
					let childNodess = childNodes[i].ChildNodes;
					for(let j = 0; j < childNodess.length; j++) {
						arrs.push(childNodess[j].id);
					}
				}
				let JAll = this.RoleForm.menus;
				for(let i = 0; i < arrs.length; i++) {
					//全选
					if(JAll.indexOf(arrs[i]) == -1) {
						this.RoleForm.menus.push(arrs[i]);
						isChoice = false;
					}
				}
				//全不选
				if(isChoice) {
					for(let i = 0; i < arrs.length; i++) {
						this.RoleForm.menus.splice(this.RoleForm.menus.indexOf(arrs[i]), 1);
					}
				}
			},
			//点击新增角色按钮
			_NewButton() {
				//清空因编辑填入的数据
				this.RoleForm = {
					//角色名
					name: '',
					//角色说明
					remark: '',
					//权限
					menus: [],
				}
			},
			//点击新增确认按钮
			_NewRole(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						$('#rm_AgainNewRole').modal('show');
					} else {
						return false;
					}
				});
			},
			//点击关闭按钮
			_NewRoleRest(formName) {
				this.$refs[formName].resetFields();
			},
			//点击修改编辑按钮
			_ModifyRole(id) {
				let Url = Urls.Url + Urls.GameRoleDetail;
				let dataObj = {
					id: id
				}
				AxiosService.getRequest(Url, dataObj).then((res) => {
					if(res.code == 200) {
						$.extend(this.RoleForm, res.role[0]);
					} else {
						console.log(res);
					}
				});
			},
			//二次确认新增、修改角色
			AgainNewRole() {
				let Url = Urls.Url + Urls.GameRoleEdit;
				let dataObj = this.RoleForm;
				console.log(dataObj);
				AxiosService.postRequest(Url, dataObj).then((res) => {
					if(res.code == 1) {
						$('#rm_NewRole').modal('hide');
						$('#rm_AgainNewRole').modal('hide');
						this.$message({
							message: res.msg,
							type: 'success'
						});
						//新增、修改成功，更新列表
						this._LoadingList();
					} else {
						$('#rm_AgainNewRole').modal('hide');
						this.$message.error(res.msg);
					}
				});
			},
			//当前是否勾选全部
			_IsAllChoice(item) {
				let childNodes = item.ChildNodes;
				let arrs = [];
				for(let i = 0; i < childNodes.length; i++) {
					let childNodess = childNodes[i].ChildNodes;
					for(let j = 0; j < childNodess.length; j++) {
						arrs.push(childNodess[j].id);
					}
				}
				let JAll = this.RoleForm.menus;
				for(let i = 0; i < arrs.length; i++) {
					//全选
					if(JAll.indexOf(arrs[i]) == -1) {
						return false;
					}
				}
				return true;
			},
		},
		components: {
			PagingMain
		},
	}
</script>

<style>
	.Role-Management .el-collapse,
	.Role-Management .el-collapse-item__wrap {
		border: none !important;
	}
	
	.Role-Management .el-collapse-item__header {
		background: #f5f5f5;
		padding: 0 15px;
		border: none !important;
	}
	
	.Role-Management .el-collapse-item__wrap {
		padding: 0 15px;
	}
	
	#rm_NewRole .el-collapse>div {
		margin-top: 10px;
	}
	
	#rm_NewRole .el-collapse>div:first-child {
		margin-top: 0;
	}
</style>