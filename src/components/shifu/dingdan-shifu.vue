<template>
	<div class="wrapper">
			<div class="header">
				<div class="header-cebian"></div>
				<div class="header-text">我的订单</div>
				<div class="header-cebian"></div>
			</div>
			<div class="main">
				<div class="main-one">
					<div class="one-news">未完成</div>
					<div class="one-text">已完成</div>
					<div class="one-text">已取消</div>
				</div>
				<div class="main-two">
					<div class="two-box">
						<div class="two-left">
							<img src="../../../static/352435.jpg" />
						</div>
						<div class="two-right">
							<div class="two-text">类型：上门维修</div>
							<div class="two-text">上门时间：2018-7-4 13：20</div>
							<div class="two-text">订单地址：云龙区绿地世纪城</div>
							<div class="two-zi">
								<div class="two-text">价格：</div>
								<div class="two-news">￥50</div>
							</div>
						</div>
					</div>
					<div class="main-five">
						<div class="five-text">导航过去</div>
						<div class="five-news">拨打电话</div>
						<div class="kongbai"></div>
						<div class="five-word">完成订单</div>
					</div>
				</div>
			</div>
			<div class="bottom">
				<div class="bottom-box" @click="opennew('shouye-shifu')">
					<img src="../../../static/da.png"/>
					<div class="bottom-news">大厅</div>
				</div>
				<div class="bottom-box">
					<img src="../../../static/dingdan.png"/>
					<div class="bottom-text">订单</div>
				</div>
				<div class="bottom-box" @click="opennew('wode-shifu')">
					<img src="../../../static/wode.png"/>
					<div class="bottom-news">我的</div>
				</div>
			</div>
		</div>
</template>

<script>
	export default {
		name: 'dingdan-shifu',
		data() {
			return {
				tabdata: []
			}
		},
		methods: {
			myajax: function() {
				var that = this
				//				获取店铺列表
				$.ajax({
					type: 'post',
					url: that.myurl + '/user/selectNewsId',
					data: {
						msdNewsId: that.msdNewsId
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
		margin: 0;
		padding: 0;
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
	}
	
	.header-text {
		font-size: .32rem;
		color: #272727;
	}
	
	.main {
		height: calc(100% - 2.2rem);
		overflow-x: hidden;
		overflow-y: scroll;
	}
	
	.main-one {
		display: flex;
		align-items: center;
		justify-content: space-around;
		background: #FFFFFF;
		height: .9rem;
	}
	
	.one-news {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: .28rem;
		color: #0DA5FE;
		border-bottom: 2px solid #0DA5FE;
		height: .9rem;
	}
	
	.one-text {
		font-size: .28rem;
		color: #333333;
	}
	
	.main-two {
		height: 2.8rem;
		background: #FFFFFF;
		padding-top: .3rem;
		margin-bottom: .2rem;
	}
	
	.two-box {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		padding: 0 .34rem;
		margin-bottom: .2rem;
	}
	
	.two-left {
		height: 1.6rem;
		overflow: hidden;
		width: 1.6rem;
	}
	
	.two-left img {
		width: 100%;
		border-radius: .08rem;
	}
	
	.two-right {
		margin-left: .2rem;
		height: 1.6rem;
	}
	
	.two-text {
		font-size: .24rem;
		color: #333333;
		margin-bottom: .12rem;
	}
	
	.two-zi {
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}
	
	.two-news {
		font-size: .24rem;
		color: #E24B2D;
	}
	
	.main-five {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		padding: 0 .3rem;
		height: 1rem;
	}
	
	.five-text {
		font-size: .24rem;
		color: #0DA5FE;
		border: 1px solid #0DA5FE;
		height: .48rem;
		width: 1.3rem;
		text-align: center;
		line-height: .48rem;
		margin-right: .3rem;
	}
	
	.five-news {
		font-size: .24rem;
		color: #0DA5FE;
		border: 1px solid #0DA5FE;
		height: .48rem;
		width: 1.3rem;
		text-align: center;
		line-height: .48rem;
	}
	
	.five-word {
		font-size: .24rem;
		color: #FFFFFF;
		height: .48rem;
		width: 1.3rem;
		text-align: center;
		line-height: .48rem;
		background: #0DA5FE;
	}
	
	.kongbai {
		flex: 1;
	}
	
	.bottom {
		display: flex;
		align-items: center;
		justify-content: space-around;
		height: 1.1rem;
		background: #FFFFFF;
	}
	
	.bottom-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
	}
	
	.bottom-box img {
		height: .44rem;
		margin-bottom: .04rem;
	}
	
	.bottom-text {
		font-size: .2rem;
		color: #0DA5FE;
	}
	
	.bottom-news {
		font-size: .2rem;
		color: #CCCCCC;
	}
</style>