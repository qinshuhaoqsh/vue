

import Vue  from "vue";
import VueRouter from "vue-router"

import Home from "./pages/Home.vue"
import Detail from "./pages/Detail.vue"
import Index from "./pages/Index.vue"
import Register from "./pages/Register.vue"
import Login from "./pages/Login.vue"
import Art from "./pages/Art.vue"
import Xinshu from "./pages/Xinshu.vue"
import Jiushu from "./pages/Jiushu.vue"
import Minguo from "./pages/Minguo.vue"
import Shoppingcar from "./pages/Shoppingcar.vue"
import Search from "./pages/Search.vue"
//  0
Vue.use(VueRouter)

// 1. 组件


// 2. 配置routes
const routes = [
    {
        path : "/",
        component : Index,
        redirect : {name:"h"},
        children : [
            {
                path : "/home",
                component : Home,
                name : "h"
            },
            {
                path : "/detail",
                component : Detail,
                name : "d"
            },
            {
                path: "/register",
                component : Register,
                name : "r"
            },
            {
                path: "/login",
                component : Login,
                name : "l"
            },
            {
                path : "/xinshu",
                component : Xinshu,
                name : "xinshu"
            },
            {
                path : "/jiushu",
                component : Jiushu,
                name : "jiushu"
            },
            {
                path : "/minguo",
                component : Minguo,
                name : "minguo"
            },
            {
                path : "/art",
                component : Art,
                name : "art"
            },
            {
                path : "/shoppingcar",
                component : Shoppingcar,
                name : "shoppingcar"
            },{
                path :"/search",
                component :Search,
                name : "search"
            }
        ]
    }
]

// 3 创建路由
const router =  new VueRouter({
    routes,
})

// 4. 挂载 暴露

export default router;