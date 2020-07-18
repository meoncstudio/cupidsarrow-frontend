<template>
	<div class="containter">
		<div class="columns animated fadeIn faster" v-for="activity in activitiesArray" :key="activity.uid">
			<div class="column col-3">
				<img :src="activity.img" class="img-responsive">
			</div>
			<div class="column col-3">
				<div class="h5">{{activity.title}}</div>
				<div class="text-gray"> {{activity.subtitle}} </div>
			</div>
			<div class="column col-3">
				<div class="text-gray"> {{activity.end_date}} </div>
			</div>
			<div class="column col-3">
				<button class="btn btn-primary" @click="routerTo('/activity')">view</button>
			</div>
		</div>
	</div>

</template>

<script>
import FormGroup from "@/components/FormGroup"
import { GetAllActivities } from "@/utils/api"
export default{
	name: "Activities",
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

<style>

</style>