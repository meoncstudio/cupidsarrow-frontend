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

		
		<div class="containter">
			<h2>Activities</h2>
			<div class="columns animated fadeIn faster" v-for="activity in activitiesArray" :key="activity.uid">
				<div class="column col-3">
					<img :src="activity.img" class="img-responsive">
				</div>
				<div class="column col-3">
					<div class="h5">{{activity.title}}</div>
					<div class="text-gray"> {{activity.subtitle}} </div>
				</div>
				<div class="column col-5">
					<div class="text-gray"> {{activity.end_date}} </div>
				</div>
				<div class="column col-1">
					<button class="btn btn-primary" @click="routerTo('/activity?aid=' + activity.aid)">view</button>
				</div>
			</div>
		</div>

		<div class="container">
			<div class="columns"></div>
		</div>

		<div class="container">
			<div class="columns">
				<div class="column col-4">
					<h4>Cupids</h4>
				</div>

				<div class="column col-4">
					<h4>Meonc</h4>
				</div>

				<div class="column col-4">
					<h4>UofT</h4>
				</div>
			</div>
		</div>
	
	</div>
</template>

<script>
import Carousel from "@/components/Carousel";
import { GetAllActivities } from "@/utils/api"
export default {
    name: "Home",
    components: {
        Carousel
	},
	data() {
		return {
			activitiesArray: []
		}
	},
    methods: {
		getallactivities() {
			GetAllActivities().then(res => {
				console.log(res)
				this.activitiesArray = res.data;
			}).catch(error => {
				console.log(error)
			})
		},
		routerTo(addr) {
            this.$router.push(addr);
        }
	},
	mounted() {
        this.getallactivities()
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