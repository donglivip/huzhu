<template>
	<div class="wrapper">
		<div class="header">
			<div class="header-cebian" @click="back()">
				<img src="../../static/zuo.png" />
			</div>
			<div class="header-text">钱包充值</div>
			<div class="header-cebian" @click="opennew('mingxi')">
				<div class="header-news">明细</div>
			</div>
		</div>
		<div class="main">
			<div class="main-box">
				<div class="main-one">
					<div class="one-text">账户余额(元)</div>
					<div class="one-news">收益金(元)</div>
				</div>
				<div class="main-two">
					<div class="two-text">{{tabdata.msdUwBalance}}</div>
					<div class="two-news">{{tabdata.msdUwProfit}}</div>
				</div>
				<div class="main-three">
					<div class="three-text">账户余额不提现，每天都会产生收益金！！</div>
				</div>
			</div>
			<div class="main-four" @click="opennew('renzhengzhongxin')">
				<img src="../../static/bangding.png" class="lift" />
				<div class="four-text">绑定支付宝 </div>
				<img src="../../static/you-hui.png" class="right" />
			</div>
			<div class="main-four" @click="opennew('renzhengzhongxin')">
				<img src="../../static/bangding.png" class="lift" />
				<div class="four-text">绑定微信 </div>
				<img src="../../static/you-hui.png" class="right" />
			</div>
			<div class="main-four" @click="opennew('chongzhi')">
				<img src="../../static/chongzhijilu.png" class="lift" />
				<div class="four-text">充值</div>
				<img src="../../static/you-hui.png" class="right" />
			</div>
			<div class="main-four" @click="opennew('tixian')">
				<img src="../../static/chongzhijilu.png" class="lift" />
				<div class="four-text">提现</div>
				<img src="../../static/you-hui.png" class="right" />
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'qianbaochongzhi',
		data() {
			return {
				tabdata: ''
			}
		},
		methods: {
			mypro02:function(){
				var id=prompt('请输入您的微信账号')
				var that = this
				if(id==''||id==null){
					alert('请输入合法账号')
					return false;
				}
				//				绑定支付宝
				$.ajax({
					type: 'post',
					url: that.myurl + '/user/updateMsdUserWallet',
					data: {
						msdUserWalletId: that.tabdata.msdUserWalletId,
						msdUwIsWechatBinding:1,
						msdUwWechatBindingCode:id
					},
					success: function(res) {
						if(res.data == 1) {
							plus.nativeUI.toast('绑定成功!')
						} else {
							alert(res.msg)
						}
					},
					error: function(res) {
						alert('网络连接失败，请检查网络后再试！')
					}
				})
			},
			mypro:function(){
				var id=prompt('请输入您的支付宝账号')
				var that = this
				if(id==''||id==null){
					alert('请输入合法账号')
					return false;
				}
				//				绑定支付宝
				$.ajax({
					type: 'post',
					url: that.myurl + '/user/updateMsdUserWallet',
					data: {
						msdUserWalletId: that.tabdata.msdUserWalletId,
						msdUwIsAliBinding:1,
						msdUwAliBindingCode:id
					},
					success: function(res) {
						if(res.data == 1) {
							plus.nativeUI.toast('绑定成功!')
						} else {
							alert(res.msg)
						}
					},
					error: function(res) {
						alert('网络连接失败，请检查网络后再试！')
					}
				})
			},
			myajax: function() {
				var that = this
				//				获取钱包余额·
				$.ajax({
					type: 'post',
					url: that.myurl + '/user/selectUserWalletService',
					data: {
						msdUserId: localStorage.getItem('userid')
					},
					success: function(res) {
						if(res.status == 200) {
							that.tabdata = res.data
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
			opennew: function(target, id) {
				this.$store.state.msdNewsId = id
				this.$router.push({
					name: target
				})
			}
		},
		mounted() {
			this.myajax()
		},
		computed: {
			myurl() {
				return this.$store.state.myurl
			}
		}
	}
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
		background: #FFFFFF;
	}
	
	.header {
		height: .96rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 .3rem;
		background: #6C8AC8;
	}
	
	.header-cebian {
		display: flex;
		align-items: center;
		justify-content: center;
		width: .6rem;
	}
	
	.header-cebian img {
		height: .36rem;
	}
	
	.header-text {
		font-size: .32rem;
		color: #FFFFFF;
	}
	
	.header-news {
		font-size: .24rem;
		color: #FFFFFF;
	}
	
	.main-box {
		background: #6C8AC8;
	}
	
	.main-one {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		padding: .4rem .3rem .1rem .4rem;
	}
	
	.one-text {
		font-size: .28rem;
		color: #FFFFFF;
		width: 50%;
	}
	
	.one-news {
		font-size: .28rem;
		color: #FFFFFF;
	}
	
	.main-two {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		padding: 0 .3rem;
		margin-bottom: .6rem;
	}
	
	.two-text {
		font-size: .8rem;
		color: #FFFFFF;
		width: 50%;
	}
	
	.two-news {
		font-size: .8rem;
		color: #FFFFFF;
	}
	
	.main-three {
		background: #A6BCEA;
		line-height: .3rem;
		overflow-x: scroll;
		overflow-y: hidden;
		padding-left: .3rem;
	}
	
	.three-text {
		font-size: .24rem;
		color: #FFFFFF;
	}
	
	.main-four {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		height: 1rem;
		padding: 0 .3rem;
	}
	
	.lift {
		height: .4rem;
		margin-right: .2rem;
	}
	
	.four-text {
		font-size: .28rem;
		color: #272727;
		flex: 1;
	}
	
	.right {
		height: .36rem;
	}
</style>