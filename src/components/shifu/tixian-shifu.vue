<template>
	<div class="wrapper">
		<div class="header">
			<div class="header-cebian" @click="back()">
				<img src="../../../static/youjian.png" />
			</div>
			<div class="header-text">提现</div>
			<div class="header-cebian"></div>
		</div>
		<div class="main">
			<div class="main-one">
				<div class="ont-text">提现金额</div>
				<div class="one-one">
					<div class="one-news">￥</div>
					<input type="number" placeholder="" v-model="price" @input="changinput()"/>
				</div>
			</div>
			<div class="main-two">
				<div class="two-text">提现方式</div>
			</div>
			<div class="main-three">
				<div class="three-box" @click="change(1)">
					<div class="three-text">支付宝</div>
					<img src="../../../static/xuanzhong (1).png" v-if="state==2" />
					<img src="../../../static/xuanzhong.png" v-if="state==1" />
				</div>
				<div class="three-box" @click="change(2)">
					<div class="three-text">微信</div>
					<img src="../../../static/xuanzhong (1).png" v-if="state==1" />
					<img src="../../../static/xuanzhong.png" v-if="state==2" />
				</div>
			</div>
		</div>
		<div class="bottom" :class="price==''?'':'active'" @click="myajax()">
			<div class="bottom-text">确认提现</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'tixian-shifu',
		data() {
			return {
				price: '',
				state: 1,
			}
		},
		methods: {
			changinput:function(){
				if(this.price<0.1){
					this.price=0.1
					plus.nativeUI.toast('提现最小值为0.1元')
				}
			},
			change: function(index) {
				this.state = index
			},
			myajax: function() {
				var that = this
//				plus.nativeUI.showWaiting()
				if(this.price == '') {
					return false;
				}
				//				提现
				$.ajax({
					type: 'post',
					url: that.myurl + '/company/companyWithdrawals',
					dataType:'json',
					data: {
						withdrawalsMoney: that.price,
						msdCompanyId: localStorage.getItem('msdCompanyId'),
						state: that.state
					},
					success: function(res) {
						if(res.status == 200) {
//							plus.nativeUI.closeWaiting()
							that.back()
						} else{
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
		height: 1.8rem;
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