<template>
	<div class="wrapper">
		<div class="header02" @click="back()">

		</div>
		<div id="output"></div>
		<img src="../../../static/back02.png" @click="sharew()" style="width: 100%;height: 100%;"/>
	</div>
</template>

<script>
	import'../../assets/js/jquery.qrcode.min.js'
	export default {
		name: 'share-shifu',
		data() {
			return {
				tabdata: [],
				sharewx: '',
				shareqq: ''
			}
		},
		methods: {
			back: function() {
				this.$router.back()
			},
			opennew: function(target, id) {
				this.$store.state.msdNewsId = id
				this.$router.push({
					name: target
				})
			},
			sharew: function() {
				var that = this
				that.sharewx.send({
					title: '最好用的服务软件 无忧互助！',
					content: "最好用的服务软件 无忧互助！",
					href: that.myurl + "/user/share?phone=" + localStorage.getItem('msdCoPhone') + "&userId=" + localStorage.getItem('msdCompanyId') + "&state=2",
					extra: {
						scene: "WXSceneSession"
					}
				}, function() {
					alert("分享成功！");
				}, function(e) {
					alert("分享失败,请检查网络或者是否安装微信!");
				});
			}
		},
		mounted() {
			var that = this
			$('#output').qrcode(that.myurl + "/user/share?phone=" + localStorage.getItem('msdCoPhone') + "&userId=" + localStorage.getItem('msdCompanyId') + "&state=2");
			function plusReady() {
				plus.share.getServices(function(s) {
					for(var i in s) {
						if('weixin' == s[i].id) {
							that.sharewx = s[i];
						}
						if('qq' == s[i].id) {
							that.shareqq = s[i];
						}
					}
				}, function(e) {
					alert("获取分享服务列表失败：" + e.message);
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
			}
		}
	}
</script>

<style>
	html,
	body,
	.wrapper{
		width: 100%;
		height: 100%;
	}
	
	.header02 {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 1rem;
	}
	#output{
		position: fixed;
		top: 6rem;
		left: 2.3rem;
		z-index: 999;
	}
	canvas{
		width: 2.5rem!important;
		height:2.5rem!important;
	}
</style>