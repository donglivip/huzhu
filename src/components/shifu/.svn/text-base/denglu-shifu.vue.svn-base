<template>
	<div class="wrapper">
		<!--头-->
		<div class="header">
			<div class="header-cebian"></div>
			<div class="header-text">公司登录</div>
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
				<div class="three-text" @click="opennew('zhuce-shifu')">注册</div>
				<div class="three-text" @click="opennew('wangji-shifu')">忘记密码？ </div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'denglu-shifu',
		data() {
			return {
				phone: localStorage.getItem('msdCoPhone'),
				password: localStorage.getItem('shifumima')
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
					url: that.myurl + '/company/companLogin',
					data: {
						phone: that.phone,
						pwd: that.password
					},
					success: function(res) {
						if(res.status == 200) {
							//									是师傅
							localStorage.setItem('msdCompanyId', res.data.msdCompanyId) //师傅id
							localStorage.setItem('msdCoPhone', res.data.msdCoPhone) //手机号
							localStorage.setItem('msdCoIsMemeber', res.data.msdCoIsMemeber) //是否会员
							localStorage.setItem('madCoHeadImg', res.data.madCoHeadImg) //头像
							localStorage.setItem('msdCoIsIdentity', res.data.msdCoIsIdentity) //是否认证
							localStorage.setItem('msdCoName', res.data.msdCoName) //名称
							localStorage.setItem('msdCoIsCompany', res.data.msdCoIsCompany) //是否公司
							localStorage.setItem('msdCoIsWork', res.data.msdCoIsWork) //是否工作
							localStorage.setItem('msdCoIsConsume', res.data.msdCoIsConsume)//是否消费
							localStorage.setItem('shifumima',that.password)//密码
							that.opennew('shouye-shifu')
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
				this.$router.replace({
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