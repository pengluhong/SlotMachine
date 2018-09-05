<template>
	<div>
		<div class="bg-color pd30">
			<b class="text-success">超级</b>
		</div>
		<div class="pd30">
			<ul class="details-lists">
				<li>于 2018/08/27 15:22:30 添加</li>
				<li>目前状态：<span class="text-success">启用中</span>
					<!--<a href="javascript:;" class="label label-success mgl10">启用</a>-->
					<button class="btn btn-danger btn-xs mgl10" data-toggle="modal" data-target="#ue-UpdateState">停用</button>
				</li>
				<li>真实姓名：郭富城
					<button class="btn btn-success btn-xs mgl10">修改</button>
				</li>
				<li>手机号码：13800000000
					<a href="javascript:;" class="label label-success mgl10">修改</a>
					<div class="mgt15" v-show="isDataShow">
						<table class="table table-bordered" style="width: 50% !important;">
							<tbody>
								<tr>
									<th class="text-warning">真实姓名</th>
									<td>刘德华</td>
								</tr>
								<tr>
									<th class="text-warning">手机号码</th>
									<td>13800000000</td>
								</tr>
								<tr>
									<th class="text-warning">Email</th>
									<td>jay@ss.com</td>
								</tr>
							</tbody>
						</table>
					</div>
				</li>
				<li>角色：超级
					<button class="btn btn-success btn-xs mgl10">修改</button>
				</li>
				<li>
					备注：
					<button class="btn btn-success btn-xs mgl10" @click="isEditor=!isEditor" v-show="!isEditor">编辑</button>
					<button class="btn btn-success btn-xs mgl10" @click="isEditor=!isEditor" v-show="isEditor">保存</button>
					<button class="btn btn-danger btn-xs mgl10" @click="isEditor=!isEditor" v-show="isEditor">取消</button>
					<div class="form-group mgt20" v-show="isEditor">
						<textarea class="form-control" rows="3" style="width: 30% !important;"></textarea>
					</div>
				</li>
				<li>权限设定
					<button class="btn btn-success btn-xs mgl10" data-toggle="modal" data-target="#ue-PermissionSetting">修改</button>
				</li>
			</ul>
			<div class="mgt60">
				<button class="btn btn-link" onclick="window.history.go(-1)">返回上一页</button>
				<router-link to="/NewMembers" class="btn btn-link">新增</router-link>
				<router-link to="/ModifyMembers" class="btn btn-link">修改资料</router-link>
				<button class="btn btn-link">删除</button>
				<button class="btn btn-link" @click="isDataShow=!isDataShow">检视完整基本资料</button>
				<button class="btn btn-link" data-toggle="modal" data-target="#ue-ResetPasswd">重设密码</button>
				<router-link to="/HistoricalRecords" class="btn btn-link">检视操作历史记录</router-link>
			</div>
		</div>
		<!--修改状态 -->
		<div class="modal fade" id="ue-UpdateState" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title">后台人员修改</h4>
					</div>
					<div class="modal-body">
						<b>您确定停用？</b>
						<!--<b>您确定启用？</b>-->
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
						<button type="button" class="btn btn-primary" data-dismiss="modal">确定</button>
					</div>
				</div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal -->
		</div>
		<!--重设密码 -->
		<div class="modal fade" id="ue-ResetPasswd" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title">重设密码</h4>
					</div>
					<div class="modal-body">
						<div class="alert alert-warning">
							<strong>注：</strong>如不修改密码，则留空白，即不会修改您的密码
						</div>
						<el-form ref="form" :model="form" label-width="80px">
							<el-form-item label="账号">
								<span>g123456</span>
							</el-form-item>
							<el-form-item label="新密码">
								<el-input placeholder="请输入4-50位密码，仅限大小写字母数字和常用英文字符"></el-input>
							</el-form-item>
							<el-form-item label="确认密码">
								<el-input placeholder="请再次输入新密码"></el-input>
							</el-form-item>
						</el-form>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
						<button type="button" class="btn btn-primary" data-dismiss="modal">确定</button>
					</div>
				</div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal -->
		</div>
		<!-- 权限设定 modal -->
		<div class="modal fade" id="ue-PermissionSetting" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title">权限设定</h4>
					</div>
					<div class="modal-body">
						<div class="panel-group" id="accordion">
							<div class="panel panel-default">
								<div class="panel-heading clearfix" style="position: relative;">
									<h4 data-toggle="collapse" data-parent="#accordion" href="#collapseOne">游戏控制台</h4>
									<div class="checkbox" style="position: absolute;right: 15px;top: 0;">
										<label><input type="checkbox" value="" style="margin-top: 2px !important;">全选</label>
									</div>
								</div>
								<div id="collapseOne" class="panel-collapse collapse">
									<div class="panel-body">
										<div class="clearfix">
											<b class="pull-left mgt10 text-warning">全局配置</b>
											<div class="checkbox pull-right">
												<label><input type="checkbox" value="" style="margin-top: 2px !important;">查看</label>
												<label style="margin-left: 50px;"><input type="checkbox" value="" style="margin-top: 2px !important;">编辑</label>
											</div>
										</div>
										<div class="clearfix">
											<b class="pull-left mgt10 text-warning">游戏配置</b>
											<div class="checkbox pull-right">
												<label><input type="checkbox" value="" style="margin-top: 2px !important;">查看</label>
												<label style="margin-left: 50px;"><input type="checkbox" value="" style="margin-top: 2px !important;">编辑</label>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="panel-group" id="accordion2">
							<div class="panel panel-default">
								<div class="panel-heading clearfix" style="position: relative;">
									<h4 data-toggle="collapse" data-parent="#accordion2" href="#collapse2">数据统计</h4>
									<div class="checkbox" style="position: absolute;right: 15px;top: 0;">
										<label><input type="checkbox" value="" style="margin-top: 2px !important;">全选</label>
									</div>
								</div>
								<div id="collapse2" class="panel-collapse collapse">
									<div class="panel-body">
										<div class="clearfix">
											<b class="pull-left mgt10 text-warning">全局统计</b>
											<div class="checkbox pull-right">
												<label><input type="checkbox" value="" style="margin-top: 2px !important;">查看</label>
												<label style="margin-left: 50px;"><input type="checkbox" value="" style="margin-top: 2px !important;">编辑</label>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
						<button type="button" class="btn btn-primary">确定</button>
					</div>
				</div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal -->
		</div>
		<!-- 权限设定 modal  end-->
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isDataShow: false,
				isEditor: false,
				form: {}
			}
		}
	}
</script>

<style>

</style>