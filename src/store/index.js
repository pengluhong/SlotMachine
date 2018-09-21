// 引入vue 和 vuex
import Vue from 'vue'
import Vuex from 'vuex'

// 这里需要use一下,固定写法,记住即可
Vue.use(Vuex)

// 直接导出 一个 Store 的实例
export default new Vuex.Store({
	// 类似 vue 的 data
	state: {
		//菜单
		Menus:[],
	},
	// 类似 vue 里的 mothods(同步方法)
	mutations: {
		//菜单导航
		_Menus(state) {
			state.Menus = JSON.parse(localStorage.getItem('Menus'))
		},
	}
})