import axios from "axios"

export let shoppingcar  = {
    namespaced : true,
    state : {
        goods : [],
        goodnum: 0,
    },
    mutations : {
        setList(state,{goods}){
            state.goods = goods
        },
        count(state,{goodnum}){
            state.goodnum = goodnum*1
        },
    },
    actions : {
        getGoods(store,data){
            console.log(data.username);
            axios.get("http://59.110.173.55:5000/vue/shoppingcar",{params : { username:data.username}
                   
            })
            .then(({data})=>{
                store.commit("setList",{goods:data})
            })
        },
        updatenum(store,data){
            axios.get("http://59.110.173.55:5000/vue/updatenum",{params : { username:data.username,dataId:data.dataId,num:data.num}
            
            })
            .then(({data})=>{
            })
        },
        delone(store,data){
            axios.get("http://59.110.173.55:5000/vue/delone",{params : { username:data.username,dataId:data.dataId}
            })
            .then(({data})=>{
                store.commit("setList",{goods:data})
            })
        },
        getCount(store,data){
            console.log(data.username);
            axios.get("http://59.110.173.55:5000/vue/shoppingcarcount",{params : { username:data.username}
            })
            .then(({data})=>{
                store.commit("count",{goodnum:data})
            })
        },
        err(store){
            store.commit("count",{goods:0})
        }
    }
}
// axios.get("http://localhost:5000/vue/allbook",{
//     params : {
//         pageSize,
//         page
//     }
// })
//     .then(({data})=>{
//         console.log(data)
//         store.commit("setList",{list:data})
//     })