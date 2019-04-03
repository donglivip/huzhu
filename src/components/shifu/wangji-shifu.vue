<template>
	<div class="wrapper">
		<!--头-->
		<div class="header" @click="back()">
			<div class="header-cebian">
				<img src="../../../static/youjian.png" />
			</div>
			<div class="header-text">找回密码</div>
			<div class="header-cebian"></div>
		</div>
		<!--中间主体-->
		<div class="main">
			<div class="main-one">
				<input type="number" placeholder="请输入账号" class="shouji" v-model="msdPhone" />
			</div>
			<div class="main-one">
				<input type="number" placeholder="输入验证码" class="phone" v-model="code" />
				<div class="code" @click="havecode">
					{{codetext}}
				</div>
			</div>
			<div class="main-one">
				<input type="password" placeholder="密码" class="phone" v-model="msdPassword" />
			</div>
			<div class="main-two" @click="myajax()">
				<div class="two-text">注册</div>
			</div>
			<!--<div class="main-three ">
				<div class="three-text">注册协议 </div>
			</div>-->
		</div>
	</div>
</template>

<script>
	export default {
		name: 'wangjimima',
		data() {
			return {
				msdPhone: '',
				msdPassword: '',
				code: '',
				codetext: '获取验证码',
				setcode:''
			}
		},
		methods: {
			havecode: function() {
				var that = this
				if(!(/^1[3|4|5|8|9|7][0-9]\d{4,8}$/.test(that.msdPhone))) {
					plus.nativeUI.toast("不是完整的11位手机号或者正确的手机号前七位");
					return false;
				}
				if(this.codetext != '获取验证码') {
					plus.nativeUI.toast('点击的太频繁啦！')
				} else {
					this.setcode02()
					this.codetext = 60
					setInterval(function() {
						if(that.codetext > 1) {
							that.codetext--
						} else {
							that.codetext = '获取验证码'
						}
					}, 1000)
				}
			},
			//			发送验证码
			setcode02: function() {
				var that = this

				$.ajax({
					type: 'post',
					url: that.myurl + '/user/message',
					data: {
						phone: that.msdPhone,
						status:2
					},
					success: function(res) {
						if(res.status == 200) {
							that.setcode=res.data[1]
						} else {
							alert(res.msg)
						}
					},
					error: function(res) {
						alert('网络连接失败，请检查网络后再试！')
					}
				})
			},
			myajax: function() {
				var that = this
				//				注册
				if(that.setcode != that.code||that.code=='') {
					alert('验证码错误')
					return false;
				}
				if(that.msdPhone == '') {
					alert('请输入手机号')
					return false;
				}
				if(that.msdPassword == '') {
					alert('请输入密码')
					return false;
				}
				if(!(/^1[3|4|5|8|9|7][0-9]\d{4,8}$/.test(that.msdPhone))) {
					plus.nativeUI.toast("不是完整的11位手机号或者正确的手机号前七位");
					return false;
				}
				$.ajax({
					type: 'post',
					url: that.myurl + '/user/findPsd',
					data: {
						phone: that.msdPhone,
						psd : that.msdPassword,
						status: 2
					},
					success: function(res) {
						if(res.status == 200) {
							that.opennew('denglu-shifu')
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
	
	.header-text {
		flex: 1;
		text-align: center;
	}
	
	html,
	body,
	.wrapper {
		width: 100%;
		height: 100%;
	}
	
	.code {
		background: #0DA5FE;
		color: #FFFFFF;
		height: .9rem;
		line-height: .9rem;
		text-align: center;
		width: 1.5rem;
	}
	
	.wrapper {
		background: #F7F7F9;
	}
	
	.header-cebian img {
		height: .4rem;
		margin-left: .2rem;
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
		overflow: hidden;
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