<template>
	<div class="wrapper" id="app">
		<div class="header" :class="headboo?'white':''">
			<div class="header-cebian mui-action-back" @click="back()">
				<img src="../../static/y-bai.png" v-if="!headboo"/>
				<img src="../../static/youjian.png" v-if="headboo"/>
			</div>
			<div class="header-text">{{navdata.msdFrName}}</div>
			<div class="header-cebian"></div>
		</div>
		<div class="main" @scroll="myscroll">
			<div class="main-one">
				<img :src="navdata.msdFrHeadImg | myimg" />
				<!--<p>{{navdata.maIlName}}</p>-->
			</div>
			<div class="main-two">
				<div class="two-text">产品特色</div>
				<div v-html="navdata.msdFrResult">

				</div>
			</div>
		</div>
		<div class="bottom">
			<div class="bottom-box">
				<div class="bottom-text">{{navdata.msdFrPrice}}</div>
				<div class="bottom-news">元</div>
			</div>
			<div class="bottom-word" @click="opennew('tijiaodingdan')">立即下单</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'canyinxiangqing',
		data() {
			return {
				navdata:'',
				headboo:false
			}
		},
		methods: {
			myscroll:function(){
				if($('.main').scrollTop()>45){
					this.headboo=true
				}else{
					this.headboo=false
				}
			},
			myalert:function(){
				alert('联系电话'+this.navdata.msdIrPhone)
			},
			myajax: function() {
				var that = this
				//				获取店铺列表
				$.ajax({
					type: 'post',
					url: that.myurl + '/user/selectMsdFoodResultId',
					data: {
						msdFoodResultId: that.msdInsuranceResultId
					},
					success: function(res) {
						if(res.status == 200) {
							that.navdata = res.data
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
				this.$store.state.msdFoodResultId = this.navdata
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
			msdInsuranceResultId() {
				return this.$store.state.msdInsuranceResultId
			},
			msdFoodResultId() {
				return this.$store.state.msdFoodResultId
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
		height: .96rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		width: 100%;
		z-index: 99;
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
		color: #FFFFFF;
	}
	
	img {
		width: 100%!important;
		height: auto!important
	}
	
	.main-one {
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.main-one p {
		z-index: 999;
		position: relative;
		color: #FFFFFF;
		padding: 0 .2rem;
		font-size: .7rem;
	}
	
	.main-one p {
		width: 100%;
		overflow-y: scroll;
		height: auto!important;
	}
	
	.main {
		height: calc(100% - 1rem);
		overflow-y: scroll;
	}
	
	.main-two {
		height: 7rem;
		background: #FFFFFF;
		margin: .2rem 0;
		height: calc(100% - 4.8rem);
	}
	
	.two-text {
		margin: 0 .3rem;
		padding: .3rem 0;
		font-size: .36rem;
		color: #000000;
	}
	
	.two-box {
		height: ;
		margin: .3rem;
	}
	
	.bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 1rem;
		background: #FFFFFF;
		margin-bottom: .2rem;
	}
	
	.bottom-box {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin-left: .3rem;
	}
	
	.bottom-text {
		font-size: .48rem;
		color: #E24B2D;
	}
	
	.bottom-news {
		font-size: .24rem;
		color: #000000;
	}
	
	.bottom-word {
		width: 3.2rem;
		height: 1rem;
		text-align: center;
		line-height: 1rem;
		background: #0DA5FE;
		font-size: .32rem;
		color: #FFFFFF;
	}
	.white{
		background: #FFFFFF;
		
	}
	.white .header-text{
			color: #333333!important;
		}
</style>