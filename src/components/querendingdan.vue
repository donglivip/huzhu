<template>
	<div class="wrapper">
		<div class="header">
			<div class="header-cebian" @click="back()">
				<img src="../../static/youjian.png" />
			</div>
			<div class="header-text">确认订单</div>
			<div class="header-cebian"></div>
		</div>
		<div class="main">
			<div class="main-one" @click="opennew('wodedizhi')">
				<div class="one-box">
					<div class="one-text">订单地址：</div>
					<div class="one-text">{{tabdata02.msdAdProvince+tabdata02.msdAdCity+tabdata02.msdAdArea+tabdata02.msdAdDetailed}}</div>
				</div>
				<div class="one-hezi">
					<div class="one-text">联系人：{{tabdata02.msdAdName}}</div>
					<div class="one-text">{{tabdata02.msdAdPhone}}</div>
				</div>
			</div>
			<div class="main-two">
				<div class="two-text">服务类型：</div>
				<div class="two-text">{{MsdServiceStylename}}</div>
			</div>
			<div class="main-two" @click="show()">
				<div class="two-text">上门时间：{{msdOrIsAppointmentTime==2?'立即上门':msdOrAppointmentTime}}</div>
				<img src="../../static/you-hui.png" />

			</div>
			<div class="main-two">
				<div class="two-text">服务公司：{{msdCompanyname}}</div>
				<div class="two-text"></div>
			</div>
			<div class="main-two" @click="layuichange()">
				<div class="two-text">服务项目：{{servertext.msdCsName}}</div>
				<img src="../../static/you-hui.png" />
			</div>
			<div class="main-two" @click="paychange()">
				<div class="two-text">支付方式：{{state | ptype}}</div>
				<img src="../../static/you-hui.png" />
			</div>
			<div class="main-two">
				<div class="two-text">最低价:</div>
				<div class="two-news">￥{{servertext.msdCsPrice}}</div>
			</div>
			<div class="main-three">
				<div class="three-text">备注：</div>
				<input type="text" placeholder="请输入您想要备注的内容" v-model="msdOrRemark" />
			</div>
			<div class="main-four">
				<div class="four-text">附照（最多三张）</div>
				<img :src="val" v-for="val in files" />
				<img src="../../static/jia.png" @click="upload()" v-if="files.length<3" />
			</div>
		</div>
		<div class="bottom" @click="gosubmit()">
			<div class="bottom-text">确认提交</div>
		</div>
		<!--支付方式-->
		<div class="layui" v-if="payboo" @click="paychange()">
			<div class="layui-bottom">
				<div class="layui-tab" @click.stop="changepay(1)">
					支付宝
				</div>
				<div class="layui-tab" @click.stop="changepay(2)">
					微信
				</div>
				<div class="layui-tab" @click.stop="changepay(3)">
					钱包支付
				</div>
			</div>
		</div>
		<!--服务项目-->
		<div class="layui" v-if="layuiboo" @click="layuichange()">
			<div class="layui-bottom">
				<div class="layui-tab" v-for="(val,index) in tabdata" @click="changeserver(val)">
					{{val.msdCsName}}
				</div>
			</div>
		</div>
		<!--上门时间-->
		<date-time ref="dateTime" type="dateTime" @confirm="select"></date-time>
	</div>
</template>

<script>
	import DateTime from 'vue-date-time-m'
	export default {
		name: 'querendingdan',
		data() {
			return {
				msdOrAppointmentTime: '',
				tabdata: [],
				layuiboo: false,
				timeboo: false,
				servertext: '',
				serverid: '',
				tabdata02: [],
				msdOrIsAppointmentTime: 2,
				files: [],
				filesurl: [],
				msdOrRemark: '',
				state: 1,
				payboo: false,
				channel:''
			}
		},
		methods: {
			changepay: function(index) {
				this.state = index
				this.paychange()
			},
			paychange: function() {
				this.payboo = !this.payboo
			},
			gosubmit: function() {
				var that = this
				//				提交订单
				if(this.msdOrIsAppointmentTime == 2) {
					var myDate = new Date();
					this.msdOrAppointmentTime = myDate.toLocaleDateString() + ' ' + myDate.getHours() + ':' + myDate.getMinutes() + ':' + myDate.getSeconds()
				} else {
					this.msdOrAppointmentTime = this.msdOrAppointmentTime + ':00'
				}
				if(this.state == 3) {
//					余额支付
					$.ajax({
						type: 'post',
						url: that.myurl + '/user/userWalletPayOrder',
						data: {
							msdUserId: localStorage.getItem('userid'),
							msdServiceStyleId: that.MsdServiceStyleId,
							msdAddressId: that.tabdata02.msdAddressId,
							msdOrPrice: that.servertext.msdCsPrice,
							msdOrImg1: that.filesurl[0],
							msdOrImg2: that.filesurl[1],
							msdOrImg3: that.filesurl[2],
							msdOrIsAppointmentTime: that.msdOrIsAppointmentTime,
							msdOrIsDelete: 2,
							msdOrCreateName: localStorage.getItem('userid'),
							msdOrRemark: that.msdOrRemark,
							msdOrAppointmentTime: that.msdOrAppointmentTime,
							msdCompanyId: that.msdCompanyId
						},
						success: function(res) {
							if(res.data == 1) {
								that.opennew('wodedingdan')
							} else if(res.data == -1) {
								alert('余额不足！')
							} else {
								alert(res.msg)
							}
						},
						error: function(res) {
							alert('网络连接失败，请检查网络后再试！')
						}
					})
				} else {
//					线上支付
					$.ajax({
						type: 'post',
						url: that.myurl + '/user/userCreateOrderPay',
						dataType:'json',
						data: {
							msdUserId: localStorage.getItem('userid'),
							msdServiceStyleId: that.MsdServiceStyleId,
							msdAddressId: that.tabdata02.msdAddressId,
							msdOrPrice: that.servertext.msdCsPrice,
							msdOrImg1: that.filesurl[0],
							msdOrImg2: that.filesurl[1],
							msdOrImg3: that.filesurl[2],
							msdOrIsAppointmentTime: that.msdOrIsAppointmentTime,
							msdOrIsDelete: 2,
							msdOrCreateName: localStorage.getItem('userid'),
							msdOrRemark: that.msdOrRemark,
							msdOrAppointmentTime: that.msdOrAppointmentTime,
							msdCompanyId: that.msdCompanyId,
							state:that.state
						},
						success: function(res) {
							if(that.state == 1) {
								//								支付宝充值
								plus.payment.request(that.channel[0], res.data[0], function(result) {
									plus.nativeUI.alert("支付成功！", function() {
										that.back()
									});
								}, function(error) {
									alert('支付失败！')
								});
							} else {
								//								微信充值
								plus.payment.request(that.channel[1], res, function(result) {
									plus.nativeUI.alert("支付成功！", function() {
										that.back()
									});
								}, function(error) {
									alert('支付失败！')
								});
							}
						},
						error: function(res) {
							alert('网络连接失败，请检查网络后再试！')
						}
					})
				}

			},
			show() {
				this.$refs.dateTime.show()
			},
			// 日期组件回调
			select(val) {
				this.msdOrIsAppointmentTime = 1
				this.msdOrAppointmentTime = val
			},
			changeserver: function(val) {
				this.servertext = val
			},
			layuichange: function() {
				this.layuiboo = !this.layuiboo
			},
			myajax: function() {
				var that = this
				//				获取公司下服务种类
				$.ajax({
					type: 'post',
					url: that.myurl + '/user/selectCompanyIdMsdCompanyService',
					data: {
						msdCompanyId: that.msdCompanyId
					},
					success: function(res) {
						if(res.status == 200) {
							that.tabdata = res.data
							that.servertext = res.data[0]
						} else {
							alert(res.msg)
						}
					},
					error: function(res) {
						alert('网络连接失败，请检查网络后再试！')
					}
				})
				//				获取收货地址列表
				$.ajax({
					type: 'post',
					url: that.myurl + '/user/selectAddressUser',
					data: {
						msdUserId: localStorage.getItem('userid')
					},
					success: function(res) {
						if(res.status == 200) {
							if(res.data.length == 0) {
								that.opennew('xinzengdizhi')
							} else {
								for(var i in res.data) {
									if(res.data[i].msdAdIsDefault == 1) {
										that.tabdata02 = res.data[i]
									}
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
			},
			back: function() {
				this.$router.back()
			},
			opennew: function(target) {
				this.$router.push({
					name: target
				})
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
						url: thats.myurl + '/user/inserUserImgOrder',
						data: {
							imgStr: canvas.toDataURL('image/jpeg', 1 || 0.8)
						},
						success: function(res) {
							if(res.status == 200) {
								thats.files.push(canvas.toDataURL('image/jpeg', 1 || 0.8))
								thats.filesurl.push(res.data)
							} else {
								alert(res.msg)
							}
						},
						error: function(res) {
							alert('网络连接失败，请检查网络后再试！')
						}
					})
				}
			}
		},
		mounted() {
			this.myajax()
			if(localStorage.getItem('userid') == null) {
				this.$router.replace({
					name: 'denglu'
				})
			}
			var that = this
			// 1. 获取支付通道
			function plusReady() {
				// 获取支付通道
				plus.payment.getChannels(function(channels) {
					that.channel = channels;
				}, function(e) {
					alert("获取支付通道失败：" + e.message);
				});
			}
			if(window.plus) {
				plusReady();
			} else {
				document.addEventListener('plusready', plusReady, false);
			}
		},
		computed: {
			myurl() {
				return this.$store.state.myurl
			},
			msdCompanyId() {
				return this.$store.state.msdCompanyId
			},
			MsdServiceStylename() {
				return this.$store.state.MsdServiceStylename
			},
			msdCompanyname() {
				return this.$store.state.msdCompanyname
			},
			MsdServiceStyleId() {
				return this.$store.state.MsdServiceStyleId
			}
		},
		components: {
			DateTime
		},
		filters:{
			ptype:function(value){
				if(value==1){
					return '支付宝'
				}else if(value==2){
					return '微信'
				}else{
					return '钱包支付'
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
	
	.layui,
	.modal {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, .5);
		display: flex;
		align-items: flex-end;
	}
	
	.layui-bottom {
		background: #FFFFFF;
		width: 100%;
		height: 3rem;
		overflow-y: scroll;
	}
	
	.layui-tab {
		height: 1rem;
		border-bottom: 1px solid ghostwhite;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: .25rem;
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
		background: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: .2rem;
		padding: 0 .3rem;
	}
	
	.header-cebian {
		width: .3rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.header-cebian img {
		height: .38rem;
	}
	
	.header-text {
		font-size: .34rem;
		color: #26261E;
	}
	
	.main {
		height: calc(100% - .96rem);
		overflow-x: hidden;
		overflow-y: scroll;
	}
	
	.main-one {
		height: 1.6rem;
		background: #FFFFFF;
		padding: 0 .3rem;
		margin-bottom: .2rem;
	}
	
	.one-box {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		height: .8rem;
	}
	
	.one-text {
		font-size: .28rem;
		color: #26261E;
	}
	
	.one-hezi {
		height: .8rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.main-two {
		background: #FFFFFF;
		height: 1rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #D8D8D8;
		padding: 0 .3rem;
	}
	
	.two-text {
		font-size: .28rem;
		color: #26261E;
	}
	
	.main-two img {
		height: .32rem;
	}
	
	.two-news {
		font-size: .28rem;
		color: #E24B2D;
	}
	
	.main-three {
		height: 1rem;
		background: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		border-bottom: 1px solid #D8D8D8;
		padding: 0 .3rem;
	}
	
	.three-text {
		font-size: .28rem;
		color: #26261E;
	}
	
	input {
		border: 0;
		height: 1rem;
		font-size: .28rem;
		color: #767676;
		flex: 1;
	}
	
	.main-four {
		height: 3rem;
		background: #FFFFFF;
		padding: .2rem .3rem;
		margin-bottom: 2rem;
	}
	
	.four-text {
		display: flex;
		align-items: center;
		font-size: .28rem;
		color: #26261E;
		height: .8rem;
	}
	
	.main-four img {
		height: 1.6rem;
	}
	
	.bottom {
		width: 6rem;
		height: .9rem;
		background: #0DA5FE;
		border-radius: .6rem;
		position: fixed;
		bottom: 0;
		margin: .8rem .72rem;
	}
	
	.bottom-text {
		text-align: center;
		line-height: .9rem;
		font-size: .32rem;
		color: #FFFFFF;
	}
</style>