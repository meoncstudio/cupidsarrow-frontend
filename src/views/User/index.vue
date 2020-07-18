<template>
	<div class="user" :class=[adminPanel]>

		<div class="banner black">
			<div class="container wide animated fadeIn">
				<div class="columns">
					<div class="column col-sm-9 col-9">
						<div class="h1 user-subtitle" :class="{ 'animated fadeInDownSmall rotate faster' : !this.smallWidth}">{{this.$store.state.user.username}}</div>
						<div class="h5 user-subtitle animated fadeInDownSmall rotate faster" v-if="!this.smallWidth">You are signed in by {{this.$store.state.user.mail}}</div>
						<div class="h5 user-subtitle" v-if="this.smallWidth">{{this.$store.state.user.mail}}</div>
						<div class="h1 admin-subtitle" :class="{ 'animated fadeInDownSmall rotate faster' : !this.smallWidth}">Administration Center</div>
						<div class="h5 admin-subtitle animated fadeInDownSmall rotate faster" v-if="!this.smallWidth">Welcome, administrator {{this.$store.state.user.username}}</div>
						<div class="h5 admin-subtitle" v-if="this.smallWidth">{{this.$store.state.user.username}}</div>
					</div>
					<div class="column col-sm-3 col-3">
						<button class="btn btn-primary pill sign-out" @click="signout">Sign Out</button>
					</div>
				</div>
			</div>
		</div>

		<div class="container wide animated fadeIn">
			<div class="columns">
				<div class="column col-md-12 col-3" id="navbar-wrapper">
					<ul class="nav navbar" id="navbar" :class="{expand : this.$store.state.user.menuExand}">
						<li class="nav-item"><span class="h6">Account</span>
							<ul class="nav">
								<li class="nav-item" :class="{'active': this.page == 'profile'}"><a @click="routerTo('profile')">Profile</a></li>
								<li class="nav-item" :class="{'active': this.page == 'security'}"><a @click="routerTo('security')">Security</a></li>
								<li class="nav-item" :class="{'active': this.page == 'vip'}"><a @click="routerTo('vip')">VIP</a></li>
								<li class="nav-item" :class="{'active': this.page == 'certification'}"><a @click="routerTo('certification')">Certification</a></li>
								<li class="nav-item" :class="{'active': this.page == 'activities'}"><a @click="routerTo('activities')">Activities</a></li>
							</ul>
						</li>
						<li class="nav-item" v-if="isAdmin"><span class="h6">Administration</span>
							<ul class="nav">
								<li class="nav-item" :class="{'active': this.page == 'management'}"><a @click="routerTo('management')">Accounts</a></li>
								<li class="nav-item"><a>Operations</a></li>
								<li class="nav-item" :class="{'active': this.page == 'certification_admin'}"><a @click="routerTo('certification_admin')">Certifications</a></li>
								<li class="nav-item"><a>Activities</a></li>
							</ul>
						</li>
					</ul>
				</div>

				<div class="column col-md-12 col-9 sub-view">
					<Profile v-if="this.page == 'profile'" :class="switchClass"></Profile>
					<Security v-if="this.page == 'security'" :class="switchClass"></Security>
					<VIP v-if="this.page == 'vip'" :class="switchClass"></VIP>
					<Certification v-if="this.page == 'certification'" :class="switchClass"></Certification>
					<Activities v-if="this.page == 'activities'" :class="switchClass"></Activities>
					<Management v-if="this.page == 'management'" :class="switchClass"></Management>
					<CertificationAdmin v-if="this.page == 'certification_admin'" :class="switchClass"></CertificationAdmin>
				</div>

			</div>
		</div>

	</div>
</template>

<script>
import Profile from "@/views/User/profile.vue"
import Security from "@/views/User/security.vue"
import VIP from "@/views/User/vip.vue"
import Certification from "@/views/User/certification.vue"
import CertificationAdmin from "@/views/User/certification_admin.vue"
import Activities from "@/views/User/activities.vue"
import Management from "@/views/User/management.vue"
import { Authentication } from "@/utils/api.js"

export default {
	name: "User",
	components: {
		Profile,
		Security,
		VIP,
		Certification,
		Activities,
		Management,
		CertificationAdmin
	},
	methods: {
		routerTo(addr) {
            this.$store.state.user.menuExand = false;
			this.page = addr;
		},
		signout() {
			this.$store.dispatch('user/signout');
			this.$router.push('/signin');
		},
		menuReposition(forceOut = false) {
			if(window.innerWidth <= 840 && !forceOut){
				this.smallWidth = true;
				document.getElementById("main-navbar-wrapper").appendChild(document.getElementById("navbar"));
			}else if(window.innerWidth <= 840){
				this.smallWidth = true;
			}else{
				this.smallWidth = false;
				document.getElementById("navbar-wrapper").appendChild(document.getElementById("navbar"));
			}
		}
	},
	computed: {
		isAdmin() {
			return this.$store.state.user.authority >= 10;
		}
	},
	watch: {
		page(){
			let admin = ['management', 'certification_admin']
			let adminVerify = false;
			admin.forEach(element => {
				if (this.page === element) {
					adminVerify = true
				}
			});
			this.adminPanel = adminVerify ? 'admin' : '';
			sessionStorage.setItem("page", this.page)
		}
	},
	data() {
		return {
			page: "profile",
			switchClass: "animated fadeInRightSmall faster",
			adminPanel: '',
			smallWidth: false
		}
	},
	mounted() {
		this.page = sessionStorage.getItem("page") || "profile"
		window.addEventListener('resize', this.menuReposition);
		this.menuReposition();
	},
	activated() {
		if(this.$store.state.user.uid == null){
			this.$store.dispatch('api/logout');
			this.$router.push('/signin');
			console.log("signout");
		}
		this.page = sessionStorage.getItem("page") || "profile"
	}
}
</script>

<style lang="scss">

.user-subtitle, .admin-subtitle{
	display: none;
}

.banner{
	width: 100%;
	min-height: 180px;
	background-image: url("~@/assets/user-center-banner-blur.jpg");
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	background-color: $dark-color;
	padding-top: 45px;
	padding-bottom: 30px;
	margin-bottom: 20px;
	transition: all 0.125s ease-out;

	.container .column{
		position: relative;
	}

	.h1{
		margin-bottom: -5px;
		min-height: 60px;
		transition: all 0.125s ease-out;
	}

	.btn.btn-primary{
		background-color: rgba(255, 255, 255, 0.15);
		border: 0px;
		vertical-align: middle;
	}

	.btn.btn-primary:hover{
		background-color: rgba(255, 255, 255, 0.2);
		border: 0px;
	}

	.column{
		margin: 10px 0px;
		height: 100%;
		vertical-align: middle;
	}

	.sign-out{
		margin-top: 32.5px;
	}

	.user-subtitle{
		display: block;
	}
}

.admin .banner{
	min-height: 90px;
	padding: 16px;
	padding-top: 40px;

	.h1{
		font-size: 26px;
		min-height: 0px;
	}

	.sign-out{
		margin-top: 14px;
	}

	.container.wide{
		width: 90%;
	}

	.admin-subtitle{
		display: block;
	}

	.user-subtitle{
		display: none;
	}
}

.nav{
	height: 100%;
	width: 100%;
	overflow: hidden;
	text-align: left;
	position: relative;
	display: block;

	.nav-item{
		position: relative;
		width: 100%;
		overflow:hidden;
		white-space: nowrap;
		text-overflow:ellipsis; 
	}

	.nav-item a{
		padding: 3px 0px;
		cursor: pointer;
		font-size: 16px;
		overflow:hidden;
		white-space: nowrap;
		text-overflow:ellipsis; 
	}
}



@media (min-width: 1280px) {  // 1280 <= x
	.admin .container.wide{
		width: 60%;
	}
}

@media (min-width: 960) { // 960 <= x < 1280
	.admin .container.wide{
		width: 70%;
	}	
}

@media (min-width: 840px){ // 840 <= x < 960
	.admin .container.wide{
		width: 80%;
	}
}

@media screen and (max-width: 840px) { // x <= 840
	.admin .container.wide{
		width: 90%;
	}
}


#main-navbar-wrapper .navbar{
	color: #fff !important;
	margin-top: 45px;

	.nav-item{
		color: #fff !important;

		a{
			color: #fff !important;
			line-height: 35px;
			opacity: 0.8;
			transition: opacity 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
		}

		a:hover{
			opacity: 1;
		}

		.h6{
			line-height: 40px;
		}
	}
}




.panel{
	border: 0px;
}

.h6{
	font-family: "SF Display";
	font-weight: 600;
	font-size: 18px;
	text-transform: uppercase;
}

.edit-wrapper{
	display: flex;

	.edit{
		margin: auto;
		margin-right: 0px;
	}
}

.title-wrapper{
	margin-bottom: 20px;
}


</style>