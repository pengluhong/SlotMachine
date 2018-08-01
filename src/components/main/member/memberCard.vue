<template>
	<div>
		<div class="bg-color pd30">
			<div class="dis-inl-blk">
				<p>游戏类型</p>
				<div class="mgt10">
					<select class="form-control">
						<option>游戏1</option>
						<option>游戏2</option>
						<option>游戏3</option>
					</select>
				</div>
			</div>
			<div class="dis-inl-blk mgl10">
				<p>场次</p>
				<div class="mgt10">
					<select class="form-control">
						<option>1</option>
						<option>2</option>
						<option>3</option>
					</select>
				</div>
			</div>
			<div class="dis-inl-blk mgl10">
				<p>会员ID</p>
				<div class="mgt10">
					<input type="text" class="form-control" placeholder="请输入会员ID">
				</div>
			</div>
			<div class="dis-inl-blk mgl10">
				<p>起始日期</p>
				<div class="mgt10">
					<input type="text" class="form-control Wdate" placeholder="请选择起始日期" onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})" readonly>
				</div>
			</div>
			<div class="dis-inl-blk mgl10">
				<p>结束日期</p>
				<div class="mgt10">
					<input type="text" class="form-control Wdate" placeholder="请选择截止日期" onclick="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})" readonly>
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
							<th>牌局号</th>
							<th>场次</th>
							<th>房间ID</th>
							<th>玩家昵称</th>
							<th>玩家ID</th>
							<th>变化前金币</th>
							<th>结束后金币</th>
							<th>变化前五币</th>
							<th>结束后五币</th>
							<th>押注</th>
							<th>赔付</th>
							<th>免费计数</th>
							<th width="20%">行为流程（点击链接查看详情）</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>2018/08/01 16:00</td>
							<td>4984984</td>
							<td>15</td>
							<td>454</td>
							<td>jay</td>
							<td>454</td>
							<td>568</td>
							<td>4984</td>
							<td>14</td>
							<td>32</td>
							<td>555</td>
							<td>90</td>
							<td>0</td>
							<td class="txt-lf">
								<b class="btn btn-info btn-xs mgtb5">拉霸 &gt; 奖池</b>
								<b class="btn btn-info btn-xs mgtb5">拉霸 &gt; 奖池 &gt; 比倍</b>
								<b class="btn btn-info btn-xs mgtb5">拉霸 &gt; 奖池 &gt; 小玛丽</b>
								<b class="btn btn-info btn-xs mgtb5">拉霸 &gt; 奖池 &gt; 免费</b>
							</td>
						</tr>
						<tr>
							<td>2018/08/01 16:00</td>
							<td>4984984</td>
							<td>15</td>
							<td>454</td>
							<td>jay</td>
							<td>454</td>
							<td>568</td>
							<td>4984</td>
							<td>14</td>
							<td>32</td>
							<td>555</td>
							<td>90</td>
							<td>0</td>
							<td class="txt-lf">
								<b class="btn btn-info btn-xs mgtb5">拉霸 &gt; 奖池</b>
								<b class="btn btn-info btn-xs mgtb5">拉霸 &gt; 奖池 &gt; 比倍</b>
								<b class="btn btn-info btn-xs mgtb5">拉霸 &gt; 奖池 &gt; 小玛丽</b>
								<b class="btn btn-info btn-xs mgtb5">拉霸 &gt; 奖池 &gt; 免费</b>
							</td>
						</tr>
						<tr>
							<td>2018/08/01 16:00</td>
							<td>4984984</td>
							<td>15</td>
							<td>454</td>
							<td>jay</td>
							<td>454</td>
							<td>568</td>
							<td>4984</td>
							<td>14</td>
							<td>32</td>
							<td>555</td>
							<td>90</td>
							<td>0</td>
							<td class="txt-lf">
								<b class="btn btn-info btn-xs mgtb5">拉霸 &gt; 奖池</b>
								<b class="btn btn-info btn-xs mgtb5">拉霸 &gt; 奖池 &gt; 比倍</b>
								<b class="btn btn-info btn-xs mgtb5">拉霸 &gt; 奖池 &gt; 小玛丽</b>
								<b class="btn btn-info btn-xs mgtb5">拉霸 &gt; 奖池 &gt; 免费</b>
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
			<div class="table-responsive">
				<table class="table table-bordered">
					<caption>
						<h1>
						<b class="color-white">拉霸 </b>&gt; 奖池
					</h1>
					</caption>
					<thead>
						<tr>
							<th>时间</th>
							<th>变化前金币</th>
							<th>结束后金币</th>
							<th>变化前五币</th>
							<th>结束后五币</th>
							<th>押注</th>
							<th>赔付</th>
							<th>免费计数</th>
							<th>牌局结果</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>2018/08/01 16:00</td>
							<td>568</td>
							<td>4984</td>
							<td>14</td>
							<td>32</td>
							<td>555</td>
							<td>90</td>
							<td>0</td>
							<th></th>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="table-responsive">
				<table class="table table-bordered">
					<caption>
						<h1>
						    拉霸 &gt; <b class="color-white">奖池</b>
					    </h1>
					</caption>
					<thead>
						<tr>
							<th>时间</th>
							<th>变化前金币</th>
							<th>结束后金币</th>
							<th>变化前五币</th>
							<th>结束后五币</th>
							<th>获得奖池金币</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>2018/08/01 16:00</td>
							<td>568</td>
							<td>4984</td>
							<td>14</td>
							<td>32</td>
							<td>555</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="table-responsive">
				<table class="table table-bordered">
					<caption>
						<h1>
						拉霸 &gt; 奖池 &gt; <b class="color-white">比倍</b>
					</h1>
					</caption>
					<thead>
						<tr>
							<th>时间</th>
							<th>变化前金币</th>
							<th>结束后金币</th>
							<th>变化前五币</th>
							<th>结束后五币</th>
							<th>押注</th>
							<th>押注区</th>
							<th>开奖结果</th>
							<th>赔付金币</th>
							<th>局数</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>2018/08/01 16:00</td>
							<td>568</td>
							<td>4984</td>
							<td>14</td>
							<td>32</td>
							<td>555</td>
							<td>90</td>
							<td></td>
							<td>155</td>
							<td>10</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="table-responsive">
				<table class="table table-bordered">
					<caption>
						<h1>
						    拉霸 &gt; 奖池 &gt; <b class="color-white">小玛丽</b>
					    </h1>
					</caption>
					<tbody>
						<tr>
							<th>时间</th>
							<th>变化前金币</th>
							<th>结束后金币</th>
							<th>变化前五币</th>
							<th>结束后五币</th>
							<th>初始得分</th>
							<th>最终得分</th>
							<th rowspan="2" width="20%">
								<select class="form-control" width="100%">
									<option>牌局结果</option>
									<option>2</option>
									<option>3</option>
								</select>
							</th>
						</tr>
						<tr>
							<td>2018/08/01 16:00</td>
							<td>568</td>
							<td>4984</td>
							<td>14</td>
							<td>32</td>
							<td>555</td>
							<td>90</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
</script>

<style>

</style>