import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	// 定义状态
	state: {
		myurl:'https://www.wuyouhuzhu.com',
		// myurl:'http://39.107.70.18',
//     myurl:'http://192.168.2.108',
		MsdServiceStyleId:'',  //首页分类id
		MsdServiceStylename:'',	//首页分类名称
		msdNewsId:'',  //新闻di
		msdCompanyId:'',		//公司ID
		msdCompanyname:'',		//公司名字
		msdInsuranceResultId:'',
		msdAddressId:'',  //地址id
		msdFoodResultId:'', //食物ID
		msdOrderId:'', //订单id
		navindex0:'' //订单状态
	}
})

export default store
