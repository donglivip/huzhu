<template>
	<div class="wrapper" id="app">
		<div class="header">
			<div class="header-cebian" @click="back()">
				<img src="../../static/youjian.png" />
			</div>
			<div class="header-text">保险业务</div>
			<div class="header-cebian"></div>
		</div>
		<div class="main">
			<div class="main-box">
				<div class="main-one">
					<div class="one-text" v-for="(val,index) in navdata" :class="navindex==index?'one-news':''" @click="havedetail(val.msdInsuranceStatusId,index)">{{val.msdItName}}</div>
				</div>
				<div class="main-inner">
					<swiper :options="swiperOption" ref="mySwiper" v-if='imgdata.length!=0'>
						<!-- 这部分放你要渲染的那些内容 -->
						<swiper-slide v-for='val in imgdata'>
							<img :src="val.msdIrIsBannerImg | myimg" />
						</swiper-slide>
						<!-- 这是轮播的小圆点 -->
						<div class="swiper-pagination" slot="pagination"></div>
					</swiper>
					<div class="main-two" v-for="(val,index) in detaildata" @click="opennew('baoxianxiangqing',val.msdInsuranceResultId)">
						<div class="two-left">
							<img :src="val.msdIrImg | myimg" />
						</div>
						<div class="two-right">
							<div class="two-text">{{val.msdIrName}}</div>
							<div class="two-news">{{val.msdIrConcise}}</div>
							<div class="two-box">
								<img src="../../static/xing.png" v-for="vala in val.maIlStar" />
							</div>
							<div class="two-word">{{val.msdIrStartPrice}}元起</div>
						</div>
					</div>
					<a class="main-three" href="tel:051666695588">更多咨询请联系客服</a>
				</div>
				
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'chongzhi',
		data() {
			return {
				navdata: [],
				detaildata: [],
				navindex: 0,
				swiperOption: {
					autoplay: {
						stopOnLastSlide: true,
					},
					loop: true,
					pagination: {
						el: '.swiper-pagination'
					}
				},
				imgdata:[]
			}
		},
		methods: {
			havenav: function() {
				var that = this
				//				获取轮播图
				$.ajax({
					type: 'post',
					url: that.myurl + '/company/queryMsdInsuranceResultBanner',
					success: function(res) {
						if(res.status == 200) {
							that.imgdata = res.data
						} else {
							alert(res.msg)
						}
					},
					error: function(res) {
						alert('网络连接失败，请检查网络后再试！')
					}
				})
				$.ajax({
					type: "post",
					url: that.myurl + "/user/selectMsdInsuranceStatus",
					dataType: 'json',
					success: function(res) {
						that.navdata = res.data
						that.havedetail(res.data[0].msdInsuranceStatusId, 0)
					},
					error: function() {
//						that.havenav()
					}
				});
			},
			havedetail: function(id, index) {
				var that = this
				that.navindex = index
				$.ajax({
					type: "post",
					url: that.myurl + "/user/selectMsdInsuranceStatusId",
					dataType: 'json',
					data: {
						MsdInsuranceStatusId: id
					},
					success: function(res) {
						that.detaildata = res.data
					},
					error: function() {
//						that.havenav()
					}
				});
			},
			back: function() {
				this.$router.back()
			},
			opennew: function(target, id) {
				this.$store.state.msdInsuranceResultId = id
				this.$router.push({
					name: target
				})
			}
		},
		mounted() {
			this.havenav()
		},
		computed: {
			myurl() {
				return this.$store.state.myurl
			},
			msdInsuranceResultId() {
				return this.$store.state.msdInsuranceResultId
			}
		}
	}
</script>

<style scoped>
	* {
		margin: 0;
		padding: 0;
	}
	.swiper-container{height: 2.8rem;width: 7rem;margin: .1rem auto;}
	.swiper-container img{width: 100%!important;}
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
		justify-content: flex-start;
		height: .96rem;
		padding: 0 .3rem;
		background: #FFFFFF;
		margin-bottom: .2rem;
	}
	
	.header-cebian {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		width: .3rem;
	}
	
	.header-cebian img {
		height: .36rem;
	}
	
	.header-text {
		font-size: .32rem;
		color: #26261E;
		margin-left: .3rem;
	}
	
	.main-box {
		background: #FFFFFF;
	}
	
	.main-one {
		height: .8rem;
	background: #FFFFFF;
	padding:  0 .3rem;
	overflow-y: scroll;
    white-space: nowrap;
	}
	
	.one-text {
		font-size: .28rem;
	color: #272727 ;
	margin-right: .7rem;
	display: inline-block;
	box-sizing: border-box;	
	margin: 0 .2rem;
	}
	
	.one-news {
		font-size: .28rem;
		color: #0DA5FE;
		border-bottom: 2px solid #0DA5FE;
		
		height: .8rem;
		line-height: .8rem;
	}
	
	.main-two {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		height: 2.2rem;
		background: #FFFFFF;
		padding: 0 .3rem;
		margin-bottom: .3rem;
		background: #FFFFFF;
	}
	
	.two-left {
		height: 1.8rem;
		width: 2.1rem;
		border-radius: .08rem;
		overflow: hidden;
	}
	
	.two-left img {
		width: 100%;
	}
	
	.two-right {
		height: 1.8rem;
		margin-left: .2rem;
		flex: 1;
	}
	
	.two-text {
		font-size: .32rem;
		color: #272727;
		margin-bottom: .1rem;
	}
	
	.two-news {
		font-size: .24rem;
		color: #9B9B9B;
		margin-bottom: .16rem;
		line-height: .31rem;
		height: .6rem;
		overflow: hidden;
	}
	
	.two-box {
		height: .3rem;
		display: flex;
		align-items: center;
		margin-bottom: .1rem;
	}
	
	.two-box img {
		height: .2rem;
		margin-right: .06rem;
	}
	
	.two-word {
		font-size: .32rem;
		color: #E24B2D;
	}
	
	.main-three {
		background: #F7F7F9;
		font-size: .24rem;
		color: #9B9B9B;
		height: .8rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.main-box {
		height: 100%;
	}
	
	.main {
		height: calc(100% - .96rem);
	}
	
	.main-inner {
		height: calc(100% - .8rem);
		overflow-y: scroll;
		background: #F7F7F9;
	}
</style>