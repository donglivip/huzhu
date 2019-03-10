<template>
	<div class="wrapper">
		<div class="header">
			<div class="header-cebian" @click="back()">
				<img src="../../static/youjian.png" />
			</div>
			<div class="header-text">帮助</div>
			<div class="header-cebian"></div>
		</div>
		<div class="main">
			<div class="main-three" v-for='val in tabdata'>
				<div class="three-text">{{val.msdHeTitle}}</div>
				<!--<img src="../../static/you.png" />-->
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'bangzhu',
		data() {
			return {
				tabdata:[]
			}
		},
		methods: {
			myajax: function() {
				var that = this
				//				获取帮助列表
				$.ajax({
					type: 'post',
					url: that.myurl + '/user/selectselectMsdHelp',
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
		justify-content: space-between;
		height: .96rem;
		background: #FFFFFF;
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
		color: #272727;
	}
	
	.main-three {
		background: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #E4E4E6;
		padding: 0 .3rem;
		height: 1rem;
	}
	
	.three-text {
		font-size: .28rem;
		color: #26261E;
	}
	
	.main-three img {
		height: .4rem;
	}
</style>