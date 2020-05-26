<template>
    <div class="form-group" :class="[style_empty, style_focus, disabled2]">
		<input v-if="this.type === 'input'" class="form-input" :id="this.id" :ref="this.id" type="text" v-model="input" @focus="focus" @blur="blur" :disabled="disabled2 == 'disabled'" :placeholder="placeholder">
        <textarea v-if="this.type === 'textarea'" class="form-input" :id="this.id" :ref="this.id" type="text" value="" v-model="input" @focus="focus" @blur="blur" :disabled="disabled2 == 'disabled'" :placeholder="placeholder"></textarea>
        <a v-if="this.type === 'a'" class="form-input" :id="this.id" :ref="this.id" type="text" value="" @focus="focus" @blur="blur" :disabled="this.disabled2">{{input}}</a>
        <select v-if="this.type == 'select'" class="form-input form-select" :id="this.id" :ref="this.id" v-model="input" value="" @focus="focus" @blur="blur" :disabled="disabled2 == 'disabled'">
			<option :key="option" v-for="option in options">{{option}}</option>
		</select>
		<label class="form-label" for="name">{{this.title}}</label>
		<div class="form-loading-shimmer"></div>
    </div>
</template>

<script>
export default {
    name: "FormGroup",
    props: ['id', 'type', 'rows', 'title', 'value', 'disabled', 'click', 'placeholder', "options"],
    data() {
		return {
			input: this.value,
            style_empty: this.value == "" ? "" : "not-empty",
			style_focus: null
		}
	},
	watch: {
		input(content) {
			this.style_empty = content ? "not-empty" : "";
			this.$store.commit('user/updateLocalInfo', {"key": this.id, "value": this.input});
		}
	},
	methods: {
		focus () {
			this.style_focus = "focus";
        },
        blur () {
			this.style_focus = null;
        }
	},
	computed: {
		disabled2: function() {
            return (this.disabled == true || this.type == 'a') ? "disabled" : "";
		}
	},
	beforeCreate() {
	}
}
</script>

<style lang="scss" scoped>

.form{
		
	.form-group{
		position: relative;
		margin-bottom: 14px;
	}

	.form-input{
		padding-top: 18px;
		padding-left: 16px;
		padding-right: 16px;
		height: 3.5em;
		line-height: 1.2;
		font-size: 17px;
        background: transparent;
		transition: all 0.125s ease-out, border 0.125s ease-out, border 0.125s ease-out;
	}

	.form-select:not([multiple]):not([size]){
		background: #fff url("data:image/svg+xml;charset=utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%204%205'%3E%3Cpath%20fill='%23667189'%20d='M2%200L0%202h4zm0%205L0%203h4z'/%3E%3C/svg%3E") no-repeat right 14px center/0.4rem 0.5rem;
	}

	a.form-input{
		padding-top: 28px;
	}

	.form-group:disabled .form-input, .form-input:disabled, .form-group.disabled .form-input, .form:disabled .form-input, .form.disabled .form-input{
		border: 1px solid #d6d6d600;
        padding-left: 0px;
        padding-right: 0px;
        height: auto;
		min-height: 3.5em;
        cursor: default;
        opacity: 1;
		font-family: "SF Display";
		background-image: none;
	}

	textarea.form-input{
		padding-top: 24px;
		min-height: 3.5em;
		height: auto;
		resize: none;
		overflow: hidden;
	}

	.form-group.not-empty{
		textarea.form-input{
			// height: 6em;
			max-lines: 3;
		}
	}

	.form-label{
		position: absolute;
		left: 17px;
		top: 20px;
		z-index: 10;
		font-size: 16px;
		line-height: 1.25;
		font-weight: 400;
		text-transform: uppercase;
        letter-spacing: 0.6px;
		color: #888;
		padding: 0;
		pointer-events: none;
		width: calc(100% - 2 * 17px);
		white-space: nowrap;
		text-overflow:ellipsis; 
		overflow:hidden;
		background: inherit;
		display: block;
		transition: all 0.125s ease-out, border 0.125s ease-out, font-weight 0s linear;
	}

	.form-group:disabled .form-label, .form-group.disabled .form-label, .form-group.not-empty .form-label, .form-group.focus .form-label, .form-input:focus~.form-label, .form-input:not(:empty)~.form-label, .form-input[placeholder]~.form-label, .form-input:invalid~.form-label{
		font-size: 12px;
		top: 12px;
		color: #666;
	}

	.form-group:disabled .form-label, .form-group.disabled .form-label, .form:disabled .form-label, .form.disabled .form-label, .form-input:disabled~.form-label{
		left: 0px;
        font-size: 12px;
        font-weight: 600;
    }
    
    .form-group a{
        cursor: pointer !important;
        text-decoration: underline;
        color: $primary-color !important;
    }

}


.form-loading-shimmer{
	background: #f6f7f8;
	width: 100%;
	position: absolute;
	top: 0px;
	left: 0px;
	height: 100%;
	border-radius: 0px;
	margin-left: 0px;
	margin-right: 0px;
	margin-bottom: 15px;
	box-sizing: border-box;
	background-image: linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
	background-repeat: no-repeat;
	background-size: 800px 800px; 
	animation-duration: 1s;
	animation-fill-mode: forwards; 
	animation-iteration-count: infinite;
	animation-name: placeholderShimmer;
	animation-timing-function: linear;
	opacity: 0;
	transition: opacity 0.2s ease;
	z-index: -9999;
}

.form-loading{
	.form-loading-shimmer{
		opacity: 1;
		z-index: 9999;
	}
}

@keyframes placeholderShimmer {
  0% {
    background-position: -468px 0;
  }
  
  100% {
    background-position: 468px 0; 
  }
}

</style>