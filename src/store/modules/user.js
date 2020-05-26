import { Authentication, GetUserInfo, UpdateUserProfile } from "@/utils/api.js";


const state = {
    username: sessionStorage.getItem("username"),
    uid: sessionStorage.getItem("uid"),
    mail: sessionStorage.getItem("mail"),
    authority: sessionStorage.getItem("authority"),
    session: sessionStorage.getItem("session"),
    profile: JSON.parse(sessionStorage.getItem("profile")) || null,
    menuExand: false,
} 


const getters = {

}

const mutations = {
    updateLocalInfo(state, data) {
        if (data.key == "username") {
            state.username = data.value;
            sessionStorage.setItem(data.key, data.value);
        } else {
            state.profile[data.key] = data.value;
            sessionStorage.setItem("profile", JSON.stringify(state.profile));
        }
    }
}

const actions = {
    error(content, data){
        return new Promise((resolve, reject) => {
            try{
                var error = data.response.data.error;
            }catch(e){
                var error = {
                    code: 540,
                    message: "Server error",
                    details: []
                }
            }
            resolve({
                statusCode: data.response.status,
                code: error.code,
                message: error.message,
                details: error.details
            });
        })
    },
    signin(content, data) {
        console.log('signin')
        return new Promise((resolve, reject) => {
            state.username = data.username;
            state.uid = data.uid;
            state.authority = data.authority;
            state.mail = data.mail;
            state.session = data.session;
            sessionStorage.setItem("username", data.username);
            sessionStorage.setItem("uid", data.uid);
            sessionStorage.setItem("authority", data.authority);
            sessionStorage.setItem("mail", data.mail);
            sessionStorage.setItem("session", data.session);
            resolve();
        })
    },
    setUserProfile(content, data) {
        return new Promise((resolve, reject) => {
            state.profile = data;
            sessionStorage.setItem("profile", JSON.stringify(data));
            resolve();
        })
    },
    updateUserProfile(content, data) {
        return new Promise((resolve, reject) => {
            state.profile = data;
            sessionStorage.setItem("profile", JSON.stringify(data));
            resolve();
        })
    },
    signout(content) {
        return new Promise((resolve, reject) => {
            state.uid = null;
            state.username = null;
            state.authority = null;
            state.mail = null;
            state.session = null;
            state.profile = null;
            sessionStorage.clear();
            resolve();
        });
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}