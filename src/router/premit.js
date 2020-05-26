import router from "./index"
import store from "@/store/index"
import { Authentication } from "@/utils/api"

// whileList
const whiteRouter = ['/signin', '/home', '/userview'];

// 路由守卫
router.beforeEach((to, from, next) => {
    if(sessionStorage.getItem("authority") !== null) {
        Authentication().then(res => {
            next();
        }).catch(error => {
            store.dispatch('user/signout');
            alert('session out');
            next('/signin');
        })
    }else{
        if(whiteRouter.indexOf(to.path) !== -1){
            if (from.path !== to.path) {
                next()
            }
        }else{
            next('/signin')
        }
    }
    next();
})