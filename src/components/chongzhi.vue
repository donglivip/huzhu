<template>
	<div class="wrapper">
		<div class="header">
			<div class="header-cebian">
				<img src="../../static/youjian.png" />
			</div>
			<div class="header-text">充值</div>
			<div class="header-cebian"></div>
		</div>
		<div class="main">
			<div class="main-one">
				<div class="ont-text">充值金额</div>
				<div class="one-one">
					<div class="one-news">￥</div>
					<input type="number" placeholder="" />
				</div>
			</div>
			<div class="main-two">
				<div class="two-text">充值方式</div>
			</div>
			<div class="main-three">
				<div class="three-box">
					<div class="three-text">支付宝</div>
					<img src="../../static/xuanzhong (1).png" />
				</div>
				<div class="three-box">
					<div class="three-text">微信</div>
					<img src="../../static/xuanzhong.png" />
				</div>
			</div>
		</div>
		<div class="bottom">
			<div class="bottom-text">确认充值</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'chongzhi',
		data() {
			return {

			}
		},
		methods: {

		},
		mounted(){
			
		},
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