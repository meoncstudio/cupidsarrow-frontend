import service from "@/utils/request"

/**
 * Signin
 */
export function Signin(mail, password) {
    return service.request({
        method: 'put',
        url: '/api/users/signin',
        data: {'mail': mail, 'password': password}
    })
}

export function Register(mail, password, vericode) {
    return service.request({
        method: 'post',
        url: '/api/users',
        data: {'mail': mail, 'password': password, 'vericode': vericode}
    })
}

export function Authentication() {
    return service.request({
        method: 'get',
        url: '/api/users/authentication',
        data: {}
    })
}

export function GetUserProfile() {
    return service.request({
        method: 'get',
        url: '/api/users/info',
        data: {}
    })
}

export function UpdateUserInfo(data) {
    return service.request({
        method: 'patch',
        url: '/api/users/info',
        data: data
    })
}

export function GetAllUsers() {
    return service.request({
        method: 'get',
        url: '/api/users'
    })
}

export function GetUidUser(uid) {
    return service.request({
        method: 'get',
        url: '/api/users/' + uid,
    })
}

export function UnCertificationUser() {
    return service.request({
        method: 'get',
        url: '/api/users/uncertificationuser',
    })
}

export function SudoUpdateUserInfo(data) {
    return service.request({
        method: 'patch',
        url: '/api/users/superinfo',
        data: data
    })
}



export function GetActivities(aid) {
    return service.request({
        method: 'get',
        url: '/api/activities/' + aid,
    })
}

export function GetAllActivities() {
    return service.request({
        method: 'get',
        url: '/api/activities'
    })
}

export function SendVeriCode(mail) {
    return service.request({
        method: 'post',
        url: '/api/user/mail',
        data: {'mail': mail}
    })
}