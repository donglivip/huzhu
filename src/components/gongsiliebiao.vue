<template>
	<div class="wrapper">
		<div class="header">
			<div class="header-cebian" @click="back()">
				<img src="../../static/youjian.png" />
			</div>
			<div class="header-text">公司</div>
			<div class="header-cebian"></div>
		</div>
		<div class="main">
			<div class="main-box" v-for="val in tabdata" @click="opennew('querendingdan',val.msdCompanyId,val.msdCoName)">
				<div class="main-lift">
					<img :src="val.madCoHeadImg | myimg" v-if="val.madCoHeadImg!=null"/>
					<img src="../../static/234564.jpg" v-if="val.madCoHeadImg==null" />
				</div>
				<div class="main-right">
					<div class="right-text">{{val.msdCoName}}</div>
					<div class="right-box">
						<img src="../../static/xing.png" v-for="val in val.msdCoEvaluate"/>
						<img src="../../static/xingx.png" v-for="val in (5-val.msdCoEvaluate)"/>
						<div class="right-news">{{val.msdCoEvaluate}}</div>
					</div>
					<div class="right-word">特色服务:{{val.msdCoIntroduce}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'gongsiliebiao',
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
					url: that.myurl + '/user/selectMsdServiceStyleId',
					data: {
						MsdServiceStyleId: that.MsdServiceStyleId
					},
					success: function(res) {
						if(res.status == 200) {
							for (var i in res.data) {
								res.data[i].msdCoEvaluate=parseInt(res.data[i].msdCoEvaluate)
							}
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
			opennew: function(target,id,name) {
				this.$store.state.msdCompanyname=name
				this.$store.state.msdCompanyId=id
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
			MsdServiceStyleId() {
				return this.$store.state.MsdServiceStyleId
			},
			msdCompanyId() {
				return this.$store.state.msdCompanyId
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
		color: #1B1B1B;
	}
	
	.main {
		height: calc(100% - .96rem);
		overflow-x: hidden;
		overflow-y: scroll;
	}
	
	.main-box {
		height: 2.2rem;
		background: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		padding: 0 .3rem;
		border-bottom: 1px solid #D8D8D8;
	}
	
	.main-lift {
		display: flex;
		align-items: center;
		width: 1.5rem;
		height: 1.5rem;
		overflow: hidden;
	}
	
	.main-lift img {
		width: 100%;
		border-radius: .1rem;
	}
	
	.main-right {
		margin-left: .3rem;
		flex: 1;
	}
	
	.right-text {
		font-size: .32rem;
		color: #171717;
		font-weight: 600;
		margin-bottom: .2rem;
	}
	
	.right-box {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin-bottom: .2rem;
	}
	
	.right-box img {
		height: .2rem;
		margin-right: .06rem;
	}
	
	.right-news {
		font-size: .2rem;
		color: #171717;
	}
	
	.right-word {
		font-size: .28rem;
		color: #9B9B9B;
		height: .4rem;
		line-height: .4rem;
		overflow: hidden;
	}
</style>