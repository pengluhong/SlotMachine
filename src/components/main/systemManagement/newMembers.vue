<template>
	<div class="pd30">
		<div class="alert alert-warning">
			<strong>新增注意事项！</strong>登入密码预设为123456
		</div>
		<el-form ref="form" :model="form" label-width="80px">
			<div class="page-header">
				<h1>基本资料（必填）</h1>
			</div>
			<el-form-item label="账号">
				<el-col :span="10">
					<el-input placeholder="例：g123456"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="姓名">
				<el-col :span="10">
					<el-input placeholder="例：周杰伦"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="手机号码">
				<el-col :span="10">
					<el-input placeholder="例：15800000000"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="角色">
				<el-col :span="10">
					<el-input placeholder="请选择角色" :disabled="true"></el-input>
				</el-col>
				<el-button type="primary" class="mgl15" data-toggle="modal" data-target="#nm-ChoiceRoles">选择角色</el-button>
			</el-form-item>
			<div class="page-header">
				<h1>选填资料</h1>
			</div>
			<el-form-item label="性别">
				<el-col :span="10">
					<el-radio-group v-model="form.sex">
						<el-radio label="男"></el-radio>
						<el-radio label="女"></el-radio>
					</el-radio-group>
				</el-col>
			</el-form-item>
			<el-form-item label="Email">
				<el-col :span="10">
					<el-input placeholder="例：163@freer.com"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="生日">
				<el-col :span="10">
					<el-date-picker type="date" placeholder="例：1900-07-09" style="width: 100%;"></el-date-picker>
				</el-col>
			</el-form-item>
			<el-form-item label="微信号">
				<el-col :span="10">
					<el-input placeholder="例：wechar123"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="QQ">
				<el-col :span="10">
					<el-input placeholder="例：123456789"></el-input>
				</el-col>
			</el-form-item>
			<div class="page-header">
				<h1>备注</h1>
			</div>
			<el-form-item label="备注">
				<el-col :span="10">
					<el-input type="textarea"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item>
				<el-button type="primary">确定</el-button>
				<el-button>取消</el-button>
			</el-form-item>
		</el-form>
		<!-- 选择角色 modal -->
		<div class="modal fade" id="nm-ChoiceRoles" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title">请选择角色</h4>
					</div>
					<div class="modal-body">
						<el-radio v-model="radio" label="1">角色1</el-radio>
						<el-radio v-model="radio" label="2">角色2</el-radio>
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
		<!-- 选择角色 modal  end-->
	</div>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					sex: ''
				},
				radio: '',
			}
		}
	}
</script>

<style>

</style>