<template>
	<div class="pd30 clearfix">
		<div class="table-responsive">
			<table class="table table-bordered">
				<caption>
					<h1 class="color-white dis-inl-blk">配置1</h1>
					<button class="btn btn-default mgl15 shrink-btns">收起表格</button>
				</caption>
				<thead>
					<tr>
						<th>第一列</th>
						<th>权重</th>
						<th>操作</th>
						<th>第二列</th>
						<th>权重</th>
						<th>操作</th>
						<th>第三列</th>
						<th>权重</th>
						<th>操作</th>
						<th>第四列</th>
						<th>权重</th>
						<th>操作</th>
						<th>第五列</th>
						<th>权重</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>图标1</td>
						<td>
							<p>55</p>
							<input type="text" class="form-control" value="55" style="display: none;" />
						</td>
						<td>
							<div>
								<button class="btn btn-warning btn-xs update-btns2">修改</button>
							</div>
							<div style="display: none;">
								<button class="btn btn-warning btn-xs btn-success">确定</button>
								<button class="btn btn-warning btn-xs btn-danger">取消</button>
							</div>
						</td>
						<td>图标3</td>
						<td>
							<p>55</p>
							<input type="text" class="form-control" value="55" style="display: none;" />
						</td>
						<td>
							<div>
								<button class="btn btn-warning btn-xs update-btns2">修改</button>
							</div>
							<div style="display: none;">
								<button class="btn btn-warning btn-xs btn-success">确定</button>
								<button class="btn btn-warning btn-xs btn-danger">取消</button>
							</div>
						</td>
						<td>图标4</td>
						<td>
							<p>55</p>
							<input type="text" class="form-control" value="55" style="display: none;" />
						</td>
						<td>
							<div>
								<button class="btn btn-warning btn-xs update-btns2">修改</button>
							</div>
							<div style="display: none;">
								<button class="btn btn-warning btn-xs btn-success">确定</button>
								<button class="btn btn-warning btn-xs btn-danger">取消</button>
							</div>
						</td>
						<td>图标5</td>
						<td>
							<p>55</p>
							<input type="text" class="form-control" value="55" style="display: none;" />
						</td>
						<td>
							<div>
								<button class="btn btn-warning btn-xs update-btns2">修改</button>
							</div>
							<div style="display: none;">
								<button class="btn btn-warning btn-xs btn-success">确定</button>
								<button class="btn btn-warning btn-xs btn-danger">取消</button>
							</div>
						</td>
						<td>图标6</td>
						<td>
							<p>55</p>
							<input type="text" class="form-control" value="55" style="display: none;" />
						</td>
						<td>
							<div>
								<button class="btn btn-warning btn-xs update-btns2">修改</button>
							</div>
							<div style="display: none;">
								<button class="btn btn-warning btn-xs btn-success">确定</button>
								<button class="btn btn-warning btn-xs btn-danger">取消</button>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="table-responsive">
			<table class="table table-bordered" style="width: 50% !important;">
				<thead>
					<tr>
						<th>共用设置</th>
						<th>出现概率</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>美酒</td>
						<td>
							<p>0.5</p>
							<input type="text" class="form-control" value="0.5" style="display: none;" />
						</td>
						<td>
							<div>
								<button class="btn btn-warning btn-xs update-btns2">修改</button>
							</div>
							<div style="display: none;">
								<button class="btn btn-warning btn-xs btn-success">确定</button>
								<button class="btn btn-warning btn-xs btn-danger">取消</button>
							</div>
						</td>
					</tr>
					<tr>
						<td>全盘奖</td>
						<td>
							<p>0.5</p>
							<input type="text" class="form-control" value="0.5" style="display: none;" />
						</td>
						<td>
							<div>
								<button class="btn btn-warning btn-xs update-btns2">修改</button>
							</div>
							<div style="display: none;">
								<button class="btn btn-warning btn-xs btn-success">确定</button>
								<button class="btn btn-warning btn-xs btn-danger">取消</button>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="table-responsive">
			<table class="table table-bordered">
				<caption>
					<h1 class="color-white dis-inl-blk">配置2</h1>
					<!--<button class="btn btn-default mgl15 shrink-btns">收起表格</button>-->
				</caption>
				<thead>
					<tr>
					</tr>
				</thead>
				<tbody>
					<tr>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="table-responsive">
			<table class="table table-bordered">
				<caption>
					<h1 class="color-white dis-inl-blk">配置3</h1>
					<!--<button class="btn btn-default mgl15 shrink-btns">收起表格</button>-->
				</caption>
				<thead>
					<tr>
					</tr>
				</thead>
				<tbody>
					<tr>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
	import { shrinkTable } from '@/assets/scripts/js/shrinkTable';
	export default {
		mounted() {
			$('.update-btns2').click(function() {
				/*前端展示效果，引入数据操作时删除改动作*/
				var i = $(this).parent().parent().index();
				console.log(i);
				$(this).parent().hide();
				$(this).parent().parent().parent().find('td').eq(i - 1).find('p').hide();
				$(this).parent().siblings('div').show();
				$(this).parent().parent().parent().find('td').eq(i - 1).find('input').show();
			});
			//收放表格
			shrinkTable('.shrink-btns');
		}
	}
</script>

<style>

</style>