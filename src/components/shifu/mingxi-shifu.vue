<template>
	<div class="wrapper">
		<div class="header">
			<div class="header-cebian" @click="back()">
				<img src="../../../static/zuo.png" />
			</div>
			<div class="header-text">明细</div>
			<div class="header-cebian">
				
			</div>
		</div>
		<div class="main">
			<div class="main-four" v-for="val in tabdata">
				<div class="four-text">{{val.maCfrType | pricetype}}</div>
				<div class="right">￥{{val.maCfrPrice}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'mingxi-shifu',
		data() {
			return {
				tabdata: []
			}
		},
		methods: {
			myajax: function() {
				var that = this
				//				获取钱包明细
				$.ajax({
					type: 'post',
					url: that.myurl + '/company/queryMsdCompanyFinanceRecord',
					data: {
						maCompanyId: localStorage.getItem('msdCompanyId')
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
			this.myajax()
		},
		computed: {
			myurl() {
				return this.$store.state.myurl
			}
		},
		filters:{
			pricetype:function(value){
				if(value==1){
					return '充值'
				}else if(value==2){
					return '提现'
				}else if(value==3){
					return '收益 '
				}else if(value==4){
					return '退款 '
				}else if(value==5){
					return '支付'
				}
			}
		}
	}
</script>

<style scoped>
	* {
		padding: 0;
		margin: 0;
	}
	.main{height: calc(100% - .96rem);overflow-y: scroll;}
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
		padding: 0 .3rem;
		background: #6C8AC8;
	}
	
	.header-cebian {
		display: flex;
		align-items: center;
		justify-content: center;
		width: .6rem;
	}
	
	.header-cebian img {
		height: .36rem;
	}
	
	.header-text {
		font-size: .32rem;
		color: #FFFFFF;
	}
	
	.header-news {
		font-size: .24rem;
		color: #FFFFFF;
	}
	
	.main-box {
		background: #6C8AC8;
	}
	
	
	.main-four {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		height: 1rem;
		padding: 0 .3rem;
		border-bottom: 1px solid ghostwhite;
	}
	
	.lift {
		height: .4rem;
		margin-right: .2rem;
	}
	
	.four-text {
		font-size: .28rem;
		color: #272727;
		flex: 1;
	}
	
	.right {
		height: .36rem;
	}
</style>