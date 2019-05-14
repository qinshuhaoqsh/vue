

//    每一个 Vuex 应用的核心就是 store（仓库） 

// 1. Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。

// 2. 你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation

import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import {home} from "./homeStore"
import {detail} from "./detailStore"
import {register} from "./registerStore"
import {login} from "./loginStore"
import {shoppingcar} from "./shoppingcarStore"
// this.$http()
// axios.defaults.baseURL = ""
const store = new Vuex.Store({
    modules : {
        home,
        detail,
        register,
        login,
        shoppingcar
    },
})



export default store;