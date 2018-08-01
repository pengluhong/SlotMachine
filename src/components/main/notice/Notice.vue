<template>
	<div>
		<div class="pd30 clearfix">
			<div class="table-responsive">
				<table class="table table-bordered">
					<thead>
						<tr>
							<th>公告信息类型</th>
							<th>触发条件（<span class="color-red">红字内容支持配置</span>）</th>
							<th>消息内容（有多条可选，从中随机一条）</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td rowspan="4">拉霸</td>
							<td>获得武器混屏（10倍）</td>
							<td>太幸运了！恭喜玩家【<span class="color-red">XXX</span>】在水浒传中“武器全盘奖”，获得<span class="color-red">XXX</span>金币！</td>
						</tr>
						<tr>
							<td>获得武器混屏（50倍）</td>
							<td>太幸运了！恭喜玩家【<span class="color-red">XXX</span>】在水浒传中“武器全盘奖”，获得<span class="color-red">XXX</span>金币！</td>
						</tr>
						<tr>
							<td>获得武器混屏（100倍）</td>
							<td>太幸运了！恭喜玩家【<span class="color-red">XXX</span>】在水浒传中“武器全盘奖”，获得<span class="color-red">XXX</span>金币！</td>
						</tr>
						<tr>
							<td>获得武器混屏（XXX倍）</td>
							<td>太幸运了！恭喜玩家【<span class="color-red">XXX</span>】在水浒传中“武器全盘奖”，获得<span class="color-red">XXX</span>金币！</td>
						</tr>
						<tr>
							<td rowspan="3">比倍玩法</td>
							<td rowspan="3"> 获得金币数>=
								<b>
									<span class="color-red cursor-pointer" data-toggle="modal" data-target="#notice-update">10</span>
									*场次准入下限
								</b>
							</td>
							<td>太幸运了！恭喜玩家【<span class="color-red">XXX</span>】在XXX中，获得<span class="color-red">XXX</span>金币！</td>
						</tr>
						<tr>
							<td>赚翻了！恭喜玩家【<span class="color-red">XXX</span>】在XXX中，获得<span class="color-red">XXX</span>金币！</td>
						</tr>
						<tr>
							<td>难以置信！恭喜玩家【<span class="color-red">XXX</span>】在XXX中，获得<span class="color-red">XXX</span>金币！</td>
						</tr>
						<tr>
							<td rowspan="3">小玛丽玩法</td>
							<td rowspan="3"> 触发小玛丽玩法，小玛丽赢取倍数和>=
								<b class="color-red cursor-pointer" data-toggle="modal" data-target="#notice-update">88</b>
							</td>
							<td>太幸运了！恭喜玩家【<span class="color-red">XXX</span>】在XXX中，获得<span class="color-red">XXX</span>金币！</td>
						</tr>
						<tr>
							<td>赚翻了！恭喜玩家【<span class="color-red">XXX</span>】在XXX中，获得<span class="color-red">XXX</span>金币！</td>
						</tr>
						<tr>
							<td>难以置信！恭喜玩家【<span class="color-red">XXX</span>】在XXX中，获得<span class="color-red">XXX</span>金币！</td>
						</tr>
						<tr>
							<td rowspan="3">获得奖池</td>
							<td rowspan="3">奖池中奖</td>
							<td>太幸运了！恭喜玩家【<span class="color-red">XXX</span>】在XXX中，获得<span class="color-red">XXX</span>金币！</td>
						</tr>
						<tr>
							<td>赚翻了！恭喜玩家【<span class="color-red">XXX</span>】在XXX中，获得<span class="color-red">XXX</span>金币！</td>
						</tr>
						<tr>
							<td>难以置信！恭喜玩家【<span class="color-red">XXX</span>】在XXX中，获得<span class="color-red">XXX</span>金币！</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="notice-update" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel">重新配置</h4>
					</div>
					<div class="modal-body">
						<div class="form-group">
							<input type="text" class="form-control" value="10">
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
</template>

<script>
</script>

<style>

</style>