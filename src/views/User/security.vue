<template>

<div>

    <div class="columns title-wrapper">
        <div class="column col-8 col-sm-8">
            <div class="h1">Security</div>
        </div>
        <div class="column col-4 col-sm-4 edit-wrapper">
            <button class="btn btn-primary pill edit">Edit information</button>
        </div>
    </div>

    <div class="columns">
        <div class="column col-12 col-sm-12">
            <div class="form">
                <form-group :title="'Email'" :id="'email'" :type="'input'" :value="this.$store.state.user.mail" :disabled="disabled"></form-group>
                <form-group :title="'Password'" :id="'password'" :type="'a'" :value="'Change password...'"></form-group>
                <button class="btn btn-primary pill edit" @click="changePass">Change password...</button>
            </div>
        </div>
    </div>

</div>

</template>

<script>
import FormGroup from "@/components/FormGroup"
export default{
    name: "Security",
    components: {
		FormGroup,
	},
	data() {
		return {
			disabled: true
		}
    }, 
    methods: {
        changePass() {
            alert("想改密码？")
            alert("那你就想吧哈哈哈")
        }
    }
}
</script>

<style>


</style>