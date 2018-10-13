<template>
	<div>
		<div class="bg-color pd30 clearfix">
			<div class="clearfix">
				<div class="dis-inl-blk">
					<p>代理账号</p>
					<div class="mgt10">
						<el-input placeholder="请输入代理账号" v-model="agent_name"></el-input>
					</div>
				</div>
				<span class="dis-inl-blk error-dis">
					<el-tooltip 
						effect="dark" 
						:content="Regular.searchAccountError" 
						placement="top" 
						v-if="FV.commonFv(agent_name,Regular.searchAccount)">
						<i class="el-icon-error color-red ft12"></i>
					</el-tooltip>
				</span>
				<el-button type="success" icon="el-icon-search" class="v-a-btm" @click="SearchAgent">查询</el-button>
			</div>
			<el-button type="success" icon="el-icon-plus" class="v-a-btm mgt10" data-toggle="modal" data-target="#am-NewAgent" @click="ClickAddAgent">新增</el-button>
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
					<tbody v-if="loadingList.length">
						<tr v-for="(item,index) in loadingList">
							<td>{{item.id}}</td>
							<td>{{item.agent_name}}</td>
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
		<!--新增、修改代理 -->
		<div class="modal fade" id="am-NewAgent" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<el-form :model="AgentForm" status-icon :rules="AgentFormRules" ref="AgentForm" label-width="100px">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="_NewAgentRest('AgentForm')">&times;</button>
							<h4 class="modal-title" v-html="AgentForm.id ? '修改代理':'新增代理'"></h4>
						</div>
						<div class="modal-body txt-ct">
							<div class="alert alert-warning">
								<strong v-html="AgentForm.id ? '修改注意事项！':'新增注意事项！'">></strong>账号为代理登入系统之账号，请谨慎保管。
							</div>
							<el-form-item label="代理编号" prop="id" v-if="AgentForm.id">
								<el-input v-model="AgentForm.id" :disabled="true"></el-input>
							</el-form-item>
							<el-form-item label="代理账号" prop="agent_name">
								<el-input v-model="AgentForm.agent_name" placeholder="请输入代理账号" :disabled="AgentForm.id ? true :false"></el-input>
							</el-form-item>
							<el-form-item label="代理名称" prop="nick_name">
								<el-input v-model="AgentForm.nick_name" placeholder="请输入代理名称"></el-input>
							</el-form-item>
							<el-form-item label="密码" prop="agent_password" v-if="!AgentForm.id">
								<el-col :span="13">
									<el-input v-model="AgentForm.agent_password" placeholder="请点击生成密码" :disabled="true"></el-input>
								</el-col>
								<el-button type="button" class="mgl5" :disabled="!AgentForm.agent_password" v-clipboard:copy="AgentForm.agent_password" v-clipboard:success="onCopy" v-clipboard:error="onError">复制密码</el-button>
								<el-button type="primary" class="mgl5" @click="GeneratingCipher">生成密码</el-button>
							</el-form-item>
							<el-form-item label="代理识别码" prop="code">
								<el-input v-model="AgentForm.code" placeholder="请输入代理识别码，仅可输入4位数字" :disabled="AgentForm.id ? true :false"></el-input>
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
							<el-form-item label="财务查看权限">
								<el-col :span="20">
									<el-input placeholder="请选择代理权限" v-model="AllowFinance" readonly></el-input>
								</el-col>
								<el-button type="primary" style="margin-left: 8px;" data-toggle="modal" data-target="#am-SelectAgent">选择</el-button>
							</el-form-item>
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
		<!--二次确认新增、修改代理 -->
		<div class="modal fade bg-Again" id="am-NewAgentAgain" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title">提示</h4>
					</div>
					<div class="modal-body">
						<p class="mgt10" v-if="AgentForm.id">确定修改代理资料？</p>
						<p class="mgt10" v-else>确定新增代理资料？</p>
					</div>
					<div class="modal-footer">
						<el-button type="primary" @click="_NewAgentAgain">确定</el-button>
						<el-button data-dismiss="modal">取消</el-button>
					</div>
				</div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal -->
		</div>
		<!--选择代理权限 -->
		<div class="modal fade bg-Again" id="am-SelectAgent" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title">选择代理</h4>
					</div>
					<div class="modal-body">
						<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
						<div class="mgt15">
							<el-checkbox-group v-model="AgentForm.allow_finance" @change="handleCheckedCitiesChange">
								<el-checkbox v-for="item in FinancialAuthority" :label="item.agent_name" :key="item.agent_name">
									<em>{{item.agent_name}}({{item.code}})</em>
								</el-checkbox>
							</el-checkbox-group>
						</div>
					</div>
					<div class="modal-footer">
						<el-button type="primary" data-dismiss="modal" @click="AddViewPermissions">确定</el-button>
						<el-button data-dismiss="modal">取消</el-button>
					</div>
				</div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal -->
		</div>
		<!--状态修改 -->
		<div class="modal fade" id="am-StateOperation" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<el-form :model="StateForm" :rules="StateRules" ref="StateForm" label-width="0">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="StateRest('StateForm')">&times;</button>
							<h4 class="modal-title">启用/停用最高代理</h4>
						</div>
						<div class="modal-body txt-ct">
							<p class="mgt10">您即将将
								<b class="text-primary">{{CurrentItem.agent_name}}</b> 的状态设定为
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
						<h4 class="modal-title" id="myModalLabel">金钥管理（所属代理： <b class="text-primary">{{CurrentItem.agent_name}}</b>）</h4>
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
							<button class="btn mgl10" :class="CurrentItem.key_status!=0? 'btn-danger':'btn-success'" v-html="CurrentItem.key_status!=0? '禁用':'启用'" @click="EmptyPassword()" data-toggle="modal" data-target="#am-EncryptKeyStateOperation"></button>
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
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="StateRest('StateForm')">&times;</button>
							<h4 class="modal-title" id="myModalLabel">金钥状态修改</h4>
						</div>
						<div class="modal-body txt-ct">
							<p class="mgt10">您即将<span :class="CurrentItem.key_status!=0? 'text-danger':'text-success'" v-html="CurrentItem.key_status!=0? '停用':'启用'"></span>
								<b class="text-primary">{{CurrentItem.agent_name}}</b> 的金钥
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
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="StateRest('StateForm')">&times;</button>
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
	import Regular from "@/assets/scripts/js/regular";
	import FV from "@/assets/scripts/js/FormValidation";

	export default {
		data() {
			let phoneCheck = (rule, value, callback) => {
				if(this.AgentForm.profix === '86') {
					//+86
					if(!Regular.Phone86.test(value)) {
						return callback(new Error(Regular.PhoneError));
					}
					callback();
				} else if(this.AgentForm.profix === '886') {
					//+886
					if(!Regular.Phone886.test(value)) {
						return callback(new Error(Regular.PhoneError));
					}
					callback();
				}
			};
			return {
				loadingList: [],
				//代理账号
				agent_name: '',
				Regular: Regular,
				FV: FV,
				//当前代理信息
				CurrentItem: [],
				CurrentIndex: null,
				//新增代理
				AgentForm: {
					agent_name: '',
					nick_name: '',
					agent_password: '',
					code: '',
					profix: '86',
					mobile: '',
					email: '',
					allow_finance: [],
				},
				AgentFormRules: {
					agent_name: [{
						required: true,
						validator: FV.accountCheck,
						trigger: 'blur'
					}],
					nick_name: [{
						required: true,
						validator: FV.nameCheck,
						trigger: 'blur'
					}],
					agent_password: [{
						required: true,
						message: '密码不能为空！',
						trigger: 'blur'
					}],
					code: [{
						required: true,
						validator: FV.codeCheck,
						trigger: 'blur'
					}],
					mobile: [{
						required: true,
						validator: phoneCheck,
						trigger: 'blur'
					}],
					email: [{
						required: true,
						validator: FV.emailCheck,
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
				checkAll: false,
				FinancialAuthority: [],
				FinancialAuthoritys: [],
				isIndeterminate: true,
				StateForm: {
					//使用者密码
					UserPassword: '',
				},
				StateRules: {
					UserPassword: [{
						required: true,
						message: '请填写密码！',
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
				//列表信息
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
				//权限
				let Url2 = Urls.Url + Urls.ProxyAllowFinance;
				AxiosService.postRequest(Url2).then((res) => {
					if(res.code == 200) {
						this.FinancialAuthority = res.data;
						for(let i = 0; i < this.FinancialAuthority.length; i++) {
							this.FinancialAuthoritys.push(this.FinancialAuthority[i].agent_name);
						}
					} else {
						console.log(res);
					}
				});
			},
			//代理账号搜索
			SearchAgent() {
				if(FV.commonFv(this.agent_name, Regular.searchAccount)) {
					this.$message.error('请输入正确的内容，消除栏位错误后重新查询！');
					return;
				}
				let Url = Urls.Url + Urls.ProxyIndex;
				let dataObj = {
					agent_name: this.agent_name
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
			//点击新增按钮
			ClickAddAgent() {
				//清空因编辑填入的数据
				this.AgentForm = {
					agent_name: '',
					nick_name: '',
					agent_password: '',
					code: '',
					profix: '86',
					mobile: '',
					email: '',
					allow_finance: [],
				}
				this.AllowFinance = '';
			},
			//新增、修改代理
			_NewAgent(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						$('#am-NewAgentAgain').modal('show');
					} else {
						return false;
					}
				});
			},
			_NewAgentRest(formName) {
				this.$refs[formName].resetFields();
			},
			//二次确认新增、修改代理
			_NewAgentAgain() {
				let Url;
				let dataObj = this.AgentForm;
				console.log(dataObj);
				if(dataObj.id) {
					//修改
					Url = Urls.Url + Urls.ProxyEditAdd;
				} else {
					//新增
					Url = Urls.Url + Urls.ProxyAdd;
				}
				AxiosService.postRequest(Url, dataObj).then((res) => {
					if(res.code == 200) {
						$('#am-NewAgent').modal('hide');
						$('#am-NewAgentAgain').modal('hide');
						this.$message({
							message: res.msg,
							type: 'success'
						});
						//新增成功，更新列表
						this._Loading();
					} else {
						$('#am-NewAgentAgain').modal('hide');
						this.$message.error(res.msg);
					}
				});
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
			//显示增加权限
			AddViewPermissions() {
				let datas = this.FinancialAuthority;
				let objs = this.AgentForm.allow_finance;
				let arrs = [];
				for(let i = 0; i < objs.length; i++) {
					for(let j = 0; j < datas.length; j++) {
						if(objs[i] == datas[j].agent_name) {
							arrs.push(datas[j].agent_name + '(' + datas[j].code + ')');
						}
					}
				}
				this.AllowFinance = arrs.toString();
			},
			//选择权限
			handleCheckAllChange(val) {
				this.AgentForm.allow_finance = val ? this.FinancialAuthoritys : [];
				this.isIndeterminate = false;
			},
			handleCheckedCitiesChange(value) {
				let checkedCount = value.length;
				this.checkAll = checkedCount === this.FinancialAuthority.length;
				this.isIndeterminate = checkedCount > 0 && checkedCount < this.FinancialAuthority.length;
			},
			//因element全选组件无法选择多维数组，所以只能转换为一维数组
			_AllowSinance() {
				let a_f = this.AgentForm.allow_finance;
				if(a_f.length) {
					this.AgentForm.allow_finance = [];
					for(let i = 0; i < a_f.length; i++) {
						this.AgentForm.allow_finance.push(a_f[i].agent_name);
					}
				}
			},
			//点击修改编辑按钮
			_ModifyBtn(id) {
				let Url = Urls.Url + Urls.ProxyEdit;
				let dataObj = {
					agent_id: id,
				}
				AxiosService.postRequest(Url, dataObj).then((res) => {
					if(res.code == 200) {
						$.extend(this.AgentForm, res.data);
						this._AllowSinance();
						//展示权限
						this.AddViewPermissions();
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
			EmptyPassword() {
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
	
	#am-SelectAgent .el-checkbox {
		margin-left: 10px !important;
	}
</style>