<template>
	<div id="app">
		<app-header/>
		<router-view/>
	</div>
</template>

<script>
	import Header from '@/components/header/Header.vue'

	export default {
		created() {
			this.$store.dispatch('auth/autoLogin');
		},
		components: {
			AppHeader: Header,
		},
		
	}
</script>

<style lang="scss">
	@import './assets/css/app.scss';

	#app {
		font-family: "Avenir", Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}
</style>
