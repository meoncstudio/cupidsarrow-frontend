<template>
	<div class="user">

		<div class="banner black">
			<div class="container wide animated fadeIn">
				<div class="columns">
					<div class="column col-sm-12 col-9">
						<div class="h1">{{activityData.title}}</div>
						<div class="h5 user-subtitle">{{activityData.subtitle}}</div>
						<div class="h5 admin-subtitle">{{activityData.subtitle}}</div>
					</div>
					<div class="column hide-md col-3">
					</div>
				</div>
			</div>
		</div>


        <div class="docs-demo columns">
            <div class="column col-6 col-sm-12 col-mx-auto">
                <div class="panel">

                    <div class="card">
                        <div class="carousel">
                        <!-- carousel locator -->
                        <input class="carousel-locator" id="slide-1" type="radio" name="carousel-radio" hidden="" checked="">
                        <input class="carousel-locator" id="slide-2" type="radio" name="carousel-radio" hidden="">
                        <input class="carousel-locator" id="slide-3" type="radio" name="carousel-radio" hidden="">
                        <input class="carousel-locator" id="slide-4" type="radio" name="carousel-radio" hidden="">
                        
                        <!-- carousel container -->
                        <div class="carousel-container">
                            <!-- carousel item -->
                            <figure class="carousel-item">
                            <label class="item-prev btn btn-action btn-lg" for="slide-4"><i class="icon icon-arrow-left"></i></label>
                            <label class="item-next btn btn-action btn-lg" for="slide-2"><i class="icon icon-arrow-right"></i></label>
                            <img class="img-responsive rounded" src="@/assets/img/img2.jpg" alt="macOS Yosemite Wallpaper">
                            </figure>
                            <figure class="carousel-item">
                            <label class="item-prev btn btn-action btn-lg" for="slide-1"><i class="icon icon-arrow-left"></i></label>
                            <label class="item-next btn btn-action btn-lg" for="slide-3"><i class="icon icon-arrow-right"></i></label>
                            <img class="img-responsive rounded" src="@/assets/img/img1.jpg" alt="macOS Yosemite Wallpaper">
                            </figure>
                            <figure class="carousel-item">
                            <label class="item-prev btn btn-action btn-lg" for="slide-2"><i class="icon icon-arrow-left"></i></label>
                            <label class="item-next btn btn-action btn-lg" for="slide-4"><i class="icon icon-arrow-right"></i></label>
                            <img class="img-responsive rounded" src="@/assets/img/img2.jpg" alt="macOS El Capitan Wallpaper">
                            </figure>
                            <figure class="carousel-item">
                            <label class="item-prev btn btn-action btn-lg" for="slide-3"><i class="icon icon-arrow-left"></i></label>
                            <label class="item-next btn btn-action btn-lg" for="slide-1"><i class="icon icon-arrow-right"></i></label>
                            <img class="img-responsive rounded" src="@/assets/img/img1.jpg" alt="macOS El Capitan Wallpaper">
                            </figure>
                        </div>
                        <!-- carousel navigation -->
                        <div class="carousel-nav">
                            <label class="nav-item text-hide c-hand" for="slide-1">1</label>
                            <label class="nav-item text-hide c-hand" for="slide-2">2</label>
                            <label class="nav-item text-hide c-hand" for="slide-3">3</label>
                            <label class="nav-item text-hide c-hand" for="slide-4">4</label>
                        </div>
                        </div>
                    </div>




                    <div class="panel-header text-center">
                        
                    </div>
                    <nav class="panel-nav">
                        <ul class="tab tab-block">
                        <li class="tab-item active" :class="{'active': this.page == 'Details'}"><a @click="routerTo('Details')">Details</a></li>
                        <li class="tab-item" :class="{'active': this.page == 'Member'}"><a @click="routerTo('Member')">Member</a></li>
                        <li class="tab-item" :class="{'active': this.page == 'Comments'}"><a @click="routerTo('Comments')">Comments</a></li>
                        </ul>
                    </nav>

                    <div class="panel-body" v-if="this.page == 'Details'">

                        <div class="tile tile-centered">
                            <div class="tile-content">
                                <div class="tile-title text-bold">Start Date</div>
                                <div class="tile-subtitle"> {{activityData.start_date}} </div>
                            </div>
                            <div class="tile-action">
                                <button class="btn btn-link btn-action btn-lg tooltip tooltip-left" data-tooltip="Edit E-mail"><i class="icon icon-edit"></i></button>
                            </div>
                        </div>

                        <div class="tile tile-centered">
                            <div class="tile-content">
                                <div class="tile-title text-bold">End Date</div>
                                <div class="tile-subtitle"> {{activityData.end_date}} </div>
                            </div>
                            <div class="tile-action">
                                <button class="btn btn-link btn-action btn-lg"><i class="icon icon-edit"></i></button>
                            </div>
                        </div>

                        <div class="tile tile-centered">
                            <div class="tile-content">
                                <div class="tile-title text-bold">Location</div>
                                <div class="tile-subtitle"> {{activityData.location}} </div>
                            </div>
                            <div class="tile-action">
                                <button class="btn btn-link btn-action btn-lg"><i class="icon icon-edit"></i></button>
                            </div>
                        </div>

                    </div>


                    <div class="panel-body" v-if="this.page == 'Member'">
                         <div class="form-autocomplete-input form-input" >
                            <div class="chip animated tada faster" v-for="member in membersArray" :key="member.uid">
                                <img class="avatar avatar-sm" :src="member.avatar" alt="Avatar">
                                {{ member.username }}
                                <a href="#" class="btn btn-clear" aria-label="Close" role="button"></a>
                            </div>
                        </div>
                    </div>

                    <div class="panel-body" v-if="this.page == 'Comments'">
                        <div class="tile">
                            <div class="tile-icon">
                                <figure class="avatar"><img src="@/assets/avatar/1.jpg" alt="Avatar"></figure>
                            </div>
                            <div class="tile-content">
                                <p class="tile-title text-bold">Thor Odinson</p>
                                <p class="tile-subtitle">Earth's Mightiest Heroes joined forces to take on threats that were too big for any one hero to tackle...</p>
                            </div>
                        </div>

                        <div class="empty">
                            <div class="empty-icon"><i class="icon icon-3x icon-people"></i></div>
                            <p class="empty-title h5">You are not following anyone</p>
                            <p class="empty-subtitle">Start to meet new friends</p>
                            <div class="empty-action input-group input-inline">
                                <input class="form-input" type="text" placeholder="">
                                <button class="btn btn-primary input-group-btn">Search</button>
                            </div>
                        </div>

                        <div class="input-group">
                            <input class="form-input" type="text" placeholder="Hello">
                            <button class="btn btn-primary input-group-btn">Send</button>
                        </div>
                    </div>




                    <div class="panel-footer">
     
                    </div>


                </div>
            </div>
        </div>

	</div>
</template>

<script>
import { GetActivities, GetActivityMembers } from "@/utils/api"

export default {
    name: "Activitiy",
    data() {
        return {
            page: 'Details',
            activityData: {},
            membersArray: []
        }
    },
    methods: {
        routerTo(addr) {
            this.page = addr;
        },
        getactivities(aid) {
            GetActivities(aid).then(res =>{
                this.activityData = res.data
                console.log(res)
            }).catch(error => {
                console.log(error)
            })
        },
        getactivityMembers(aid) {
            GetActivityMembers(aid).then(res =>{
                this.membersArray = res.data
                console.log(res)
            }).catch(error => {
                console.log(error)
            })
        }
    },
    mounted() {
        this.getactivities(this.$route.query.aid);
        this.getactivityMembers(this.$route.query.aid);
    }
}
</script>

<style lang="scss" scoped>

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

@media (max-width: 840px) { // x <= 840
	.admin .container.wide{
		width: 90%;
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

.panel{
	border: 0px;
}

.h6{
	font-family: "SF Display";
	font-weight: 600;
	font-size: 18px;
	text-transform: uppercase;
}

.user{
	margin-bottom: 40px;
}

.edit{
	margin-top: 11px !important;
}


</style>