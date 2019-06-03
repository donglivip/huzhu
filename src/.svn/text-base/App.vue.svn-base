<template>
	<div id="app">
		<router-view class="child-view"></router-view>
	</div>
</template>

<script>
	export default {
		name: 'App',
		mounted: function() {
			var that=this
			var first = null;
			function plusReady() {
				plus.key.addEventListener("backbutton", function() {
					if(first==null) {
						first = new Date().getTime();
						that.$router.back()
						setTimeout(function() {
							first = null;
						}, 1000);
					} else {
						if(new Date().getTime() - first < 1000) {
							plus.runtime.quit();
						}
					}
				})
				plus.navigator.setStatusBarBackground('#0DA5FE');
				plus.runtime.getProperty(plus.runtime.appid, function(inf) {
					$.ajax({
						type: "post",
						url: that.myurl + "/user/version",
						dataType: 'json',
						success: function(res) {
							if(res.data.msdVuVersion != inf.version) {
								//								版本更新
								plus.nativeUI.toast("正在为您更新资源~");
								plus.downloader.createDownload(that.myurl + res.data.msdVuUrl, {
									filename: "_doc/update/"
								}, function(d, status) {
									if(status == 200) {
										plus.runtime.install(d.filename, {}, function() {
											plus.nativeUI.alert("应用资源更新完成！点击重启！", function() {
												plus.runtime.restart();
											});
										}, function(e) {
											alert("安装更新包失败[" + e.code + "]：" + e.message);
										});
									} else {
										plus.nativeUI.closeWaiting();
										alert("下载更新包失败！");
									}
								}).start();
							}
						},
						error: function(err) {
							alert(JSON.stringify(err))
						}
					});
				});
			}
			if(window.plus) {
				plusReady();
			} else {
				document.addEventListener("plusready", plusReady, false);
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
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #333333;
		font-size: .25rem;
	}
	
	a {
		color: #333333;
		text-decoration: none;
	}
</style>