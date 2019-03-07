<template>
	<div class="wrapper">
		<!--头-->
		<div class="header">
			<div class="header-cebian">
				<div class="cebian-text">徐州</div>
				<img src="../../static/xia.png" />
			</div>
			<div class="header-text">接单大厅</div>
			<div class="header-cebian">
				<div class="cebian-news">切换身份</div>
			</div>
		</div>
		<!--中间主体-->
		<div class="main">
			<div class="main-one">
				<swiper :options="swiperOption" ref="mySwiper">
					<!-- 这部分放你要渲染的那些内容 -->
					<swiper-slide>
						<img src="../../static/153465.jpg" />
					</swiper-slide>
					<swiper-slide>
						<img src="../../static/153465.jpg" />
					</swiper-slide>
					<swiper-slide>
						<img src="../../static/153465.jpg" />
					</swiper-slide>
					<swiper-slide>
						<img src="../../static/153465.jpg" />
					</swiper-slide>
					<!-- 这是轮播的小圆点 -->
					<div class="swiper-pagination" slot="pagination"></div>
				</swiper>
			</div>
			<div class="main-two">
				<div class="two-box">
					<div class="two-left">
						<img src="../../static/352435.jpg" />
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
				<div class="two-hezi">
					<div class="two-word">取消订单</div>
					<div class="two-word">接受订单</div>
				</div>
			</div>
			<div class="main-two">
				<div class="two-box">
					<div class="two-left">
						<img src="../../static/352435.jpg" />
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
				<div class="two-hezi">
					<div class="two-word">取消订单</div>
					<div class="two-word">接受订单</div>
				</div>
			</div>

		</div>
		<!--下面-->
		<div class="bottom">
			<div class="bottom-box">
				<img src="../../static/dating.png" />
				<div class="bottom-text">大厅</div>
			</div>
			<div class="bottom-box">
				<img src="../../static/ding_dan.png" />
				<div class="bottom-news">订单</div>
			</div>
			<div class="bottom-box">
				<img src="../../static/wode.png" />
				<div class="bottom-news">我的</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default {
		name: 'index',
		data() {
			return {
				swiperOption: {
					autoplay: {
						stopOnLastSlide: true,
					},
					loop: true,
					pagination: {
						el: '.swiper-pagination'
					}
				}
			}
		},
		methods: {

		},
		mounted(){
			
		},
		components: {
			swiper,
			swiperSlide
		},
		computed: {
			swiper() {
				return this.$refs.mySwiper.swiper;
			}
		},
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
		background: #FFFFFF;
	}
	
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: .96rem;
		margin-bottom: .2rem;
		padding: 0 .34rem;
	}
	
	.header-cebian {
		width: 1.2rem;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}
	
	.header-cebian img {
		height: .3rem;
		margin-left: .12rem;
	}
	
	.cebian-text {
		font-size: .28rem;
		color: #26261E;
	}
	
	.header-text {
		font-size: .32rem;
		color: #26261E;
	}
	
	.cebian-news {
		font-size: .2rem;
		color: #5380B1;
	}
	
	.main {
		height: calc(100% - 2.2rem);
		overflow-x: hidden;
		overflow-y: scroll;
	}
	
	.main-one img {
		margin: .2rem .3rem .7rem .3rem;
		border-radius: .08rem;
		height: 2.8rem;
		width: 6.6rem;
	}
	
	.main-two {
		height: 3.6rem;
	}
	
	.two-box {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 .32rem;
		margin-bottom: .2rem;
	}
	
	.two-left img {
		height: 2rem;
	}
	
	.two-right {
		margin-left: .4rem;
		height: 2rem;
	}
	
	.two-text {
		font-size: .24rem;
		color: #333333;
		margin-bottom: .17rem;
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
	
	.two-hezi {
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	
	.two-word {
		font-size: .28rem;
		color: #FFFFFF;
		background: #0DA5FE;
		width: 3rem;
		height: .66rem;
		text-align: center;
		line-height: .66rem;
		border-radius: .08rem;
	}
	
	.bottom {
		display: flex;
		align-items: center;
		justify-content: space-around;
		height: 1.1rem;
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