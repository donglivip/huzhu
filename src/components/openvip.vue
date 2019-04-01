<template>
	<div class="wrapper">
		<div class="header">
			<div class="header-cebian" @click="back()">
				<img src="../../static/youjian.png" />
			</div>
			<div class="header-text">开通vip</div>
			<div class="header-cebian"></div>
		</div>
		<div class="main">
			<div class="main-two">
				<div class="two-text">付款方式</div>
			</div>
			<div class="main-three">
				<div class="three-box" @click="change(1)">
					<div class="three-text">支付宝</div>
					<img src="../../static/xuanzhong (1).png" v-if="state!=1" />
					<img src="../../static/xuanzhong.png" v-if="state==1" />
				</div>
				<div class="three-box" @click="change(2)">
					<div class="three-text">微信</div>
					<img src="../../static/xuanzhong (1).png" v-if="state!=2" />
					<img src="../../static/xuanzhong.png" v-if="state==2" />
				</div>
				<div class="three-box" @click="change(3)">
					<div class="three-text">钱包支付</div>
					<img src="../../static/xuanzhong (1).png" v-if="state!=3" />
					<img src="../../static/xuanzhong.png" v-if="state==3" />
				</div>
			</div>
		</div>
		<div class="bottom active" @click="myajax()">
			<div class="bottom-text">确认开通 ￥{{mydata.msdMePrice}}</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'openvip',
		data() {
			return {
				price: '',
				state: 1,
				channel: '',
				mydata: {}
			}
		},
		methods: {
			change: function(index) {
				this.state = index
			},
			have: function() {
				var that = this
				$.ajax({
					type: 'post',
					url: that.myurl + '/user/selectMsdMember',
					success: function(res) {
						that.mydata = res.data[0]
						if(res.data.length==0){
							alert('会员功能暂时没有开通呢！')
							that.back()
						}
					},
					error: function(res) {
						alert('网络连接失败，请检查网络后再试！')
					}
				})
			},
			myajax: function() {
				var that = this
				//				开通
				if(that.state == 3) {
					$.ajax({
						type: 'post',
						url: that.myurl + '/user/insertMember',
						dataType:'json',
						data: {
							msdUserId: localStorage.getItem('userid')
						},
						success: function(res) {
							if(res.status == 200) {
								//								支付宝充值
								localStorage.setItem('msdIsMember',1)
								that.back()
							} else{
								alert(res.msg)
							}
						},
						error: function(res) {
							alert('网络连接失败，请检查网络后再试！')
						}
					})
				} else {
					$.ajax({
						type: 'post',
						url: that.myurl + '/user/insertMemberAPI',
						dataType:'json',
						data: {
							msdUserId: localStorage.getItem('userid'),
							state: that.state
						},
						success: function(res) {
							if(that.state == 1) {
								//								支付宝充值
								plus.payment.request(that.channel[0], res.data[0], function(result) {
									plus.nativeUI.alert("支付成功！", function() {
										localStorage.setItem('msdIsMember',1)
										that.back()
									});
								}, function(error) {
									alert('支付失败！')
								});
							} else {
								//								微信充值
								plus.payment.request(that.channel[1], res, function(result) {
									plus.nativeUI.alert("支付成功！", function() {
										localStorage.setItem('msdIsMember',1)
										that.back()
									});
								}, function(error) {
									alert('支付失败！')
								});
							}
						},
						error: function(res) {
							alert('网络连接失败，请检查网络后再试！')
						}
					})
				}
			},
			back: function() {
				this.$router.back()
			},
			opennew: function(target) {
				this.$router.push({
					name: target
				})
			}
		},
		mounted() {
			var that = this
			that.have()
			// 1. 获取支付通道
			function plusReady() {
				// 获取支付通道
				plus.payment.getChannels(function(channels) {
					that.channel = channels;
				}, function(e) {
					alert("获取支付通道失败：" + e.message);
				});
			}
			if(window.plus) {
				plusReady();
			} else {
				document.addEventListener('plusready', plusReady, false);
			}
		},
		computed: {
			myurl() {
				return this.$store.state.myurl
			}
		}
	}
</script>

<style scoped>
	.active {
		background: #0DA5FE!important;
	}
	
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
		background: #F7F7F9;
	}
	
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: .96rem;
		background: #FFFFFF;
		padding: 0 .3rem;
	}
	
	input {
		font-size: 1rem;
	}
	
	.header-cebian {
		display: flex;
		align-items: center;
		justify-content: center;
		width: .3rem;
	}
	
	.header-cebian img {
		height: .36rem;
	}
	
	.header-text {
		font-size: .32rem;
		color: #272727;
	}
	
	.main-one {
		height: 2.5rem;
		background: #FFFFFF;
		padding: 0 .3rem;
	}
	
	.ont-text {
		font-size: .32rem;
		color: #272727;
		padding: .5rem 0;
	}
	
	.one-one {
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}
	
	input {
		border: 0;
		width: 100%;
		height: .9rem;
	}
	
	.one-news {
		font-size: .6rem;
		color: #272727;
	}
	
	.main-two {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin-left: .3rem;
		height: .9rem;
	}
	
	.two-text {
		font-size: .28rem;
		color: #333333;
	}
	
	.main-three {
		background: #FFFFFF;
		padding: 0 .3rem;
	}
	
	.three-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: .9rem;
	}
	
	.three-text {
		font-size: .28rem;
		color: #333333;
	}
	
	.three-box img {
		height: .4rem;
	}
	
	.bottom {
		display: flex;
		align-items: center;
		justify-content: center;
		height: .96rem;
		background: #CCEBFF;
		width: 6rem;
		border-radius: .6rem;
		margin: 0 .76rem .8rem .76rem;
		position: fixed;
		bottom: 0;
	}
	
	.bottom-text {
		font-size: .32rem;
		color: #FFFFFF;
	}
</style>