<template>
    <div>
        <header class="navbar animated fadeInDown fast" :class="{expand : this.$store.state.user.menuExand}">
            <section class="navbar-center">
                <div class="navbar-width">
                    <ul class="navbar-wrapper">
                        <li class="navbar-menu"><a class="btn btn-link" @click="expandMemu"><i class="icon icon-menu"></i></a></li>
                        <li><a class="btn btn-link" @click="routerTo('/home')">Home</a></li>
                        <li v-if="!hasSignin"><a class="btn btn-link" @click="routerTo('/signin')">Signin</a></li>
                        <li v-if="hasSignin"><a class="btn btn-link" @click="routerTo('/user')">{{this.$store.state.user.username || "User"}}</a></li>
                    </ul>
                </div>
                <div id="main-navbar-wrapper"></div>
            </section>
            <a @click="routerTo('/home')"><img class="navbar-ico" src="@/assets/ico/logo-white.png"></a>
        </header>
    </div>

</template> 

<script>
export default {
    name: "Navbar",
    data() {
        return {
        }
    },
    methods: {
        routerTo(addr) {
            this.$store.state.user.menuExand = false;
            this.$router.push(addr);
            document.getElementById("main-navbar-wrapper").innerHTML = "";
        },
        expandMemu() {
            this.$store.state.user.menuExand = !this.$store.state.user.menuExand;
        }
    },
    computed: {
        hasSignin(){
            return this.$store.state.user.uid !== null;
        }
    }
}
</script>

<style lang="scss" scoped>

.navbar {
    width: 100%;
    height: 52px;
    background: rgba(0, 0, 0, 0) linear-gradient(rgba(0, 0, 0, 0.95), transparent) repeat scroll 0% 0%;
    position: fixed;
    z-index: 9999;
    font-family: "SF Text";
    
    .navbar-center {
        margin: auto;
    }
    .btn.btn-link{
        color: $light-color;
        font-size: 14px;
        margin: 0px 5px;
        height: 26px;
        text-align: center;
        line-height: 7px;
        opacity: 0.8;
        transition: opacity 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
    }
    .btn.btn-link:hover{
        opacity: 1;
    }

    .btn.btn-link.logo{
        background-image: url("~@/assets/ico/logo-white.png");
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        color: transparent;
        width: 60px;
    }

    .navbar-wrapper{
        display: flex;
        list-style: none;
        margin: 0px;
    }

    li{
        margin: 0px;
    }

    .navbar-menu{
        display: none;
    }

    .navbar-ico{
        display: none;
        width: 25px;
        height: 25px;
        position: absolute;
        left: calc(50vw - 12.5px);
        top: 2vh;
        opacity: 0.8;
    }

    .navbar-width{
        width: 50%;
    }
}

.navbar.white{
    background: rgba(255, 255, 255, 0) linear-gradient(rgba(255, 255, 255, 0.95), transparent) repeat scroll 0% 0%;

     .btn.btn-link {
        color: $dark-color !important;
    }
}



@media screen and (max-width: 840px) { // 480 < x <= 600
    .navbar{
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 52px;
        overflow: hidden;
        transition: height 0.2s ease-in-out, background 0.2s ease-in-out;
        z-index: 99999;
    }

    .navbar.expand{
        height: 100%;
        backdrop-filter: blur(5px);
    }

    .navbar .navbar-center{
        margin: 10px;
        align-items: normal;
        width: 100%;
    }

    .navbar li{
        height: 45px !important;
    }

    .navbar a{
        font-size: 18px !important;
    }

    .navbar-wrapper{
        display: flex;
        flex-direction: column;
    }

    .navbar .navbar-menu{
        display: block;
        height: 52px;
        margin-bottom: 20px;
    }

    
    .navbar-ico{
        display: block !important;
    }

    .navbar ul{
        width: 100%;
        color: #fff !important;
    }

}

</style>