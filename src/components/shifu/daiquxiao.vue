<template>
	<div class="wrapper">
		<div class="header">
			<div class="header-cebian" @click="back"><img src="../../../static/youjian.png" /></div>
			<div class="header-text">待取消订单</div>
			<div class="header-cebian"></div>
		</div>
		<div class="main">
			<div class="main-two">
				<div class="main-tab" v-for="val in tabdata">
					<div class="two-box">
						<div class="two-text"></div>
						<div class="two-news">下单时间：{{val.msdOrAppointmentTimeString}}</div>
					</div>
					<div class="two-top">类型：{{val.msdOrType==1?'派单':'抢单'}}</div>
					<div class="two-content">
						<div class="content-text">价格：</div>
						<div class="content-news">￥{{val.msdOrPrice==null?0:val.msdOrPrice}}</div>
					</div>
					<div class="two-bottom">订单编号：{{val.msdOrderId}}</div>
					<div class="two-hezi">
						<div class="hezi-text" >审核中</div>
					</div>
				</div>
				<img src="../../../static/noorder.png" v-if="tabdata.length==0" style="height: 3rem;margin: 1rem auto;display: block;"/>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'daiquxiao',
	data() {
		return {
			tabdata: []
		};
	},
	methods: {
		myajax: function() {
			var that = this;
			//				获取待取消列表
			$.ajax({
				type: 'post',
				url: that.myurl + '/company/queryMycanceledOrder',
				data: {
					msdCompanyId: localStorage.getItem('msdCompanyId'),
					status:1
				},
				success: function(res) {
					if (res.status == 200) {
						that.tabdata = res.data;
					} else {
						alert(res.msg);
					}
				},
				error: function(res) {
					alert('网络连接失败，请检查网络后再试！');
				}
			});
		},
		back: function() {
			this.$router.back();
		},
		opennew: function(target, id) {
			this.$store.state.msdNewsId = id;
			this.$router.push({
				name: target
			});
		}
	},
	mounted() {this.myajax()},
	computed: {
		myurl() {
			return this.$store.state.myurl;
		}
	}
};
</script>

<style scoped>
.star-box {
	display: flex;
	margin: 0.4rem auto 0.2rem;
}

.star-box img {
	height: 0.5rem;
	margin: 0.1rem;
}

textarea {
	border: 1px solid ghostwhite;
	border-radius: 0.1rem;
	padding: 0.2rem;
	box-sizing: border-box;
	height: 2rem;
	width: 4rem;
}

* {
	padding: 0;
	margin: 0;
}

.submit {
	background: #0da5fe;
	color: #ffffff;
	width: 4rem;
	height: 0.8rem;
	border-radius: 0.1rem;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0.4rem auto 0.2rem;
}

.layui {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.5);
}

.layui-inner {
	background: #ffffff;
	border-radius: 0.1rem;
	width: 5rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

html,
body,
.wrapper {
	width: 100%;
	height: 100%;
	overflow: hidden;
}

.wrapper {
	background: #f7f7f9;
}

.header {
	height: 0.96rem;
	background: #ffffff;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 0.2rem;
	padding: 0 0.3rem;
}

.header-cebian {
	width: 0.3rem;
}
.header-cebian img {
	height: 0.4rem;
}
.header-text {
	font-size: 0.34rem;
	color: #26261e;
	flex: 1;
	text-align: center;
}
.header-news {
	font-size: 0.28rem;
	color: #101010;
}
.main {
	height: calc(100% - 1.1rem);
	overflow: hidden;
}

.main-one {
	background: #ffffff;
	display: flex;
	align-items: center;
	justify-content: space-around;
	height: 0.8rem;
}

.one-text {
	font-size: 0.28rem;
	color: #272727;
}

.one-news {
	font-size: 0.28rem;
	color: #0da5fe;
	border-bottom: 2px solid #0da5fe;
	text-align: center;
	line-height: 0.8rem;
}

.main-two {
	height: calc(100%);
	background: #ffffff;
	padding: 0 0.3rem;
	overflow-y: scroll;
}

.two-box {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 1.2rem;
}

.two-text {
	font-size: 0.28rem;
	color: #333333;
}

.two-news {
	font-size: 0.24rem;
	color: #333333;
}

.two-top {
	font-size: 0.28rem;
	color: #333333;
	height: 0.26rem;
	margin-bottom: 0.3rem;
}

.two-content {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	margin-bottom: 0.2rem;
}

.content-text {
	font-size: 0.28rem;
	color: #333333;
}

.content-news {
	font-size: 0.28rem;
	color: #e24b2d;
}

.two-bottom {
	font-size: 0.28rem;
	color: #333333;
}

.two-hezi {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	background: #ffffff;
	height: 1.3rem;
	padding: 0 0.3rem;
}

.hezi-text {
	font-size: 0.24rem;
	color: #ffffff;
	background: #cacaca;
	width: 1.6rem;
	height: 0.6rem;
	text-align: center;
	line-height: 0.6rem;
}

.hezi-word {
	flex: 1;
}

.hezi-news {
	font-size: 0.24rem;
	color: #ffffff;
	background: #0da5fe;
	width: 1.6rem;
	height: 0.6rem;
	text-align: center;
	line-height: 0.6rem;
	margin-left: 0.2rem;
}

.bottom {
	display: flex;
	align-items: center;
	justify-content: space-around;
	height: 1.1rem;
	background: #ffffff;
}

.bottom-box {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
}

.bottom-box img {
	height: 0.44rem;
	margin-bottom: 0.04rem;
}

.bottom-text {
	font-size: 0.2rem;
	color: #0da5fe;
}

.bottom-news {
	font-size: 0.2rem;
	color: #cccccc;
}
</style>
