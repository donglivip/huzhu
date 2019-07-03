<template>
	<div class="wrapper">
		<div class="header">
			<div class="header-cebian" @click="back()"><img src="../../static/youjian.png" /></div>
			<div class="header-text">订单详情</div>
			<div class="header-cebian"></div>
		</div>
		<div class="main">
			<div class="main-one">
				<div class="one-box">
					<div class="one-text">订单地址：</div>
					<div class="one-text">{{ tabdata.msdAddress }}</div>
				</div>
				<div class="one-hezi">
					<div class="one-text">联系人：{{ tabdata.msdAdName }}</div>
					<div class="one-text">{{ tabdata.msdPhone }}</div>
				</div>
			</div>
			<div class="main-box">
				<div class="box-top">
					<div class="box-text">订单编号:{{ msdOrderId }}</div>
				</div>
				<div class="box-box" v-if="tabdata.msdCoName!=null">
					<div class="box-left"><img src="../../static/352435.jpg" /></div>
					<div class="box-content">
						<div class="box-above">{{ tabdata.msdCoName }}</div>
						<div class="box-below">
							<div class="below-text">服务态度：</div>
							<div class="below-box">
								<img src="../../static/xing.png" v-for="val in tabdata.msdCoEvaluate" />
								<img src="../../static/xingx.png" v-for="val in 5 - tabdata.msdCoEvaluate" />
							</div>
						</div>
					</div>
					<a class="box-right" :href="'tel:' + tabdata.msdCoPhone + ''"><img src="../../static/dianhua.png" /></a>
				</div>
			</div>
			<div class="main-two">
				<div class="two-text">服务类型：</div>
				<div class="two-text">{{ tabdata.msdSsName }}</div>
			</div>
			<div class="main-two" v-if="tabdata.msdOrType==1">
				<div class="two-text">完成码：</div>
				<div class="two-text">{{ tabdata.msdOrCompletionCode }}</div>
			</div>
			<div class="main-two">
				<div class="two-text">上门时间：{{ tabdata.msdOrIsAppointmentTime == 2 ? '立即上门' : tabdata.msdOrAppointmentTimeString }}</div>
			</div>
			<div class="main-two" v-if="tabdata.msdOrType==1">
				<div class="two-text">最低价:</div>
				<div class="two-news">￥{{ tabdata.msdOrPrice == null ? 0 : tabdata.msdOrPrice }}</div>
			</div>
			<div class="main-three">
				<div class="three-text">备注：</div>
				<input type="text" v-model="tabdata.msdOrRemark" readonly="readonly" />
			</div>
			<div class="main-four">
				<div class="four-text">附照（最多三张）</div>
				<div class="four-box">
					<div class="img-box"><img :src="tabdata.msdOrImg1 | myimg" v-if="tabdata.msdOrImg1 != null" /></div>
					<div class="img-box"><img :src="tabdata.msdOrImg2 | myimg" v-if="tabdata.msdOrImg2 != null" /></div>
					<div class="img-box"><img :src="tabdata.msdOrImg3 | myimg" v-if="tabdata.msdOrImg3 != null" /></div>
				</div>
			</div>
		</div>
		<div class="bottom">
			<div class="bottom-text" v-if="tabdata.msdOrStatus == 2" @click="cancel">取消订单</div>
			<div class="bottom-word"></div>
			<a class="bottom-news" v-if="tabdata.msdOrStatus == 3" :href="'tel:' + tabdata.msdCoPhone + ''">联系师傅</a>
			<div class="bottom-news" v-if="tabdata.msdOrStatus == 3&&tabdata.msdOrPrice != null " @click="orderok">完成订单</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'xiangqing-yonghu',
	data() {
		return {
			tabdata: [],
			channel: []
		};
	},
	methods: {
		cancel: function() {
			var that = this;
			//				取消服务类订单
			$.ajax({
				type: 'post',
				url: that.myurl + '/company/removeOrder',
				data: {
					msdOrderId: that.msdOrderId,
					userId: localStorage.getItem('userid'),
					type: 1
				},
				success: function(res) {
					if (res.status == 200) {
						that.back();
					} else {
						alert(res.msg);
					}
				},
				error: function(res) {
					alert('网络连接失败，请检查网络后再试！');
				}
			});
		},
		orderok: function() {
			var that = this;
			//				完成服务类订单
			if (that.tabdata.msdOrType == 1) {
				$.ajax({
					type: 'post',
					url: that.myurl + '/company/completeOrder',
					data: {
						msdOrderId: that.msdOrderId,
						msdOrCompletionCode: that.tabdata.msdOrCompletionCode,
						userId: localStorage.getItem('userid'),
						type: 1
					},
					success: function(res) {
						if (res.status == 200) {
							that.back();
						} else {
							alert(res.msg);
						}
					},
					error: function(res) {
						alert('网络连接失败，请检查网络后再试！');
					}
				});
			} else {
					var btnArray = [
						{
							title: '余额'
						},
						{
							title: '线下支付'
						},
						{
							title: '支付宝'
						},
						{
							title: '微信'
						}
					]; //选择按钮  1 2 3
					plus.nativeUI.actionSheet(
						{
							title: '请选择支付方式',
							cancel: '取消',
							buttons: btnArray
						},
						function(e) {
							that.pay(e.index);
						}
					);
			}
		},
		pay: function(type) {
			var that = this;
			if (type == 1 || type == 2) {
				// 余额\线下支付
				$.ajax({
					type: 'post',
					url: that.myurl + '/user/userSinglePay',
					data: {
						id: that.msdOrderId,
						price: that.tabdata.msdOrPrice,
						state: type
					},
					success: function(res) {
						if (res.status == 200) {
							plus.nativeUI.toast('支付成功');
							that.back();
						} else {
							alert(res.msg);
						}
					},
					error: function(res) {
						alert('网络连接失败，请检查网络后再试！');
					}
				});
			} else {
				// 支付宝微信支付
				$.ajax({
					type: 'post',
					url: that.myurl + '/user/userSingleWXApi',
					data: {
						id: that.msdOrderId,
						price: that.tabdata.msdOrPrice,
						state: type == 3 ? 1 : 2
					},
					success: function(res) {
						if (that.state == 3) {
							//								支付宝充值
							plus.payment.request(
								that.channel[0],
								res.data[0],
								function(result) {
									plus.nativeUI.toast('支付成功')
									that.back()
								},
								function(error) {
									alert(that.channel[0])
									alert(JSON.stringify(res.data[0]))
									alert(JSON.stringify(error))
									plus.nativeUI.toast('支付失败')
								}
							);
						} else {
							//								微信充值
							plus.payment.request(
								that.channel[1],
								res,
								function(result) {
									plus.nativeUI.toast('支付成功')
									that.back()
								},
								function(error) {
									plus.nativeUI.toast('支付失败')
								}
							);
						}
					},
					error: function(res) {
						alert('网络连接失败，请检查网络后再试！');
					}
				});
			}
		},
		myajax: function() {
			var that = this;
			//				获取订单详情
			$.ajax({
				type: 'post',
				url: that.myurl + '/company/queryCompanyOrderPojo',
				data: {
					msdOrderId: that.msdOrderId
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
	mounted() {
		this.myajax();
		var that = this;
		// 1. 获取支付通道
		function plusReady() {
			// 获取支付通道
			plus.payment.getChannels(
				function(channels) {
					that.channel = channels;
				},
				function(e) {
					alert('获取支付通道失败：' + e.message);
				}
			);
		}
		if (window.plus) {
			plusReady();
		} else {
			document.addEventListener('plusready', plusReady, false);
		}
	},
	computed: {
		myurl() {
			return this.$store.state.myurl;
		},
		msdOrderId() {
			return this.$store.state.msdOrderId;
		}
	}
};
</script>

<style scoped>
	* {
	padding: 0;
	margin: 0;
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
	display: flex;
	align-items: center;
	justify-content: center;
}

.header-cebian img {
	height: 0.38rem;
}

.header-text {
	font-size: 0.34rem;
	color: #26261e;
}

.main {
	height: calc(100% - 2.26rem);
	overflow-x: hidden;
	overflow-y: scroll;
}

.main-one {
	height: 1.6rem;
	background: #ffffff;
	padding: 0 0.3rem;
	margin-bottom: 0.2rem;
}

.one-box {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	height: 0.8rem;
}

.one-text {
	font-size: 0.28rem;
	color: #26261e;
}

.one-hezi {
	height: 0.8rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.main-box {
	background: #ffffff;
}

.box-top {
	display: flex;
	align-items: center;
	height: 0.8rem;
	padding: 0 0.3rem;
	margin-bottom: 1px solid #d8d8d8;
}

.box-text {
	font-size: 0.28rem;
	color: #26261e;
}

.box-box {
	height: 2rem;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	padding: 0 0.3rem;
}

.box-left {
	height: 1.3rem;
	width: 1.3rem;
	overflow: hidden;
	border-radius: 0.08rem;
	margin-right: 0.3rem;
}

.box-left img {
	width: 100%;
}

.box-content {
	height: 1.3rem;
	flex: 1;
}

.box-above {
	height: 0.6rem;
	font-size: 0.28rem;
	color: #333333;
	margin-top: 0.1rem;
}

.box-below {
	height: 0.6rem;
	display: flex;
	align-items: center;
	justify-content: flex-start;
}

.below-text {
	font-size: 0.24rem;
	color: #333333;
}

.below-box {
	display: flex;
	align-items: center;
	justify-content: flex-start;
}

.below-box img {
	height: 0.22rem;
	margin-right: 0.06rem;
}

.box-right {
	display: flex;
	align-items: center;
	justify-content: center;
}

.box-right img {
	height: 0.52rem;
}

.main-two {
	background: #ffffff;
	height: 1rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid #d8d8d8;
	padding: 0 0.3rem;
}

.two-text {
	font-size: 0.28rem;
	color: #26261e;
}

.main-two img {
	height: 0.32rem;
}

.two-news {
	font-size: 0.28rem;
	color: #e24b2d;
}

.main-three {
	height: 1rem;
	background: #ffffff;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	border-bottom: 1px solid #d8d8d8;
	padding: 0 0.3rem;
}

.three-text {
	font-size: 0.28rem;
	color: #26261e;
}

input {
	border: 0;
	height: 1rem;
	font-size: 0.28rem;
	color: #26261e;
	flex: 1;
}

.main-four {
	height: 3.2rem;
	background: #ffffff;
	padding: 0.2rem 0.3rem;
}

.four-text {
	display: flex;
	align-items: center;
	font-size: 0.28rem;
	color: #26261e;
	height: 0.8rem;
}

.four-box {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	overflow: hidden;
}

.img-box {
	height: 1.6rem;
	width: 1.6rem;
	border-radius: 0.08rem;
	overflow: hidden;
	margin-right: 0.3rem;
}

.four-box img {
	width: 100%;
}

.bottom {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	background: #ffffff;
	height: 1.3rem;
	padding: 0 0.3rem;
}

.bottom-text {
	font-size: 0.24rem;
	color: #ffffff;
	background: #cacaca;
	width: 1.6rem;
	height: 0.6rem;
	text-align: center;
	line-height: 0.6rem;
}

.bottom-word {
	flex: 1;
}

.bottom-news {
	font-size: 0.24rem;
	color: #ffffff;
	background: #0da5fe;
	width: 1.6rem;
	height: 0.6rem;
	text-align: center;
	line-height: 0.6rem;
	margin-left: 0.2rem;
}
</style>
