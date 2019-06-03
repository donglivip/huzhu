<template>
	<div class="wrapper">
		<div class="header">
			<div class="header-cebian" @click="back()">
				<img src="../../static/youjian.png" />
			</div>
			<div class="header-text">订单详情</div>
			<div class="header-cebian"></div>
		</div>
		<div class="main">
			<div class="main-one">
				<div class="one-box">
					<div class="one-text">订单地址：</div>
					<div class="one-text">{{tabdata.msdAddress}}</div>
				</div>
				<div class="one-hezi">
					<div class="one-text">联系人：{{tabdata.msdAdName}}</div>
					<div class="one-text">{{tabdata.msdPhone}}</div>
				</div>
			</div>
			<div class="main-box">
				<div class="box-top">
					<div class="box-text">订单编号:{{msdOrderId}}</div>
				</div>
				<div class="box-box">
					<div class="box-left">
						<img :src="tabdata.msdFrHeadImg | myimg" />
					</div>
					<div class="box-content">
						<div class="box-above">{{tabdata.msdFrName}}</div>
						<div class="box-below">
							<div class="below-text">价格：</div>
							<div class="below-box">
								￥{{tabdata.msdFrPrice}}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="main-three">
				<div class="three-text">备注：</div>
				<input type="text" v-model="tabdata.msdFoRemark" readonly="readonly" />
			</div>
		</div>
		<!--<div class="bottom">
			<div class="bottom-text" v-if="tabdata.msdOrStatus==2">取消订单</div>
		</div>-->
	</div>
</template>

<script>
	export default {
		name: 'xiangqing-yonghu-canyin',
		data() {
			return {
				tabdata: []
			}
		},
		methods: {
			cancel:function(){
				var that = this
				//				取消服务类订单
				$.ajax({
					type: 'post',
					url: that.myurl + '/company/removeOrder',
					data: {
						msdOrderId: that.msdOrderId
					},
					success: function(res) {
						if(res.status == 200) {
							that.back()
						} else {
							alert(res.msg)
						}
					},
					error: function(res) {
						alert('网络连接失败，请检查网络后再试！')
					}
				})
			},
			myajax: function() {
				var that = this
				//				获取订单详情
				$.ajax({
					type: 'post',
					url: that.myurl + '/company/queryCompanyFoodOrderPojo',
					data: {
						msdFoodOrderId: that.msdOrderId
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
			this.myajax()
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
	* {
		padding: 0;
		margin: 0;
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
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.header-cebian img {
		height: .38rem;
	}
	
	.header-text {
		font-size: .34rem;
		color: #26261E;
	}
	
	.main {
		height: calc(100% - 2.26rem);
		overflow-x: hidden;
		overflow-y: scroll;
	}
	
	.main-one {
		height: 1.6rem;
		background: #FFFFFF;
		padding: 0 .3rem;
		margin-bottom: .2rem;
	}
	
	.one-box {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		height: .8rem;
	}
	
	.one-text {
		font-size: .28rem;
		color: #26261E;
	}
	
	.one-hezi {
		height: .8rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.main-box {
		height: 2.8rem;
		background: #FFFFFF;
	}
	
	.box-top {
		display: flex;
		align-items: center;
		height: .8rem;
		padding: 0 .3rem;
		margin-bottom: 1px solid #D8D8D8;
	}
	
	.box-text {
		font-size: .28rem;
		color: #26261E;
	}
	
	.box-box {
		height: 2rem;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		padding: 0 .3rem;
	}
	
	.box-left {
		height: 1.3rem;
		width: 1.3rem;
		overflow: hidden;
		border-radius: .08rem;
		margin-right: .3rem;
	}
	
	.box-left img {
		width: 100%;
	}
	
	.box-content {
		height: 1.3rem;
		flex: 1;
	}
	
	.box-above {
		height: .6rem;
		font-size: .28rem;
		color: #333333;
		margin-top: .1rem;
	}
	
	.box-below {
		height: .6rem;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}
	
	.below-text {
		font-size: .24rem;
		color: #333333;
	}
	
	.below-box {
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}
	
	.below-box img {
		height: .22rem;
		margin-right: .06rem;
	}
	
	.box-right {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.box-right img {
		height: .52rem;
	}
	
	.main-two {
		background: #FFFFFF;
		height: 1rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #D8D8D8;
		padding: 0 .3rem;
	}
	
	.two-text {
		font-size: .28rem;
		color: #26261E;
	}
	
	.main-two img {
		height: .32rem;
	}
	
	.two-news {
		font-size: .28rem;
		color: #E24B2D;
	}
	
	.main-three {
		height: 1rem;
		background: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		border-bottom: 1px solid #D8D8D8;
		padding: 0 .3rem;
	}
	
	.three-text {
		font-size: .28rem;
		color: #26261E;
	}
	
	input {
		border: 0;
		height: 1rem;
		font-size: .28rem;
		color: #26261E;
		flex: 1;
	}
	
	.main-four {
		height: 3.2rem;
		background: #FFFFFF;
		padding: .2rem .3rem;
	}
	
	.four-text {
		display: flex;
		align-items: center;
		font-size: .28rem;
		color: #26261E;
		height: .8rem;
	}
	
	.four-box {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		overflow: hidden;
	}
	
	.img-box {
		height: 1.6rem;
		width: 1.6rem;
		border-radius: .08rem;
		overflow: hidden;
		margin-right: .3rem;
	}
	
	.four-box img {
		width: 100%;
	}
	
	.bottom {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		background: #FFFFFF;
		height: 1.3rem;
		padding: 0 .3rem;
	}
	
	.bottom-text {
		font-size: .24rem;
		color: #FFFFFF;
		background: #CACACA;
		width: 1.6rem;
		height: .6rem;
		text-align: center;
		line-height: .6rem;
	}
	
	.bottom-word {
		flex: 1;
	}
	
	.bottom-news {
		font-size: .24rem;
		color: #FFFFFF;
		background: #0DA5FE;
		width: 1.6rem;
		height: .6rem;
		text-align: center;
		line-height: .6rem;
		margin-left: .2rem;
	}
</style>