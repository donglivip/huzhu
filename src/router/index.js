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
		component: resolve => require(['@/components/shifu/shouye-shifu'], resolve),
		meta: {
			keepAlive: true
		}
	},{
		path: '/mingxi',
		name: 'mingxi',
		component: resolve => require(['@/components/mingxi'], resolve),
		meta: {
			keepAlive: false
		}
	},{
		path: '/fenlei',
		name: 'fenlei',
		component: resolve => require(['@/components/fenlei'], resolve),
		meta: {
			keepAlive: true
		}
	},{
		path: '/share',
		name: 'share',
		component: resolve => require(['@/components/share'], resolve),
		meta: {
			keepAlive: true
		}
	},{
		path: '/shezhi',
		name: 'shezhi',
		component: resolve => require(['@/components/shezhi'], resolve),
		meta: {
			keepAlive: false
		}
	},{
		path: '/wodedingdan',
		name: 'wodedingdan',
		component: resolve => require(['@/components/wodedingdan'], resolve),
		meta: {
			keepAlive: false
		}
	},{
		path: '/qianbaochongzhi',
		name: 'qianbaochongzhi',
		component: resolve => require(['@/components/qianbaochongzhi'], resolve),
		meta: {
			keepAlive: false
		}
	},{
		path: '/wode-yonghu',
		name: 'wode-yonghu',
		component: resolve => require(['@/components/wode-yonghu'], resolve),
		meta: {
			keepAlive: false
		}
	},{
		path: '/xinzengdizhi',
		name: 'xinzengdizhi',
		component: resolve => require(['@/components/xinzengdizhi'], resolve),
		meta: {
			keepAlive: false
		}
	},{
		path: '/wodedizhi',
		name: 'wodedizhi',
		component: resolve => require(['@/components/wodedizhi'], resolve),
		meta: {
			keepAlive: false
		}
	},{
		path: '/wode-shifu',
		name: 'wode-shifu',
		component: resolve => require(['@/components/shifu/wode-shifu'], resolve),
		meta: {
			keepAlive: true
		}
	}, {
		path: '/bangzhu',
		name: 'bangzhu',
		component: resolve => require(['@/components/bangzhu'], resolve),
		meta: {
			keepAlive: false
		}
	}, {
		path: '/tijiaodingdan',
		name: 'tijiaodingdan',
		component: resolve => require(['@/components/tijiaodingdan'], resolve),
		meta: {
			keepAlive: false
		}
	}, {
		path: '/canyinxiangqing',
		name: 'canyinxiangqing',
		component: resolve => require(['@/components/canyinxiangqing'], resolve),
		meta: {
			keepAlive: false
		}
	}, {
		path: '/baoxianxiangqing',
		name: 'baoxianxiangqing',
		component: resolve => require(['@/components/baoxianxiangqing'], resolve),
		meta: {
			keepAlive: false
		}
	}, {
		path: '/querendingdan',
		name: 'querendingdan',
		component: resolve => require(['@/components/querendingdan'], resolve),
		meta: {
			keepAlive: false
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
			keepAlive: false
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
			keepAlive: false
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