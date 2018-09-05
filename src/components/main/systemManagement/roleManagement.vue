<template>
	<div>
		<div class="bg-color pd30 clearfix">
			<div class="pull-left">
				<router-link to="/NewRole" class="btn btn-success">新增角色</router-link>
			</div>
			<div class="pull-right">
				<el-radio-group v-model="satte" size="medium">
					<el-radio-button label="全部"></el-radio-button>
					<el-radio-button label="启用中"></el-radio-button>
					<el-radio-button label="停用中"></el-radio-button>
				</el-radio-group>
			</div>
		</div>
		<div class="pd30 clearfix">
			<div class="table-responsive">
				<table class="table table-bordered">
					<thead>
						<tr>
							<th>序号</th>
							<th>角色</th>
							<th>状态</th>
							<th>角色说明</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>1</td>
							<td>
								<router-link to="/UserEditor" class="text-success">超级</router-link>
							</td>
							<td>
								<router-link to="/UserEditor" class="label label-success">启用</router-link>
							</td>
							<td>全部</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				satte: ''
			};
		}
	}
</script>

<style>

</style>