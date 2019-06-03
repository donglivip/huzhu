<template>
	<div class="wrapper">
		<div class="header">
			<div class="header-cebian" @click="back()">
				<img src="../../static/youjian.png" />
			</div>
			<div class="header-text">{{headtext}}</div>
			<div class="header-cebian"></div>
		</div>
		<div class="main">
			<div class="main-one">
				<div class="one-text">联系人</div>
				<input type="text" placeholder="请输入姓名" class="phone" v-model="msdAdName"/>
			</div>
			<div class=" main-one ">
				<div class="one-text ">手机号码</div>
				<input type="number " placeholder="请输入手机号 " class="phone " v-model="msdAdPhone"/>
			</div>
			<div class="main-two ">
				<div class="two-left ">
					<div class="two-text ">收货地址</div>
				</div>
				<div class="two-content ">
					<div class="content-top">
						<input type="text " placeholder="小区/街道大厦/学校名称 " class="quyuming " v-model="citydata" @click="citychange()" readonly="readonly"/>
						<img src="../../static/you-hui.png" />
					</div>
					<div class="content-bottom">
						<input type="text " placeholder="楼号/门牌号等详细地址 " class="xiangxi" v-model="msdAdDetailed"/>
					</div>
				</div>
			</div>
		</div>
		<div class="bottom" @click="myajax()">
			<div class="bottom-text">确认添加</div>
		</div>
		<v-distpicker type="mobile" @selected="onSelected" v-if='cityboo'></v-distpicker>
	</div>
</template>

<script>
	import VDistpicker from 'v-distpicker'
	export default {
		name: 'xinzengdizhi',
		data() {
			return {
				tabdata: [],
				citydata:'',
				cityboo:false,
				msdAdName:'',
				msdAdPhone:'',
				msdAdDetailed:'',
				msdAdProvince:'',
				msdAdCity:'',
				msdAdArea:'',
				headtext:'新增地址'
			}
		},
		methods: {
			citychange:function(){
				this.cityboo=!this.cityboo
			},
			onSelected:function(data){
				this.citydata = data.province.value + data.city.value + data.area.value
				this.msdAdProvince=data.province.value
				this.msdAdCity=data.city.value
				this.msdAdArea=data.area.value
				this.citychange()
			},
			myajax: function() {
				var that = this
				//				提交地址
				if(that.msdAdName==''){
					plus.nativeUI.toast('请输入用户名')
					return false;
				}
				if(that.msdAdPhone==''){
					plus.nativeUI.toast('请输入手机号')
					return false;
				}
				if(that.msdAdArea==''){
					plus.nativeUI.toast('请选择地址')
					return false;
				}
				if(that.msdAdDetailed==''){
					plus.nativeUI.toast('请输入详细地址')
					return false;
				}
				if(that.msdAddressId==''){
//					新增地址
					$.ajax({
						type: 'post',
						url: that.myurl + '/user/isnerAddressUser',
						data: {
							msdUserId: localStorage.getItem('userid'),
							msdAdName:that.msdAdName,
							msdAdPhone:that.msdAdPhone,
							msdAdProvince:that.msdAdProvince,
							msdAdCity:that.msdAdCity,
							msdAdArea:that.msdAdArea,
							msdAdDetailed:that.msdAdDetailed,
							msdAdIsDefault:1,
							msdAdCreateName:localStorage.getItem('userid')
						},
						success: function(res) {
							if(res.data == 1) {
								that.back()
							} else {
								alert(res.msg)
							}
						},
						error: function(res) {
							alert('网络连接失败，请检查网络后再试！')
						}
					})
				}else{
//					修改地址
					$.ajax({
						type: 'post',
						url: that.myurl + '/user/updateAddressUser',
						data: {
							msdAddressId:that.msdAddressId,
							msdUserId: localStorage.getItem('userid'),
							msdAdName:that.msdAdName,
							msdAdPhone:that.msdAdPhone,
							msdAdProvince:that.msdAdProvince,
							msdAdCity:that.msdAdCity,
							msdAdArea:that.msdAdArea,
							msdAdDetailed:that.msdAdDetailed,
							msdAdIsDefault:1,
							msdAdCreateName:localStorage.getItem('userid')
						},
						success: function(res) {
							if(res.data == 1) {
								that.back()
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
			if(this.msdAddressId!=''){
				this.headtext='编辑地址'
				var that = this
				//				获取地址列表
				$.ajax({
					type: 'post',
					url: that.myurl + '/user/selectAddressUser',
					data: {
						msdUserId: localStorage.getItem('userid')
					},
					success: function(res) {
						if(res.status == 200) {
							for (var i in res.data) {
								if(res.data[i].msdAddressId==that.msdAddressId){
									that.msdAdName=res.data[i].msdAdName
									that.msdAdPhone=res.data[i].msdAdPhone
									that.msdAdProvince=res.data[i].msdAdProvince
									that.msdAdCity=res.data[i].msdAdCity
									that.msdAdArea=res.data[i].msdAdArea
									that.msdAdDetailed=res.data[i].msdAdDetailed
									that.citydata=res.data[i].msdAdProvince+res.data[i].msdAdCity+res.data[i].msdAdArea
								}
							}
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
		computed: {
			myurl() {
				return this.$store.state.myurl
			},
			msdAddressId() {
				return this.$store.state.msdAddressId
			}
		},
		components: { VDistpicker }
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
	
	.wrapper {
		background: #F7F7F9;
	}
	
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: .96rem;
		background: #FFFFFF;
		padding: 0 .3rem;
		margin-bottom: .1rem;
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
		color: #272727;
	}
	
	.main-one {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		height: .9rem;
		background: #FFFFFF;
		padding: 0 .3rem;
	}
	
	.one-text {
		font-size: .32rem;
		color: #131313;
		width: 1.5rem;
	}
	
	.phone {
		font-size: .32rem;
		color: #6f6f6f;
		border: 0;
		border-bottom: 1px solid #E5E5E5;
		flex: 1;
	}
	
	.main-two {
		height: 1.8rem;
		background: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		padding: 0 .3rem;
	}
	
	.two-left {
		display: flex;
		/*	align-items: center;*/
		justify-content: flex-start;
		margin-right: .2rem;
	}
	
	.two-text {
		font-size: .32rem;
		color: #131313;
	}
	
	.two-content {
		flex: 1;
	}
	
	.content-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: .86rem;
	}
	
	.quyuming {
		border: 0;
		height: .8rem;
		border-bottom: 1px solid #E5E5E5;
		font-size: .28rem;
		color: #6F6F6F;
		flex: 1;
	}
	
	.content-top img {
		height: .36rem;
	}
	
	.content-bottom {
		height: .86rem;
		display: flex;
	}
	
	.xiangxi {
		border: 0;
		height: .86rem;
		font-size: .28rem;
		color: #6F6F6F;
	}
	
	.bottom {
		background: #0DA5FE;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 6rem;
		height: .9rem;
		border-radius: .6rem;
		position: fixed;
		bottom: 0;
		margin: 0 .7rem .8rem .7rem;
	}
	
	.bottom-text {
		font-size: .32rem;
		color: #FFFFFF;
	}
	.distpicker-address-wrapper{position: fixed;top: 0;left: 0;width: 100%;height: 100%;overflow: scroll;background: rgba(0,0,0,.5);}
</style>