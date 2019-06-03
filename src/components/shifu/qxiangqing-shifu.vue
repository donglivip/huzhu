<template>
	<div class="wrapper">
			<div class="header">
				<div class="header-cebian" @click="back()">
					<img src="../../../static/youjian.png"/>
				</div>
				<div class="header-text">订单详情</div>
				<div class="header-cebian"></div>
			</div>
            <div class="main">
            	<div class="main-two">
            		<div class="two-text">取消原因：</div>
            		<div class="two-news">{{tabdata.msdMocReason}}</div>
            	</div>
            	<div class="main-three">
            		<div class="three-text">取消照片：</div>
            		<img :src="tabdata.msdOrImg1 | myimg" v-for="val in msdMocPicture"/>
            	</div>
            </div>
		</div>
</template>

<script>
	import AMap from 'AMap'
	export default {
		name: 'xiangqing-shifu',
		data() {
			return {
				tabdata: {}
			}
		},
		methods: {
			myajax: function() {
				var that = this
				//				获取订单详情
				$.ajax({
					type: 'post',
					url: that.myurl + '/company/selectMsdOrderCancelId',
					data: {
						msdOrderCancelId: that.msdOrderId
					},
					success: function(res) {
						if(res.status == 200) {
							res.data.msdMocPicture=JSON.parse(res.data.msdMocPicture)
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
			opennew: function(target) {
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
		padding: 0 .3rem;
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
		font-size: .34rem;
		color: #26261E;
	}
	
	.main-one {
		padding: 0 .3rem;
		height: 4.1rem;
	}
	
	.one-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: .18rem;
	}
	
	.one-text {
		font-size: .28rem;
		color: #0D1E2E;
	}
	
	.main-two {
		display: flex;
		justify-content: space-between;
		padding: 0 .3rem;
		margin: .6rem 0;
	}
	
	.two-text {
		font-size: .28rem;
		color: #0D1E2E;
		width: 3.4rem;
	}
	
	.two-news {
		font-size: .28rem;
		color: #0D1E2E;
		word-break: break-all;
	}
	
	.main-three {
		display: flex;
		justify-content: flex-start;
		padding: 0 .3rem;
	}
	
	.three-text {
		font-size: .28rem;
		color: #0D1E2E;
	}
	
	.main-three img {
		height: 1.3rem;
		margin-right: .08rem;
		border-radius: .08rem;
	}
	
	.main-four {
		display: flex;
		align-items: center;
		justify-content: center;
		background: #0DA5FE;
		margin: .8rem;
		border-radius: .6rem;
		height: .9rem;
	}
	
	.four-text {
		font-size: .28rem;
		color: #FFFFFF;
	}
	
	.main-five {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		padding: 0 .3rem;
		height: 1.4rem;
	}
	
	.five-text {
		font-size: .28rem;
		color: #0DA5FE;
		border: 1px solid #0DA5FE;
		height: .48rem;
		width: 1.3rem;
		text-align: center;
		line-height: .48rem;
		margin-right: .3rem;
	}
	
	.five-news {
		font-size: .28rem;
		color: #0DA5FE;
		border: 1px solid #0DA5FE;
		height: .48rem;
		width: 1.3rem;
		text-align: center;
		line-height: .48rem;
	}
	
	.five-word {
		font-size: .28rem;
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
</style>