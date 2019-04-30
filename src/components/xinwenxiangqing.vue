<template>
	<div class="wrapper">
		<div class="header">
			<div class="header-cebian" @click="back()">
				<img src="../../static/youjian.png" />
			</div>
			<div class="header-text"></div>
			<div class="header-cebian"></div>
		</div>
		<div class="main">
			<div class="main-one">
				<div class="one-text">{{tabdata.msdNeTitle}}</div>
			</div>
			<div class="main-two">
				<div class="two-text">{{tabdata.msdNeCreateTimeString}}</div>
			</div>
			<div class="main-three">
				<div class="three-text" v-html="tabdata.msdNeResult"></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'xinwenxiangqing',
		data() {
			return {
				tabdata: ''
			}
		},
		methods: {
			myajax: function() {
				var that = this
				//				获取店铺列表
				$.ajax({
					type: 'post',
					url: that.myurl + '/user/selectNewsId',
					data: {
						msdNewsId: that.msdNewsId
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
			msdNewsId() {
				return this.$store.state.msdNewsId
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
		height: .96rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: .2rem;
		padding: 0 .3rem;
	}
	
	.header-cebian {
		display: flex;
		align-items: center;
		justify-content: center;
		width: .3rem;
	}
	
	.header-cebian img {
		height: .36rem;
	}
	
	.main {
		height: calc(100% - .96rem);
		overflow-x: hidden;
		overflow-y: scroll;
		padding-bottom: 1rem;
	}
	
	.main-one {
		display: flex;
		align-items: center;
		line-height: .6rem;
		height: 1.2rem;
		overflow: hidden;
		margin-bottom: .24rem;
		padding: 0 .3rem;
	}
	
	.one-text {
		font-size: .44rem;
		color: #000000;
		word-break: break-all;
	}
	
	.main-two {
		padding: 0 .3rem;
	}
	
	.two-text {
		font-size: .24rem;
		color: #000000;
		margin-bottom: .48rem;
	}
	
	.main-three {
		display: flex;
		align-items: center;
		line-height: .4rem;
		overflow: hidden;
		margin-bottom: .4rem;
		padding: 0 .3rem;
	}
	
	.three-text {
		font-size: .28rem;
		color: #000000;
		word-break: break-all;
		width: 100%;
	}
	
	.main img {
		width: calc(100% - .6rem);
		margin-left: .3rem;
		border-radius: .08rem;
	}
</style>