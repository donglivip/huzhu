<template>
	<div class="wrapper">
		<div class="header">
			<div class="header-cebian" @click="back()">
				<img src="../../../static/youjian.png" />
			</div>
			<div class="header-text">设置</div>
			<div class="header-cebian" style="white-space: nowrap;" @click="myajax()">
				保存
			</div>
		</div>
		<div class="main">
			<div class="main-box">
				<div class="main-one" @click="upload()">
					<div class="one-text">头像</div>
					<img src="../../../static/234564.jpg" v-if="madCoHeadImg=='null'"/>
					<img :src="madCoHeadImg | myimg"  v-if="madCoHeadImg!='null'"/>
				</div>
				<div class="main-two">
					<div class="two-text">昵称</div>
					<input class="two-news" type="text" v-model="msdCoName" placeholder="请输入用户名"/>
				</div>
				<!--<div class="main-three">
					<div class="three-text">登录密码</div>
					<img src="../../../static/you.png" />
				</div>-->
			</div>
			<div class="main-bottom" @click="exit()">
				<div class="bottom-text">退出账号</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'shezhi-shifu',
		data() {
			return {
				madCoHeadImg:localStorage.getItem('madCoHeadImg'),
				msdCoName:localStorage.getItem('msdCoName'),
				tabdata: [],
				madCoHeadImgurl:''
			}
		},
		methods: {
			exit:function(){
				localStorage.clear()
				this.opennew('denglu-shifu')
			},
			upload: function() {
				var that = this
				var btnArray = [{
					title: "照相机"
				}, {
					title: "相册"
				}]; //选择按钮  1 2 3
				plus.nativeUI.actionSheet({
					title: "请选择",
					cancel: "取消",
					buttons: btnArray
				}, function(e) {
					var index = e.index;
					switch(index) {
						case 1:
							that.camera();
							break;
						case 2:
							that.album();
							break;
					}
				});
			},
			camera: function() {
				//				相机
				var that = this
				var cmr = plus.camera.getCamera();
				cmr.captureImage(function(p) {
					//成功
					plus.io.resolveLocalFileSystemURL(p, function(entry) {
						var img_name = entry.name;
						var img_path = entry.toLocalURL();
						//						that.upsrc = img_path
						that.upimg = !that.upimg
						that.upload_img(img_path)
					}, function(e) {
						alert("读取拍照文件错误：" + e.message);
					});

				}, function(e) {
					alert("失败：" + e.message);
				}, {
					filename: '_doc/camera/',
					index: 1
				});
			},
			album: function() {
				//				相册
				var that = this
				plus.gallery.pick(function(path) {
					that.upimg = !that.upimg
					that.upload_img(path);
				}, function(e) {
					alert("取消选择图片");
				}, {
					filter: "image"
				});
			},
			upload_img: function(p) {
				var thats = this
				var img = new Image();
				img.src = p; // 传过来的图片路径在这里用。
				img.onload = function() {
					var that = this;
					//生成比例 
					var w = that.width,
						h = that.height,
						scale = w / h;
					w = 480 || w; //480  你想压缩到多大，改这里
					h = w / scale;

					//生成canvas
					var canvas = document.createElement('canvas');
					var ctx = canvas.getContext('2d');
					$(canvas).attr({
						width: w,
						height: h
					});
					ctx.drawImage(that, 0, 0, w, h);
					
					$.ajax({
						type: 'post',
						url: thats.myurl + '/company/imageCompanyHeadImage',
						data: {
							imgStr:canvas.toDataURL('image/jpeg', 1 || 0.8)
						},
						success: function(res) {
							if(res.status == 200) {
								thats.madCoHeadImg=res.data
								thats.madCoHeadImgurl=res.data
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
			myajax: function() {
				var that = this
				//				提交修改
				$.ajax({
					type: 'post',
					url: that.myurl + '/company/updateCompanInfoById',
					data: {
						msdCompanyId: localStorage.getItem('msdCompanyId'),
						madCoHeadImg:that.madCoHeadImgurl,
						msdCoName:that.msdCoName
					},
					success: function(res) {
						if(res.status == 200) {
							localStorage.setItem('msdCoName',that.msdCoName)
							localStorage.setItem('madCoHeadImg',that.madCoHeadImgurl)
							that.back()
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
		overflow: hidden;
	}
	input{flex: 1;border: 0;height: 100%;text-align: right;}
	.wrapper {
		background: #F7F7F9;
	}
	
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: .96rem;
		background: #FFFFFF;
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
		color: #272727;
	}
	
	.main-box {
		background: #FFFFFF;
	}
	
	.main-one {
		height: 1.8rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #E4E4E6;
		padding: 0 .3rem;
	}
	
	.main-one img {
		height: 1.2rem;
		border-radius: 2rem;
	}
	
	.one-text {
		font-size: .28rem;
		color: #26261E;
	}
	
	.main-two {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #E4E4E6;
		padding: 0 .3rem;
		height: 1rem;
	}
	
	.two-text {
		font-size: .28rem;
		color: #26261E;
	}
	
	.two-news {
		font-size: .28rem;
		color: #CCCCCC;
		padding-right: .3rem;
	}
	
	.main-three {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #E4E4E6;
		padding: 0 .3rem;
		height: 1rem;
	}
	
	.three-text {
		font-size: .28rem;
		color: #26261E;
	}
	
	.main-three img {
		height: .4rem;
	}
	
	.main-bottom {
		height: .9rem;
		background: #0DA5FE;
		margin: 0 .72rem;
		border-radius: .6rem;
		position: fixed;
		bottom: .8rem;
		width: 6rem;
	}
	
	.bottom-text {
		text-align: center;
		line-height: .9rem;
		font-size: .32rem;
		color: #FFFFFF;
	}
</style>