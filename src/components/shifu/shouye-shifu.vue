<template>
	<div class="wrapper">
		<!--头-->
		<div class="header">
			<div class="header-cebian">
				<div class="cebian-text">{{city}}</div>
				<img src="../../../static/xia.png" />
			</div>
			<div class="header-text">接单大厅</div>
			<div class="header-cebian" @click="opennew('shouye-yonghu')">
				<div class="cebian-news">切换身份</div>
			</div>
		</div>
		<!--中间主体-->
		<div class="main">
			<div class="main-one">
				<swiper :options="swiperOption" ref="mySwiper">
					<!-- 这部分放你要渲染的那些内容 -->
					<swiper-slide v-for='val in navdata'>
						<img :src="val.msdSsImg | myimg" />
					</swiper-slide>
					<!-- 这是轮播的小圆点 -->
					<div class="swiper-pagination" slot="pagination"></div>
				</swiper>
			</div>
			<div class="main-two" v-for="val in orderdata" @click="opennew('xiangqing-shifu',val.msdOrderId)">
				<div class="two-box">
					<div class="two-left">
						<img :src="val.msdSsImg" />
					</div>
					<div class="two-right">
						<div class="two-text">类型：{{val.msdSsName}}</div>
						<div class="two-text">上门时间：{{val.msdOrCreateTimeString}}</div>
						<div class="two-text">订单地址：{{val.msdAdProvince+val.msdAdCity+val.msdAdArea}}</div>
						<div class="two-zi">
							<div class="two-text">价格：</div>
							<div class="two-news">￥{{val.msdOrPrice}}</div>
						</div>
					</div>
				</div>
				<div class="two-hezi">
					<div class="two-word" @click.stop="cancel(val.msdOrderId)">取消订单</div>
					<div class="two-word" @click.stop="haveorder(val.msdOrderId)">接受订单</div>
				</div>
			</div>
		</div>
		<!--下面-->
		<div class="bottom">
			<div class="bottom-box">
				<img src="../../../static/dating.png" />
				<div class="bottom-text">大厅</div>
			</div>
			<div class="bottom-box" @click="opennew('dingdan-shifu')">
				<img src="../../../static/ding_dan.png" />
				<div class="bottom-news">订单</div>
			</div>
			<div class="bottom-box" @click="opennew('wode-shifu')">
				<img src="../../../static/wode.png" />
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
				},
				navdata: [],
				city:'未知',
				orderdata:[]
			}
		},
		methods: {
			haveorder:function(id){
				var that = this
				$.ajax({
					type: 'post',
					url: that.myurl + '/company/orderReceiving',
					data:{
						msdOrderId:id
					},
					success: function(res) {
						if(res.status == 200) {
							that.myajax()
						} else {
							alert(res.msg)
						}
					},
					error: function(res) {
						alert('网络连接失败，请检查网络后再试！')
					}
				})
			},
			cancel:function(id){
				var that = this
				$.ajax({
					type: 'post',
					url: that.myurl + '/company/removeOrder',
					data:{
						msdOrderId:id,
						userId:localStorage.getItem('msdCompanyId'),
						type:2
					},
					success: function(res) {
						if(res.status == 200) {
							that.myajax()
						} else {
							alert(res.msg)
						}
					},
					error: function(res) {
						alert('网络连接失败，请检查网络后再试！')
					}
				})
			},
			opennew: function(target,id) {
				this.$store.state.navindex0=-1
				this.$store.state.msdOrderId=id
				if(localStorage.getItem('msdCompanyId') == undefined) {
					this.$router.push({
						name: 'denglu-shifu'
					})
				} else {
					this.$router.push({
						name: target
					})
				}
			},
			myajax: function() {
				function plusReady() {
					plus.geolocation.getCurrentPosition(function(p) {
						that.city = p.address.city
					}, function(e) {
						plus.nativeUI.confirm("请检查手机网络或者位置服务开关是否打开后", function(e) {
							if(e.index == 0) {
								if(mui.os.ios) {
									plus.runtime.launchApplication({
										action: 'app-settings:'
									}, function(e) {}); //WIFI
								} else {
									var main = plus.android.runtimeMainActivity(); //获取activity
									var Intent = plus.android.importClass('android.content.Intent');
									var Settings = plus.android.importClass('android.provider.Settings');
									var intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS); //可设置表中所有Action字段
									main.startActivity(intent);
									plusReady()
								}
							} else {
								plusReady()
							}
						}, {
							"title": "定位失败",
							"buttons": ["点我设置", "点击重试"],
							"verticalAlign": "bottom"
						});
					});
				}
				if(window.plus) {
					plusReady();
				} else {
					document.addEventListener("plusready", plusReady, false);
				}
				//				获取轮播图
				var that = this
				$.ajax({
					type: 'post',
					url: that.myurl + '/user/selectMsdBanner',
					success: function(res) {
						if(res.status == 200) {
							that.navdata = res.data
						} else {
							alert(res.msg)
						}
					},
					error: function(res) {
						alert('网络连接失败，请检查网络后再试！')
					}
				})
//				获取未接订单
				var that = this
				$.ajax({
					type: 'post',
					url: that.myurl + '/company/queryUnreceivedOrder',
					data:{
						msdCompanyId:localStorage.getItem('msdCompanyId')
					},
					success: function(res) {
						if(res.status == 200) {
							that.orderdata = res.data
						} else {
							alert(res.msg)
						}
					},
					error: function(res) {
						alert('网络连接失败，请检查网络后再试！')
					}
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
			},
			msdOrderId() {
				return this.$store.state.msdOrderId
			},
			navindex0() {
				return this.$store.state.navindex0
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
		white-space: nowrap;
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