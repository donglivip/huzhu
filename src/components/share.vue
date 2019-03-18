<template>
	<div class="wrapper">
		<div class="header" @click="back()">

		</div>
		<img src="../../static/back02.png" @click="sharew()"/>
	</div>
</template>

<script>
	export default {
		name: 'share',
		data() {
			return {
				tabdata: [],
				sharewx:'',
				shareqq:''
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
			sharew:function(){
				var that=this
				this.sharewx.send({
					title: '最好用的服务软件 无忧互助！',
					content: "最好用的服务软件 无忧互助！",
					href: that.myurl + "/user/share?phone=" + localStorage.getItem('userphone') + "&userId="+localStorage.getItem('userid')+"&state=1",
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
			var that=this
			document.addEventListener("plusready", function() {
				// 扩展API加载完毕，现在可以正常调用扩展API
				plus.share.getServices(function(s) {
					shares = s;
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
			}, false);
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