import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	// 定义状态
	state: {
		myurl:'http://192.168.2.107',
		MsdServiceStyleId:'',
		msdNewsId:''
	}
})

export default store