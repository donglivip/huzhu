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
				</div>

				<!--					<div class="main-three">没有更多了～</div>-->
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
			}
		},
		methods: {
			havenav: function() {
				var that = this
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
		display: flex;
		align-items: center;
		justify-content: flex-start;
		height: .8rem;
	}
	
	.one-text {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: .28rem;
		color: #272727;
		margin: 0 .2rem;
	}
	
	.one-news {
		font-size: .28rem;
		color: #0DA5FE;
		border-bottom: 2px solid #0DA5FE;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 .2rem;
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
		height: 2.1rem;
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