<template>

<div>

    <div class="columns title-wrapper">
        <div class="column col-8 col-sm-8">
            <div class="h1">Profile</div>
        </div>
        <div class="column col-4 col-sm-4 edit-wrapper">
            <button class="btn btn-primary pill edit" @click="editProfile">{{this.editBun}}</button>
        </div>
    </div>

    <div class="columns">
        <div class="column col-8 col-sm-12" :class="{'form-loading': this.loading}">
            <div class="form">
                <form-group :title="'Name'" :id="'username'" :placeholder="'How to address you?'" :type="'input'" :value="this.$store.state.user.username" :disabled="disabled_auth"></form-group>
                <div class="columns">
                    <div class="column col-6 col-sm-6">
                        <form-group :title="'Age'" :id="'age'" :placeholder="'How old are you?'" :type="'input'" :value="this.$store.state.user.profile.age" :disabled="disabled"></form-group>
                    </div>
                    <div class="column col-6 col-sm-6">
                        <form-group :title="'Gender'" :options="['Male', 'Female', 'Unknown']" :placeholder="'You are a...'" :id="'gender'" :type="'select'" :value="this.$store.state.user.profile.gender" :disabled="disabled"></form-group>
                    </div>
                </div>
                <form-group :title="'Biography'" :placeholder="'Show others your literary talent'" :id="'bio'" :type="'textarea'" :rows="3" :value="this.$store.state.user.profile.bio" :disabled="disabled"></form-group>
            </div>
            <div class="form">
                <div class="columns">
                    <div class="column col-6 col-sm-12">
                        <form-group :title="'Major / First major'" :placeholder="'Haven\'t put your major yet'" :id="'major'" :type="'input'" :value="this.$store.state.user.profile.major" :disabled="disabled" :inline="true"></form-group>
                    </div>
                    <div class="column col-6 col-sm-12">
                        <form-group :title="'Year of study'" :placeholder="'How long by the way?'" :id="'yr_of_study'" :type="'input'" :value="this.$store.state.user.profile.yr_of_study" :disabled="disabled" :inline="true"></form-group>
                    </div>
                </div>
            </div>
            <div class="form">
                <div class="columns">
                    <div class="column col-6 col-sm-6">
                        <form-group :title="'Sexual orientation'" :placeholder="'So you like...'" :id="'sexual_orientation'" :type="'input'" :value="this.$store.state.user.profile.sexual_orientation" :disabled="disabled"></form-group>
                    </div>
                    <div class="column col-6 col-sm-6">
                        <form-group :title="'Ideal type'" :placeholder="'And like...'" :id="'ideal_type'" :type="'input'" :value="this.$store.state.user.profile.ideal_type" :disabled="disabled"></form-group>
                    </div>
                </div>
            </div>
        </div>
        <div class="column col-4 col-sm-12">
            <div class="form-group avatar-wrapper">
                <figure class="avatar" :data-initial="getInitials(this.$store.state.user.username)">
                    <img ref="images" :src="this.$store.state.user.profile.avatar" alt="">
                </figure>
                <input :disabled="disabled" class="form-input avatar-edit" type="file" @change='changeAvatar' accept="image/gif,image/jpeg,image/jpg,image/png">
            </div>
        </div>
    </div>

</div>

</template>

<script>
import FormGroup from "@/components/FormGroup"
import { GetUserProfile, UpdateUserInfo } from "@/utils/api"
import { mapState } from 'vuex'
import axios from 'axios'
import { getKeyId, getKeySecret } from '@/info.js'


export default{
    name: "Profile",
    components: {
		FormGroup,
	},
	data() {
		return {
            disabled: true,
            disabled_auth: true,
            editBun: 'Edit profile',
            loading: true
		}
    },
    computed: mapState({
        // user: state => state.app.user
    }),
    watch: {
    },
    methods: {
        editProfile() {
            this.disabled = this.disabled ? false : true
            this.disabled_auth = this.disabled_auth && this.$store.state.user.profile.certification < 10 ? false: true
            // this.disabled_auth = false;
            this.editBun = this.editBun == 'Edit profile' ? 'Save profile' : 'Edit profile'
            if (this.disabled) {
                console.log(this.$store.state.user.profile)
                UpdateUserInfo(this.$store.state.user.profile).then(res => {
                    // this.getUserProfile()
                    console.log(res)
                }).catch(error => {
                    console.log(error)
                })
            }
        },
        changeAvatar(e) {
            let file = e.target.files;
            let bfile = new Blob(file);
            let OSS = require('ali-oss');
            let client = new OSS({
                region: 'oss-us-west-1',
                //云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，部署在服务端使用RAM子账号或STS，部署在客户端使用STS。
                accessKeyId: getKeyId(),
                accessKeySecret: getKeySecret(),
                bucket: 'jimschenchen-storage1'
            });

            // object表示上传到OSS的Object名称，localfile表示本地文件或者文件路径
            client.put('/cupids/avatar/' + this.$store.state.user.mail + '/avatar.png', bfile).then(function (r1) {
                console.log('put success: %j', r1);
                
                // return client.get('/cupids/avatar/' + this.$store.state.user.mail + '.png');
                var dataObj =new Object();
                dataObj.avatar = r1.url;
                UpdateUserInfo(dataObj).then(res => {
                    console.log(res)
                }).catch(error => {
                    console.log(error)
                })
            }).then(function (r2) {
                console.log('get success: %j', r2);
            }).catch(function (err) {
                console.error('error: %j', err);
            });
            // 2秒过去了
            setTimeout(() => {
                this.getUserProfile()
            }, 2000);

        },
        getUserProfile() {
            GetUserProfile()
            .then(res => {
                this.$store.dispatch('user/setUserProfile', res.data).then(response => {
                    this.$forceUpdate();
                    this.loading = false;
                    this.$refs.images.src = this.$store.state.user.profile.avatar
                });
            });
        },
        getInitials(){
            return (this.$store.state.user.username).split(" ").map((n,i,a)=> i === 0 || i+1 === a.length ? n[0] : null).join("").toUpperCase().substring(0, 2);
        }
    },
    created() {
        this.getUserProfile()
    }
}
</script>

<style lang="scss" scoped>

.avatar-wrapper{
    text-align: center;

    .avatar{
        --side: 130px;
        width: var(--side);
        height: var(--side);
        margin: auto;
        position: relative;
        box-shadow: 0 0.25rem 1rem rgba(48,55,66,.15);
        font-size: 4em;
        display: flex;

        img{
            align-items: center;
        }
    }

    .avatar-edit{
        width: 130px;
        margin-top: 11px !important;
    }

    .avatar-edit:disabled{
        display: none;
    }

}

</style>
