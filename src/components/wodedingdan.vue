<template>
	<div class="wrapper">
		<div class="header">
			<div class="header-cebian"></div>
			<div class="header-text">我的订单</div>
			<div class="header-cebian"></div>
		</div>
		<div class="main">
			<div class="main-one">
				<div class="one-text" :class="navindex==2?'one-news':''" @click="changenum(2)">待接单</div>
				<div class="one-text" :class="navindex==3?'one-news':''" @click="changenum(3)">待完成</div>
				<div class="one-text" :class="navindex==4?'one-news':''" @click="changenum(4)">待评价</div>
				<div class="one-text" :class="navindex==1?'one-news':''" @click="changenum(1)">已完成</div>
				<div class="one-text" :class="navindex==6?'one-news':''" @click="changenum(6)">已取消</div>
			</div>
			<div class="main-two">
				<div class="main-tab" v-for="val in tabdata" @click="opennew('xiangqing-yonghu',val.msdOrderId)">
					<div class="two-box">
						<div class="two-text">{{val.msdOrIsDelete==1?'服务类':'餐饮'}}</div>
						<div class="two-news">下单时间：{{val.msdOrCreateTimeString}}</div>
					</div>
					<div class="two-top">类型：{{val.msdServiceStyleId}}</div>
					<div class="two-content">
						<div class="content-text">价格：</div>
						<div class="content-news">￥{{val.msdOrPrice}}</div>
					</div>
					<div class="two-bottom">订单编号：{{val.msdOrderId}}</div>
					<div class="two-hezi">
						<div class="hezi-text" v-show="navindex==2" @click.stop="cancel(val)">取消订单</div>
						<div class="hezi-text" v-show="navindex==1||navindex==6" @click.stop="godelete(val)">删除</div>
						<div class="hezi-word"></div>
						<div class="hezi-news" v-show="navindex==3" @click.stop="tel(val.msdOrderId,val.msdOrIsDelete)">联系公司</div>
						<!--<div class="hezi-news" v-show="navindex==3" @click="orderok(val.msdOrderId)">完成订单</div>-->
						<div class="hezi-news" v-show="navindex==4" @click.stop="ratingchange(val.msdOrderId)">立即评价</div>
						<div class="hezi-news" v-show="navindex==1||navindex==6" @click.stop="opennew('shouye-yonghu')">再次下单</div>
					</div>
				</div>
			</div>
		</div>
		<div class="layui" v-if='ratingboo'>
			<div class="layui-inner">
				<div class="star-box">
					<img src="../../static/xing.png" v-for="(val,index) in starindex" @click.stop="changestar(index,0)" />
					<img src="../../static/xingx.png" v-for="(val,index) in (5 - starindex)" @click.stop="changestar(index,1)" />
				</div>
				<textarea placeholder="请输入您的评价内容" v-model="ptext"></textarea>
				<div class="submit" @click.stop="gosubmit()">
					提交评价
				</div>

			</div>
		</div>
		<div class="bottom">
			<div class="bottom-box" @click="opennew('shouye-yonghu')">
				<img src="../../static/da.png" />
				<div class="bottom-news">大厅</div>
			</div>
			<div class="bottom-box">
				<img src="../../static/dingdan.png" />
				<div class="bottom-text">订单</div>
			</div>
			<div class="bottom-box" @click="opennew('wode-yonghu')">
				<img src="../../static/wode.png" />
				<div class="bottom-news">我的</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'wodedingdan',
		data() {
			return {
				tabdata: [],
				navindex: 2,
				ratingboo: false,
				starindex: 4,
				msdOrderId: '',
				ptext: ''
			}
		},
		methods: {
			godelete:function(val){
//				删除订单
				var that = this
				if(val.msdOrIsDelete == 1) {
					//					服务类
					$.ajax({
						type: 'post',
						url: that.myurl + '/company/deleteOrder',
						data: {
							msdOrderId: val.msdOrderId
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
				} else {
					//					餐饮类
					$.ajax({
						type: 'post',
						url: that.myurl + '/company/deleteOrder',
						data: {
							deleteFoodOrder: val.msdOrderId,
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
				}
			},
			cancel: function(val) {
				//				取消订单
				var that = this
				if(val.msdOrIsDelete == 1) {
					//					服务类
					$.ajax({
						type: 'post',
						url: that.myurl + '/company/removeOrder',
						data: {
							msdOrderId: val.msdOrderId,
							type: 1,
							userId: localStorage.getItem('userid')
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
				} else {
					//					餐饮类
					$.ajax({
						type: 'post',
						url: that.myurl + '/company/removeFoodOrder',
						data: {
							msdFoodOrderId: val.msdOrderId,
							type: 1,
							userId: localStorage.getItem('userid')
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
				}
			},
			gosubmit: function() {
				//				评价订单
				var that = this
				$.ajax({
					type: 'post',
					url: that.myurl + '/user/insertMsdOrderEvaluate',
					data: {
						msdOrderId: that.msdOrderId,
						msdOeStatus: that.starindex,
						msdOeResult: that.ptext,
						msdOeCreateName: localStorage.getItem('userid')
					},
					success: function(res) {
						if(res.status == 200) {
							that.ratingchange('')
							that.changenum(that.navindex)
						} else {
							alert(res.msg)
						}
					},
					error: function(res) {
						alert('网络连接失败，请检查网络后再试！')
					}
				})
			},
			ratingchange: function(id) {
				this.msdOrderId = id
				this.ratingboo = !this.ratingboo
			},
			changestar: function(index, type) {
				if(type == 0) {
					this.starindex = index + 1
				} else {
					this.starindex = this.starindex + index + 1
				}
			},
			tel: function(id, type) {
				//				练习公司
				var that = this
				$.ajax({
					type: 'post',
					url: that.myurl + '/user/selectCompanyPhone',
					data: {
						orderId: id,
						state: type
					},
					success: function(res) {
						if(res.status == 200) {
							window.location.href = 'tel://' + res.data;
						} else {
							alert(res.msg)
						}
					},
					error: function(res) {
						alert('网络连接失败，请检查网络后再试！')
					}
				})
			},
			changenum: function(id) {
				this.navindex = id
				this.myajax()
			},
			myajax: function() {
				var that = this
				//				获取订单列表
				if(that.navindex == 4) {
					$.ajax({
						type: 'post',
						url: that.myurl + '/user/selectUserOrderEvaluate',
						data: {
							msdUserId: localStorage.getItem('userid')
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
				} else {
					$.ajax({
						type: 'post',
						url: that.myurl + '/user/selectUserOrder',
						data: {
							msdUserId: localStorage.getItem('userid'),
							state: that.navindex
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
				}
			},
			back: function() {
				this.$router.back()
			},
			opennew: function(target, id) {
				this.$store.state.msdOrderId = id
				this.$router.push({
					name: target
				})
			}
		},
		mounted() {
			this.changenum(2)
		},
		computed: {
			myurl() {
				return this.$store.state.myurl
			},
			msdOrderId() {
				return this.$store.state.msdOrderId
			}
		}
	}
</script>

<style scoped>
	.star-box {
		display: flex;
		margin: .4rem auto .2rem;
	}
	
	.star-box img {
		height: .5rem;
		margin: .1rem;
	}
	
	textarea {
		border: 1px solid ghostwhite;
		border-radius: .1rem;
		padding: .2rem;
		box-sizing: border-box;
		height: 2rem;
		width: 4rem;
	}
	
	* {
		padding: 0;
		margin: 0;
	}
	
	.submit {
		background: #0DA5FE;
		color: #FFFFFF;
		width: 4rem;
		height: .8rem;
		border-radius: .1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: .4rem auto .2rem;
	}
	
	.layui {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, .5);
	}
	
	.layui-inner {
		background: #FFFFFF;
		border-radius: .1rem;
		width: 5rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
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
		height: .96rem;
		background: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: .2rem;
		padding: 0 .3rem;
	}
	
	.header-cebian {
		width: .3rem;
	}
	
	.header-text {
		font-size: .34rem;
		color: #26261E;
	}
	
	.main {
		height: calc(100% - 2.2rem);
		overflow-x: hidden;
		overflow-y: scroll;
	}
	
	.main-one {
		background: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: space-around;
		height: .8rem;
	}
	
	.one-text {
		font-size: .28rem;
		color: #272727;
	}
	
	.one-news {
		font-size: .28rem;
		color: #0DA5FE;
		border-bottom: 2px solid #0DA5FE;
		text-align: center;
		line-height: .8rem;
	}
	
	.main-two {
		height: calc(100% - .8rem);
		background: #FFFFFF;
		padding: 0 .3rem;
		overflow-y: scroll;
	}
	
	.two-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 1.2rem;
	}
	
	.two-text {
		font-size: .28rem;
		color: #333333;
	}
	
	.two-news {
		font-size: .24rem;
		color: #333333;
	}
	
	.two-top {
		font-size: .28rem;
		color: #333333;
		height: .26rem;
		margin-bottom: .3rem;
	}
	
	.two-content {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin-bottom: .2rem;
	}
	
	.content-text {
		font-size: .28rem;
		color: #333333;
	}
	
	.content-news {
		font-size: .28rem;
		color: #E24B2D;
	}
	
	.two-bottom {
		font-size: .28rem;
		color: #333333;
	}
	
	.two-hezi {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		background: #FFFFFF;
		height: 1.3rem;
		padding: 0 .3rem;
	}
	
	.hezi-text {
		font-size: .24rem;
		color: #FFFFFF;
		background: #CACACA;
		width: 1.6rem;
		height: .6rem;
		text-align: center;
		line-height: .6rem;
	}
	
	.hezi-word {
		flex: 1;
	}
	
	.hezi-news {
		font-size: .24rem;
		color: #FFFFFF;
		background: #0DA5FE;
		width: 1.6rem;
		height: .6rem;
		text-align: center;
		line-height: .6rem;
		margin-left: .2rem;
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