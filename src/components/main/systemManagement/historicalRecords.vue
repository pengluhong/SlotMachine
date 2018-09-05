<template>
	<div>
		<div class="pd30 bg-color clearfix">
			<div class="pull-left">
				<b>后台人员：g123456</b>
				<button class="btn btn-success mgl20" data-toggle="modal" data-target="#hr-Search">搜索</button>
			</div>
			<button class="btn btn-link pull-right" onclick="window.history.go(-1)">回后台人员详细资料&gt;&gt;</button>
		</div>
		<div class="pd30">
			<div class="table-responsive">
				<table class="table table-bordered">
					<thead>
						<tr>
							<th>时间</th>
							<th>内容</th>
						</tr>
					</thead>
					<!--<tbody>
						<tr>
							<td></td>
							<td></td>
						</tr>
					</tbody>-->
					<tbody>
						<tr>
							<td colspan="2">无数据</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<!--搜索-->
		<div class="modal fade" id="hr-Search" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title">搜索g123456的历史记录</h4>
					</div>
					<div class="modal-body">
						<el-form ref="form" :model="form" label-width="80px">
							<el-form-item label="申请日期">
								<el-date-picker v-model="form.value6" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
								</el-date-picker>
							</el-form-item>
							<el-form-item label="内容包含">
								<el-input placeholder="可输入多个，请以半形逗号隔开"></el-input>
							</el-form-item>
							<el-form-item label="内容排除">
								<el-input placeholder="可输入多个，请以半形逗号隔开"></el-input>
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
	</div>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					value6: ''
				}
			};
		}
	};
</script>

<style>

</style>