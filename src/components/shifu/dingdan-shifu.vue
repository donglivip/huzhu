<template>
	<div class="wrapper">
		<div class="header">
			<div class="header-cebian"></div>
			<div class="header-text">我的订单</div>
			<div class="header-cebian" @click="opennew('daiquxiao-shifu')">待取消订单</div>
		</div>
		<div class="main">
			<div class="main-one">
				<div class="one-text" @click="change(0)" :class="navindex==0?'one-news':''">未完成</div>
				<div class="one-text" @click="change(1)" :class="navindex==1?'one-news':''">已完成</div>
				<div class="one-text" @click="change(2)" :class="navindex==2?'one-news':''">已取消</div>
			</div>
			<div class="main-inner">
				<div class="main-two" v-for="val in tabdata" @click="opennew('xiangqing-shifu',val.msdOrderId)">
					<div class="two-box">
						<div class="two-left">
							<img :src="val.msdSsImg | myimg" />
						</div>
						<div class="two-right">
							<div class="two-text">类型：{{val.msdSsName}}</div>
							<div class="two-text">上门时间：{{val.msdOrIsAppointmentTime==1?val.msdOrAppointmentTimeString:'立即上门'}}</div>
							<div class="two-text">订单地址：{{val.msdAddress}}</div>
							<div class="two-zi">
								<div class="two-text">价格：</div>
								<div class="two-news">￥{{val.msdOrPrice==null?'价格面议':val.msdOrPrice}}</div>
							</div>
						</div>
					</div>
					<div class="main-five">
						<div class="five-text" v-if="navindex==0" @click.stop="gomap(val.msdAddress)">导航过去</div>
						<div class="five-text" v-if="navindex!=0" @click.stop="deleteorder(val.msdOrderId)">删除记录</div>
						<div class="five-text" v-if="navindex==0" @click.stop="opennew('cancel-shifu',val.msdOrderId)">取消订单</div>
						<a class="five-news" :href="'tel:'+val.msdAdPhone+''" v-if="navindex==0">拨打电话</a>
						<div class="kongbai"></div>
						<div class="five-word" v-if='navindex==0' @click.stop="orderprice(val.msdOrderId)">订单价格</div>
						<!-- <div class="five-word" v-if='navindex==0&&val.msdOrType==1' @click.stop="orderok(val.msdOrderId)">完成订单</div> -->
					</div>
				</div>
				<img src="../../../static/noorder.png" v-if="tabdata.length==0" class="nodata" style="margin: .8rem auto;"/>
			</div>
		</div>
		<div class="bottom">
			<div class="bottom-box" @click="opennew('shouye-shifu')">
				<img src="../../../static/da.png" />
				<div class="bottom-news">大厅</div>
			</div>
			<div class="bottom-box">
				<img src="../../../static/dingdan.png" />
				<div class="bottom-text">订单</div>
			</div>
			<div class="bottom-box" @click="opennew('wode-shifu')">
				<img src="../../../static/wode.png" />
				<div class="bottom-news">我的</div>
			</div>
		</div>
	</div>
</template>

<script>
	import AMap from 'AMap'
	export default {
		name: 'dingdan-shifu',
		data() {
			return {
				tabdata: [],
				navindex: 0
			}
		},
		methods: {
			orderprice:function(id){
				var that=this
				var value=prompt('请输入订单价格。')
				if(value<=0){
					alert('订单价格错误')
					return false
				}
				$.ajax({
					type: 'post',
					url: that.myurl + '/company/updateOrderPriceCompany',
					data: {
						msdOrderId: id,
						msdOrUpdateName:localStorage.getItem('msdCompanyId'),
						msdOrPrice:value
					},
					success: function(res) {
						if(res.status == 200) {
							plus.nativeUI.toast('价格已送达')
							that.myajax(that.navindex)
						} else {
							alert(res.msg)
						}
					},
					error: function(res) {
						alert('网络连接失败，请检查网络后再试！')
					}
				})
			},
			gomap: function(adress) {
				AMap.service('AMap.Geocoder', function() { //回调函数
					//			实例化Geocoder
					var geocoder = new AMap.Geocoder({
						city: "全国" //城市，默认：“全国”
					});
					//						根据地址查经纬度
					geocoder.getLocation(adress, function(status, result) {
						if(status === 'complete' && result.info === 'OK') {
							plus.geolocation.getCurrentPosition(function(p) {
								plus.maps.openSysMap(new plus.maps.Point(result.geocodes[0].location.lng,result.geocodes[0].location.lat), adress, new plus.maps.Point(p.coords.longitude, p.coords.latitude));
							});
						} else {
							//获取经纬度失败
						}
					});
				})

			},
			deleteorder: function(id) {
				var that = this
				$.ajax({
					type: 'post',
					url: that.myurl + '/company/deleteOrder',
					data: {
						msdOrderId: id
					},
					success: function(res) {
						if(res.status == 200) {
							that.myajax(that.navindex)
						} else {
							alert(res.msg)
						}
					},
					error: function(res) {
						alert('网络连接失败，请检查网络后再试！')
					}
				})
			},
			orderok: function(id) {
				var that = this
				var code = prompt('请输入完成码！')
				if(code == '' || code == null) {
					alert('完成码不能为空')
					return false;
				}
				$.ajax({
					type: 'post',
					url: that.myurl + '/company/completeOrder',
					data: {
						msdOrderId: id,
						userId: localStorage.getItem('msdCompanyId'),
						type: 2,
						msdOrCompletionCode: code
					},
					success: function(res) {
						if(res.status == 200) {
							that.myajax(that.navindex)
						} else {
							alert(res.msg)
						}
					},
					error: function(res) {
						alert('网络连接失败，请检查网络后再试！')
					}
				})
			},
			change: function(index) {
				this.navindex = index
				this.myajax()
			},
			myajax: function() {
				var that = this
				var murl = ''
				if(this.navindex == 0) {
					murl = 'queryMyUnfinishedOrder'
				} else if(this.navindex == 1) {
					murl = 'queryMyCompletedOrder'
				} else {
					murl = 'queryMycanceledOrder'
				}
				//				获取未完成订单列表
				$.ajax({
					type: 'post',
					url: that.myurl + '/company/' + murl + '',
					data: {
						msdCompanyId: localStorage.getItem('msdCompanyId'),
						status:2
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
				this.$store.state.msdOrderId=id
				this.$store.state.navindex0=this.navindex
				this.$router.push({
					name: target
				})
			}
		},
		mounted() {
			this.myajax(0)
		},
		computed: {
			myurl() {
				return this.$store.state.myurl
			},
			msdOrderId() {
				return this.$store.state.msdOrderId
			},
			navindex0() {
				return this.$store.state.navindex0
			}
		}
	}
</script>

<style scoped>
	* {
		margin: 0;
		padding: 0;
	}
	
	.main-inner {
		height: calc(100% - .9rem);
		overflow-y: scroll;
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
		padding: 0 .3rem;
	}
	
	.header-text {
		font-size: .32rem;
		color: #272727;
	}
	.header-cebian{
		font-size: .3rem;
		color: #272727;
		width: 1.6rem;
	}
	.main {
		height: calc(100% - 2.2rem);
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