<template>
	<el-pagination layout="prev, pager, next" :total="pageInfor.Total" :page-size="pageInfor.pageSize" @prev-click="prevClick" @current-change="currentChange" @next-click="nextClick" v-show="pageInfor.Total>pageInfor.pageSize">
	</el-pagination>
</template>

<script>
	export default {
		data() {
			return {
				//当前页数列表内容
				CurrentPage: [],
				//当前页数
				currentPage: 1,
			}
		},
		props: {
			pageInfor: {}
		},
		methods: {
			setPagingCont() {
				this.$emit('getPagingCont', this.CurrentPage, this.currentPage);
			},
			//点击上一页
			prevClick(i) {
				this.currentPage = i;
				this.pageTurning(i);
			},
			//点击当前页
			currentChange(i) {
				this.currentPage = i;
				this.pageTurning(i);
			},
			//点击下一页
			nextClick(i) {
				this.currentPage = i;
				this.pageTurning(i);
			},
			//翻页
			pageTurning(val) {
				//清空数组
				this.CurrentPage = [];
				let lp = this.pageInfor.ListPage;
				let cp = this.CurrentPage;
				let t = this.pageInfor.Total;
				let p = this.pageInfor.pageSize;
				let r = t % p;
				if(t > 0) {
					if(r > 0) {
						if(val == (t - r) / p + 1) {
							for(let i = (val - 1) * p; i < (val - 1) * p + r; i++) {
								cp.push(lp[i - 1, i]);
							}
						} else {
							for(let i = (val - 1) * p; i < val * p; i++) {
								cp.push(lp[i - 1, i]);
							}
						}
					} else {
						for(let i = (val - 1) * p; i < val * p; i++) {
							cp.push(lp[i - 1, i]);
						}
					}
				}
			}
		},
		watch: {
			CurrentPage() {
				this.setPagingCont();
			},
			pageInfor: {　　　　
				handler(newValue, oldValue) {
					const that = this;　　　　　　　　　
					setTimeout(function() {
						that.pageTurning(that.currentPage);
					}, 100);
				},
				deep: true　　
			}

		}
	}
</script>

<style>

</style>