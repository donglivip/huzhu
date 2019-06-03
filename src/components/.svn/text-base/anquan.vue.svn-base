<template>
	<div class="wrapper">
		<div class="header">
			<div class="header-cebian" @click="back()">
				<img src="../../static/youjian.png" />
			</div>
			<div class="header-text">资金安全保险</div>
			<div class="header-cebian"></div>
		</div>
		<div class="main">
			<iframe src="http://www.baidu.com" width="100%" height="100%"></iframe>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'anquan',
		data() {
			return {
				tabdata: ''
			}
		},
		methods: {
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
	iframe{
		border: 0;
	}
</style>