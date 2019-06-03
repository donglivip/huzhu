<template>
	<div class="wrapper">
		<div class="header">
			<div class="header-cebian" @click="back()">
				<img src="../../static/youjian.png" />
			</div>
			<div class="header-text">新闻</div>
			<div class="header-cebian"></div>
		</div>
		<div class="main">
			<div class="main-box" v-for="val in tabdata" @click="opennew('xinwenxiangqing',val.msdNewsId)">
				<div class="main-lift">
					<div class="lift-text">{{val.msdNeTitle}}</div>
					<div class="lift-news">{{val.msdNeCreateTimeString}}</div>
				</div>
				<div class="main-right">
					<img src="../../static/you-hui.png">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'xinwen',
		data() {
			return {
				tabdata:[]
			}
		},
		methods: {
			myajax: function() {
				var that=this
				//				获取店铺列表
				$.ajax({
					type: 'post',
					url: that.myurl + '/user/selectNews',
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
			opennew: function(target,id) {
				this.$store.state.msdNewsId=id
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
		display: flex;
		align-items: center;
		justify-content: center;
		width: .3rem;
	}
	
	.header-cebian img {
		height: .36rem;
	}
	
	.header-text {
		font-size: .32rem;
		color: #26261E;
	}
	
	.main {
		height: calc(100% - .96rem);
		overflow-x: hidden;
		overflow-y: scroll;
	}
	
	.main-box {
		height: 1.2rem;
		background: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 .3rem;
		border-bottom: 1px solid #D8D8D8;
	}
	
	.lift-text {
		font-size: .28rem;
		color: #26261E;
		margin-bottom: .1rem;
	}
	
	.lift-news {
		font-size: .24rem;
		color: #9B9B9B;
	}
	
	.main-right {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.main-right img {
		height: .32rem;
	}
</style>