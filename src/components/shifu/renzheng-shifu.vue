<template>
	<div class="wrapper">
		<div class="wrapper">
			<div class="header">
				<div class="header-cebian" @click="back()">
					<img src="../../../static/youjian.png" />
				</div>
				<div class="header-text">认证中心</div>
				<div class="header-cebian"></div>
			</div>
			<div class="main">
				<div class="main-one">
					<input type="text" placeholder="真实姓名" v-model="msdName" />
				</div>
				<div class="main-one">
					<input type="text" placeholder="身份证号码" v-model="msdCardId" />
				</div>
				<div class="main-one">
					<select v-model="msdCoIsCompany">
						<option value="1">我是公司</option>
						<option value="2">我是师傅</option>
					</select>
				</div>
				<div class="main-one">
					<input type="text" :placeholder="msdCoIsCompany==1?'请输入公司经营时长，擅长什么，服务特色！':'请输入性别，年龄，身高，体重，学历，工作经历，擅长。'" v-model="msdCoIntroduce" />
				</div>
				<div class="main-one" @click="changeboo()">
					<input type="text" placeholder="选择分类" v-model="msdSsName" readonly="readonly" />
				</div>
				<div class="main-one">
					<input type="text" placeholder="支付宝实名认证姓名" v-model="msdCwAliBindingName" />
				</div>
				<div class="main-one">
					<input type="text" placeholder="支付宝账号" v-model="msdCwAliBindingCode" />
				</div>
				<!--<div class="main-one">
					<input type="text" placeholder="微信实名认证姓名" v-model="msdCwWechatBindingName" />
				</div>
				<div class="main-one">
					<input type="text" placeholder="微信账号" v-model="msdCwWechatBindingCode" />
				</div>-->
				<div class="main-two">
					<div class="two-text">身份证正面</div>
					<div class="two-box">
						<img src="../../../static/shenfen.png" />
						<img src="../../../static/zhaopian.png" @click="upload('sz')" id="sz" />
					</div>
				</div>
				<div class="main-two">
					<div class="two-text">身份证反面</div>
					<div class="two-box">
						<img src="../../../static/shenfen.png" />
						<img src="../../../static/zhaopian.png" @click="upload('sf')" id="sf" />
					</div>
				</div>
				<div class="main-two">
					<div class="two-text">营业执照</div>
					<div class="two-box">
						<img src="../../../static/yyzz.png" />
						<img src="../../../static/zhaopian.png" @click="upload('yy')" id="yy" />
					</div>
				</div>
				<div class="main-two">
					<div class="two-text">人脸识别图</div>
					<div class="two-box">
						<img src="../../../static/shenfen.png" />
						<img src="../../../static/zhaopian.png" @click="upload('rl')" id="rl"/>
					</div>
					<div class="two-zi">注意：人脸识别时请拍摄正面照，否则将会影响接单</div>
				</div>
				<!--<div class="main-two">
					<div class="two-text">特种营业执照</div>
					<div class="two-box">
						<img src="../../../static/yyzz.png" />
						<img src="../../../static/zhaopian.png" />
					</div>
				</div>-->
				<div class="bottom" @click="myajax()">
					<div class="bottom-text">确认提交</div>
				</div>
			</div>
		</div>
		<div class="layui" v-if="boo">
			<div class="layui-inner">
				<div class="layui-tab" v-for="val in navtab" @click="changenum(val.msdServiceStyleId,val.msdSsName)">
					{{val.msdSsName}}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'renzhengzhongxin',
		data() {
			return {
				files: [],
				uploadtarget: '',
				msdName: '',
				msdCardId: '',
				navtab: [],
				msdSsName: '',
				msdServiceStyleId: '',
				boo: false,
				msdCoIntroduce: '',
				msdCwAliBindingCode: '',
				msdCwAliBindingName: '',
				msdCwWechatBindingName: '',
				msdCwWechatBindingCode: '',
				msdCoIsCompany:1
			}
		},
		methods: {
			changeboo: function() {
				this.boo = !this.boo
			},
			changenum: function(id, name) {
				this.msdServiceStyleId = id
				this.msdSsName = name
				this.changeboo()
			},
			have: function() {
				var that = this
				$.ajax({
					type: 'post',
					url: that.myurl + '/user/selectMsdServiceStyle',
					success: function(res) {
						if(res.status == 200) {
							that.navtab = res.data
						} else {
							alert(res.msg)
						}
					},
					error: function(res) {
						alert('网络连接失败，请检查网络后再试！')
					}
				})
				//				获取钱包
				$.ajax({
					type: 'post',
					url: that.myurl + '/company/queryCompanyWallet',
					data: {
						msdCompanyId: localStorage.getItem('msdCompanyId')
					},
					success: function(res) {
						if(res.status == 200) {
							that.msdName=res.data.msdCwAliBindingName
							that.msdCwAliBindingName=res.data.msdCwAliBindingName
							that.msdCwAliBindingCode=res.data.msdCwAliBindingCode
							that.msdCwWechatBindingName=res.data.msdCwWechatBindingName
							that.msdCwWechatBindingCode=res.data.msdCwWechatBindingCode
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
			myajax: function() {
				var that = this
				//				提交认证
//				if(that.msdName==''||that.msdCardId==''||$('#sz').attr('imgsrc')==undefined||$('#sf').attr('imgsrc')==undefined||that.msdServiceStyleId==''){
//					alert('资料填写不完整')
//					return false;
//				}
				$.ajax({
					type: 'post',
					url: that.myurl + '/company/updateCompanInfoById',
					data: {
						msdCompanyId: localStorage.getItem('msdCompanyId'),
						msdCoName: that.msdName,
						msdCoCardId: that.msdCardId,
						msdCoCardFrontImg: $('#sz').attr('imgsrc'),
						msdCoCardBackImg: $('#sf').attr('imgsrc'),
						msdCoBusinessLicenceImg: $('#yy').attr('imgsrc'),
						msdCoFaceOne:$('#rl').attr('imgsrc'),
						msdServiceStyleId: that.msdServiceStyleId,
						msdCoIntroduce: that.msdCoIntroduce,
						msdCwAliBindingCode: that.msdCwAliBindingCode,
						msdCwAliBindingName: that.msdCwAliBindingName,
						msdCwWechatBindingName: that.msdCwWechatBindingName,
						msdCwWechatBindingCode: that.msdCwWechatBindingCode,
						msdCwIsAliBinding: 1,
						msdCwIsWechatBinding: 1,
						msdCoIsCompany:that.msdCoIsCompany
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
			},
			upload: function(target) {
				var that = this
				that.files = []
				that.uploadtarget = target
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
					//					that.upsrc = path
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
        plus.nativeUI.showWaiting('上传中')
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
					$('#' + thats.uploadtarget + '').attr('src', canvas.toDataURL('image/jpeg', 1 || 0.8))
					$.ajax({
						type: 'post',
						url: thats.myurl + '/company/imageCompanyCardImage',
						data: {
							imgStr: canvas.toDataURL('image/jpeg', 1 || 0.8)
						},
						success: function(res) {
              plus.nativeUI.closeWaiting()
							if(res.status == 200) {
								$('#' + thats.uploadtarget + '').attr('imgsrc', res.data)

							} else {
								alert(res.msg)
							}
						},
						error: function(res) {
              plus.nativeUI.closeWaiting()
							alert('网络连接失败，请检查网络后再试！')
						}
					})
				}
			}
		},
		mounted() {
			this.have()
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
	select{
		height: .8rem;
		width: 100%;
		border: 0;
		background: none;
	}
	option{background: none;}
	.layui {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .5);
		display: flex;
		align-items: flex-end;
		justify-content: center;
	}

	.layui-inner {
		background: #FFFFFF;
		border-radius: .1rem;
		height: 5rem;
		overflow-y: scroll;
		width: 100%;
	}

	.layui-tab {
		height: 1rem;
		border-bottom: 1px solid ghostwhite;
		display: flex;
		align-items: center;
		justify-content: center;
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
		padding: 0 .3rem;
		background: #FFFFFF;
		margin-bottom: .2rem;
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
		color: #26261E;
		margin-left: .3rem;
	}

	.main {
		height: calc(100% - .96rem);
		overflow-x: hidden;
		overflow-y: scroll;
		background: #FFFFFF;
	}

	.main-one {
		height: .9rem;
		border-bottom: 1px solid #E4E4E6;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		padding: 0 .3rem;
	}

	input {
		border: 0;
		height: .9rem;
		width: 100%;
		font-size: .28rem;
	}

	.main-two {
		height: 3.4rem;
		padding: 0 .3rem;
	}

	.two-text {
		font-size: .28rem;
		color: #272727;
		padding: .3rem 0;
	}

	.two-box {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.two-box img {
		height: 2.2rem;
		border-radius: .12rem;
	}

	.bottom {
		height: .96rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #0DA5FE;
		border-radius: .6rem;
		margin: .6rem .7rem;
	}

	.bottom-text {
		font-size: .32rem;
		color: #FFFFFF;
	}
</style>
