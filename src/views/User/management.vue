<template>

<div>

    <div class="columns title-wrapper">
        <div class="column col-8 col-sm-8">
            <div class="h1">Account Management</div>
        </div>
        <div class="column col-4 col-sm-4 edit-wrapper">
            <button class="btn btn-primary pill edit">Edit</button>
        </div>
    </div>


    <div class="filter">
        <input type="radio" id="tag-0" class="filter-tag" name="filter-radio" hidden checked>
        <input type="radio" id="tag-1" class="filter-tag" name="filter-radio" hidden>
        <input type="radio" id="tag-2" class="filter-tag" name="filter-radio" hidden>

        <div class="filter-nav">
            <label class="chip" for="tag-0">All</label>
            <label class="chip" for="tag-1">Admin</label>
            <label class="chip" for="tag-2">Users</label>
        </div>

        <div class="filter-body columns">
            <div class="column col-xl-4 col-6 col-lg-6 col-md-6 col-sm-12 filter-item animated fadeIn faster" v-for="user in usersArray" :key="user.uid" :data-tag="user.authority>=10 ? 'tag-1' : 'tag-2'">
                <div class="tile tile-centered">
                    <li class="click" @click="clickAvatar(user.uid)"></li>
                    <div class="tile-icon">
                        <figure class="avatar avatar-lg" :data-initial="getInitials(user.username)">
                            <img :src="user.avatar" alt="">
                            <i class="avatar-presence" :class="{admin: user.authority >= 10}"></i>
                        </figure>
                    </div>
                    <div class="tile-content">
                        <div class="tile-title">{{user.username}}</div>
                        <small class="tile-subtitle text-gray">{{user.mail}}</small>
                    </div>
                    <div class="tile-action">
                        <button class="btn btn-link">
                            <i class="icon icon-more-vert"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>

</template>

<script>
import FormGroup from "@/components/FormGroup"
import { GetAllUsers } from "@/utils/api"

export default{
    name: "Management",
    components: {
		FormGroup,
	},
	data() {
		return {
            disabled: true,
            usersArray: []
		}
    },
    methods: {
        getallusers() {
            GetAllUsers().then(res => {
                console.log(res)
                this.usersArray = res.data;
            }).catch(error => {
                console.log(error)
            })
        },
        getInitials(username){
            return username.split(" ").map((n,i,a)=> i === 0 || i+1 === a.length ? n[0] : null).join("").toUpperCase().substring(0, 2);
        },
        clickAvatar(uid) {
            this.$router.push("/userview?uid=" + uid)
        }
    },
    mounted() {
        this.getallusers()
    }
}
</script>

<style lang="scss" scoped>

.tile {
    border: none;
    box-shadow: 0 0.25rem 1rem rgba(48,55,66,.15);
    margin-bottom: 16px;
    padding: 15px;
    border-radius: 8px;
    overflow: hidden;
    position: relative;

    .btn.btn-link{
        padding: 6px;
        width: 38px;
    }

    .tile-title{
        font-weight: 600;
    }

    .click{
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        z-index: 99;
        cursor: pointer;
        list-style: none;
    }

    .click:hover{
        background-color: transparentize($primary-color, 0.975);
    }

    .tile-action .btn.btn-link, .tile-action{
        z-index: 999;
    }

    .tile-action .btn.btn-link:hover{
        background-color: lighten($primary-color, 30%);
    }
}

.edit{
	margin-top: 7px !important;
}


.filter .filter-nav{
    margin: 15px 0px 20px 0px;

    .chip{
        cursor: pointer;
        padding: 14px;
        transition: background-color 0.125s ease-out, color 0.125s ease-out;
    }
}

.filter .avatar .avatar-presence{
    display: none;
}

.filter .avatar .avatar-presence.admin{
    display: block;
    background-color: $primary-color;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAABmJLR0QA/wD/AP+gvaeTAAABGklEQVRIie2SvUoDQRRGz4ggKMEiEBNiZwTLVOYpRPQlfAwRxN5SFOtAnkBrBX0HbUULQYyg4M+xWXHR2WwmVYo93czsud/cOwsVFVON2lLP1TO1meKGxKAd4C3z5kIIRyl+SlBHfVDv1ZUUdyZSLKg9tR75fhtoAEvAZsStq+tq+aTUPfVYvVLnc/tN9dlfntRG7nwhc07U3dKOgA7QB16Atdz+AVDLrReB/dy6mzl9YHWcjpbVQXbrV/VQ3VA//c+HuqWequ/Z3kBt/60bnaXaAu5KbxWnHUIY31VvIx2UcVNUL/ZGP1yktFHmjAq6nCCo0Cn839Ua0EsMug4hDJMMtTvBG3WL6s2OyBoCj4web56vzKmomBK+Ae1wLG4SrkHDAAAAAElFTkSuQmCC');
    background-size: contain;
    background-repeat: no-repeat;
    background-origin: center;
}

</style>