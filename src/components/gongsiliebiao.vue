<template>
	<div class="wrapper">
		<div class="header">
			<div class="header-cebian" @click="back()">
				<img src="../../static/youjian.png" />
			</div>
			<div class="header-text">公司</div>
			<div class="header-cebian"></div>
		</div>
		<div class="main">
			<div class="main-one">已开通人身意外险的公司或者个人显示<img src="../../static/bao.png">标示认准 <span>保</span>字商家或者个人为您提供保障查看<span @click="igo(1)">《保障服务协议》</span>与 <span@click="igo(2)">免保范围</span>发生欺诈<span @click="igo(3)">申请保障</span></div>
			<div class="main-box" v-for="val in tabdata" @click="opennew('querendingdan',val.msdCompanyId,val.msdCoName)">
				<div class="main-lift">
					<img :src="val.madCoHeadImg | myimg" v-if="val.madCoHeadImg!=null"/>
					<img src="../../static/234564.jpg" v-if="val.madCoHeadImg==null" />
				</div>
				<div class="main-right">
					<div class="right-text">{{val.msdCoName}}</div>
					<div class="right-box">
						<img src="../../static/xing.png" v-for="val in val.msdCoEvaluate"/>
						<img src="../../static/xingx.png" v-for="val in (5-val.msdCoEvaluate)"/>
						<div class="right-news">{{val.msdCoEvaluate}}</div>
					</div>
					<div class="right-word">特色服务:{{val.msdCoIntroduce}}</div>
				</div>
				<div class="main-ce">
					<img src="../../static/bao.png" v-if="val.msdCoIsConsume==1">
				</div>
			</div>
			<img src="../../static/noorder.png" v-if="tabdata.length==0" class="nodata" style="margin: .8rem auto;"/>
		</div>
		<div class="layui" v-if="ifboo" v-html="mysrc" @click="ifchange">
			
		</div>
	</div>
</template>

<script>
	export default {
		name: 'gongsiliebiao',
		data() {
			return {
				tabdata:[],
				mysrc:'',
				ifboo:false
			}
		},
		methods: {
			igo:function(id){
				var that=this
				//				获取店铺列表
				$.ajax({
					type: 'post',
					url: that.myurl + '/user/selectMsdInsuranceAgreementRule',
					data: {
						type  : id
					},
					success: function(res) {
						if(res.status == 200) {
							if(id==1){
								that.mysrc=res.data[0].msdIarGuarantee
							}else if(id==2){
								that.mysrc=res.data[0].msdIarExemption
							}else if(id==3){
								that.mysrc=res.data[0].msdIarApply
							}
							
							that.ifchange()
						} else {
							alert(res.msg)
						}
					},
					error: function(res) {
						alert('网络连接失败，请检查网络后再试！')
					}
				})
			},
			ifchange:function(){
				this.ifboo=!this.ifboo
			},
			myajax: function() {
				var that=this
				//				获取店铺列表
				$.ajax({
					type: 'post',
					url: that.myurl + '/user/selectMsdServiceStyleId',
					data: {
						MsdServiceStyleId: that.MsdServiceStyleId
					},
					success: function(res) {
						if(res.status == 200) {
							for (var i in res.data) {
								res.data[i].msdCoEvaluate=parseInt(res.data[i].msdCoEvaluate)
							}
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
			opennew: function(target,id,name) {
				this.$store.state.msdCompanyname=name
				this.$store.state.msdCompanyId=id
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
			MsdServiceStyleId() {
				return this.$store.state.MsdServiceStyleId
			},
			msdCompanyId() {
				return this.$store.state.msdCompanyId
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
	.layui{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: #FFFFFF;
		overflow-y: scroll;
	}
		.layui img{
			position: absolute;
			top: 0;
			left: 0;
		}
	.wrapper {
		background: #F7F7F9;
	}
	
	.header {
		background: #FFFFFF;
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
	
	.header-text {
		font-size: .32rem;
		color: #1B1B1B;
	}
	
	.main {
		height: calc(100% - .96rem);
		overflow-x: hidden;
		overflow-y: scroll;
	}
	.main-one{
		font-size: .3rem;
		color: #131313 ;
		padding: .2rem .4rem;
		word-break: break-all;
		text-align: left;
		line-height: .5rem;
		background: #FFFFFF;
		margin-bottom: .2rem;
	}
	.main-one img{
		height: .4rem;
		padding: 0 .1rem;
		position: relative;
		top: .1rem;
	}
	span{
		font-size: .3rem;
		color: #FF2C29;
	}
	.main-box {
		height: 2.2rem;
		background: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		padding: 0 .3rem;
		border-bottom: 1px solid #D8D8D8;
	}
	
	.main-lift {
		display: flex;
		align-items: center;
		width: 1.5rem;
		height: 1.5rem;
		overflow: hidden;
	}
	
	.main-lift img {
		width: 100%;
		border-radius: .1rem;
	}
	
	.main-right {
		margin-left: .3rem;
		flex: 1;
	}
	
	.right-text {
		font-size: .32rem;
		color: #171717;
		font-weight: 600;
		margin-bottom: .2rem;
	}
	
	.right-box {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin-bottom: .2rem;
	}
	
	.right-box img {
		height: .2rem;
		margin-right: .06rem;
	}
	
	.right-news {
		font-size: .2rem;
		color: #171717;
	}
	
	.right-word {
		font-size: .28rem;
		color: #9B9B9B;
		height: .4rem;
		line-height: .4rem;
		overflow: hidden;
	}
	.main-ce{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.main-ce img{
		height: .8rem;
	}
</style>