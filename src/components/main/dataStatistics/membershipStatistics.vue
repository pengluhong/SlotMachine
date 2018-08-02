<template>
	<div>
		<div class="bg-color pd30">
			<div class="dis-inl-blk mgl10">
				<p>代理商名称</p>
				<div class="mgt10">
					<input type="text" class="form-control" placeholder="请输入代理商名称">
				</div>
			</div>
			<div class="dis-inl-blk mgl10">
				<p>会员名称</p>
				<div class="mgt10">
					<input type="text" class="form-control" placeholder="请输入会员名称">
				</div>
			</div>
			<div class="dis-inl-blk mgl10">
				<p>起始日期</p>
				<div class="mgt10">
					<input type="text" class="form-control" placeholder="请选择起始日期" readonly>
				</div>
			</div>
			<div class="dis-inl-blk mgl10">
				<p>结束日期</p>
				<div class="mgt10">
					<input type="text" class="form-control" placeholder="请选择截止日期" readonly>
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
							<th>所属代理商</th>
							<th>会员名称</th>
							<th>玩局数</th>
							<th>中奖次数</th>
							<th>中奖率</th>
							<th>消耗金币</th>
							<th>获得金币</th>
							<th>回报率</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>2018/08/01 16:00</td>
							<td>cctv</td>
							<td>jay</td>
							<td>16</td>
							<td>11</td>
							<td>60%</td>
							<td>50</td>
							<td>60</td>
							<td>10%</td>
							<td>
								<router-link to="/MembershipStatisticsDetails" class="btn btn-info">详细</router-link>
							</td>
						</tr>
						<tr>
							<td>2018/08/01 16:00</td>
							<td>cctv</td>
							<td>jay</td>
							<td>16</td>
							<td>11</td>
							<td>60%</td>
							<td>50</td>
							<td>60</td>
							<td>10%</td>
							<td>
								<router-link to="/MembershipStatisticsDetails" class="btn btn-info">详细</router-link>
							</td>
						</tr>
						<tr>
							<td>2018/08/01 16:00</td>
							<td>cctv</td>
							<td>jay</td>
							<td>16</td>
							<td>11</td>
							<td>60%</td>
							<td>50</td>
							<td>60</td>
							<td>10%</td>
							<td>
								<router-link to="/MembershipStatisticsDetails" class="btn btn-info">详细</router-link>
							</td>
						</tr>
						<tr>
							<td>2018/08/01 16:00</td>
							<td>cctv</td>
							<td>jay</td>
							<td>16</td>
							<td>11</td>
							<td>60%</td>
							<td>50</td>
							<td>60</td>
							<td>10%</td>
							<td>
								<router-link to="/MembershipStatisticsDetails" class="btn btn-info">详细</router-link>
							</td>
						</tr>
						<tr>
							<td>2018/08/01 16:00</td>
							<td>cctv</td>
							<td>jay</td>
							<td>16</td>
							<td>11</td>
							<td>60%</td>
							<td>50</td>
							<td>60</td>
							<td>10%</td>
							<td>
								<router-link to="/MembershipStatisticsDetails" class="btn btn-info">详细</router-link>
							</td>
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

<script>
</script>

<style>

</style>