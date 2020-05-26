<template>

<div>

    
    <div class="container wide admin">
        <div class="columns admin-operation">
            <div class="column col-3 hide-sm"></div>
            <div v-if="this.userArray" class="column col-9 col-sm-12">
                <div class="btn-group btn-group-block">
                    <button class="btn" @click="prev">Previous ({{this.currentIndex}})</button>
                    <button class="btn btn-error tooltip" @click="reject" data-tooltip="Reject this certification">Reject</button>
                    <button class="btn btn-success tooltip" @click="approve" data-tooltip="Approve this certification">Approve</button>
                    <button class="btn btn-primary" @click="next">Next ({{this.userArray.length - this.currentIndex - 1}})</button>
                </div>
            </div>
        </div>
    </div>

    <div class="columns title-wrapper">
        <div class="column col-8 col-sm-8">
            <div class="h1">Certification Review</div>
        </div>
        <div class="column col-4 col-sm-4 edit-wrapper">
            <button class="btn btn-primary pill edit" @click="getData">Refresh</button>
        </div>
        <div class="column col-12 col-sm-12">
            <p>This is the review list of all certifications. Start to approve by clicking the buttons below.</p>
        </div>
    </div>

    <div class="columns">
        <div class="column col-12 col-sm-12">
            <div v-if="this.userArray" class="certification-wrapper">

                <div class="tile certification">
                    <div class="title h4">
                        <span style="float: left;">{{this.userArray[currentIndex].username}}</span>
                        <span style="float: right;">{{this.userArray[currentIndex].mail}}</span>
                    </div>
                    <img ref="images" data-tooltip="Lorem ipsum dolor sit amet" :src="this.userArray[this.currentIndex].tcard" class="img-responsive animated fadeIn">
                    <div class="cover animated fadeIn fast" v-if="this.userArray[this.currentIndex].certification >= 10 || this.userArray[this.currentIndex].certification <= -10"></div>
                    <progress class="progress" :value="this.currentIndex" :max="this.userArray.length - 1"></progress>
                    <div class="status">{{certificationStatus}}</div>
                </div>

            </div>
            <div v-if="!this.userArray">
                <div class="empty">
                  <div class="empty-icon"><i class="icon icon-3x icon-mail"></i></div>
                  <p class="empty-title h5">There is currently no certification in process.</p>
                  <p class="empty-subtitle">Thank you for your work.</p>
                  <!-- <div class="empty-action">
                    <button class="btn btn-primary">Send a message</button>
                  </div> -->
                </div>
            </div>
        </div>
    </div>


</div>

</template>

<script>
import FormGroup from "@/components/FormGroup"
import { UnCertificationUser, SudoUpdateUserInfo } from "@/utils/api"
export default{
    name: "CertificationAdmin",
    components: {
		FormGroup,
	},
	data() {
		return {
            userArray: [],
            currentIndex: 0
		}
    },
    computed: {
        certificationStatus() {
            if (this.userArray[this.currentIndex].certification >= 10) {
                return 'Approved'; 
            } else if (this.userArray[this.currentIndex].certification < 0) {
                return 'Rejected'; 
            } else {
                return 'Await';
            }
        }
    },
    methods: {
        getData() {
            UnCertificationUser().then(res => {
                this.userArray = res.data;
                console.log(res.data)
            }).catch(error => {
                console.log(error);
            })
        },
        next(){
            this.currentIndex = this.currentIndex < this.userArray.length - 1 ? this.currentIndex + 1 : this.currentIndex;
            this.$refs.images.src = this.userArray[this.currentIndex].tcard
        },
        prev(){
            this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.currentIndex;
            this.$refs.images.src = this.userArray[this.currentIndex].tcard
        },
        approve() {
            this.userArray[this.currentIndex].certification = 10;
            SudoUpdateUserInfo({uid: this.userArray[this.currentIndex].uid, certification: 10}).then(res => {
                // this.getData()
                this.$refs.images.src = this.userArray[this.currentIndex].tcard
                console.log(res);
                console.log(this.userArray);
            }).catch(error => {
                console.log(error);
            })
        },
        reject() {
            this.userArray[this.currentIndex].certification = -10;
            SudoUpdateUserInfo({uid: this.userArray[this.currentIndex].uid, certification: -10}).then(res => {
                // this.getData();
                this.$refs.images.src = this.userArray[this.currentIndex].tcard;
                console.log(res)
            }).catch(error => {
                console.log(error);
            })
        }
    },
    mounted() {
        this.getData()
        setTimeout(() => {
            console.log(this.userArray[this.currentIndex])
            this.$refs.images.src = this.userArray ? this.userArray[this.currentIndex].tcard : null
        },500)
    }
}
</script>

<style lang="scss" scoped>



.empty{
    border-radius: 8px !important;
    overflow: hidden !important;
    box-shadow: 0 0.25rem 1rem rgba(48,55,66,.15);

    .h5{
        font-weight: 600;
    }
}

.certification-wrapper{
    position: relative;
    margin-bottom: 100px;
}


.tile.certification{
    border-radius: 8px !important;
    padding: 0px !important;
    overflow: hidden !important;
    position: relative;
    box-shadow: 0 0.25rem 1rem rgba(48,55,66,.15);
    margin-bottom: 16px;

    .title{
        line-height: 1rem;
        min-height: 3.4em;
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: 999;
        color: #fff;
        padding: 0.6em;
        height: 30px;
        width: 100%;
        background: rgba(0, 0, 0, 0) linear-gradient(rgba(0, 0, 0, 0.95), transparent) repeat scroll 0% 0%;
    }

    .progress{
        position: absolute;
        bottom: 0px;
        left: 0px;
        width: 100%;
        height: 8px;
        opacity: 0.75;
        z-index: 799;
    }

    .status{
        position: absolute;
        bottom: 0px;
        left: 0px;
        margin: calc(0.6em + 8px) 0.6em;
        background: $primary-color;
        border-radius: 8px;
        color: #fff;
        padding: 0.6em 0.8em;
        font-family: "SF Text";
		line-height: 1.25;
		font-weight: 400;
		text-transform: uppercase;
        letter-spacing: 0.6px;
        z-index: 799;
        font-size: 1.6em;
        font-weight: 700;
    }

    .cover{
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: 99;
        width: 100%;
        height: 100%;
        background: #ff9cbd5e;
    }
}

.admin-operation{
    background: transparent;
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    z-index: 9999;
    margin-bottom: 20px;

    .btn-group{
        box-shadow: 0 0.25rem 1rem rgba(48,55,66,.15);
        border-radius: 50px !important;
        // margin: 0px 8px;
        margin: 0px 5%;
    }

    .btn{
        border-radius: 50px;
        padding: 10px;
    }
}
</style>