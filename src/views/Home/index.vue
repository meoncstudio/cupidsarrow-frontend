<template>
	<div class="black">
		<div class="hero">
			<div class="hero-body">
				<div class="flower animated fadeIn"></div>
				<div class="text animated fadeInUp">
					<div class="h0">CupidsArrow</div>
					<div class="h3">This is subtitle</div>
				</div>
			</div>
		</div>

		<div class="container"></div>
	
	</div>
</template>

<script>
import Carousel from "@/components/Carousel";
export default {
    name: "Home",
    components: {
        Carousel
    },
    mounted() {
    }
}
</script>

<style lang="scss" scoped>

.h0{
	letter-spacing: -.002em;
	line-height: 1.09091;
}

.hero{
	height: 100vh;
	max-height: 1000px;
	width: 100%;
	text-align: center;
	background: $dark-color;
	overflow: hidden;
	padding: 0px !important;

	.hero-body{
		padding: 0px !important;
		height: 100%;
		position: relative;
	}
	
	.flower{
		background-image: url("~@/assets/flower-index.jpg");
		background-position: center top;
		background-size: contain;
		--height: 75%;
		--width: calc(max(1800px, var(--height)));
		height: var(--height);
		width: var(--width);
		margin-left: calc((var(--width) - 100%) * -0.5);
		z-index: 0;
	}
	
	.text{
		position: absolute;
		bottom: 10%;
		width: 100%;
		left: 0px;
		z-index: 999;
	}
	
	.h0{
		margin-top: 30px;
	}
}

</style>