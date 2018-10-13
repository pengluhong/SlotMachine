<template>
	<div>
		<div class="bg-color pd30 clearfix">
			<div class="clearfix">
				<div class="dis-inl-blk">
					<p>账号</p>
					<div class="mgt10">
						<el-input v-model="Search.account" placeholder="请输入账号"></el-input>
					</div>
				</div>
				<span class="dis-inl-blk error-dis">
				<el-tooltip 
						effect="dark" 
						:content="Regular.searchAccountError" 
						placement="top" 
						v-if="FV.commonFv(Search.account,Regular.searchAccount)">
						<i class="el-icon-error color-red ft12"></i>
					</el-tooltip>
			</span>
				<div class="dis-inl-blk">
					<p>姓名</p>
					<div class="mgt10">
						<el-input v-model="Search.realname" placeholder="请输入姓名"></el-input>
					</div>
				</div>
				<span class="dis-inl-blk error-dis">
				<el-tooltip 
						effect="dark" 
						:content="Regular.SearchNameError" 
						placement="top" 
						v-if="FV.commonFv(Search.realname,Regular.SearchName)">
						<i class="el-icon-error color-red ft12"></i>
					</el-tooltip>
			</span>
				<div class="dis-inl-blk">
					<p>角色</p>
					<div class="mgt10">
						<el-select v-model="Search.role_id" placeholder="请选择角色">
							<el-option key="" label="" value=""></el-option>
							<el-option v-for="item in RoleList" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</div>
				</div>
				<el-button type="success" icon="el-icon-search" class="v-a-btm mgl16" @click="_Search">查询</el-button>
			</div>
			<el-button type="success" icon="el-icon-plus" class="v-a-btm mgt10" data-toggle="modal" data-target="#pm_NewPersonnel" @click="_NewButton">新增</el-button>

		</div>
		<div class="pd30 clearfix">
			<div class="table-responsive">
				<table class="table table-bordered">
					<thead>
						<tr>
							<th>序号</th>
							<th>账号</th>
							<th>姓名</th>
							<th>角色</th>
							<th>手机号码</th>
							<th>状态</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody v-if="loadingList.length">
						<tr v-for="(item,index) in loadingList">
							<td>{{index+1+currentPage*10}}</td>
							<td>{{item.account}}</td>
							<td>{{item.realname}}</td>
							<td>{{item.role_name}}</td>
							<td>{{item.phone}}</td>
							<td>
								<span :class="item.status==0? 'text-danger':'text-success'" v-html="item.status==0? '停用':'启用'"></span>
							</td>
							<td>
								<button class="btn btn-danger btn-sm" data-toggle="modal" data-target="#pm-StateOperation" @click="_StateButton(item)" v-if="item.status!=0">停用</button>
								<button class="btn btn-success btn-sm" data-toggle="modal" data-target="#pm-StateOperation" @click="_StateButton(item)" v-else>启用</button>
								<button class="btn btn-warning btn-sm" data-toggle="modal" data-target="#pm_NewPersonnel" @click="_ModifyPersonnel(item)">编辑</button>
								<button class="btn btn-danger btn-sm" data-toggle="modal" data-target="#pm-StateOperation" @click="_DeletePersonnel(item)">删除</button>
							</td>
						</tr>
					</tbody>
					<tbody v-else>
						<tr>
							<td colspan="7">无数据</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="txt-rt">
				<paging-main :pageInfor="pageInfor" @getPagingCont="getPagingCont"></paging-main>
			</div>
		</div>
		<!--新增、修改管理人员-->
		<div class="modal fade" id="pm_NewPersonnel" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog" style="width: 1000px;">
				<div class="modal-content">
					<el-form :model="PersonnelForm" :rules="rulesPersonnelForm" ref="PersonnelForm" label-width="100px">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
							<h4 class="modal-title" v-if="!PersonnelForm.id">新增管理人员</h4>
							<h4 class="modal-title" v-else>编辑管理人员</h4>
						</div>
						<div class="modal-body">
							<div class="alert alert-warning" v-if="!PersonnelForm.id">
								<strong>新增注意事项！</strong>登入密码预设为123456
							</div>
							<div class="clearfix">
								<div class="col-lg-6">
									<div class="page-header" style="margin-top: 0 !important;">
										<h1>基本资料（必填）</h1>
									</div>
									<el-form-item label="账号" prop="account">
										<el-input placeholder="例：g123456" v-model="PersonnelForm.account" :disabled="PersonnelForm.id ? true:false"></el-input>
									</el-form-item>
									<el-form-item label="姓名" prop="realname">
										<el-input placeholder="例：周杰伦" v-model="PersonnelForm.realname"></el-input>
									</el-form-item>
									<el-form-item label="手机号码" prop="phone">
										<el-input placeholder="例：15800000000" v-model="PersonnelForm.phone"></el-input>
									</el-form-item>
									<el-form-item label="角色" prop="role_id">
										<el-select placeholder="请选择角色" style="width:100%" v-model="PersonnelForm.role_id">
											<el-option v-for="item in RoleList" :value="item.id" :label="item.name"></el-option>
										</el-select>
									</el-form-item>
								</div>
								<div class="col-lg-6">
									<div class="page-header" style="margin-top: 0 !important;">
										<h1>选填资料</h1>
									</div>
									<el-form-item label="性别">
										<el-radio-group v-model="PersonnelForm.sex">
											<el-radio v-for="item in SexArr" :label="item.label">{{item.value}}</el-radio>
										</el-radio-group>
									</el-form-item>
									<el-form-item label="Email" prop="email">
										<el-input placeholder="例：163@freer.com" v-model="PersonnelForm.email"></el-input>
									</el-form-item>
									<el-form-item label="生日">
										<el-date-picker type="date" placeholder="例：1900-07-09" v-model="PersonnelForm.birth" :picker-options="pickerOptionsStart" style="width: 100%;" value-format="yyyy-MM-dd" :editable="false"></el-date-picker>
									</el-form-item>
									<el-form-item label="微信号" prop="wechat">
										<el-input placeholder="例：wechar123" v-model="PersonnelForm.wechat"></el-input>
									</el-form-item>
									<el-form-item label="QQ" prop="qq">
										<el-input placeholder="例：123456789" v-model="PersonnelForm.qq"></el-input>
									</el-form-item>
								</div>
							</div>
							<div class="clearfix">
								<div class="col-lg-6">
									<div class="page-header" style="margin-top: 0 !important;">
										<h1>备注</h1>
									</div>
									<el-form-item label="备注" prop="remark">
										<el-col>
											<el-input type="textarea" v-model="PersonnelForm.remark"></el-input>
										</el-col>
									</el-form-item>
								</div>
							</div>
						</div>
						<div class="modal-footer">
							<el-button type="primary" :plain="true" @click="_NewPersonnel('PersonnelForm')">确认</el-button>
							<el-button data-dismiss="modal" @click="_NewPersonnelRest('PersonnelForm')">关闭</el-button>
						</div>
					</el-form>
				</div>
			</div>
		</div>
		<!--新增、修改二次确认弹窗-->
		<div class="modal fade bg-Again" id="pm_AgainNewPersonnel" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<el-form label-width="0">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
							<h4 class="modal-title">提示</h4>
						</div>
						<div class="modal-body">
							<p v-if="!PersonnelForm.id">确认新增管理人员？</p>
							<p v-else>确认修改管理人员？</p>
						</div>
						<div class="modal-footer">
							<el-form-item class="mgb0">
								<el-button type="primary" :plain="true" @click="AgainNewPersonnel">确认</el-button>
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
		<div class="modal fade" id="pm-StateOperation" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<el-form :model="UserPasswordForm" :rules="UserPasswordRules" ref="UserPasswordForm" label-width="0">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
							<h4 class="modal-title" v-if="OperationCont==1">修改状态</h4>
							<h4 class="modal-title" v-else>删除管理人员</h4>
						</div>
						<div class="modal-body txt-ct">
							<p class="mgt10" v-if="OperationCont==1">您即将将
								<b class="text-primary">{{CurrentItem.account}}</b> 的状态设定为
								<span :class="CurrentItem.status!=0? 'text-danger':'text-success'" v-html="CurrentItem.status!=0? '停用':'启用'"></span></p>
							<p class="mgt10" v-else>您即将删除该人员</p>
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
	import Regular from "@/assets/scripts/js/regular";
	import FV from "@/assets/scripts/js/FormValidation";
	export default {
		data() {
			return {
				pickerOptionsStart: {
					disabledDate: (time) => {
						return time.getTime() > Date.now();
					}
				},
				loadingList: [],
				RoleList: [],
				//搜索
				Search: {
					account: '',
					realname: '',
					role_id: '',
				},
				Regular: Regular,
				FV: FV,
				//当前人员信息
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
				PersonnelForm: {
					//用户名（账号）
					account: '',
					//姓名
					realname: '',
					//手机号码
					phone: '',
					//角色
					role_id: null,
					//性别
					sex: '1',
					//email
					email: '',
					//生日
					birth: '',
					//微信
					wechat: '',
					//QQ
					qq: '',
					//备注
					remark: ''
				},
				rulesPersonnelForm: {
					account: [{
						required: true,
						validator: FV.accountCheck,
						trigger: 'blur'
					}],
					realname: [{
						required: true,
						validator: FV.nameCheck,
						trigger: 'blur'
					}],
					phone: [{
						required: true,
						validator: FV.phoneCheck,
						trigger: 'blur'
					}],
					role_id: [{
						required: true,
						message: '请选择角色！',
						trigger: 'change'
					}],
					email:[{
						validator: FV.emailCheck2,
						trigger: 'blur'
					}],
					wechat:[{
						validator: FV.WeChatCheck2,
						trigger: 'blur'
					}],
					qq:[{
						validator: FV.qqCheck2,
						trigger: 'blur'
					}],
					remark:[{
						validator: FV.RemarksCheck2,
						trigger: 'blur'
					}]
				},
				SexArr: [{
					value: '男',
					label: '1',
				}, {
					value: '女',
					label: '2'
				}],
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
				//当前页
				currentPage: 0,
			};
		},
		created() {
			this._LoadingList();
		},
		methods: {
			//获取分页信息
			getPagingCont(msg, page) {
				this.loadingList = msg;
				this.currentPage = page - 1;
			},
			//页面初始化加载
			_LoadingList() {
				let Url = Urls.Url + Urls.GameUser;
				AxiosService.getRequest(Url).then((res) => {
					if(res.code == 200) {
						this.pageInfor.ListPage = res.users;
						this.pageInfor.Total = res.users.length;
					} else {
						console.log(res);
					}
				});

				//加载角色
				let RoleUrl = Urls.Url + Urls.GameRole;
				AxiosService.getRequest(RoleUrl).then((res) => {
					if(res.code == 200) {
						this.RoleList = res.roles;
					} else {
						console.log(res);
					}
				});
			},
			//搜索
			_Search() {
				if(FV.commonFv(this.Search.account, Regular.searchAccount)||FV.commonFv(this.Search.realname, Regular.SearchName)) {
					this.$message.error('请输入正确的内容，消除栏位错误后重新查询！');
					return;
				}
				let Url = Urls.Url + Urls.GameUser;
				let dataObj = this.Search;
				AxiosService.postRequest(Url, dataObj).then((res) => {
					if(res.code == 200) {
						this.pageInfor.ListPage = res.users;
						this.pageInfor.Total = res.users.length;
					} else {
						console.log(res);
					}
				});
			},
			//点击新增按钮
			_NewButton() {
				//清空因编辑填入的数据
				this.PersonnelForm = {
					//用户名（账号）
					account: '',
					//姓名
					realname: '',
					//手机号码
					phone: '',
					//角色
					role_id: null,
					//性别
					sex: '1',
					//email
					email: '',
					//生日
					birth: '',
					//微信
					wechat: '',
					//QQ
					qq: '',
					//备注
					remark: ''
				}
			},
			//点击新增确认按钮
			_NewPersonnel(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						$('#pm_AgainNewPersonnel').modal('show');
					} else {
						return false;
					}
				});
			},
			//点击关闭按钮
			_NewPersonnelRest(formName) {
				this.$refs[formName].resetFields();
			},
			//点击修改编辑按钮
			_ModifyPersonnel(formName) {
				$.extend(this.PersonnelForm, formName);
			},
			//二次确认新增管理人员
			AgainNewPersonnel() {
				let Url = Urls.Url + Urls.GameUserAdd;
				let key = 'account';
				let accounts = this.PersonnelForm.account;
				let dataObj = this.PersonnelForm;
				if(dataObj.id) {
					//如果是修改那么就删除account
					delete dataObj.account;
				}
				AxiosService.postRequest(Url, dataObj).then((res) => {
					if(res.code == 1) {
						$('#pm_NewPersonnel').modal('hide');
						$('#pm_AgainNewPersonnel').modal('hide');
						this.$message({
							message: res.msg,
							type: 'success'
						});
						//新增、修改成功，更新列表
						this._LoadingList();
					} else {
						$('#pm_AgainNewPersonnel').modal('hide');
						this.$message.error(res.msg);
						//如果修改失败，那么把原来的account再次添加到对象中
						if(dataObj.id) {
							this.PersonnelForm[key] = accounts;
						}
						console.log(this.PersonnelForm);
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
					Url = Url + Urls.GameAdminStatus;
					dataObj = {
						id: this.CurrentItem.id,
						status: this.CurrentItem.status,
						password: this.UserPasswordForm.UserPassword,
					}
				} else {
					//删除
					Url = Url + Urls.GameAdminDel;
					dataObj = {
						id: this.CurrentItem.id,
						password: this.UserPasswordForm.UserPassword,
					}
				}
				this.$refs[formName].validate((valid) => {
					if(valid) {
						AxiosService.postRequest(Url, dataObj).then((res) => {
							if(res.code == 1) {
								$('#pm-StateOperation').modal('hide');
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
		},
		components: {
			PagingMain
		},
	}
</script>

<style>

</style>