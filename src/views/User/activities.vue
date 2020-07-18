<template>

	<div class="columns">
		<div class="column col-12 animated fadeIn faster" v-for="activity in activitiesArray" :key="activity.uid">
			
			<div class="card">
				<div class="card-image">
					<img :src="activity.img" class="img-responsive">
				</div>
				<div class="card-header">
					<div class="card-title h5">{{activity.title}}</div>
					<div class="card-subtitle text-gray">{{activity.subtitle}}</div>
				</div>
				<div class="card-body">
					...
				</div>
				<div class="card-footer">
					<button class="btn btn-primary">...</button>
				</div>
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
		}
	},
	mounted() {
        this.getallactivities()
    }
}
</script>

<style>

</style>