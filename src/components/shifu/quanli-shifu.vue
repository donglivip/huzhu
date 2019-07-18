<template>
	<div class="wrapper">
		<div class="header">
			<div class="header-cebian" @click="back()">
				<img src="../../../static/youjian.png" />
			</div>
			<div class="header-text">{{mydata02.msdMeName}}权益</div>
			<div class="header-cebian"></div>
		</div>
		<div class="main">
			<div class="btn">
				累计推荐人数:{{mydata02.msdMmActualCountNum}}人
			</div>
			<div class="btn">
				累计成为c级会员:{{mydata02.msdMmActualCNum}}人
			</div>
			<div class="btn">
				累计成为b级会员:{{mydata02.msdMmActualBNum}}人
			</div>
			<div class="btn">
				累计成为a级会员:{{mydata02.msdMmActualANum}}人
			</div>
			<div class="btn">
				累计获取奖励:{{mydata02.msdMmReward}}元
			</div>
			<p>
				每介绍一位会员获得{{mydata02.msdMeBonus}}%分红
			</p>
			<p v-html="mydata02.msdMeResult">
			</p>
		</div>

		<a class="bottom active" href="tel:66695588">
			<div class="bottom-text">领取会员礼品 </div>
		</a>

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
				mydata: [],
				mydata02: {}
			}
		},
		methods: {
			payshow: function(id) {
				this.myid = id
				this.payboo = !this.payboo
			},
			change: function(index) {
				this.state = index
			},
			have: function() {
				var that = this
				$.ajax({
					type: 'post',
					url: that.myurl + '/user/queryMsdMember',
					success: function(res) {
						that.mydata = res.data
					},
					error: function(res) {
						alert('网络连接失败，请检查网络后再试！')
					}
				})
				$.ajax({
					type: 'post',
					url: that.myurl + '/company/queryMemberInfo',
					data: {
						Id: localStorage.getItem('msdCompanyId'),
						type: 2
					},
					success: function(res) {
						if(res.data!=null){
							that.mydata02 = res.data
						}else{
							alert('您还没有开通会员呢！')
							that.$router.replace({
								name: 'openvip-shifu'
							})
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

	.btn {
		margin: .2rem;
		background: #0DA5FE;
		color: #FFFFFF;
		border-radius: .1rem;
		text-align: center;
		line-height: 1rem;
	}
	p{
		padding:.1rem .25rem;font-weight: 600;font-size: .28rem;
	}
	* {
		padding: 0;
		margin: 0;
	}

	.title {
		margin: .2rem;
		border-bottom: 1px solid #0DA5FE;
		text-align: center;
		line-height: .8rem;
		color: #0DA5FE;
		font-weight: 600;
		font-size: .4rem;
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
