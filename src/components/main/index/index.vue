<template>
	<div>
		<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
		<div style="margin: 15px 0;"></div>
		<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
			<el-checkbox v-for="(city,index) in cities" :label="city.code" :key="city.name">{{city.name}}</el-checkbox>
		</el-checkbox-group>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				checkAll: false,
				checkedCities: ['02','03'],
				cities: [{
					name: '张三',
					code: '01'
				}, {
					name: '李四',
					code: '02'
				}, {
					name: '王二',
					code: '03'
				}, {
					name: '麻子',
					code: '04'
				}],
				isIndeterminate: true
			};
		},
		methods: {
			handleCheckAllChange(val) {
				this.checkedCities = val ? this.cities : [];
				this.isIndeterminate = false;
				console.log(this.checkedCities);
			},
			handleCheckedCitiesChange(value) {
				let checkedCount = value.length;
				this.checkAll = checkedCount === this.cities.length;
				this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
			},
			PiPei(val) {
				let len = this.checkedCities.length;
				let bool=false;
				for(let i = 0; i < len; i++) {
					if(val == this.checkedCities[i].code) {
						bool = true;
					}
				}
				return bool;
			}
		},
		created() {
			//this.handleCheckedCitiesChange();
		}
	};
</script>

<style>

</style>