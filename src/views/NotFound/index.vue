<template>
	<div class="empty">
		<div class="empty-icon">
			<i class="icon icon-cross"></i>
		</div>
		<p class="empty-title h5">404</p>
		<p class="empty-subtitle">Nothing here!</p>
		<div class="empty-action">
			<button class="btn btn-primary" @click="routerTo('/')">Home</button>
		</div>
	</div>
</template>

<script>
export default {
	name: "NotFound",
	methods: {
		routerTo(addr) {
			this.$router.push(addr);
		}
	}
}
</script>

<style lang="scss" scoped>
.empty {
	background: none;
}
</style>