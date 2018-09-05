<template>
	<div class="pd30">
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
				<el-button type="primary" class="mgl15">选择角色</el-button>
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

	</div>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					sex: ''
				}
			}
		}
	}
</script>

<style>

</style>