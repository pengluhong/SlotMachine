<template>
	<div>
		<div class="bg-color pd30">
			<router-link to="/MembershipStatistics" class="btn btn-warning">返回</router-link>
		</div>
		<div class="pd30 clearfix">
			<div class="table-responsive">
				<table class="table table-bordered">
					<thead>
						<tr>
							<th>时间</th>
							<th>牌局号</th>
							<th>房间名称</th>
							<th>开局前金额</th>
							<th>开局后金额</th>
							<th>押注金额</th>
							<th>赔付金额</th>
							<th>中奖类别</th>
							<th>是否获得奖池</th>
							<th>获得免费拉霸次数</th>
							<th>是否免费拉霸</th>
							<th>本局结果</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>2018/08/01 16:00</td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td>
								<button class="btn btn-info" data-toggle="modal" data-target="#ResultList">查看</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<!-- 模态框（Modal） -->
			<div class="modal fade" id="ResultList" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
							<h4 class="modal-title" id="myModalLabel">查看结果</h4>
						</div>
						<div class="modal-body">
							<div class="form-group">
								<div class="table-responsive">
									<table class="table table-bordered">
										<tbody>
											<tr>
												<td>Column 1</td>
												<td>Column 2</td>
												<td>Column 3</td>
												<td>Column 4</td>
												<td>Column 5</td>
											</tr>
											<tr>
												<td>Column 1</td>
												<td>Column 2</td>
												<td>Column 3</td>
												<td>Column 4</td>
												<td>Column 5</td>
											</tr>
											<tr>
												<td>Column 1</td>
												<td>Column 2</td>
												<td>Column 3</td>
												<td>Column 4</td>
												<td>Column 5</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
							<button type="button" class="btn btn-primary">提交更改</button>
						</div>
					</div>
					<!-- /.modal-content -->
				</div>
				<!-- /.modal -->
			</div>
		</div>
	</div>
</template>

<script>
</script>

<style>

</style>