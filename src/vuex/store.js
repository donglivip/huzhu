import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	// 定义状态
	state: {
		myurl:'http://192.168.2.107',
		MsdServiceStyleId:'',  //首页分类id
		MsdServiceStylename:'',	//首页分类名称
		msdNewsId:'',  //新闻di
		msdCompanyId:'',		//公司ID
		msdCompanyname:'',		//公司名字
		msdInsuranceResultId:'',
		msdAddressId:'',  //地址id
		msdFoodResultId:'' //食物ID
	}
})

export default store