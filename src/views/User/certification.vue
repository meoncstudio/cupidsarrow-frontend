<template>

<div>

    <div class="columns title-wrapper">
        <div class="column col-8 col-sm-8">
            <div class="h1">Certification</div>
        </div>
        <div class="column col-4 col-sm-4 edit-wrapper">
            <button class="btn btn-primary pill edit" @click="getUserProfile">Refresh</button>
        </div>
    </div>


    <div class="columns">
        <div class="column col-12 col-sm-12">
            <div class="shadow">
                <div class="toast" :class=[toastType]>
                    <p>{{certificationStatus}}</p>
                </div>
                <div class="form-group">
                    <input v-if="showUpload" style="margin: 0px !important;" class="form-input edit" type="file" @change='upload' accept="image/gif,image/jpeg,image/jpg,image/png">
                </div>
            </div>
        </div>
    </div>

    <div class="columns">
        <div class="column col-12 col-sm-12">
            <div class="tile">
                <img v-if="showImg" ref="images" :src="this.$store.state.user.profile.tcard" alt="" class="img-responsive">
            </div>
        </div>
    </div>

</div>

</template>

<script>
import FormGroup from "@/components/FormGroup"
import { UpdateUserInfo, GetUserProfile } from "@/utils/api"
import { getKeyId, getKeySecret } from '@/info.js'

export default{
    name: "Certification",
    components: {
		FormGroup,
	},
	data() {
		return {
            disabled: true,
            loading: false,
            toastType: 'toast-primary',
            showImg: false,
            showUpload: false,
		}
    },
    computed: {
        certificationStatus() {
            if (this.$store.state.user.profile.certification >= 10) {
                this.toastType = 'toast-success'
                return 'Your certification was approved.'; 
            } else if (this.$store.state.user.profile.certification > 0) {
                this.toastType = 'toast-warning'
                this.showImg = true
                this.showUpload = false
                return 'Your certification is currently under review.';
            } else if (this.$store.state.user.profile.certification < 0) {
                this.toastType = 'toast-error'
                this.showImg = false
                this.showUpload = true
                return 'Your certification was denied. Please start your process again.'; 
            } else {
                this.toastType = 'toast-warning bg-primary'
                this.showImg = true
                this.showUpload = true
                this.$store.state.user.profile.tcard = "";
                return 'Please start your certification process by submitting a photo of your TCard.';
            }
        }
    },
    methods: {
        upload(e) {
            this.loading = true
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
            client.put('/cupids/avatar/' + this.$store.state.user.mail + '/tcard.png', bfile).then(function (r1) {
                // this.loading = false
                console.log('put success: %j', r1);
                UpdateUserInfo({"tcard": r1.url, "certification": 1}).then(res => {
                    console.log(res)
                }).catch(error => {
                    console.log(error)
                })
            }).then(function (r2) {
                console.log('get success: %j', r2);
            }).catch(function (err) {
                console.error('error: %j', err);
            });

            setTimeout(() => {
                this.getUserProfile()
            }, 2000);
        },
        getUserProfile() {
            GetUserProfile().then(res => {
                this.$store.dispatch('user/setUserProfile', res.data).then(response => {
                    this.$forceUpdate();
                    this.loading = false;
                    this.$refs.images.src = this.$store.state.user.profile.tcard
                    console.log(this.$store.state.user.profile.tcard)
                });
            });
        }
    }
}
</script>

<style lang="scss" scoped>



.tile, .shadow{
    overflow: hidden !important;
    padding: 0px !important;
    border-radius: 8px !important;
    box-shadow: 0 0.25rem 1rem rgba(48,55,66,.15) !important;
    margin-bottom: 16px;

    .toast{
        margin: 0px;
        padding: 10px;
    }

    .form-group{
        width: 100%; 
        margin: 0px !important;
    }

    .form-input{
        border: 0px;
        border-radius: 0px;
        padding: 10px;
    }
}
</style>
