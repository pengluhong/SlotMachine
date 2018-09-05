<template>
	<div class="pd30">
		<el-form ref="form" label-width="80px">
			<el-form-item label="角色名">
				<el-col :span="10">
					<el-input placeholder="请输入角色名"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="角色说明">
				<el-col :span="10">
					<el-input type="textarea" placeholder="请输入角色说明"></el-input>
				</el-col>
			</el-form-item>
			<div class="clearfix">
				<label class="el-form-item__label" style="width: 80px;">角色控制</label>
				<el-col :span="10">
					<div class="panel-group" id="accordion" style="padding-right: 30px;">
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
				</el-col>
			</div>
			<el-form-item>
				<el-button type="primary">确定</el-button>
				<el-button>取消</el-button>
			</el-form-item>
		</el-form>

	</div>
</template>

<script>
</script>

<style>

</style>