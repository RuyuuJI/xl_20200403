/*
操作localStorage工具模块
*/
import store from 'store'

const USER_KEY = "USER_KEY"
export default{
    //统一暴露
    saveUser(user){
        // localStorage.setItem(USER_KEY,JSON.stringify(user))
        store.set(USER_KEY,user)
    },
    getUser(){
    //    return JSON.parse(localStorage.getItem(USER_KEY) || "{}")
    return store.get(USER_KEY) || {}
    },
    removeUser(){
        // localStorage.removeItem(USER_KEY)
        store.remove(USER_KEY)
    }
}