<template>
	<div class="wrapper">
		<div class="header">
			<div class="header-cebian" @click="back()">
				<img src="../../../static/youjian.png" />
			</div>
			<div class="header-text">服务项目</div>
			<div class="header-cebian"></div>
		</div>
		<div class="main">
			<div class="main-box" v-for="val in tabdata">
				<div class="main-lift">
					<div class="lift-text">{{val.msdCsName}}</div>
					<div class="lift-news">¥{{val.msdCsPrice}}</div>
					<div class="lift-text">/{{val.msdStockUnitId}}</div>
				</div>
				<div class="main-right" @click="godelete(val.msdCompanyServiceId)">
					<div class="right-text">删除</div>
				</div>
			</div>
			<div class="btn" @click="layuichange()">
				添加项目
			</div>
			<div class="layui" v-show="layuiboo">
				<div class="layui-inner">
					<div class="tile">添加项目</div>
					<input type="text" v-model="msdCsName"/>
					<div class="tile">服务价格</div>
					<input type="number" v-model="msdCsPrice"/>
					<div class="tile-box">
						<div class="tile-text">价格单位:</div>
						<select v-model="msdStockUnitId">
							<option :value="i.msdStockUnitId" v-for="i in jiagedata">{{i.msdSuName}}</option>
						</select>
					</div>
					<div class="btn" @click="add()">
						确认添加
					</div>
					<div class="tile" @click="layuichange()">取消</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'chongzhi',
		data() {
			return {
				tabdata: [],
				msdCsName:'',
				msdCsPrice:'',
				layuiboo:false,
				jiagedata:[],
				msdStockUnitId:''
			}
		},
		methods: {
			layuichange:function(){
				this.layuiboo=!this.layuiboo
			},
			add:function(){
				var that = this
				//				添加服务
				if(that.msdCsName==''){
					alert('请输入服务名称！')
					return false;
				}
				if(that.msdCsPrice==''){
					alert('请输入服务价格！')
					return false;
				}
				$.ajax({
					type: 'post',
					url: that.myurl + '/company/insertCompanyService',
					data: {
						msdCompanyId: localStorage.getItem('msdCompanyId'),
						msdCsName:that.msdCsName,
						msdCsPrice:that.msdCsPrice,
						msdStockUnitId:that.msdStockUnitId
					},
					success: function(res) {
						if(res.status == 200) {
							that.layuichange()
							that.myajax()
						} else {
							alert(res.msg)
						}
					},
					error: function(res) {
						alert('网络连接失败，请检查网络后再试！')
					}
				})
			},
			godelete:function(id){
				var that = this
				//				删除服务
				$.ajax({
					type: 'post',
					url: that.myurl + '/company/updateCompanyService',
					data: {
						msdCompanyServiceId: id,
						msdCsIsDelete:1
					},
					success: function(res) {
						if(res.status == 200) {
							that.myajax()
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
				//				获取服务列表
				$.ajax({
					type: 'post',
					url: that.myurl + '/company/queryCompanyServiceList',
					data: {
						msdCompanyId: localStorage.getItem('msdCompanyId')
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
				//				新增服务项目(服务价格自定义)
				$.ajax({
					type: 'post',
					url: that.myurl + '/company/selectMsdStockUnitAll',
					success: function(res) {
						if(res.status == 200) {
							that.jiagedata = res.data
							that.msdStockUnitId=res.data[0].msdStockUnitId
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
	.layui-inner{
		width: 5.8rem;
		height: 6rem;
		display: flex;flex-direction: column;
		align-items: center;justify-content: center;background: #FFFFFF;border-radius: .1rem;
	}
	.layui-inner .btn{position: relative;margin: .4rem auto 0;bottom: 0;left: 0;}
	.tile{font-size: .3rem;margin-top: .2rem;}
	input{height: .7rem;border-bottom: 1px solid gray;}
	.tile-box{
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 1rem;
		border-bottom: 1px solid gray;
		width: 3.2rem;
	}
	.tile-text{
		font-size: .3rem;
		color: #0D1E2E;
	}
	select{
		width: 1.4rem;
	}
	
	.layui{
		position: fixed;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,.5);
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	* {
		padding: 0;
		margin: 0;
	}
	.btn{
		position: fixed;
		bottom: .6rem;
		left: .6rem;
		width:80%;border-radius: .5rem;
		height: .9rem;
		background: #0DA5FE;
		color: #FFFFFF;
		display: flex;align-items: center;justify-content: center;
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
		background: #FFFFFF;
		height: .96rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: .4rem;
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
	
	.main-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: .88rem;
		background: #FFFFFF;
		width: 6.8rem;
		margin: 0 .2rem .4rem .2rem;
		border-radius: .5rem;
		overflow: hidden;
	}
	
	.main-lift {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin-left: .3rem;
	}
	
	.lift-text {
		font-size: .28rem;
		color: #000000;
		margin-right: .12rem;
	}
	
	.lift-news {
		font-size: .28rem;
		color: #FF2C29;
	}
	
	.main-right {
		height: .88rem;
		background: #4A90E2;
		width: 1.3rem;
		text-align: center;
		line-height: .88rem;
	}
	
	.right-text {
		font-size: .28rem;
		color: #FFFFFF;
	}
	
</style>