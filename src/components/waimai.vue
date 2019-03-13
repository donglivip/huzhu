<template>
	<div class="wrapper">
		<div class="header">
			<div class="header-cebian" @click="back()">
				<img src="../../static/youjian.png" />
			</div>
			<div class="header-text">外卖</div>
			<div class="header-cebian"></div>
		</div>
		<div class="main">
			<div class="main-one">
				<div class="one-text" v-for='(val,index) in tabdata' @click="change(val.msdFootStatusId,index)" :class="navindex==index?'one-news':''">{{val.msdFsName}}</div>
			</div>
			<div class="main-two" v-for="val in shopdata" @click="opennew('canyinxiangqing',val.msdFoodResultId)">
				<div class="two-lift">
					<img :src="val.msdFrHeadImg" />
				</div>
				<div class="two-right">
					<div class="two-text">{{val.msdFrName}}</div>
					<div class="two-news">{{val.msdFrPrice}}元</div>
				</div>
			</div>
			<!--<div class="main-three">没有更多了～</div>-->
		</div>
	</div>
</template>

<script>
	export default {
		name: 'waimai',
		data() {
			return {
				tabdata:[],
				navindex:0,
				shopdata:[]
			}
		},
		methods: {
			myajax: function() {
				var that = this
				//				获取分类列表
				$.ajax({
					type: 'post',
					url: that.myurl + '/user/selectMsdFootStatus',
					success: function(res) {
						if(res.status == 200) {
							that.tabdata = res.data
							that.change(res.data[0].msdFootStatusId,0)
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
				this.$store.state.msdInsuranceResultId = id
				this.$router.push({
					name: target
				})
			},
			change:function(id,index){
				var that = this
				//				获取分类下商品
				$.ajax({
					type: 'post',
					url: that.myurl + '/user/selectMsdFootStatusId',
					data: {
						MsdFootStatusId: id
					},
					success: function(res) {
						if(res.status == 200) {
							that.shopdata = res.data
							that.navindex=index
						} else {
							alert(res.msg)
						}
					},
					error: function(res) {
						alert('网络连接失败，请检查网络后再试！')
					}
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
			}
		}
	}
</script>

<style scoped>
*{
	margin: 0;padding: 0;
}
html,body,.wrapper{width: 100%;height: 100%;overflow: hidden;}
.wrapper{
	background: #F7F7F9 ;
}
.header{
	display: flex;
	align-items: center;
	justify-content: flex-start;
	height: .96rem;
	padding: 0 .3rem;
	background: #FFFFFF;
	margin-bottom: .2rem;
}
.header-cebian{
	display: flex;
	align-items: center;
	justify-content: flex-start;
	width: .3rem;
}
.header-cebian img{
	height: .36rem;
}
.header-text{
	font-size: .32rem;
	color: #26261E ;
	margin-left: .3rem;
}
.main-one{
	display: flex;
	align-items: center;
	justify-content: flex-start;
	height: .8rem;
	background: #FFFFFF;
	padding:  0 .3rem;
}
.one-text{
	font-size: .28rem;
	color: #272727 ;
	margin-right: .7rem;	
}
.one-news{
	font-size: .28rem;
	color: #0DA5FE;
	height: .8rem;
	line-height: .8rem;
	border-bottom: 2px solid #0DA5FE;
	margin-right: .7rem;	
}
.main-two{
	display: flex;
	align-items: center;
	justify-content: flex-start;
	height: 2.2rem;
	background: #FFFFFF;
	padding:  0 .3rem;
}
.two-lift{
	display: flex;
	align-items: center;
	width: 2.1rem;
	height: 1.6rem;
	overflow: hidden;
	margin-right: .2rem;
	border-radius: .08rem;
}
.two-lift img{
	width: 100%;	
}
.two-right{
	height: 1.6rem;
}
.two-text{
	font-size: .32rem;
	color: #272727 ;
	margin-bottom: .8rem;
}
.two-news{
	font-size: .32rem;
	color: #E24B2D ; 	
}
.main-three{
	font-size: .24rem;
	color: #9B9B9B ;
	height: .8rem;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>