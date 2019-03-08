import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [{
		path: '',
		redirect: 'shouye-yonghu'
	}, {
		path: '/shouye-shifu',
		name: 'shouye-shifu',
		component: resolve => require(['@/components/shouye-shifu'], resolve),
		meta: {
			keepAlive: true
		}
	}, {
		path: '/zhuce',
		name: 'zhuce',
		component: resolve => require(['@/components/zhuce'], resolve),
		meta: {
			keepAlive: true
		}
	}, {
		path: '/waimai',
		name: 'waimai',
		component: resolve => require(['@/components/waimai'], resolve),
		meta: {
			keepAlive: true
		}
	}, {
		path: '/denglu',
		name: 'denglu',
		component: resolve => require(['@/components/denglu'], resolve),
		meta: {
			keepAlive: true
		}
	}, {
		path: '/baoxianyewu',
		name: 'baoxianyewu',
		component: resolve => require(['@/components/baoxianyewu'], resolve),
		meta: {
			keepAlive: true
		}
	}, {
		path: '/gongsiliebiao',
		name: 'gongsiliebiao',
		component: resolve => require(['@/components/gongsiliebiao'], resolve),
		meta: {
			keepAlive: true
		}
	}, {
		path: '/xinwen',
		name: 'xinwen',
		component: resolve => require(['@/components/xinwen'], resolve),
		meta: {
			keepAlive: true
		}
	}, {
		path: '/xinwenxiangqing',
		name: 'xinwenxiangqing',
		component: resolve => require(['@/components/xinwenxiangqing'], resolve),
		meta: {
			keepAlive: true
		}
	}, {
		path: '/shouye-yonghu',
		name: 'shouye-yonghu',
		component: resolve => require(['@/components/shouye-yonghu'], resolve),
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