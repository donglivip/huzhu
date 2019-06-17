<template>
	<div class="wrapper">
		<div class="header" @click="back()">
			<div class="header-cebian" ><img src="../../static/youjian.png" /></div>
			<div class="header-text">取消订单</div>
			<div class="header-cebian"></div>
		</div>
		<div class="main">
			<div class="box">
				<span>订单号：</span>
				<span>{{ msdOrderId }}</span>
			</div>
			<div class="box"><span>取消原因：</span></div>
			<textarea name="" id="" cols="30" rows="10" placeholder="请再次输入取消订单的原因" v-model="msdMocReason"></textarea>
			<div class="box"><span>提供现场图片（最少3张）</span></div>
			<div class="box">
				<img src="../../static/add.png" alt="" @click="upload(0)" v-if="msdMocPicture[0]==''"/>
				<img src="../../static/add.png" alt="" @click="upload(1)" v-if="msdMocPicture[1]==''"/>
				<img src="../../static/add.png" alt="" @click="upload(2)" v-if="msdMocPicture[2]==''"/>
				<img :src="msdMocPicture[0]" alt="" @click="upload(0)" v-if="msdMocPicture[0]!=''"/>
				<img :src="msdMocPicture[1]" alt="" @click="upload(1)" v-if="msdMocPicture[1]!=''"/>
				<img :src="msdMocPicture[2]" alt="" @click="upload(2)" v-if="msdMocPicture[2]!=''"/>
			</div>
			<div class="btn" @click="myajax()">申请取消</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'quxiao',
	data() {
		return {
			tabdata: [],
			msdMocReason: '',
			msdMocPicture: ['','',''],
			myindex:0
		};
	},
	methods: {
		myajax: function() {
			var that = this;
			//				发起取消订单
			$.ajax({
				type: 'post',
				url: that.myurl + '/company/updateMsdAndderOrinsertCancel',
				data: {
					msdCompanyUserId: localStorage.getItem('userid'),
					msdMocReason: that.msdMocReason,
					msdOrderId: that.msdOrderId,
					msdMocPicture: JSON.stringify(that.msdMocPicture),
					msdMocType: 1
				},
				success: function(res) {
					if (res.status == 200) {
						that.back()
					} else {
						alert(res.msg);
					}
				},
				error: function(res) {
					alert('网络连接失败，请检查网络后再试！');
				}
			});
		},
		back: function() {
			this.$router.back();
		},
		opennew: function(target, id) {
			this.$store.state.msdNewsId = id;
			this.$router.push({
				name: target
			});
		},
		upload: function(index) {
			var that = this;
			that.myindex=index
			var btnArray = [
				{
					title: '照相机'
				},
				{
					title: '相册'
				}
			]; //选择按钮  1 2 3
			plus.nativeUI.actionSheet(
				{
					title: '请选择',
					cancel: '取消',
					buttons: btnArray
				},
				function(e) {
					var index = e.index;
					switch (index) {
						case 1:
							that.camera();
							break;
						case 2:
							that.album();
							break;
					}
				}
			);
		},
		camera: function() {
			//				相机
			var that = this;
			var cmr = plus.camera.getCamera();
			cmr.captureImage(
				function(p) {
					//成功
					plus.io.resolveLocalFileSystemURL(
						p,
						function(entry) {
							var img_name = entry.name;
							var img_path = entry.toLocalURL();
							//						that.upsrc = img_path
							that.upimg = !that.upimg;
							that.upload_img(img_path);
						},
						function(e) {
							alert('读取拍照文件错误：' + e.message);
						}
					);
				},
				function(e) {
					alert('失败：' + e.message);
				},
				{
					filename: '_doc/camera/',
					index: 1
				}
			);
		},
		album: function() {
			//				相册
			var that = this;
			plus.gallery.pick(
				function(path) {
					//					that.upsrc = path
					that.upimg = !that.upimg;
					that.upload_img(path);
				},
				function(e) {
					alert('取消选择图片');
				},
				{
					filter: 'image'
				}
			);
		},
		upload_img: function(p) {
			var thats = this;
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
					url: thats.myurl + '/company/inserOrderCancelImg',
					data: {
						imgStr: canvas.toDataURL('image/jpeg', 1 || 0.8)
					},
					success: function(res) {
						if (res.status == 200) {
							thats.msdMocPicture[thats.myindex] = res.data
						} else {
							alert(res.msg);
						}
					},
					error: function(res) {
						alert('网络连接失败，请检查网络后再试！');
					}
				});
			};
		}
	},
	mounted() {},
	computed: {
		myurl() {
			return this.$store.state.myurl;
		},
		msdOrderId() {
			return this.$store.state.msdOrderId;
		}
	}
};
</script>

<style scoped>
.btn {
	width: 6rem;
	height: 0.8rem;
	background: #0da5fe;
	color: #ffffff;
	border-radius: 0.4rem;
	text-align: center;
	line-height: 0.8rem;
	position: absolute;
	bottom: .5rem;
	left: .6rem;
}
.remake {
	color: #ec472a;
	line-height: 0.35rem;
	padding: 0.15rem;
}
.box img {
	height: 1.6rem;
	width: 1.6rem;
	border: 1px solid #cccccc;
}
textarea {
	border: 1px solid #cccccc;
	width: 6.5rem;
	height: 1.4rem;
	border-radius: 0.1rem;
	margin: 0.1rem auto;
	display: block;
	padding: 0.1rem;
}
.box {
	min-height: 0.7rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 0.2rem;
}
.header {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 0.96rem;
	background: #ffffff;
}

.header-text {
	font-size: 0.32rem;
	color: #26261e;
	flex: 1;
	text-align: center;
}

.header-cebian {
	width: 0.3rem;
}
.header-cebian img {
	height: 0.4rem;
	margin-left: 0.2rem;
}
.main {
	height: calc(100% - 0.96rem);
	overflow-y: scroll;
}
</style>
