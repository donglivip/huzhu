<template>
	<div class="wrapper">
		<div class="header">
			<div class="header-cebian">
				<div class="cebian-text">{{city}}</div>
			</div>
			<div class="header-content">
				<img src="../../static/dingwei1.png" />
				<div class="header-text">{{city + district}}</div>
			</div>
			<div class="header-cebian" @click="opennew02('shouye-shifu')">
				<div class="cebian-news">切换身份</div>
			</div>
		</div>
		<div class="main">
			<div class="main-one">
				<swiper :options="swiperOption" ref="mySwiper">
					<swiper-slide>
						<iframe frameborder="0" src="https://v.qq.com/txp/iframe/player.html?vid=y0859zpekao" allowFullScreen="true" style="width: 100%;"></iframe>
					</swiper-slide>
					<!-- 这部分放你要渲染的那些内容 -->
					<swiper-slide v-for='val in imgdata' v-if='val.msdBaIsDelete==2'>
						<img :src="val.msdBaImg | myimg" />
					</swiper-slide>
					<!-- 这是轮播的小圆点 -->
					<div class="swiper-pagination" slot="pagination"></div>
				</swiper>
			</div>
			<div class="main-two">
				<div class="two-box" v-for="(val,index) in tabdata" v-if="index<7" @click="opennew('xuanzefadan',val.msdServiceStyleId,val.msdSsName)">
					
					<img :src="val.msdSsImg | myimg" />
					<div class="two-text">{{val.msdSsName}}</div>
				</div>
				<div class="two-box" @click="opennew('fenlei','','')">
					<img src="../../static/gengduo.png" />
					<div class="two-text">更多分类</div>
				</div>
			</div>
			<div class="main-three" @click="opennew('xinwen','')">
				<div class="three-lift">
					<img src="../../static/new.png" />
				</div>
				<div class="three-content">
					<swiper :options="swiperOption02" ref="mySwiper02">
						<swiper-slide v-for='(item,index) in newdata.length'>
							<ul v-for="(val,index1) in newdata" v-if="index1<index+2&&index1>=index">
								<li>{{val.msdNeTitle}}</li>
							</ul>
						</swiper-slide>
					</swiper>
				</div>
				<div class="three-right">
					<img src="../../static/you-hui.png" />
				</div>
			</div>
			<div class="main-four">推荐服务</div>

			<div class="main-five" @click="opennew('baoxianyewu','')">
				<div class="five-lift">
					<img src="../../static/baoxian.png" />
				</div>
				<div class="five-right">
					<div class="five-text">保险业务</div>
					<div class="five-news">去查看</div>
				</div>
			</div>
			<div class="main-five" @click="opennew('waimai','')">
				<div class="five-lift">
					<img src="../../static/yanglao.png" />
				</div>
				<div class="five-right">
					<div class="five-text">养老服务</div>
					<div class="five-news">去查看</div>
				</div>
			</div>
			<div class="main-five" onclick="alert('正在开发中')">
				<div class="five-lift">
					<img src="../../static/canyin.png" />
				</div>
				<div class="five-right">
					<div class="five-text">餐饮业务</div>
					<div class="five-news">去查看</div>
				</div>
			</div>
			<div class="main-four">合作伙伴</div>
			<div class="main-six">
				<div @click="heshow(val.msdCpUrl)" v-for="val in frienddata">
					<img :src="val.msdCpImg | myimg" />
				</div>
			</div>
		</div>
		<div class="bottom">
			<div class="bottom-box">
				<img src="../../static/dating.png" />
				<div class="bottom-text">大厅</div>
			</div>
			<div class="bottom-box" @click="opennew('wodedingdan')">
				<img src="../../static/ding_dan.png" />
				<div class="bottom-news">订单</div>
			</div>
			<div class="bottom-box" @click="opennew('wode-yonghu')">
				<img src="../../static/wode.png" />
				<div class="bottom-news">我的</div>
			</div>
		</div>
		<div class="myifr" v-if="adverboo">
			<img src="../../static/youjian.png" @click="heboo"/>
			<iframe :src="isrc"  class="myhe"></iframe>
		</div>
	</div>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default {
		name: 'shouye-yonghu',
		data() {
			return {
				isrc:'',
				adverboo:false,
				swiperOption02:{
					autoplay: {
						stopOnLastSlide: true
					},
					loop:true,
					direction:'vertical'
				},
				swiperOption: {
					autoplay: {
						stopOnLastSlide: true
					},
					pagination: {
						el: '.swiper-pagination'
					},
					loop:true
				},
				newdata: [],
				tabdata: [],
				imgdata: [],
				district: '',
				city: '获取中',
				frienddata: []
			}
		},
		methods: {
			heboo:function(){
				this.adverboo=!this.adverboo
			},
			heshow:function(url){
				this.isrc=url
				this.heboo()
			},
			myajax: function() {
				function plusReady() {
					plus.geolocation.getCurrentPosition(function(p) {
						that.city = p.address.city
						that.district = p.address.district
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
				var that = this
				//				获取轮播图
				$.ajax({
					type: 'post',
					url: that.myurl + '/user/selectMsdBanner',
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
				//				获取推荐新闻
				$.ajax({
					type: 'post',
					url: that.myurl + '/user/selectNews',
					success: function(res) {
						if(res.status == 200) {
							that.newdata = res.data
						} else {
							alert(res.msg)
						}
					},
					error: function(res) {
						alert('网络连接失败，请检查网络后再试！')
					}
				})
				//				获取服务类型分类
				$.ajax({
					type: 'post',
					url: that.myurl + '/user/selectMsdServiceStyle',
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
				//				获取合作伙伴
				$.ajax({
					type: 'post',
					url: that.myurl + '/user/selectMsdCooperativePartner',
					success: function(res) {
						if(res.status == 200) {
							that.frienddata = res.data
						} else {
							alert(res.msg)
						}
					},
					error: function(res) {
						alert('网络连接失败，请检查网络后再试！')
					}
				})
			},
			opennew02: function(target) {
				this.$router.push({
					name: target
				})
			},
			opennew: function(target, id, name) {
				if(localStorage.getItem('userid') == 'null' || localStorage.getItem('userid') == undefined) {
					this.$router.replace({
						name: 'denglu'
					})
				} else {
					this.$store.state.MsdServiceStylename = name
					this.$store.state.MsdServiceStyleId = id
					this.$router.push({
						name: target
					})
				}
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
			mySwiper02() {
				return this.$refs.mySwiper02.swiper;
			},
			myurl() {
				return this.$store.state.myurl
			},
			MsdServiceStylename() {
				return this.$store.state.MsdServiceStylename
			}
		}
	}
</script>

<style scoped>
	* {
		margin: 0;
		padding: 0;
	}
	.myifr{
		position: fixed;top: 0;left: 0;width: 100%;height: 100%;background: rgba(0,0,0,.5);
		display: flex;align-items: center;justify-content: center;
	}
	.myifr iframe{background: #FFFFFF;border-radius: .1rem;width: calc(100% - .4rem);height: calc(100% - .4rem);overflow-y: scroll;z-index: 9999;}
	.myifr img{position: absolute;top: .3rem;left: .3rem;height: .5rem;z-index: 99999;}
	html,
	body,
	.wrapper {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	video{width: calc(100% - .6rem);margin: 0 .3rem .6rem .3rem;border-radius: .08rem;}
	.three-content {
		width: 5rem;
	}
	.three-content .swiper-container{
		height: 1.2rem!important;
	}
	.wrapper {
		background: #FFFFFF;
	}
	ul{
		margin-top: .2rem;
	}
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: .96rem;
		margin-bottom: .2rem;
		padding: 0 .34rem;
	}
	.swiper-container{height: 3rem;overflow: hidden;}
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
		flex-wrap: wrap;
	}
	
	.two-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 25%;
		margin: .2rem 0;
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
		box-shadow: 0 0 2px 2px ghostwhite;
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
		    height: .4rem;
    line-height: .4rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
		box-shadow: 0 0 2px 3px ghostwhite;
		margin: .4rem .2rem;
		border-radius: .1rem;
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
		width: 3.2rem;
		border-radius: .1rem;
		box-shadow: 0 0 1px 2px ghostwhite;
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