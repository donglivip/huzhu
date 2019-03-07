import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [{
		path: '',
		redirect: 'index'
	}, {
		path: '/index',
		name: 'index',
		component: resolve => require(['@/components/index'], resolve),
		meta: {
			keepAlive: true
		}
	},{
		path: '/chongzhi',
		name: 'chongzhi',
		component: resolve => require(['@/components/chongzhi'], resolve),
		meta: {
			keepAlive: true
		}
	},{
		path: '/renzhengzhongxin',
		name: 'renzhengzhongxin',
		component: resolve => require(['@/components/renzhengzhongxin'], resolve),
		meta: {
			keepAlive: true
		}
	}]
})