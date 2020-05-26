<template>

<div>

    <div class="columns title-wrapper">
        <div class="column col-8 col-sm-8">
            <div class="h1">VIP</div>
        </div>
    </div>

    <div class="card" :style=[vipStyle]>
        <div class="head-wrap">
            <div class="card-image">
                <div class="blur"></div>
                <img class="img-responsive">
            </div>
            <div class="inner-warp">
                <figure class="avatar animated bounceIn" id="avatar" :data-initial="getInitials(this.userinfo.username)">
                    <img ref="images" :src="this.userinfo.avatar" alt="">
                </figure>
            </div>
        </div>


        <div class="card-header">
            <div class="card-title h4 animated fadeInDown faster">{{this.userinfo.username}}</div>
            <div class="card-subtitle text-gray animated fadeInDown faster">{{vip}}</div>
        </div>
        <div class="card-body">
            <qrcode class="animated fadeIn faster" :value="qrcode" :options="{ width: 200 }" :style=[styleQR]></qrcode>
        </div>
        <div class="card-footer">
            <h6>多大丘比特社团 UTCA©</h6>
        </div>
    </div>





</div>

</template>

<script>
import FormGroup from "@/components/FormGroup"
import { GetUidUser } from "@/utils/api"
export default{
    name: "VIP",
    components: {
		FormGroup,
	},
	data() {
		return {
            disabled: true,
            vipStyle: {
                "background-image": "linear-gradient(to top, #30cfd0 0%, #330867 100%)"
            },
            styleQR: null,
            userinfo: {
				username: ''
			}
		}
    },
    computed: {
        qrcode() {
            return "http://utcupids.com/#/userview?uid=" + this.userinfo.uid;
        },
        vip() {
            if (this.userinfo.certification == 0) {
                this.vipStyle = {"background-image": "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)"}
                this.styleQR = {"opacity": 0}
                return 'Uncertification';
            }  
            this.styleQR = {"opacity": 0.7}
            if (this.userinfo.vip > 8) {
                this.vipStyle = {"background": "linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898", "background-blend-mode": "multiply,multiply"}
            } else if (this.userinfo.vip > 5) {
                this.vipStyle = {"background-image": "linear-gradient(to top, #9795f0 0%, #fbc8d4 100%)"}
            } else if (this.userinfo.vip > 2) {
                this.vipStyle = {"background-image": "linear-gradient(to top, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)"}
            } else {
                this.vipStyle = {"background-image": "linear-gradient(to top, #feada6 0%, #f5efef 100%)"}
            }
            return this.userinfo.vip == 0 ? 'MEMBER' : 'VIP ' + this.userinfo.vip
        }
    },
    methods: {
        getInitials(username){
            return username.split(" ").map((n,i,a)=> i === 0 || i+1 === a.length ? n[0] : null).join("").toUpperCase();
        },
        getUserData() {
			GetUidUser(this.$store.state.user.uid).then(res => {
				console.log(res)
				this.userinfo = res.data
			}).catch(error =>{
				console.log(error)
			})
        },

    },
    mounted() {
        this.getUserData()
    }
}
</script>

<style lang="scss" scoped>



.card-image img{
    height: 100px;
    width: 100%;
    background-image: url('https://up.enterdesk.com/edpic_source/06/cd/b7/06cdb73734811f7ebc5c6bff1cd62807.jpg');
    background-size: cover;
}

.head-wrap{
    position: relative;
    margin: 0;
    margin-bottom: 10px;
    
    .blur{
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        backdrop-filter: blur(5px);
        background-color: #ffffff30;
    }
}

.avatar{
    --side: 120px;
    width: var(--side);
    height: var(--side);
    margin: auto;
    box-shadow: 0 0.25rem 1rem rgba(48,55,66,.15);
    font-size: 3.6em;
}

.qrcode {
    text-align: center;
}

.inner-warp{
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, -50%);

}
.card-body, .card-footer{
    display: flex;
    justify-content: center;
    align-items: center;
}

.card-header, .card-body{
    padding: 0px 20px;
}


.card{
    border: none;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 0.25rem 1rem rgba(48,55,66,.15);
    max-width: 620px;
    padding: 0px;
    opacity: 0.95;
}
</style>