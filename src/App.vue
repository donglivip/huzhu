<template>
  <div id="app">
    <keep-alive>
			<router-view v-if="$route.meta.keepAlive" class="child-view"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive" class="child-view"></router-view>  
  </div>
</template>

<script>
export default {
  name: 'App'
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
a{color: #333333;text-decoration: none;}
</style>
