<template>
	<div class="black">
		<div class="container">
			<div class="columns animated fadeIn fast">
				<div class="column col-12 flower"></div>
				<div class="column col-12 h1 center" @click="routerTo('/')">CupidsArrow</div>
				<div class="column col-12 h5 center sub-title">Account Center</div>
				<div class="column col-12">
					<div class="btn-group btn-group-block" style="display: none">
						<button class="btn" :class="{active: item.current}" v-for="item in menuTab" :key="item.id" @click="toggleMenu(item)">{{item.txt}}</button>
					</div> 
				</div>
				<div class="column col-12">
					<div v-if="menuTab[0].current" class="animated fadeIn fast">
						<div class="form-group" :class="this.form.mail.error">
							<label class="form-label">Email</label>
							<input class="form-input" type="text" placeholder="Email" id="email" name="email" v-model="form.mail.content">
							<p class="form-input-hint">{{form.mail.hint}}</p>
						</div>
						<div class="form-group" :class="this.form.pass.error">
							<label class="form-label">Password</label>
							<input class="form-input" type="password" placeholder="Password" id="password" name="password" v-model="form.pass.content">
							<p class="form-input-hint">{{form.pass.hint}}</p>
						</div>
						<button class="btn btn-primary pill btn-submit" @click="submit">Sign In</button>
						<button class="btn btn-link" @click="toggleMenuById(1)">Don't have an account?</button>
					</div>

					<div v-if="menuTab[1].current" class="animated fadeIn fast">
						<div class="form-group" :class="this.form.mail.error">
							<label class="form-label">Email</label>
							<input class="form-input" type="text" placeholder="Email" v-model="form.mail.content">
							<p class="form-input-hint">{{form.mail.hint}}</p>
						</div>
						<div class="form-group">
							<label class="form-label">VerifyCode</label>
							<div class="input-group">
								<input type="text" class="form-input" placeholder="VerifyCode" v-model="form.vericode.content">
								<button class="btn btn-primary input-group-btn" @click="getVerifyCode" :disabled="this.vericode_btn_disable">SendCode</button>
							</div>
							<p class="form-input-hint">{{timerInfo}}</p>
						</div>
						<div class="form-group" :class="this.form.pass.error">
							<label class="form-label">Password</label>
							<input class="form-input" type="password" placeholder="Password" v-model="form.pass.content">
							<p class="form-input-hint">{{form.pass.hint}}</p>
						</div>
						<div class="form-group" :class="this.form.pass2.error">
							<label class="form-label">Re-enter password</label>
							<input class="form-input" type="password" placeholder="Password" v-model="form.pass2.content">
							<p class="form-input-hint">{{form.pass2.hint}}</p>
						</div>
						<button class="btn btn-primary pill btn-submit" @click="submit">Sign Up</button>
						<button class="btn btn-link" @click="toggleMenuById(0)">Already have an account?</button>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
import { Signin, Register, SendVeriCode } from "@/utils/api.js"
import axios from 'axios'

export default {
	name: "signin",
    mounted() {
		this.time = sessionStorage.getItem("time") || 0
		this.timer(this.time)
	},
	computed: {
		timerInfo() {
			return this.time !== 0 ? this.time : 'Please click the button to send the verify code!'
		}
	},
	data() {
		return {
			menuTab: [
				{ txt: "Sign In", current: true},
				{ txt: "Sign Up", current: false},
			], 
			form: {
				mail: {content: '', error: '', hint: ''},
				pass: {content: '', error: '', hint: ''},
				pass2: {content: '', error: '', hint: ''},
				vericode: {content: ''}
			},
			time: sessionStorage.getItem("time"),
			vericode_btn_disable: false
		}  
	},
	methods: {
		routerTo(addr) {
			this.$router.push(addr);
		},
		toggleMenu(data) {
			this.menuTab.forEach(element => {
				element.current = false;
			});
			data.current = true;
		},
		toggleMenuById(data) {
			if (data == 0) {
				this.menuTab.forEach(element => {
					element.current = false;
				});
				this.menuTab[0].current = true;
			} else if (data == 1) {
				this.menuTab.forEach(element => {
					element.current = false;
				});
				this.menuTab[1].current = true;
			}
		},
		getVerifyCode() {
			let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
			if (!this.form.mail.content) {
				this.form.mail.hint = 'Need to be filled';
				this.form.mail.error = 'has-error';
				isSuccs = -1;
			} else if (!reg.test(this.form.mail.content)) {
				this.form.mail.hint = 'Incorrect email';
				this.form.mail.error = 'has-error';
				isSuccs = -1;
			} else {
				this.form.mail.hint = 'Email avalaible';
				this.form.mail.error = 'has-success';

				// succ
				alert('VerifyCode has already sent to your email! Please check it!');

				SendVeriCode(this.form.mail.content).then(res => {
					console.log(res)
					}).catch(error => {
						console.log(error)
					})
					//final
					this.timer(20)
			}
			
		},
		timer(n) {
			this.vericode_btn_disable = true;
			this.time = n
			sessionStorage.setItem("time", n);
			if (n > 0) {
				setTimeout(() => {
					this.timer(n - 1);
				}, 1000)
			} else {
				this.time = 0;
				this.vericode_btn_disable = false;
			}
		},
		submit() {
			// 定义判定变量
			let isSuccs = 0;

			// valide mail
			let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
			if (!this.form.mail.content) {
				this.form.mail.hint = 'Need to be filled';
				this.form.mail.error = 'has-error';
				isSuccs = -1;
			} else if (!reg.test(this.form.mail.content)) {
				this.form.mail.hint = 'Incorrect email';
				this.form.mail.error = 'has-error';
				isSuccs = -1;
			} else {
				this.form.mail.hint = 'Email avalaible';
				this.form.mail.error = 'has-success';
			}

			// valide pass
			let reg2 = /^(?!\D+$)(?![^a-zA-Z]+$)\S{8,20}$/;
			if (!this.form.pass.content) {
				this.form.pass.hint = 'Need to be filled';
				this.form.pass.error = 'has-error';
				isSuccs = -1;
			} else if (!reg2.test(this.form.pass.content)) {
				this.form.pass.hint = 'Please enter a password, 8-20 characters, combination of digits and letters';
				this.form.pass.error = 'has-error';
				isSuccs = -1;
			} else {
				this.form.pass.hint = 'Password available';
				this.form.pass.error = 'has-success';
			}

			// 注册专用
			if (this.menuTab[1].current) {
				// valide pass2
				if (this.form.pass2.content != this.form.pass.content) {
					this.form.pass2.hint = 'Password unmatch';
					this.form.pass2.error = 'has-error';
					isSuccs = -1;
				} else {
					this.form.pass2.hint = 'Password match';
					this.form.pass2.error = 'has-success';
				}
			}
			if (isSuccs == 0) {
				// 判定成功
				if (this.menuTab[1].current) {
					// Reg
					Register(this.form.mail.content, this.form.pass.content, this.form.vericode.content)
					.then(data => {
						alert("Register Success");
					}).catch(error => {
						// 注册失败
						this.$store.dispatch('user/error', error).then(res => {
								this.form.mail.hint = res.message;
								this.form.mail.error = 'has-error';
							})
						})
				} else {
					console.log('login')
					Signin(this.form.mail.content, this.form.pass.content)
					.then(res => {
						this.$store.dispatch('user/signin', res.data).then(response => {
							console.log('push')
							this.$router.push('/user');
						});
					}).catch(error => {
						this.$store.dispatch('user/error', error).then(res => {
							this.form.mail.hint = res.message;
							this.form.mail.error = 'has-error';
							this.form.pass.hint = res.message;
							this.form.pass.error = 'has-error';
						});
					});
				}
			}
		}
	}
}
</script>


<style lang="scss" scoped>

.btn {
	padding: 7px 14px;
}

.sub-title{
	margin-top: -8px;
	margin-bottom: 30px;
	font-weight: 400;
}

.flower{
	margin-bottom: -25px;
}

.container{
	min-height: 100vh;
	padding-bottom: 20px;
}

.form-input{
	border-width: 1.4px;
	border-radius: 10px;
	padding: 8px 14px;
	border: 1.4px solid #8c8c8c;
}

</style>