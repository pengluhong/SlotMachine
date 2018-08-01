<template>
	<div>
		<div class="bg-color pd30">
			<div class="dis-inl-blk">
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
					<caption>
						<h1 class="color-white">游戏标题</h1>
					</caption>
					<thead>
						<tr>
							<th>时间</th>
							<th>昨天玩该游戏人数</th>
							<th>昨天玩今天还玩的人数</th>
							<th>昨注回头率</th>
							<th>中奖率</th>
							<th>每日消耗</th>
							<th>系统消耗</th>
							<th>拉霸</th>
							<th>比倍</th>
							<th>免费拉霸</th>
							<th>小玛丽</th>
							<th>全盘奖</th>
							<th>奖池</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>2018/08/01</td>
							<td>99</td>
							<td>10</td>
							<td>10%</td>
							<td>0.45</td>
							<td>54646</td>
							<td>56546588</td>
							<td class="txt-lf">
								<p>玩局人数：<b class="color-green">10</b></p>
								<p>玩局数：<b class="color-green">12</b></p>
								<p>人均局数：<b class="color-green">10</b></p>
								<p>回报率：<b class="color-green">0.38</b></p>
							</td>
							<td class="txt-lf">
								<p>玩局人数：<b class="color-green">10</b></p>
								<p>玩局数：<b class="color-green">12</b></p>
								<p>人均局数：<b class="color-green">10</b></p>
								<p>回报率：<b class="color-green">0.38</b></p>
							</td>
							<td class="txt-lf">
								<p>5次免费触发次数：<b class="color-green">10</b></p>
								<p>10次免费触发次数：<b class="color-green">13</b></p>
							</td>
							<td class="txt-lf">
								<p>触发总次数：<b class="color-green">10</b></p>
								<p>作弊触发数：<b class="color-green">12</b></p>
								<p>平均中奖倍数：<b class="color-green">2</b></p>
								<p>最大中奖倍数：<b class="color-green">3</b></p>
							</td>
							<td class="txt-lf">
								<p>武器全盘次数：<b class="color-green">10</b></p>
								<p>人物全盘次数：<b class="color-green">12</b></p>
								<p>全盘总次数：<b class="color-green">22</b></p>
							</td>
							<td class="txt-lf">
								<p>奖池发送次数次数：<b class="color-green">135</b></p>
								<p>奖池发放总额：<b class="color-green">$13000.00</b></p>
							</td>
						</tr>
						<tr>
							<td>2018/08/01</td>
							<td>99</td>
							<td>10</td>
							<td>10%</td>
							<td>0.45</td>
							<td>54646</td>
							<td>56546588</td>
							<td class="txt-lf">
								<p>玩局人数：<b class="color-green">10</b></p>
								<p>玩局数：<b class="color-green">12</b></p>
								<p>人均局数：<b class="color-green">10</b></p>
								<p>回报率：<b class="color-green">0.38</b></p>
							</td>
							<td class="txt-lf">
								<p>玩局人数：<b class="color-green">10</b></p>
								<p>玩局数：<b class="color-green">12</b></p>
								<p>人均局数：<b class="color-green">10</b></p>
								<p>回报率：<b class="color-green">0.38</b></p>
							</td>
							<td class="txt-lf">
								<p>5次免费触发次数：<b class="color-green">10</b></p>
								<p>10次免费触发次数：<b class="color-green">13</b></p>
							</td>
							<td class="txt-lf">
								<p>触发总次数：<b class="color-green">10</b></p>
								<p>作弊触发数：<b class="color-green">12</b></p>
								<p>平均中奖倍数：<b class="color-green">2</b></p>
								<p>最大中奖倍数：<b class="color-green">3</b></p>
							</td>
							<td class="txt-lf">
								<p>武器全盘次数：<b class="color-green">10</b></p>
								<p>人物全盘次数：<b class="color-green">12</b></p>
								<p>全盘总次数：<b class="color-green">22</b></p>
							</td>
							<td class="txt-lf">
								<p>奖池发送次数次数：<b class="color-green">135</b></p>
								<p>奖池发放总额：<b class="color-green">$13000.00</b></p>
							</td>
						</tr>
						<tr>
							<td>2018/08/01</td>
							<td>99</td>
							<td>10</td>
							<td>10%</td>
							<td>0.45</td>
							<td>54646</td>
							<td>56546588</td>
							<td class="txt-lf">
								<p>玩局人数：<b class="color-green">10</b></p>
								<p>玩局数：<b class="color-green">12</b></p>
								<p>人均局数：<b class="color-green">10</b></p>
								<p>回报率：<b class="color-green">0.38</b></p>
							</td>
							<td class="txt-lf">
								<p>玩局人数：<b class="color-green">10</b></p>
								<p>玩局数：<b class="color-green">12</b></p>
								<p>人均局数：<b class="color-green">10</b></p>
								<p>回报率：<b class="color-green">0.38</b></p>
							</td>
							<td class="txt-lf">
								<p>5次免费触发次数：<b class="color-green">10</b></p>
								<p>10次免费触发次数：<b class="color-green">13</b></p>
							</td>
							<td class="txt-lf">
								<p>触发总次数：<b class="color-green">10</b></p>
								<p>作弊触发数：<b class="color-green">12</b></p>
								<p>平均中奖倍数：<b class="color-green">2</b></p>
								<p>最大中奖倍数：<b class="color-green">3</b></p>
							</td>
							<td class="txt-lf">
								<p>武器全盘次数：<b class="color-green">10</b></p>
								<p>人物全盘次数：<b class="color-green">12</b></p>
								<p>全盘总次数：<b class="color-green">22</b></p>
							</td>
							<td class="txt-lf">
								<p>奖池发送次数次数：<b class="color-green">135</b></p>
								<p>奖池发放总额：<b class="color-green">$13000.00</b></p>
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