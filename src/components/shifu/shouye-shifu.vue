<template>
	<div class="wrapper">
		<!--头-->
		<div class="header">
			<div class="header-cebian">
				<div class="cebian-text">{{ city }}</div>
			</div>
			<div class="header-text">接单大厅</div>
			<div class="header-cebian" @click="opennew02('shouye-yonghu')"><div class="cebian-news">切换身份</div></div>
		</div>
		<!--中间主体-->
		<div class="main">
			<div class="main-one">
				<swiper :options="swiperOption" ref="mySwiper">
					<swiper-slide>
						<iframe frameborder="0" src="https://v.qq.com/txp/iframe/player.html?vid=y0859zpekao" allowFullScreen="true" style="width: 100%;"></iframe>
					</swiper-slide>
					<!-- 这部分放你要渲染的那些内容 -->
					<swiper-slide v-for="val in navdata"><img :src="val.msdBaImg | myimg" /></swiper-slide>
					<!-- 这是轮播的小圆点 -->
					<div class="swiper-pagination" slot="pagination"></div>
				</swiper>
			</div>
			<!-- 切换 -->
			<div class="nav">
				<div class="nav-tab" :class="navindex == 1 ? 'nav-active' : ''" @click="dian(1)">派单</div>
				<div class="nav-tab" :class="navindex == 0 ? 'nav-active' : ''" @click="dian(0)">抢单</div>
			</div>
			<!-- 派单 -->
			<div class="main-two" v-for="val in orderdata" @click="opennew('xiangqing-shifu', val.msdOrderId)" v-if="navindex == 1">
				<div class="two-box">
					<div class="two-left"><img :src="val.msdSsImg | myimg" /></div>
					<div class="two-right">
						<div class="two-text">类型：{{ val.msdSsName }}</div>
						<div class="two-text">时间：{{ val.msdOrIsAppointmentTime == 1 ? val.msdOrCreateTimeString : '立即上门' }}</div>
						<div class="two-text">地址：{{ val.msdAdProvince + val.msdAdCity + val.msdAdArea }}</div>
						<div class="two-zi">
							<div class="two-text">价格：</div>
							<div class="two-news">￥{{ val.msdOrPrice }}</div>
						</div>
						<div class="two-zi">
							<div class="two-text">备注：</div>
							<div class="two-news">{{ val.msdOrRemark }}</div>
						</div>
					</div>
				</div>
				<div class="two-hezi">
					<div class="two-word" @click.stop="cancel(val.msdOrderId)">取消订单</div>
					<div class="two-word" @click.stop="haveorder(val.msdOrderId)">接受订单</div>
				</div>
			</div>
			<!-- 抢单 -->
			<div class="main-two" v-for="val in qdata" @click="opennew('xiangqing-shifu', val.msdOrderId)" v-if="navindex == 0">
				<div class="two-box">
					<div class="two-left"><img :src="val.msdSsImg | myimg" /></div>
					<div class="two-right">
						<div class="two-text">类型：{{ val.msdSsName }}</div>
						<div class="two-text">时间：{{ val.msdOrIsAppointmentTime == 1 ? val.msdOrAppointmentTimeString : '立即上门' }}</div>
						<div class="two-text">地址：{{ val.msdAddress}}</div>
						<div class="two-zi">
							<div class="two-text">价格：</div>
							<div class="two-news">￥面议</div>
						</div>
						<div class="two-zi">
							<div class="two-text">备注：</div>
							<div class="two-news">{{ val.msdOrRemark }}</div>
						</div>
						<div class="two-zi" v-if="val.msdOrUpdateName!=''">
							<div class="two-text" style="white-space: nowrap;">提示:</div>
							<div class="two-news" @click.stop="opennew('qxiangqing-shifu',val.msdOrUpdateName)">此订单曾被师傅取消过，点击查看详情！</div>
						</div>
					</div>
				</div>
				
				<div class="two-hezi">
					<div class="two-word" @click.stop="haveorder02(val.msdOrderId)">接受订单</div>
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
		<div class="layui" v-if="baoboo">
			<div class="layui-inner">
				<p>接单之前必须购买{{ myprice.msdIrName }}</p>
				<p>{{ myprice.msdIrPrice }}元/年{{ myprice.msdIrName }}</p>
				<div class="btn-box">
					<div class="btn" @click="baocancel">取消购买</div>
					<div class="btn" @click="opennew('kaibaoxian')">确认购买</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
export default {
	name: 'index',
	data() {
		return {
			swiperOption: {
				autoplay: {
					stopOnLastSlide: true
				},
				pagination: {
					el: '.swiper-pagination'
				},
				loop: true
			},
			navdata: [],
			city: '未知',
			orderdata: [],
			baoboo: false,
			myprice: 0,
			navindex: 0,
			qdata:[]
		};
	},
	methods: {
		dian: function(id) {
			this.navindex = id;
		},
		baocancel: function() {
			this.baoboo = false;
		},
		haveorder02: function(id) {
			var that = this;
			$.ajax({
				type: 'post',
				url: that.myurl + '/company/orderReceivingQ',
				data: {
					msdOrderId: id,
					msdCompanyId:localStorage.getItem('msdCompanyId')
				},
				success: function(res) {
					if (res.status == 200) {
						that.myajax();
						plus.nativeUI.toast('接单成功');
					} else {
						alert(res.msg);
					}
				},
				error: function(res) {
					alert('网络连接失败，请检查网络后再试！');
				}
			});
		},
		haveorder: function(id) {
			var that = this;
			$.ajax({
				type: 'post',
				url: that.myurl + '/company/orderReceiving',
				data: {
					msdOrderId: id
				},
				success: function(res) {
					if (res.status == 200) {
						that.myajax();
						plus.nativeUI.toast('接单成功');
					} else {
						alert(res.msg);
					}
				},
				error: function(res) {
					alert('网络连接失败，请检查网络后再试！');
				}
			});
		},
		cancel: function(id) {
			var that = this;
			$.ajax({
				type: 'post',
				url: that.myurl + '/company/removeOrder',
				data: {
					msdOrderId: id,
					userId: localStorage.getItem('msdCompanyId'),
					type: 2
				},
				success: function(res) {
					if (res.status == 200) {
						that.myajax();
						plus.nativeUI.toast('取消成功');
					} else {
						alert(res.msg);
					}
				},
				error: function(res) {
					alert('网络连接失败，请检查网络后再试！');
				}
			});
		},
		opennew: function(target, id) {
			this.$store.state.navindex0 = -1;
			this.$store.state.msdOrderId = id;
			if (localStorage.getItem('msdCompanyId') == undefined) {
				this.$router.push({
					name: 'denglu-shifu'
				});
			} else {
				this.$router.push({
					name: target
				});
			}
		},
		opennew02: function(target) {
			this.$router.push({
				name: target
			});
		},
		myajax: function() {
			var that = this;

			// 查询派单
			$.ajax({
				type: 'post',
				url: that.myurl + '/company/queryUnreceivedOrder',
				data: {
					msdCompanyId: localStorage.getItem('msdCompanyId')
				},
				success: function(res) {
					if (res.status == 200) {
						that.orderdata = res.data;
					} else {
						alert(res.msg);
					}
				},
				error: function(res) {
					alert('网络连接失败，请检查网络后再试！');
				}
			});
			// 查询抢单
			$.ajax({
				type: 'post',
				url: that.myurl + '/company/querySingleOrder',
				success: function(res) {
					if (res.status == 200) {
						that.qdata = res.data;
					} else {
						alert(res.msg);
					}
				},
				error: function(res) {
					alert('网络连接失败，请检查网络后再试！');
				}
			});
			function plusReady() {
				plus.geolocation.getCurrentPosition(
					function(p) {
						that.city = p.address.city;
					},
					function(e) {
						plus.nativeUI.confirm(
							'请检查手机网络或者位置服务开关是否打开后',
							function(e) {
								if (e.index == 0) {
									if (mui.os.ios) {
										plus.runtime.launchApplication(
											{
												action: 'app-settings:'
											},
											function(e) {}
										); //WIFI
									} else {
										var main = plus.android.runtimeMainActivity(); //获取activity
										var Intent = plus.android.importClass('android.content.Intent');
										var Settings = plus.android.importClass('android.provider.Settings');
										var intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS); //可设置表中所有Action字段
										main.startActivity(intent);
										plusReady();
									}
								} else {
									plusReady();
								}
							},
							{
								title: '定位失败',
								buttons: ['点我设置', '点击重试'],
								verticalAlign: 'bottom'
							}
						);
					}
				);
			}
			if (window.plus) {
				plusReady();
			} else {
				document.addEventListener('plusready', plusReady, false);
			}
			//				获取轮播图

			$.ajax({
				type: 'post',
				url: that.myurl + '/user/selectMsdBanner',
				success: function(res) {
					if (res.status == 200) {
						that.navdata = res.data;
					} else {
						alert(res.msg);
					}
				},
				error: function(res) {
					alert('网络连接失败，请检查网络后再试！');
				}
			});
		}
	},
	mounted() {
		this.myajax();
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
			return this.$store.state.myurl;
		},
		msdOrderId() {
			return this.$store.state.msdOrderId;
		},
		navindex0() {
			return this.$store.state.navindex0;
		}
	}
};
</script>
<style scoped>
* {
	margin: 0;
	padding: 0;
}
.swiper-container {
	height: 3rem;
	overflow: hidden;
}
video {
	width: calc(100% - 0.6rem);
	margin: 0 0.3rem 0.6rem 0.3rem;
	border-radius: 0.08rem;
}
.nav {
	height: 0.9rem;
	display: flex;
	justify-content: space-around;
	background: #FFFFFF;
}
.nav-tab {
	height: 0.9rem;
	line-height: 0.9rem;
	box-sizing: border-box;
	padding: 0 0.3rem;
}
.nav-active {
	border-bottom: 2px solid #0da5fe;
}
.layui {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgba(0, 0, 0, 0.5);
}

.layui-inner {
	width: 6.5rem;
	height: 3rem;
	background: #0da5fe;
	color: #ffffff;
	border-radius: 0.1rem;
}

.layui-inner p {
	line-height: 1.1rem;
	text-align: center;
}

.btn-box {
	display: flex;
	border-top: 1px solid #ffffff;
}

.btn-box .btn {
	flex: 1;
	height: 1rem;
	text-align: center;
	line-height: 1rem;
}

.btn-box .btn:first-of-type {
	border-right: 1px solid #ffffff;
}

html,
body,
.wrapper {
	width: 100%;
	height: 100%;
	overflow: hidden;
}

.wrapper {
	background: #ffffff;
}

.header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 0.96rem;
	margin-bottom: 0.2rem;
	padding: 0 0.34rem;
}

.header-cebian {
	width: 1.2rem;
	display: flex;
	align-items: center;
	justify-content: flex-start;
}

.header-cebian img {
	height: 0.3rem;
	margin-left: 0.12rem;
}

.cebian-text {
	font-size: 0.28rem;
	color: #26261e;
	white-space: nowrap;
}

.header-text {
	font-size: 0.32rem;
	color: #26261e;
}

.cebian-news {
	font-size: 0.28rem;
	color: #5380b1;
}

.main {
	height: calc(100% - 2.2rem);
	overflow-x: hidden;
	overflow-y: scroll;
	background: ghostwhite;
}

.main-one img {
	margin: 0.2rem 0.3rem 0.7rem 0.3rem;
	border-radius: 0.08rem;
	height: 2.8rem;
	width: 6.6rem;
}

.two-box {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0 0.32rem;
	margin-bottom: 0.2rem;
}

.two-left img {
	height: 2rem;
	width: 2rem;
}
.main-two{
	margin-bottom: .2rem;
	background: #FFFFFF;
	padding: .2rem 0;
}
.two-right {
	margin-left: 0.4rem;
	flex: 1;
}

.two-text {
	font-size: 0.24rem;
	color: #333333;
	margin-bottom: 0.2rem;
}

.two-zi {
	display: flex;
	justify-content: flex-start;
}

.two-news {
	font-size: 0.24rem;
	color: #e24b2d;
	margin-bottom: 0.2rem;
}

.two-hezi {
	display: flex;
	align-items: center;
	justify-content: space-around;
}

.two-word {
	font-size: 0.28rem;
	color: #ffffff;
	background: #0da5fe;
	width: 3rem;
	height: 0.66rem;
	text-align: center;
	line-height: 0.66rem;
	border-radius: 0.08rem;
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
	height: 0.44rem;
	margin-bottom: 0.04rem;
}

.bottom-text {
	font-size: 0.2rem;
	color: #0da5fe;
}

.bottom-news {
	font-size: 0.2rem;
	color: #cccccc;
}
</style>
