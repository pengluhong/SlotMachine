<template>
	<div>
		<div class="bg-color pd30 clearfix">
			<div class="pull-left">
				<router-link to="/NewMembers" class="btn btn-success">新增管理人员</router-link>
				<button class="btn btn-default" data-toggle="modal" data-target="#pm_Search">搜索</button>
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
							<th>账号</th>
							<th>状态</th>
							<th>姓名</th>
							<th>角色</th>
							<th>手机号码</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>1</td>
							<td>
								<router-link to="/UserEditor" class="text-success">G1234</router-link>
							</td>
							<td>
								<router-link to="/UserEditor" class="label label-success">启用</router-link>
							</td>
							<td>
								<router-link to="/UserEditor" class="text-success">德玛西亚</router-link>
							</td>
							<td>
								<router-link to="/UserEditor" class="text-success">超级</router-link>
							</td>
							<td>13800000000</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<!--搜索 -->
		<div class="modal fade" id="pm_Search" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel">搜索后台人员</h4>
					</div>
					<div class="modal-body">
						<div class="form-group">
							<label for="name">账号</label>
							<input type="text" class="form-control" id="name" placeholder="可输入多个，请以半形逗号隔开">
						</div>
						<div class="form-group">
							<label for="name">姓名</label>
							<input type="text" class="form-control" id="name" placeholder="例:周杰伦，可输入多个,请以半形逗号隔开">
						</div>
						<div class="form-group">
							<label for="name">角色</label>
							<select class="form-control">
								<option>请选择角色</option>
								<option>2</option>
								<option>3</option>
								<option>4</option>
								<option>5</option>
							</select>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
						<button type="button" class="btn btn-primary" data-dismiss="modal">搜索</button>
					</div>
				</div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal -->
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