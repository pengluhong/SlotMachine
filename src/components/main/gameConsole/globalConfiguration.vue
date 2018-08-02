<template>
	<div class="pd30 clearfix">
		<div class="table-responsive">
			<table class="table table-bordered">
				<caption>
					<h1 class="color-white dis-inl-blk">资金流分配设置</h1>
					<button class="btn btn-default mgl15 shrink-btns">收起表格</button>
				</caption>
				<thead>
					<tr>
						<th>进入奖池（%）</th>
						<th>系统回收（%）</th>
						<th>库存（%）</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>5</td>
						<td>5</td>
						<td>90</td>
						<td>
							<button class="btn btn-warning update-btns">修改</button>
						</td>
					</tr>
				</tbody>
				<tfoot style="display: none;">
					<tr>
						<td>
							<input type="text" class="form-control" value="5" />
						</td>
						<td>
							<input type="text" class="form-control" value="5" />
						</td>
						<td>
							<input type="text" class="form-control" value="5" />
						</td>
						<td>
							<button class="btn btn-warning btn-success">确定</button>
							<button class="btn btn-warning btn-danger">取消</button>
						</td>
					</tr>
				</tfoot>
			</table>
		</div>
		<div class="table-responsive">
			<table class="table table-bordered">
				<caption>
					<h1 class="color-white dis-inl-blk">房间设置</h1>
					<button class="btn btn-default mgl15 shrink-btns">收起表格</button>
				</caption>
				<thead>
					<tr>
						<th>房间名</th>
						<th>准入金</th>
						<th>房间倍数</th>
						<th>奖池临建值</th>
						<th>奖池中奖概率</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>room01</td>
						<td>100</td>
						<td>10</td>
						<td>50K</td>
						<td>0.05</td>
						<td>
							<button class="btn btn-warning update-btns">修改</button>
						</td>
					</tr>
				</tbody>
				<tfoot style="display: none;">
					<tr>
						<td>room01</td>
						<td>
							<input type="text" class="form-control" value="100" />
						</td>
						<td>10</td>
						<td>
							<input type="text" class="form-control" value="50K" />
						</td>
						<td>
							<input type="text" class="form-control" value="0.05" />
						</td>
						<td>
							<button class="btn btn-warning btn-success">确定</button>
							<button class="btn btn-warning btn-danger">取消</button>
						</td>
					</tr>
				</tfoot>
			</table>
		</div>
		<div class="txt-rt">
			<ul class="pagination">
				<li>
					<a href="#">&laquo;</a>
				</li>
				<li class="active">
					<a href="#">1</a>
				</li>
				<li class="disabled">
					<a href="#">2</a>
				</li>
				<li>
					<a href="#">3</a>
				</li>
				<li>
					<a href="#">4</a>
				</li>
				<li>
					<a href="#">5</a>
				</li>
				<li>
					<a href="#">&raquo;</a>
				</li>
			</ul>
		</div>
		<div class="table-responsive">
			<table class="table table-bordered" style="width: 50% !important;">
				<caption>
					<h1 class="color-white dis-inl-blk">初始化设置</h1>
					<button class="btn btn-default mgl15 shrink-btns">收起表格</button>
				</caption>
				<thead>
					<tr>
						<th>库存金额</th>
						<th>奖池金额</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>50K</td>
						<td>30K</td>
						<td>
							<button class="btn btn-warning update-btns">修改</button>
						</td>
					</tr>
				</tbody>
				<tfoot style="display: none;">
					<tr>
						<td>
							<input type="text" class="form-control" value="50K" />
						</td>
						<td>
							<input type="text" class="form-control" value="5K" />
						</td>
						<td>
							<button class="btn btn-warning btn-success">确定</button>
							<button class="btn btn-warning btn-danger">取消</button>
						</td>
					</tr>
				</tfoot>
			</table>
		</div>
	</div>
</template>

<script>
	import { shrinkTable } from '@/assets/scripts/js/shrinkTable';
	export default {
		mounted() {
			$('.update-btns').click(function() {
				/*前端展示效果，引入数据操作时删除改动作*/
				$(this).parent().parent().parent().siblings('tfoot').show();
			});
			//收放表格
			shrinkTable('.shrink-btns');
		}
	}
</script>

<style>

</style>