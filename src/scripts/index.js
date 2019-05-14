



// 模块化编程  
console.log("vue js 主入口 ");

import Vue from "vue";

Vue.component("my-head",{
    template:"<h2>head-wuhan1809daydayup</h2>"
})


import ElementUI from "element-ui";
Vue.use(ElementUI)  ; // 全局声明


import VueResource from "vue-resource";
Vue.use(VueResource)




import router from "./router"
import store from "./vuex/store"

// Vue.filter("cny",(value,tag="¥",num=2)=>{
//     return tag+value.toFixed(num)
// })

Vue.filter("cny",(value,tag="¥",num=2)=>tag+value.toFixed(num));



const vm  = new Vue({
    el:"#app",
    router, // this.$router.push
    store, // 挂载  this.$store  ==> store 
})