<template>
	<div class="wrapper">
		<div class="header">
			<div class="header-cebian" @click="back()">
				<img src="../../static/youjian.png" />
			</div>
			<div class="header-text">我的地址</div>
			<div class="header-cebian" @click="opennew('xinzengdizhi','')">
				<img src="../../static/add.png" />
			</div>
		</div>
		<div class="main">
			<div class="main-box" v-for="val in tabdata">
				<div class="main-top">
					<div class="top-text">地址：</div>
					<div class="top-news">{{val.msdAdProvince+val.msdAdCity+val.msdAdArea+val.msdAdDetailed}}</div>
				</div>
				<div class="main-content">
					<div class="content-text">联系人：{{val.msdAdName}}</div>
					<div class="content-text">{{val.msdAdPhone}}</div>
				</div>
				<div class="main-bottom">
					<div class="bottom-box" @click="active(val.msdAddressId)">
						<img src="../../static/xuanzhong.png" v-show='val.msdAdIsDefault==1'/>
						<img src="../../static/xuanzhong (1).png" v-show='val.msdAdIsDefault!=1'/>
						<div class="bottom-text">设为默认地址</div>
					</div>
					<div class="bottom-box">
						<div class="bottom-news" @click.stop="godelete(val.msdAddressId,val.msdAdIsDefault)">删除</div>
						<div class="bottom-news" @click="opennew('xinzengdizhi',val.msdAddressId)">编辑</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'wodedizhi',
		data() {
			return {
				tabdata: []
			}
		},
		methods: {
			active:function(id){
				var that = this
				//				设置默认地址
				$.ajax({
					type: 'post',
					url: that.myurl + '/user/updateAddressUser',
					data: {
						msdAdUpdateName: localStorage.getItem('userid'),
						msdAddressId:id,
						msdAdIsDefault:1,
						msdUserId:localStorage.getItem('userid')
					},
					success: function(res) {
						if(res.data == 1) {
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
			godelete:function(id,type){
				var that = this
				//				删除地址
				$.ajax({
					type: 'post',
					url: that.myurl + '/user/updateAddressUser',
					data: {
						msdAdUpdateName: localStorage.getItem('userid'),
						msdAddressId:id,
						msdAdIsDelete:1,
						msdUserId:localStorage.getItem('userid'),
						msdAdIsDefault:type
					},
					success: function(res) {
						if(res.data == 1) {
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
				//				获取地址列表
				$.ajax({
					type: 'post',
					url: that.myurl + '/user/selectAddressUser',
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
				this.$store.state.msdAddressId = id
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
			msdAddressId() {
				return this.$store.state.msdAddressId
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
	.main{
		overflow-y: scroll;
		height: calc(100% - .96rem);
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
		margin-bottom: 1px solid #F7F7F9;
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
	
	.main-box {
		height: 2.4rem;
		background: #FFFFFF;
		padding: 0 .3rem;
		margin-bottom: .2rem;
	}
	
	.main-top {
		height: .7rem;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}
	
	.top-text {
		font-size: .28rem;
		color: #26261E;
		margin-right: .;
	}
	
	.top-news {
		font-size: .28rem;
		color: #26261E;
	}
	
	.main-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: .5rem;
	}
	
	.content-text {
		font-size: .28rem;
		color: #26261E;
	}
	
	.main-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.bottom-box {
		width: 2.1rem;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}
	
	.bottom-box img {
		height: .34rem;
		margin-right: .12rem;
	}
	
	.bottom-text {
		font-size: .24rem;
		color: #26261E;
	}
	
	.bottom-news {
		font-size: .24rem;
		color: #CCCCCC;
		border: 1px solid #CCCCCC;
		border-radius: 2rem;
		width: 1rem;
		height: .5rem;
		text-align: center;
		line-height: .5rem;
		margin-right: .3rem;
	}
</style>