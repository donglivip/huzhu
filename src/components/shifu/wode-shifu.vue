<template>
	<div class="wrapper">
		<div class="header">
			<div class="header-lift">
				<img :src="madCoHeadImg | myimg" v-if="madCoHeadImg!='null'"/>
				<img src="../../../static/234564.jpg" v-if="madCoHeadImg=='null'"/>
			</div>
			<div class="header-content">
				<div class="content-text">{{msdCoName=='null'?'新用户':msdCoName}}</div>
				<div class="content-news">{{msdCoIsIdentity==2?'未实名认证':'已实名认证'}}</div>
				<div class="content-news">{{tabdata.msdCoWorking}}工时 推荐人数{{num}}</div>
			</div>
			<div class="head-r">
				<div class="header-right" @click="opennew('openvip-shifu')">
					<img src="../../../static/vip icon.png" />
					<div class="right-text">开通会员</div>
				</div>
				<div class="header-right" v-if="msdCoIsMemeber==1" @click="opennew('quanli-shifu')">
					<img src="../../../static/vip icon.png" />
					<div class="right-text">会员权益</div>
				</div>
			</div>
		</div>
		<div class="main">
			<div class="main-one">
				<div class="one-box" @click="opennew('qianbao-shifu')">
					<img src="../../../static/qianbao.png" />
					<div class="one-text">钱包充值</div>
				</div>
				<!--<div class="one-box">
					<img src="../../../static/dingwei0.png" />
					<div class="one-text">我的地址</div>
				</div>-->
				<div class="one-box" @click="opennew('renzheng-shifu')" v-if="msdCoIsIdentity==2">
					<img src="../../../static/renzheng.png" />
					<div class="one-text">认证中心</div>
				</div>
			</div>
			<div class="main-two" @click="opennew('share-shifu')">
				<img src="../../../static/VIP.png" />
				<div class="two-text">推荐有奖</div>
			</div>
			<div class="main-three">
				<div class="three-lift">
					<img src="../../../static/dianpu.png" />
				</div>
				<div class="three-content">店铺状态</div>
				<div class="three-right" @click="changework()">
					<img src="../../../static/kaiguan0.png" v-if="msdCoIsWork==2" />
					<img src="../../../static/kaiguan.png" v-if="msdCoIsWork==1" />
				</div>
			</div>
			<div class="main-three" @click="opennew('fuwuxiangmu')">
				<div class="three-lift">
					<img src="../../../static/dianpu.png" />
				</div>
				<div class="three-content">服务项目</div>
				<div class="three-right">
					<img src="../../../static/you.png" />
				</div>
			</div>
			<div class="main-three" @click="opennew('shezhi-shifu')">
				<div class="three-lift">
					<img src="../../../static/setting.png" />
				</div>
				<div class="three-content">设置</div>
				<div class="three-right">
					<img src="../../../static/you.png" />
				</div>
			</div>
			<div class="main-three" @click="opennew('bangzhu')">
				<div class="three-lift">
					<img src="../../../static/bangzhu.png" />
				</div>
				<div class="three-content">帮助</div>
				<div class="three-right">
					<img src="../../../static/you.png" />
				</div>
			</div>
			<a class="main-three" href="tel:051666695588">
				<div class="three-lift">
					<img src="../../../static/kefu.png" />
				</div>
				<div class="three-content">客服</div>
				<div class="three-right">
					051666695588
				</div>
			</a>
		</div>
		<div class="bottom">
			<div class="bottom-box" @click="opennew('shouye-shifu')">
				<img src="../../../static/da.png" />
				<div class="bottom-news">大厅</div>
			</div>
			<div class="bottom-box" @click="opennew('dingdan-shifu')">
				<img src="../../../static/ding_dan.png" />
				<div class="bottom-news">订单</div>
			</div>
			<div class="bottom-box">
				<img src="../../../static/user-active.png" />
				<div class="bottom-text">我的</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'wode-shifu',
		data() {
			return {
				tabdata: [],
				msdCoIsMemeber: localStorage.getItem('msdCoIsMemeber'), //是否会员
				madCoHeadImg: localStorage.getItem('madCoHeadImg'), //头像
				msdCoName: localStorage.getItem('msdCoName'), //名称
				msdCoIsIdentity: localStorage.getItem('msdCoIsIdentity'), //是否认证
				msdCoIsWork: localStorage.getItem('msdCoIsWork'), //是够工作
				num:0
			}
		},
		methods: {
			changework: function() {
				var that = this
				var id=that.msdCoIsWork==1?2:1
				//				改变开启状态
				$.ajax({
					type: 'post',
					url: that.myurl + '/company/updateCompanInfoById',
					data: {
						msdCompanyId: localStorage.getItem('msdCompanyId'),
						msdCoIsWork:id
					},
					success: function(res) {
						if(res.status == 200) {
							that.msdCoIsWork=id
							localStorage.setItem('msdCoIsWork',id)
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
				//				获取工时
				$.ajax({
					type: 'post',
					url: that.myurl + '/company/companLogin',
					data: {
						phone: localStorage.getItem('msdCoPhone'),
						pwd: localStorage.getItem('shifumima')
					},
					success: function(res) {
						if(res.status == 200) {
							localStorage.setItem('msdCoIsIdentity', res.data.msdCoIsIdentity) //是否认证
							that.tabdata = res.data
						} else {
							alert(res.msg)
						}
					},
					error: function(res) {
						alert('网络连接失败，请检查网络后再试！')
					}
				})
				$.ajax({
					type: 'post',
					url: that.myurl + '/company/queryCompanyShare',
					data: {
						id: localStorage.getItem('msdCompanyId')
					},
					success: function(res) {
						if(res.status == 200) {
							
							that.num = res.data
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
		background: #FFFFFF;
	}
	
	.header {
		height: 3.7rem;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		background: url(../../../static/back03.png) no-repeat;
		background-size: 100% auto;
	}
	
	.header-lift {
		width: 1rem;
		height: 1rem;
		overflow: hidden;
		margin: 0 .3rem;
		border-radius: 2rem;
	}
	
	.header-lift img {
		width: 100%;
		height: 100%;
	}
	
	.header-content {
		height: 1rem;
		flex: 1;
	}
	
	.content-text {
		font-size: .36rem;
		color: #FFFFFF;
		margin-bottom: .12rem;
	}
	
	.content-news {
		font-size: .24rem;
		color: #FFFFFF;
		margin-bottom: .1rem;
	}
	
	.header-right {
		height: .66rem;
		width: 2.1rem;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		background: #FFFFFF;
		border-bottom-left-radius: .4rem;
		border-top-left-radius: .4rem;
		margin-bottom: .15rem;
	}
	
	.header-right img {
		height: .34rem;
		margin: 0 .12rem 0 .12rem;
	}
	
	.right-text {
		font-size: .28rem;
		color: #DDC680;
	}
	
	.main {
		height: calc(100% - 4.8rem);
		overflow-x: hidden;
		overflow-y: scroll;
	}
	
	.main-one {
		height: 2.8rem;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	
	.one-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
	}
	
	.one-box img {
		height: .6rem;
		margin-bottom: .2rem;
	}
	
	.one-text {
		font-size: .28rem;
		color: #272727;
	}
	
	.main-two {
		display: flex;
		align-items: center;
		justify-content: center;
		background: #F7F7F9;
		border-radius: .08rem;
		margin: 0 .3rem .6rem .3rem;
		height: 2rem;
		width: 6.6rem;
	}
	
	.main-two img {
		height: .34rem;
		margin-right: .34rem;
	}
	
	.two-text {
		font-size: .34rem;
		color: #6C8AC8;
	}
	
	.main-three {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		height: 1rem;
		padding: 0 .3rem;
	}
	
	.three-lift {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.three-lift img {
		height: .38rem;
		margin-right: .2rem;
	}
	
	.three-content {
		font-size: .28rem;
		color: #272727;
		flex: 1;
	}
	
	.three-right {
		display: flex;
		align-items: center;
	}
	
	.three-right img {
		height: .5rem;
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