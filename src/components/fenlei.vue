<template>
	<div class="wrapper">
		<div class="header">
			<div class="header-cebian" @click="back()">
				<img src="../../static/youjian.png" />
			</div>
			<div class="header-text">分类</div>
			<div class="header-cebian"></div>
		</div>
		<div class="main">
			<div class="main-box" v-for="val in tabdata" @click="opennew('gongsiliebiao',val.msdServiceStyleId,val.msdSsName)">
				<div class="main-top">
					<img :src="val.msdSsImg" />
				</div>
				<div class="main-bottom">{{val.msdSsName}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'fenlei',
		data() {
			return {
				tabdata: []
			}
		},
		methods: {
			myajax: function() {
				var that = this
				//				获取店铺列表
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
			},
			back: function() {
				this.$router.back()
			},
			opennew: function(target, id,name) {
				this.$store.state.MsdServiceStylename=name
					this.$store.state.MsdServiceStyleId = id
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
		background: #F7F7F9;
	}
	
	.header {
		background: #FFFFFF;
		height: .96rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: .4rem;
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
		color: #1B1B1B;
	}
	
	.main {
		height: calc(100% - .96rem);
		overflow-x: hidden;
		overflow-y: scroll;
		display: flex;
		flex-wrap: wrap;
	}
	
	.main-box {
		height: 3.6rem;
		width: 3rem;
		background: #FFFFFF;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-left: .4rem;
		margin-bottom: .2rem;
	}
	
	.main-top {
		height: 1.3rem;
		width: 1.2rem;
		overflow: hidden;
	}
	
	.main-top img {
		width: 100%;
	}
	
	.main-bottom {
		font-size: .36rem;
		color: #292929;
	}
</style>