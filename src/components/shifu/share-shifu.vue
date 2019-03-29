<template>
	<div class="wrapper">
		<div class="header" @click="back()">

		</div>
		<img src="../../../static/back02.png" @click="sharew()" />
	</div>
</template>

<script>
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

<style scoped>
	html,
	body,
	.wrapper,
	img {
		width: 100%;
		height: 100%;
	}
	
	.header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 1rem;
	}
</style>