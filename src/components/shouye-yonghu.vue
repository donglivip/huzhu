<template>
	<div class="wrapper">
		<div class="header">
			<div class="header-cebian">
				<div class="cebian-text">徐州</div>
				<img src="../../static/xia.png" />
			</div>
			<div class="header-content">
				<img src="../../static/dingwei1.png" />
				<div class="header-text">徐州市云龙区</div>
			</div>
			<div class="header-cebian">
				<div class="cebian-news">切换身份</div>
			</div>
		</div>
		<div class="main">
			<div class="main-one">
				<swiper :options="swiperOption" ref="mySwiper">
					<!-- 这部分放你要渲染的那些内容 -->
					<swiper-slide v-for='val in imgdata' v-if='val.msdBaIsDelete==2'>
						<img :src="val.msdBaImg" />
					</swiper-slide>
					<!-- 这是轮播的小圆点 -->
					<div class="swiper-pagination" slot="pagination"></div>
				</swiper>
			</div>
			<div class="main-two">
				<div class="two-box" v-for="(val,index) in tabdata" v-if="index<3" @click="opennew('gongsiliebiao',val.msdServiceStyleId)">
					<img src="../../static/weixiu.png" />
					<div class="two-text">上门维修</div>
				</div>
				<div class="two-box">
					<img src="../../static/gengduo.png" />
					<div class="two-text">更多分类</div>
				</div>
			</div>
			<div class="main-three" @click="opennew('xinwen','')">
				<div class="three-lift">
					<img src="../../static/new.png" />
				</div>
				<div class="three-content">
					<ul v-for="(val,index) in newdata" v-if="index<2">
						<li>{{val.msdNeTitle}}</li>
					</ul>
				</div>
				<div class="three-right">
					<img src="../../static/you-hui.png" />
				</div>
			</div>
			<div class="main-four">推荐服务</div>
			<div class="main-five" @click="opennew('waimai','')">
				<div class="five-lift">
					<img src="../../static/canyin.png" />
				</div>
				<div class="five-right">
					<div class="five-text">餐饮业务</div>
					<div class="five-news">去查看</div>
				</div>
			</div>
			<div class="main-five" @click="opennew('baoxianyewu','')">
				<div class="five-lift">
					<img src="../../static/baoxian.png" />
				</div>
				<div class="five-right">
					<div class="five-text">保险业务</div>
					<div class="five-news">去查看</div>
				</div>
			</div>
			<div class="main-four">合作伙伴</div>
			<div class="main-six">
				<img src="../../static/youyou.png" />
				<img src="../../static/youyou.png" />
			</div>
		</div>
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
		name: 'shouye-yonghu',
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
				},
				newdata:[],
				tabdata:[],
				imgdata:[]
			}
		},
		methods: {
			myajax: function() {
				var that = this
//				获取轮播图
				$.ajax({
					type: 'post',
					url: that.myurl + '/user/selectMsdBanner',
					success:function(res){
						if(res.status==200){
							that.imgdata=res.data
						}else{
							alert(res.msg)
						}
					},
					error:function(res){
						alert('网络连接失败，请检查网络后再试！')
					}
				})
//				获取推荐新闻
				$.ajax({
					type: 'post',
					url: that.myurl + '/user/selectNews',
					success:function(res){
						if(res.status==200){
							that.newdata=res.data
						}else{
							alert(res.msg)
						}
					},
					error:function(res){
						alert('网络连接失败，请检查网络后再试！')
					}
				})
//				获取服务类型分类
				$.ajax({
					type: 'post',
					url: that.myurl + '/user/selectMsdServiceStyle',
					success:function(res){
						if(res.status==200){
							that.tabdata=res.data
						}else{
							alert(res.msg)
						}
					},
					error:function(res){
						alert('网络连接失败，请检查网络后再试！')
					}
				})
			},
			opennew:function(target,id){
				this.$store.state.MsdServiceStyleId=id
				this.$router.push({
					name: target
				})
			}
		},
		mounted() {
			this.myajax()
		},
		components: {
			swiper,
			swiperSlide
		},
		computed: {
			swiper() {
				return this.$refs.mySwiper.swiper;
			},
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
	.three-content{flex: 1;}
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
	
	.header-content {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.header-content img {
		height: .28rem;
		margin-right: .1rem;
	}
	
	.header-text {
		font-size: .32rem;
		color: #26261E;
	}
	
	.cebian-news {
		font-size: .28rem;
		color: #5380B1;
	}
	
	.main {
		height: calc(100% - 2.2rem);
		overflow-x: hidden;
		overflow-y: scroll;
	}
	
	.main-one img {
		height: 2.8rem;
		margin: 0 .3rem .6rem .3rem;
		border-radius: .08rem;
		width: 6.6rem;
	}
	
	.main-two {
		display: flex;
		align-items: center;
		justify-content: space-around;
		height: 1.6rem;
	}
	
	.two-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	.two-box img {
		height: .5rem;
		margin-bottom: .2rem;
	}
	
	.two-text {
		font-size: .28rem;
		color: #272727;
	}
	
	.main-three {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 .3rem;
		height: 1.2rem;
		margin-bottom: .3rem;
	}
	
	.three-lift {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1.3rem;
		display: flex;
		justify-content: flex-start;
	}
	
	.three-lift img {
		height: .8rem;
	}
	
	li {
		font-size: .26rem;
		color: #171717;
		margin-bottom: .08rem;
	}
	
	.three-right {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.three-right img {
		height: .38rem;
	}
	
	.main-four {
		height: 1rem;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		font-size: .36rem;
		color: #272727;
		margin-left: .3rem;
	}
	
	.main-five {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 1.6rem;
		padding: 0 .3rem;
		margin-bottom: .6rem;
	}
	
	.five-lift {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.five-lift img {
		height: 1.6rem;
	}
	
	.five-right {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	.five-text {
		font-size: .32rem;
		color: #272727;
		margin-bottom: .4rem;
	}
	
	.five-news {
		font-size: .28rem;
		color: #FFFFFF;
		border-radius: .3rem;
		height: .4rem;
		width: 1.5rem;
		background: #0DA5FE;
		line-height: .4rem;
		text-align: center;
	}
	
	.main-six {
		display: flex;
		align-items: center;
		justify-content: space-around;
		height: 2rem;
		margin-bottom: .2rem;
	}
	
	.main-six img {
		height: 1.6rem;
		width: 3.3rem;
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