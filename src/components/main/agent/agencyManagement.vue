<template>
	<div>
		<div class="bg-color pd30 clearfix">
			<button class="btn btn-success v-a-btm" data-toggle="modal" data-target="#am-NewAgent" @click="ClickAddAgent">新增</button>
			<div class="dis-inl-blk mgl10">
				<p>代理账号</p>
				<div class="mgt10">
					<input type="text" class="form-control" placeholder="请输入代理账号" v-model="agent_account">
				</div>
			</div>
			<button class="btn btn-success mgl10 v-a-btm" @click="SearchAgent">搜索</button>
		</div>
		<div class="pd30 clearfix">
			<div class="table-responsive">
				<table class="table table-bordered">
					<thead>
						<tr>
							<th>代理编号</th>
							<th>代理账号</th>
							<th>识别代码</th>
							<th>状态</th>
							<th>金钥状态</th>
							<th>添加时间</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item,index) in loadingList">
							<td>{{item.id}}</td>
							<td>{{item.agent_account}}</td>
							<td>{{item.code}}</td>
							<td>
								<span :class="item.status==0? 'text-danger':'text-success'" v-html="item.status==0? '停用':'启用'"></span>
							</td>
							<td>
								<span :class="item.key_status==0? 'text-danger':'text-success'" v-html="item.key_status==0? '停用':'启用'"></span>
							</td>
							<td>{{item.created_at | formatDate}}</td>
							<td>
								<button class="btn btn-danger btn-sm" data-toggle="modal" data-target="#am-StateOperation" @click="CurrentItem=item;EmptyPassword();" v-if="item.status!=0">停用</button>
								<button class="btn btn-success btn-sm" data-toggle="modal" data-target="#am-StateOperation" @click="CurrentItem=item;EmptyPassword();" v-else>启用</button>
								<button class="btn btn-warning btn-sm" data-toggle="modal" data-target="#am-NewAgent" @click="_ModifyBtn(item.id)">修改</button>
								<button class="btn btn-success btn-sm" data-toggle="modal" data-target="#am-VolumeKey" @click="_CurrentItem(item,index)">金钥</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="txt-rt">
				<paging-main :pageInfor="pageInfor" @getPagingCont="getPagingCont"></paging-main>
			</div>
		</div>
		<!--新增、修改代理 -->
		<div class="modal fade" id="am-NewAgent" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<el-form :model="AgentForm" :rules="AgentFormRules" ref="AgentForm" label-width="100px">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
							<h4 class="modal-title" v-html="AgentForm.id ? '修改代理':'新增代理'"></h4>
						</div>
						<div class="modal-body txt-ct">
							<div class="alert alert-warning">
								<strong v-html="AgentForm.id ? '修改注意事项！':'新增注意事项！'">></strong>账号为代理登入系统之账号，请谨慎保管。
							</div>
							<el-form-item label="代理编号" prop="id" v-if="AgentForm.id">
								<el-input v-model="AgentForm.id" :disabled="true"></el-input>
							</el-form-item>
							<el-form-item label="代理账号" prop="agent_account">
								<el-input v-model="AgentForm.agent_account" placeholder="可使用英文字母或数字4-12位" :disabled="AgentForm.id ? true :false"></el-input>
							</el-form-item>
							<el-form-item label="代理名称" prop="agent_name">
								<el-input v-model="AgentForm.agent_name" placeholder="可使用英文字母、数字、中文最多12位"></el-input>
							</el-form-item>
							<el-form-item label="密码" prop="agent_password" v-if="!AgentForm.id">
								<el-col :span="13">
									<el-input v-model="AgentForm.agent_password" :disabled="true"></el-input>
								</el-col>
								<el-button type="button" class="mgl5" :disabled="!AgentForm.agent_password" v-clipboard:copy="AgentForm.agent_password" v-clipboard:success="onCopy" v-clipboard:error="onError">复制密码</el-button>
								<el-button type="primary" class="mgl5" @click="GeneratingCipher">生成密码</el-button>
							</el-form-item>
							<el-form-item label="代理识别码" prop="code">
								<el-input v-model="AgentForm.code" placeholder="可使用数字4位" :disabled="AgentForm.id ? true :false"></el-input>
							</el-form-item>
							<el-form-item label="手机号码" prop="mobile">
								<el-input placeholder="请输入您的手机号码" v-model="AgentForm.mobile" class="input-with-select">
									<el-select v-model="AgentForm.profix" slot="prepend">
										<el-option v-for="item in WordCrown" :key="item.value" :label="item.label" :value="item.value"></el-option>
									</el-select>
								</el-input>
							</el-form-item>
							<el-form-item label="电子邮件" prop="email">
								<el-input v-model="AgentForm.email" placeholder="请输入您的电子邮箱"></el-input>
							</el-form-item>
							<el-form-item label="财务查看权限" class="mgb0">
								<div class="el-input" style="position: relative;">
									<input type="text" class="el-input__inner" placeholder="清空搜索内容关闭下拉" v-model="AllowFinance" @keyup="ViewPermissionsResult" />
									<!--搜索下拉框-->
									<div v-if="FinancialAuthority.length" class="el-autocomplete-suggestion el-popper" style="transform-origin: center top 0px; z-index: 2177; width: 100%; position: absolute; top: 40px; left: 0;" x-placement="bottom-start">
										<div class="el-scrollbar">
											<div class="el-autocomplete-suggestion__wrap el-scrollbar__wrap" style="margin-bottom: -17px; margin-right: -17px;">
												<ul class="el-scrollbar__view el-autocomplete-suggestion__list">
													<li class="txt-lf" v-for="item in FinancialAuthority" @click="AddViewPermissions(item)">{{item}}</li>
												</ul>
											</div>
										</div>
										<div x-arrow="" class="popper__arrow" style="left: 35px;"></div>
									</div>
									<!--搜索下拉框 end-->
								</div>
							</el-form-item>
							<div class="txt-lf" style="padding-left: 100px;">
								<el-tag size="small" closable v-for="item in AgentForm.allow_finance" @close="CloseViewPermissions(item)" style="margin-bottom: 4px;">{{item}}</el-tag>
							</div>
						</div>
						<div class="modal-footer">
							<el-form-item class="mgb0">
								<el-button type="primary" :plain="true" @click="_NewAgent('AgentForm')">确认</el-button>
								<el-button data-dismiss="modal" @click="_NewAgentRest('AgentForm')">关闭</el-button>
							</el-form-item>
						</div>
					</el-form>
				</div>
			</div>
		</div>
		<!--状态修改 -->
		<div class="modal fade" id="am-StateOperation" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<el-form :model="StateForm" :rules="StateRules" ref="StateForm" label-width="0">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
							<h4 class="modal-title" id="myModalLabel">启用/停用最高代理</h4>
						</div>
						<div class="modal-body txt-ct">
							<p class="mgt10">您即将将
								<b class="text-primary">{{CurrentItem.agent_account}}</b> 的状态设定为
								<span :class="CurrentItem.status!=0? 'text-danger':'text-success'" v-html="CurrentItem.status!=0? '停用':'启用'"></span></p>
							<p class="mgt10">确认完毕，请在下方輸入您的使用者密码</p>
							<div class="form-group" style="width: 50% !important; margin: 20px auto;">
								<el-form-item prop="UserPassword">
									<el-input type="password" v-model="StateForm.UserPassword"></el-input>
								</el-form-item>
							</div>
						</div>
						<div class="modal-footer">
							<el-form-item class="mgb0">
								<el-button type="primary" :plain="true" @click="StateModification(CurrentItem.id,CurrentItem.status,'StateForm')">确认</el-button>
								<el-button data-dismiss="modal" @click="StateRest('StateForm')">关闭</el-button>
							</el-form-item>
						</div>
					</el-form>
				</div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal -->
		</div>
		<!--金钥 -->
		<div class="modal fade" id="am-VolumeKey" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel">金钥管理（所属代理： <b class="text-primary">{{CurrentItem.agent_account}}</b>）</h4>
					</div>
					<div class="modal-body">
						<div>
							<button class="btn btn-success" @click="EmptyPassword()" data-toggle="modal" data-target="#am-Reoutput">重新产出</button>
							<button class="btn btn-success" @click="getPdf()">汇出</button>
						</div>
						<div class="form-group mgt30" id="pdfDom">
							<label for="name">EncryptKey</label>
							<input type="text" class="form-control" disabled="disabled" v-model="CurrentItem.sign_key">
						</div>
						<div class="form-group mgt30">
							<label for="name">金钥状态：<span :class="CurrentItem.key_status==0? 'text-danger':'text-success'" v-html="CurrentItem.key_status==0? '停用':'启用'"></span></label>
							<button class="btn mgl10" :class="CurrentItem.key_status!=0? 'btn-danger':'btn-success'" v-html="CurrentItem.key_status!=0? '禁用':'启用'" @click="EmptyPassword()"  data-toggle="modal" data-target="#am-EncryptKeyStateOperation"></button>
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
		<!--金钥状态修改 -->
		<div class="modal fade" id="am-EncryptKeyStateOperation" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<el-form :model="StateForm" :rules="StateRules" ref="StateForm" label-width="0">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
							<h4 class="modal-title" id="myModalLabel">金钥状态修改</h4>
						</div>
						<div class="modal-body txt-ct">
							<p class="mgt10">您即将<span :class="CurrentItem.key_status!=0? 'text-danger':'text-success'" v-html="CurrentItem.key_status!=0? '停用':'启用'"></span>
								<b class="text-primary">{{CurrentItem.agent_account}}</b> 的金钥
							</p>
							<p class="mgt10">确认完毕，请在下方輸入您的使用者密码</p>
							<div class="form-group" style="width: 50% !important; margin: 20px auto;">
								<el-form-item prop="UserPassword">
									<el-input type="password" v-model="StateForm.UserPassword"></el-input>
								</el-form-item>
							</div>
						</div>
						<div class="modal-footer">
							<el-form-item class="mgb0">
								<el-button type="primary" :plain="true" @click="EncryptKeyStateModification(CurrentItem.id,CurrentItem.key_status,'StateForm')">确认</el-button>
								<el-button data-dismiss="modal" @click="StateRest('StateForm')">关闭</el-button>
							</el-form-item>
						</div>
					</el-form>
				</div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal -->
		</div>
		<!--金钥——重新产出 -->
		<div class="modal fade" id="am-Reoutput" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<el-form :model="StateForm" :rules="StateRules" ref="StateForm" label-width="0">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
							<h4 class="modal-title" id="myModalLabel">重新产出金钥</h4>
						</div>
						<div class="modal-body txt-ct">
							<p class="mgt10">您确定<b class="text-danger">重新产生金钥</b>吗？这将使原金钥失效。
							</p>
							<p class="mgt10">确认完毕，请在下方輸入您的使用者密码</p>
							<div class="form-group" style="width: 50% !important; margin: 20px auto;">
								<el-form-item prop="UserPassword">
									<el-input type="password" v-model="StateForm.UserPassword"></el-input>
								</el-form-item>
							</div>
						</div>
						<div class="modal-footer">
							<el-form-item class="mgb0">
								<el-button type="primary" :plain="true" @click="ReoutputEncryptKey(CurrentItem.id,'StateForm')">确认</el-button>
								<el-button data-dismiss="modal" @click="StateRest('StateForm')">关闭</el-button>
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
	import { formatDate } from "@/assets/scripts/js/TimeStamp";
	import { RandomNumber } from "@/assets/scripts/js/RandomNumber";
	export default {
		data() {
			return {
				loadingList: [],
				//代理账号
				agent_account: '',
				//当前代理信息
				CurrentItem: [],
				CurrentIndex: null,
				//新增代理
				AgentForm: {
					agent_account: '',
					agent_name: '',
					agent_password: '',
					code: '',
					profix: '86',
					mobile: '',
					email: '',
					allow_finance: [],
				},
				AgentFormRules: {
					agent_account: [{
						required: true,
						message: '代理账号不能为空',
						trigger: 'blur'
					}],
					agent_name: [{
						required: true,
						message: '代理名称不能为空',
						trigger: 'blur'
					}],
					agent_password: [{
						required: true,
						message: '密码不能为空',
						trigger: 'blur'
					}],
					code: [{
						required: true,
						message: '代理识别码不能为空',
						trigger: 'blur'
					}],
					mobile: [{
						required: true,
						message: '手机号码不能为空',
						trigger: 'blur'
					}],
					email: [{
						required: true,
						message: '电子邮箱不能为空',
						trigger: 'blur'
					}],
				},
				//手机号字冠
				WordCrown: [{
					value: '86',
					label: '+86',
				}, {
					value: '886',
					label: '+886',
				}],
				//财务查看权限
				AllowFinance: '',
				FinancialAuthority: [],
				StateForm: {
					//使用者密码
					UserPassword: '',
				},
				StateRules: {
					UserPassword: [{
						required: true,
						message: '密码不能为空',
						trigger: 'blur'
					}]
				},
				//导出金钥的名称
				htmlTitle: 'EncryptKey',
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
			//初始化
			this._Loading();
		},
		methods: {
			//获取分页信息
			getPagingCont(msg) {
				this.loadingList = msg;
			},
			//页面初始化
			_Loading() {
				let Url = Urls.Url + Urls.ProxyIndex;
				AxiosService.postRequest(Url).then((res) => {
					if(res.code == 200) {
						this.pageInfor.ListPage = res.data;
						this.pageInfor.Total = res.data.length;
						console.log(res.msg);
					} else {
						console.log(res);
					}
				});
			},
			//代理账号搜索
			SearchAgent() {
				let Url = Urls.Url + Urls.ProxyIndex;
				let dataObj = {
					agent_account: this.agent_account
				}
				AxiosService.postRequest(Url, dataObj).then((res) => {
					if(res.code == 200) {
						this.pageInfor.ListPage = res.data;
						this.pageInfor.Total = res.data.length;
						console.log(res.msg);
					} else {
						console.log(res);
					}
				});
			},
			//点击新增
			ClickAddAgent() {
				//清空因编辑填入的数据
				this.AgentForm = {
					agent_account: '',
					agent_name: '',
					agent_password: '',
					code: '',
					profix: '86',
					mobile: '',
					email: '',
					allow_finance: [],
				}
			},
			//新增代理
			_NewAgent(formName) {
				let Url;
				let dataObj = this.AgentForm;
				if(dataObj.id) {
					//修改
					Url = Urls.Url + Urls.ProxyEditAdd;
				} else {
					//新增
					Url = Urls.Url + Urls.ProxyAdd;
				}
				console.log(dataObj);
				this.$refs[formName].validate((valid) => {
					if(valid) {
						AxiosService.postRequest(Url, dataObj).then((res) => {
							if(res.code == 200) {
								$('#am-NewAgent').modal('hide')
								this.$message({
									message: res.msg,
									type: 'success'
								});
								//新增成功，更新列表
								this._Loading();
							} else {
								this.$message.error(res.msg);
							}
						});
					} else {
						return false;
					}
				});
			},
			_NewAgentRest(formName) {
				this.$refs[formName].resetFields();
			},
			GeneratingCipher() {
				//生成6位数密码
				this.AgentForm.agent_password = RandomNumber(6);
			},
			// 复制密码-复制成功
			onCopy(e) {
				this.$message({
					message: '复制成功！',
					type: 'success'
				});
				//console.log(e);
			},
			// 复制密码-复制失败
			onError(e) {
				this.$message.error('复制失败！');
			},
			//财务查看权限搜索
			ViewPermissionsResult() {
				let Url = Urls.Url + Urls.ProxyAllowFinance;
				let dataObj = {
					agent_account: this.AllowFinance,
				}
				AxiosService.postRequest(Url, dataObj).then((res) => {
					if(res.code == 200) {
						this.FinancialAuthority = res.data;
					} else {
						this.FinancialAuthority = [];
					}
				});
			},
			//增加权限
			AddViewPermissions(obj) {
				for(let i = 0; i < this.AgentForm.allow_finance.length; i++) {
					if(obj == this.AgentForm.allow_finance[i]) {
						return;
					}
				}
				this.AgentForm.allow_finance.push(obj);
			},
			//删除被增加的权限
			CloseViewPermissions(obj) {
				this.AgentForm.allow_finance.splice(this.AgentForm.allow_finance.indexOf(obj), 1);
			},
			//点击修改编辑按钮
			_ModifyBtn(id) {
				let Url = Urls.Url + Urls.ProxyEdit;
				let dataObj = {
					agent_id: id,
				}
				AxiosService.postRequest(Url, dataObj).then((res) => {
					if(res.code == 200) {
						console.log(res.msg);
						$.extend(this.AgentForm, res.data);
					} else {
						console.log(res);
					}
				});
			},
			//状态修改
			StateModification(id, st, formName) {
				let Url = Urls.Url + Urls.ProxyStatus;
				let dataObj = {
					agent_id: id,
					status: st,
					password: this.StateForm.UserPassword,
				}
				this.$refs[formName].validate((valid) => {
					if(valid) {
						AxiosService.postRequest(Url, dataObj).then((res) => {
							if(res.code == 200) {
								$('#am-StateOperation').modal('hide')
								this.$message({
									message: res.msg,
									type: 'success'
								});
								//修改成功，更新列表
								this._Loading();
							} else {
								this.$message.error(res.msg);
							}
						});
					} else {
						return false;
					}
				});
			},
			StateRest(formName) {
				this.$refs[formName].resetFields();
			},
			//修改金钥状态
			EncryptKeyStateModification(id, st, formName) {
				let Url = Urls.Url + Urls.ProxyKeyStatus;
				let dataObj = {
					agent_id: id,
					key_status: st,
					password: this.StateForm.UserPassword,
				}
				this.$refs[formName].validate((valid) => {
					if(valid) {
						AxiosService.postRequest(Url, dataObj).then((res) => {
							if(res.code == 200) {
								$('#am-EncryptKeyStateOperation').modal('hide');
								this.$message({
									message: res.msg,
									type: 'success'
								});
								//修改成功，更新列表
								this._Loading();
								const that = this;
								setTimeout(function() {
									//修改完成，获取当前修改后的代理数据
									let lists = that.pageInfor.ListPage;
									that.CurrentItem = lists[that.CurrentIndex];
								}, 200);
							} else {
								this.$message.error(res.msg);
							}
						});
					} else {
						return false;
					}
				});
			},
			//重新产出金钥
			ReoutputEncryptKey(id, formName) {
				let Url = Urls.Url + Urls.ProxyRebuildSign;
				let dataObj = {
					agent_id: id,
					password: this.StateForm.UserPassword,
				}
				this.$refs[formName].validate((valid) => {
					if(valid) {
						AxiosService.postRequest(Url, dataObj).then((res) => {
							if(res.code == 200) {
								$('#am-Reoutput').modal('hide');
								this.$message({
									message: res.msg,
									type: 'success'
								});
								//修改成功，更新列表
								this._Loading();
								const that = this;
								setTimeout(function() {
									//修改完成，获取当前修改后的代理数据
									let lists = that.pageInfor.ListPage;
									that.CurrentItem = lists[that.CurrentIndex];
								}, 200);
							} else {
								this.$message.error(res.msg);
							}
						});
					} else {
						return false;
					}
				});
			},
			//获取当前单个信息
			_CurrentItem(item, index) {
				this.CurrentItem = item;
				this.CurrentIndex = index;
			},
			EmptyPassword(){
				this.StateForm.UserPassword = '';
			}
		},
		components: {
			PagingMain
		},
		filters: { //时间戳转换为日期
			formatDate(time) {
				var date = new Date(parseInt(time) * 1000);
				//return formatDate(date, 'yyyy-MM-dd hh:mm');
				return formatDate(date, 'yyyy-MM-dd');
			}
		}
	}
</script>

<style>
	.el-select .el-input {
		width: 100px;
	}
	
	.input-with-select .el-input-group__prepend {
		background-color: #fff;
	}
</style>