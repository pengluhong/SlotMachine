<template>
	<div>
		<div class="bg-color pd30">
			<div class="dis-inl-blk mgl10">
				<p>代理名称</p>
				<div class="mgt10">
					<input type="text" class="form-control" placeholder="请输入代理名称">
				</div>
			</div>
			<div class="dis-inl-blk mgl10">
				<p>起始日期</p>
				<div class="mgt10">
					<input type="text" class="form-control Wdate" placeholder="请选择起始日期" readonly>
				</div>
			</div>
			<div class="dis-inl-blk mgl10">
				<p>结束日期</p>
				<div class="mgt10">
					<input type="text" class="form-control Wdate" placeholder="请选择截止日期" readonly>
				</div>
			</div>
			<button class="btn btn-success mgl10 v-a-btm">查询</button>
		</div>
		<div class="pd30 clearfix">
			<div class="table-responsive">
				<table class="table table-bordered">
					<thead>
						<tr>
							<th>时间</th>
							<th>代理名称</th>
							<th>会员消耗金</th>
							<th>系统回收金</th>
							<th>进入彩池金</th>
							<th>进入库存金</th>
							<th>会员人数</th>
							<th>会员局数</th>
							<th>会员中奖率</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>2018/08/01 16:00</td>
							<td>jay</td>
							<td>156</td>
							<td>65</td>
							<td>14</td>
							<td>52</td>
							<td>10</td>
							<td>13</td>
							<td>50%</td>
						</tr>
						<tr>
							<td>2018/08/01 16:00</td>
							<td>jay</td>
							<td>156</td>
							<td>65</td>
							<td>14</td>
							<td>52</td>
							<td>10</td>
							<td>13</td>
							<td>50%</td>
						</tr>
						<tr>
							<td>2018/08/01 16:00</td>
							<td>jay</td>
							<td>156</td>
							<td>65</td>
							<td>14</td>
							<td>52</td>
							<td>10</td>
							<td>13</td>
							<td>50%</td>
						</tr>
						<tr>
							<td>2018/08/01 16:00</td>
							<td>jay</td>
							<td>156</td>
							<td>65</td>
							<td>14</td>
							<td>52</td>
							<td>10</td>
							<td>13</td>
							<td>50%</td>
						</tr>
						<tr>
							<td>2018/08/01 16:00</td>
							<td>jay</td>
							<td>156</td>
							<td>65</td>
							<td>14</td>
							<td>52</td>
							<td>10</td>
							<td>13</td>
							<td>50%</td>
						</tr>
						<tr>
							<td>2018/08/01 16:00</td>
							<td>jay</td>
							<td>156</td>
							<td>65</td>
							<td>14</td>
							<td>52</td>
							<td>10</td>
							<td>13</td>
							<td>50%</td>
						</tr>

					</tbody>
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
		</div>
	</div>
</template>