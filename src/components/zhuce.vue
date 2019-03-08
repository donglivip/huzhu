<template>
	<div class="wrapper">
		<!--头-->
		<div class="header">
			<div class="header-cebian"></div>
			<div class="header-text">注册</div>
			<div class="header-cebian"></div>
		</div>
		<!--中间主体-->
		<div class="main">
			<div class="main-one">
				<input type="text" placeholder="请输入手机号" class="shouji" />
				<div class="one-text">获取验证码</div>
			</div>
			<div class="main-one">
				<input type="password" placeholder="输入验证码" class="phone" />
			</div>
			<div class="main-one">
				<input type="password" placeholder="密码" class="phone" />
			</div>
			<div class="main-two">
				<div class="two-text">注册</div>
			</div>
			<div class="main-three ">
				<div class="three-text">注册协议 </div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'zhuce',
		data() {
			return {

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
	}
	
	.wrapper {
		background: #F7F7F9;
	}
	
	.header {
		display: flex;
		align-items: center;
		justify-content: center;
		height: .96rem;
		background: #FFFFFF;
		margin-bottom: .5rem;
	}
	
	.header-text {
		font-size: .32rem;
		color: #26261E;
	}
	
	.header-cebian {
		width: .3rem;
	}
	
	.main-one {
		display: flex;
		align-items: center;
		height: .88rem;
		background: #FFFFFF;
		margin: 0 .4rem .6rem .6rem;
		height: .9rem;
		padding-left: .2rem;
		border-radius: .08rem;
	}
	
	.shouji {
		font-size: .28rem;
		color: #26261E;
		border: 0;
		flex: 1;
		height: .88rem;
	}
	
	.phone {
		font-size: .28rem;
		color: #26261E;
		border: 0;
		flex: 1;
		height: .88rem;
	}
	
	.one-text {
		background: #0DA5FE;
		font-size: .28rem;
		color: #FFFFFF;
		width: 2.1rem;
		height: .9rem;
		text-align: center;
		line-height: .9rem;
	}
	
	.main-two {
		display: flex;
		align-items: center;
		justify-content: center;
		height: .9rem;
		background: #0DA5FE;
		margin: 0 .6rem;
		border-radius: .08rem;
		margin-bottom: .2rem;
	}
	
	.two-text {
		font-size: .28rem;
		color: #FFFFFF;
	}
	
	.main-three {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		margin: 0 .7rem;
	}
	
	.three-text {
		font-size: .28rem;
		color: #4A90E2;
	}
</style>