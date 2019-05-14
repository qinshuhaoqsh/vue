import axios from "axios"

export let home  = {
    namespaced : true,
    state : {
        list : [],
        pageCount : 1
    },
    mutations : {
        setList(state,{list}){
            state.list = list
        },
        setPageCount(state,{pageCount}){
            state.pageCount = pageCount
        }
    },
    actions : {
        getGoods(store,data={}){
            // 1  如果没有载荷  则data属性为空对象
            let {pageSize=16,page=1} = data
            // 2 对data进行解构  存在两种情况   当data有值时  则直接解构出pageSize属性
            // 如果data没有值时 则它为{} 空对象   此时pageSize解构后取值为默认值15
            axios.get("http://59.110.173.55:5000/vue/allbook",{
                params : {
                    pageSize,
                    page
                }
            })
                .then(({data})=>{
                    console.log(data)
                    store.commit("setList",{list:data})
                })
        },
        getCount(store,data={}){
            let {pageSize=16} = data
            axios.get("http://59.110.173.55:5000/vue/countpage",{
                params : {
                    pageSize
                }
            })
            .then(({data})=>{
                console.log(data)
                store.commit("setPageCount",{pageCount:data})
            })
        },
        getGoodss(store,data={}){
            // 1  如果没有载荷  则data属性为空对象
            let moduleId =data.module;

            let {pageSize=16,page=1} = data
            // 2 对data进行解构  存在两种情况   当data有值时  则直接解构出pageSize属性
            // 如果data没有值时 则它为{} 空对象   此时pageSize解构后取值为默认值15
            axios.get("http://59.110.173.55:5000/vue/books",{
                params : {
                    pageSize,
                    page,
                    moduleId
                }
            })
                .then(({data})=>{
                    console.log(data)
                    store.commit("setList",{list:data})
                })
        },
        getCounts(store,data={}){
            let {pageSize=16} = data
            let moduleId =data.module;
            axios.get("http://59.110.173.55:5000/vue/countpages",{
                params : {
                    pageSize,
                    moduleId
                }
            })
            .then(({data})=>{
                console.log(data)
                store.commit("setPageCount",{pageCount:data})
            })
        },
        getCountss(store,data={}){
            let {pageSize=16} = data
            let key =data.key;
            axios.get("http://59.110.173.55:5000/vue/searchs", {params : {
                    pageSize,
                    key:encodeURI(key)
                }
            })
            .then(({data})=>{
                console.log(data)
                store.commit("setPageCount",{pageCount:data})
            })
        },
        getGoodsss(store,data={}){
            // 1  如果没有载荷  则data属性为空对象
            let key =data.key;

            let {pageSize=16,page=1} = data
            // 2 对data进行解构  存在两种情况   当data有值时  则直接解构出pageSize属性
            // 如果data没有值时 则它为{} 空对象   此时pageSize解构后取值为默认值15
            axios.get("http://59.110.173.55:5000/vue/search",{params : {
                    pageSize,
                    page,
                    key:encodeURI(key)
                }}
            )
                .then(({data})=>{
                    console.log(data)
                    store.commit("setList",{list:data})
                })
        },
    }
}

// let obj = {
//     name : "zhuiszhu"
// }

// let {name} = obj


// function sayHell({name}){
//     // let  {name} = obj
//     console.log(`hello ${obj.name}`)
// }
