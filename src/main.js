// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './components/base/base'
import router from './router'
import $ from 'jquery'
import 'bootstrap/dist/js/bootstrap.min'

import ElementUI from 'element-ui'
Vue.use(ElementUI)
//复制、粘贴
import VueClipboard from 'vue-clipboard2'
VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)

import htmlToPdf from '@/assets/scripts/js/htmlToPdf'
Vue.use(htmlToPdf)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>'
})