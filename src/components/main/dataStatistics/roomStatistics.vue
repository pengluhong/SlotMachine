<template>
	<div>
		<div class="bg-color pd30">
			<div class="dis-inl-blk mgl10">
				<p>房间名称</p>
				<div class="mgt10">
					<input type="text" class="form-control" placeholder="请输入房间名称">
				</div>
			</div>
			<div class="dis-inl-blk mgl10">
				<p>起始日期</p>
				<div class="mgt10">
					<el-date-picker v-model="startDate" type="date" placeholder="请选择起始日期" :picker-options="pickerOptionsStart">
					</el-date-picker>
				</div>
			</div>
			<div class="dis-inl-blk mgl10">
				<p>结束日期</p>
				<div class="mgt10">
					<el-date-picker v-model="endDate" type="date" placeholder="请选择截止日期" :picker-options="pickerOptionsEnd">
					</el-date-picker>
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
							<th>房间名称</th>
							<th>玩家人数</th>
							<th>玩家局数</th>
							<th>普通线中奖局数</th>
							<th>普通线中奖派彩</th>
							<th>全盘奖中奖局数</th>
							<th>全盘奖中奖派彩</th>
							<th>奖池中奖局数</th>
							<th>奖池中奖派彩</th>
							<th>中奖率</th>
							<th>获得免费拉霸次数</th>
							<th>回报率</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>2018/08/01 16:00</td>
							<td>room01</td>
							<td>30</td>
							<td>50</td>
							<td>25</td>
							<td>0</td>
							<td>25</td>
							<td>0</td>
							<td>100</td>
							<td>0</td>
							<td>0</td>
							<td>0</td>
							<td>0</td>
						</tr>
						<tr>
							<td>2018/08/01 16:00</td>
							<td>room01</td>
							<td>30</td>
							<td>50</td>
							<td>25</td>
							<td>0</td>
							<td>25</td>
							<td>0</td>
							<td>100</td>
							<td>0</td>
							<td>0</td>
							<td>0</td>
							<td>0</td>
						</tr>
						<tr>
							<td>2018/08/01 16:00</td>
							<td>room01</td>
							<td>30</td>
							<td>50</td>
							<td>25</td>
							<td>0</td>
							<td>25</td>
							<td>0</td>
							<td>100</td>
							<td>0</td>
							<td>0</td>
							<td>0</td>
							<td>0</td>
						</tr>
						<tr>
							<td>2018/08/01 16:00</td>
							<td>room01</td>
							<td>30</td>
							<td>50</td>
							<td>25</td>
							<td>0</td>
							<td>25</td>
							<td>0</td>
							<td>100</td>
							<td>0</td>
							<td>0</td>
							<td>0</td>
							<td>0</td>
						</tr>
						<tr>
							<td>2018/08/01 16:00</td>
							<td>room01</td>
							<td>30</td>
							<td>50</td>
							<td>25</td>
							<td>0</td>
							<td>25</td>
							<td>0</td>
							<td>100</td>
							<td>0</td>
							<td>0</td>
							<td>0</td>
							<td>0</td>
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
	export default {
		data() {
			return {
				startDate: '',
				endDate: '',
				pickerOptionsStart: {
					disabledDate: (time) => {
						if(this.endDate != "") {
							return time.getTime() > Date.now() || time.getTime() > this.endDate;
						} else {
							return time.getTime() > Date.now();
						}

					}
				},
				pickerOptionsEnd: {
					disabledDate: (time) => {
						return time.getTime() < this.startDate || time.getTime() > Date.now();
					}
				},
			}
		}
	}
</script>

<style>

</style>