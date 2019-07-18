<template>
	<div class="wrapper">
		<div class="header">
			<div class="header-aside" @click="back">
				<img src="../../static/youjian.png">
			</div>
			<div class="header-content">选择发单模式</div>
			<div class="header-aside"></div>
		</div>
		<div class="main">
			<div class="main-box" @click="opennew('gongsiliebiao')">
				<div class="box-top">
					<img src="../../static/paidan.png">
				</div>
				<div class="box-bottom">
					<div class="box-text">派单模式</div>
					<div class="box-text">指派某人为我服务</div>
				</div>
			</div>
			<div class="main-box" @click="opennew('qiangqueren')">
				<div class="box-top">
					<img src="../../static/qiangdan.png">
				</div>
				<div class="box-bottom">
					<div class="box-text">抢单模式</div>
					<div class="box-text" style="text-align: left;">把我的需求发布出去让人抢单</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'xuanzefadan',
		data() {
			return {
				tabdata:[]
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
		mounted(){

		},
			computed: {
				myurl() {
					return this.$store.state.myurl
				}
			}
	}
</script>

<style scoped>
	.wrapper{
		background: #F0F0F2 ;
	}
	.header{
		height: 1rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 .3rem;
		background: #FFFFFF;
	}
	.header-aside{
		width: .3rem;
	}
	.header-aside img{
		height: .3rem;
	}
	.header-content{
		font-size: .32rem;
		color: #272727 ;
	}
	.main-box{
		height: 3.8rem ;
		width: 4.5rem ;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: #4BBCFE ;
		border-radius: .16rem;
		margin: 1.2rem 0 0 1.4rem;
	}
	.box-top{
		width: 1.8rem;
		height: 1.8rem;
		overflow: hidden;
		margin-bottom: .4rem;
	}
	.box-top img{
		width: 100%;
		height: 100%;

	}
	.box-bottom{

	}
	.box-text{
		font-size: .32rem;
		color: #FFFFFF ;
		line-height: .5rem;
		word-break: break-all;
		text-align: center;
		width: 3.2rem;
	}
	.{

	}
	.{

	}
	.{

	}
	.{

	}
	.{

	}
	.{

	}







</style>
