<template>
	<div class="wrapper">
		<!--头-->
		<div class="header">
			<div class="header-cebian"></div>
			<div class="header-text">用户登录</div>
			<div class="header-cebian"></div>
		</div>
		<!--中间主体-->
		<div class="main">
			<div class="main-one">
				<input type="number" placeholder="请输入手机号" class="phone" v-model="phone" />
			</div>
			<div class="main-one">
				<input type="password" placeholder="密码" class="phone" v-model="password" />
			</div>
			<div class="main-two" @click="myajax()">
				<div class="two-text">登录</div>
			</div>
			<div class="main-three ">
				<div class="three-text" @click="opennew('zhuce')">注册</div>
				<div class="three-text" @click="opennew('wangjimima')">忘记密码？ </div>
			</div>
			
		</div>
	</div>
</template>

<script>
	export default {
		name: 'denglu',
		data() {
			return {
				phone: localStorage.getItem('userphone'),
				password: localStorage.getItem('mima')
			}
		},
		methods: {
			myajax: function() {
				var that = this
				//				获取店铺列表
				if(that.phone == '') {
					plus.nativeUI.toast('请输入手机号')
					return false;
				}
				if(that.password == '') {
					plus.nativeUI.toast('请输入手密码')
					return false;
				}
				if(!(/^1[3|4|5|8|9|7][0-9]\d{4,8}$/.test(that.phone))) {
					plus.nativeUI.toast("不是完整的11位手机号或者正确的手机号前七位");
					return false;
				}
				$.ajax({
					type: 'post',
					url: that.myurl + '/user/userLogin',
					data: {
						phone: that.phone,
						password: that.password
					},
					success: function(res) {
						if(res.status == 200) {
							if(res.data.length == 0) {
								alert('账号或密码错误！')
							} else {
								var boo = false
								//									是用户
								localStorage.setItem('userid', res.data[0].msdUserId)
								localStorage.setItem('userphone', res.data[0].msdPhone) //账号
								localStorage.setItem('mima', that.password) //密码
								localStorage.setItem('msdIsMember', res.data[0].msdIsMember)
								localStorage.setItem('msdHeadImg', res.data[0].msdHeadImg)
								localStorage.setItem('msdIsIdentity', res.data[0].msdIsIdentity)
								localStorage.setItem('msdNickname', res.data[0].msdNickname)
								that.opennew('shouye-yonghu')
							}
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
	
	.phone {
		font-size: .28rem;
		color: #26261E;
		border: 0;
		flex: 1;
		height: .88rem;
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
		justify-content: space-between;
		margin: 0 .7rem;
	}
	
	.three-text {
		font-size: .28rem;
		color: #262626;
	}
</style>