<template>
	<div class="wrapper">
		<div class="header">
			<div class="header-cebian" @click="back()">
				<img src="../../static/youjian.png" />
			</div>
			<div class="header-text">提交订单</div>
			<div class="header-cebian"></div>
		</div>
		<div class="main">
			<div class="main-one" @click="opennew('wodedizhi')">
				<div class="one-left">
					<img src="../../static/dingwei.png" />
				</div>
				<div class="one-content">
					<div class="content-text">{{tabdata.msdAdArea+tabdata.msdAdDetailed}}</div>
					<div class="content-news">{{tabdata.msdAdName}}</div>
					<div class="content-news">{{tabdata.msdAdPhone}}</div>
				</div>
				<div class="one-right">
					<img src="../../static/you-hui.png" />
				</div>
			</div>
			<div class="main-box">
				<div class="main-two">
					<div class="two-text">{{msdFoodResultId.msdFrName}}</div>
					<div class="two-text">¥ {{msdFoodResultId.msdFrPrice}}</div>
				</div>
				<div class="main-two">
					<textarea placeholder="备注：" v-model="msdFoRemark"></textarea>
				</div>
				<div class="main-three" @click="paychange()">
					<div class="two-text">{{state | ptype}}</div>
					<img src="../../static/you-hui.png" />
				</div>
			</div>

		</div>
		<div class="bottom" @click="gosubmit()">
			<div class="bottom-text">去结算</div>
		</div>
		<!--支付方式-->
		<div class="layui" v-if="payboo" @click="paychange()">
			<div class="layui-bottom">
				<div class="layui-tab" @click.stop="changepay(1)">
					支付宝
				</div>
				<div class="layui-tab" @click.stop="changepay(2)">
					微信
				</div>
				<div class="layui-tab" @click.stop="changepay(3)">
					钱包支付
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'tijiaodingdan',
		data() {
			return {
				tabdata:[],
				msdFoRemark:'',
				payboo:false,
				state:1,
				channel:''
			}
		},
		methods: {
			changepay: function(index) {
				this.state = index
				this.paychange()
			},
			paychange: function() {
				this.payboo = !this.payboo
			},
			gosubmit:function(){
				var that = this
				//				钱包下单
				if(that.state==3){
					$.ajax({
						type: 'post',
						url: that.myurl + '/user/userWalletPay',
						data: {
							msdUserId: localStorage.getItem('userid'),
							msdAddressId:that.tabdata.msdAddressId,
							msdFoPrice:that.msdFoodResultId.msdFrPrice,
							msdFoodResultId:that.msdFoodResultId.msdFoodResultId,
							msdFoRemark:that.msdFoRemark
						},
						success: function(res) {
							if(res.data == 1) {
								that.opennew('wodedingdan')
							}else{
								alert('余额不足！')
							}
						},
						error: function(res) {
							alert('网络连接失败，请检查网络后再试！')
						}
					})
				}else{
//					线上付款
					$.ajax({
						type: 'post',
						url: that.myurl + '/user/userCreateFoodOrderPay ',
						dataType:'json',
						data: {
							msdUserId: localStorage.getItem('userid'),
							msdAddressId:that.tabdata.msdAddressId,
							msdFoPrice:that.msdFoodResultId.msdFrPrice,
							msdFoodResultId:that.msdFoodResultId.msdFoodResultId,
							msdFoRemark:that.msdFoRemark,
							state:that.state
						},
						success: function(res) {
							if(that.state == 1) {
								//								支付宝充值
								plus.payment.request(that.channel[0], res.data[0], function(result) {
									plus.nativeUI.alert("支付成功！", function() {
										that.opennew('wodedingdan')
									});
								}, function(error) {
									alert('支付失败！')
								});
							} else {
								//								微信充值
								plus.payment.request(that.channel[1], res, function(result) {
									plus.nativeUI.alert("支付成功！", function() {
										that.opennew('wodedingdan')
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
			myajax: function() {
				var that = this
				//				获取收货地址列表
				$.ajax({
					type: 'post',
					url: that.myurl + '/user/selectAddressUser',
					data: {
						msdUserId: localStorage.getItem('userid')
					},
					success: function(res) {
						if(res.status == 200) {
							if(res.data.length==0){
								that.opennew('xinzengdizhi')
							}else{
								for (var i in res.data) {
									if(res.data[i].msdAdIsDefault==1){
										that.tabdata = res.data[i]
									}
								}
							}
							
						} else {
							alert(res.msg)
						}
					},
					error: function(res) {
						alert('网络连接失败，请检查网络后再试！')
					}
				})
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
			this.myajax()
			var that = this
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
			},
			msdFoodResultId() {
				return this.$store.state.msdFoodResultId
			}
		},
		filters:{
			ptype:function(value){
				if(value==1){
					return '支付宝'
				}else if(value==2){
					return '微信'
				}else{
					return '钱包支付'
				}
			}
		}
	}
</script>

<style scoped>
	* {
		margin: 0;
		padding: 0;
	}
	.layui,
	.modal {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, .5);
		display: flex;
		align-items: flex-end;
	}
	
	.layui-bottom {
		background: #FFFFFF;
		width: 100%;
	}
	
	.layui-tab {
		height: 1rem;
		border-bottom: 1px solid ghostwhite;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: .25rem;
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
		margin-bottom: .2rem;
		padding: 0 .3rem;
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
		height: 2rem;
		background: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin: 0 .2rem .4rem .2rem;
		border-radius: .16rem;
	}
	
	.one-left {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.one-left img {
		height: .32rem;
		margin: 0 .32rem;
	}
	
	.one-content {
		flex: 1;
	}
	
	.content-text {
		font-size: .32rem;
		color: #131313;
		font-weight: 600;
	}
	
	.content-news {
		font-size: .24rem;
		color: #4A4A4A;
		margin-top: .08rem;
	}
	
	.one-right {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.one-right img {
		height: .32rem;
		margin-right: .32rem;
	}
	
	.main-box {
		height: 3.1rem;
		background: #FFFFFF;
		margin: 0 .2rem .4rem .2rem;
		border-radius: .16rem;
	}
	
	.main-two {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 0 .3rem;
		height: 1rem;
		border-bottom: 1px solid #D8D8D8;
	}
	
	.two-text {
		font-size: .24rem;
		color: #131313;
	}
	
	textarea {
		height: 1rem;
		line-height: 1rem;
		border: 0;
		font-size: .28rem;
		color: #2D2D2D;
		width: 6rem;
	}
	
	.main-three {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 0 .3rem;
		height: 1rem;
	}
	
	.main-three img {
		height: .3rem;
	}
	
	.bottom {
		height: .96rem;
		background: #0DA5FE;
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		width: 100%;
		bottom: 0;
	}
	
	.bottom-text {
		font-size: .32rem;
		color: #FFFFFF;
	}
</style>