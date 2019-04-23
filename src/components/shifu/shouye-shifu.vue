<template>
	<div class="wrapper">
		<!--头-->
		<div class="header">
			<div class="header-cebian">
				<div class="cebian-text">{{city}}</div>
			</div>
			<div class="header-text">接单大厅</div>
			<div class="header-cebian" @click="opennew02('shouye-yonghu')">
				<div class="cebian-news">切换身份</div>
			</div>
		</div>
		<!--中间主体-->
		<div class="main">
			<div class="main-one">
				<swiper :options="swiperOption" ref="mySwiper">
					<swiper-slide>
						<video autoplay="autoplay" loop='loop' src="https://apd-eddfbbc67cb23e618b41d19c851c4e89.v.smtcdns.com/vhot2.qqvideo.tc.qq.com/Al0ay33RskXoMKqM5PfASxq1DsibmVkFYsJJrTN87OhQ/uwMROfz0r5xhYaQXGdGnC2dfhznjchitCIjwvL1uQ4capm9n/y0859zpekao.m701.mp4?sdtfrom=v3010&guid=7a44a9177ce163d625a93b996b66ee81&vkey=08402BB71D62F33B5D8E2463DE51DC95577BFC40AC32373FC951B1ABFBA2F5895AE0E1EC124A3E3E21FCE82A18A6FDFBCBBC406DCF5172FBACA7CE6203273729322587B2BF6893258105AB97A23A0351675066FA8D9C8802414E7360EF421401A84EFC8D66CB31F4B6953E4EA63FBE48DB89802470AE2114&platform=2" >
						</video>
					</swiper-slide>
					<!-- 这部分放你要渲染的那些内容 -->
					<swiper-slide v-for='val in navdata'>
						<img :src="val.msdBaImg | myimg" />
					</swiper-slide>
					<!-- 这是轮播的小圆点 -->
					<div class="swiper-pagination" slot="pagination"></div>
				</swiper>
			</div>
			<div class="main-two" v-for="val in orderdata" @click="opennew('xiangqing-shifu',val.msdOrderId)">
				<div class="two-box">
					<div class="two-left">
						<img :src="val.msdSsImg | myimg" />
					</div>
					<div class="two-right">
						<div class="two-text">类型：{{val.msdSsName}}</div>
						<div class="two-text">上门时间：{{val.msdOrIsAppointmentTime==1?val.msdOrAppointmentTime:'立即上门'}}</div>
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
			<img src="../../../static/noorder.png" v-if="orderdata.length==0" class="nodata" style="margin: .8rem auto;" />
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
		<div class="layui" v-if="baoboo">
			<div class="layui-inner">
				<p>接单之前必须购买{{myprice.msdIrName}}</p>
				<p>{{myprice.msdIrPrice}}元/年{{myprice.msdIrName}}</p>
				<div class="btn-box">
					<div class="btn" @click="baocancel">取消购买</div>
					<div class="btn" @click="opennew('kaibaoxian')">确认购买</div>
				</div>
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
					pagination: {
						el: '.swiper-pagination'
					}
				},
				navdata: [],
				city: '未知',
				orderdata: [],
				baoboo: false,
				myprice: 0
			}
		},
		methods: {
			baocancel: function() {
				this.baoboo = false
			},
			haveorder: function(id) {
				var that = this
				$.ajax({
					type: 'post',
					url: that.myurl + '/company/orderReceiving',
					data: {
						msdOrderId: id
					},
					success: function(res) {
						if(res.status == 200) {
							that.myajax()
							plus.nativeUI.toast('接单成功')
						} else {
							alert(res.msg)
						}
					},
					error: function(res) {
						alert('网络连接失败，请检查网络后再试！')
					}
				})
			},
			cancel: function(id) {
				var that = this
				$.ajax({
					type: 'post',
					url: that.myurl + '/company/removeOrder',
					data: {
						msdOrderId: id,
						userId: localStorage.getItem('msdCompanyId'),
						type: 2
					},
					success: function(res) {
						if(res.status == 200) {
							that.myajax()
							plus.nativeUI.toast('取消成功')
						} else {
							alert(res.msg)
						}
					},
					error: function(res) {
						alert('网络连接失败，请检查网络后再试！')
					}
				})
			},
			opennew: function(target, id) {
				this.$store.state.navindex0 = -1
				this.$store.state.msdOrderId = id
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
			opennew02: function(target) {
				this.$router.push({
					name: target
				})
			},
			myajax: function() {
				var that = this
				if(localStorage.getItem('msdCoIsConsume') == 2) {
					$.ajax({
						type: 'post',
						url: that.myurl + '/company/companLogin',
						data: {
							phone: localStorage.getItem('msdCoPhone'),
							pwd: localStorage.getItem('shifumima')
						},
						success: function(res) {
							if(res.status == 200) {
								if(res.data.msdCoIsIdentity == 1) {
									localStorage.setItem('msdCoIsIdentity', 1)
								}
								if(res.data.msdCoIsConsume == 2) {
									$.ajax({
										type: 'post',
										url: that.myurl + '/company/queryMsdInsuranceRule',
										success: function(res) {
											if(res.status == 200) {
												that.myprice = res.data
												that.baoboo = true
												return
											}
										},
										error: function(res) {
											alert('网络连接失败，请检查网络后再试！')
										}
									})
									return false;
								} else {
									localStorage.setItem('msdCoIsConsume', 1)
									$.ajax({
										type: 'post',
										url: that.myurl + '/company/queryUnreceivedOrder',
										data: {
											msdCompanyId: localStorage.getItem('msdCompanyId')
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
							}
						},
						error: function(res) {
							alert('网络连接失败，请检查网络后再试！')
						}
					})

				}

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
	.swiper-container{height: 3rem;overflow: hidden;}
	video{width: calc(100% - .6rem);margin: 0 .3rem .6rem .3rem;border-radius: .08rem;}
	.layui {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(0, 0, 0, .5);
	}
	
	.layui-inner {
		width: 6.5rem;
		height: 3rem;
		background: #0DA5FE;
		color: #FFFFFF;
		border-radius: .1rem;
	}
	
	.layui-inner p {
		line-height: 1.1rem;
		text-align: center;
	}
	
	.btn-box {
		display: flex;
		border-top: 1px solid #FFFFFF;
	}
	
	.btn-box .btn {
		flex: 1;
		height: 1rem;
		text-align: center;
		line-height: 1rem;
	}
	
	.btn-box .btn:first-of-type {
		border-right: 1px solid #FFFFFF;
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
		font-size: .28rem;
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
		margin-bottom: .2rem;
	}
	
	.two-zi {
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}
	
	.two-news {
		font-size: .24rem;
		color: #E24B2D;
		margin-bottom: .2rem;
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