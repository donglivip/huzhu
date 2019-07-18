<template>
	<div class="wrapper">
		<div class="header">
			<div class="header-cebian" @click="back()">
				<img src="../../static/zuo.png" />
			</div>
			<div class="header-text">明细</div>
			<div class="header-cebian">

			</div>
		</div>
		<div class="main">
			<div class="main-four" v-for="val in tabdata">
				<div class="four-text">{{val.maUfrResult}}</div>
				<div class="right">￥{{val.maUfrPrice}}</div>
        <div class="four-time">{{val.maUfrCreateTimeString}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'mingxi',
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
					url: that.myurl + '/user/selectUserIdMsdUserFinanceRecord',
					data: {
						msdUserId: localStorage.getItem('userid')
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
.four-time{
  width: 100%;
  margin-top: .2rem;
  text-align: right;
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
		justify-content: flex-end;
		padding: .2rem .3rem;
		border-bottom: 1px solid ghostwhite;
    flex-wrap: wrap;
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
    color: red;
    font-size: .3rem;
	}
</style>
