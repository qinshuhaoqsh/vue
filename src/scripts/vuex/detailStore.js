import axios from "axios"
export let detail  = {
    namespaced : true,
    state : {
        goods : null
    },
    mutations : {
        setGoods(state,{goods}){
            state.goods = goods
        }
    },
    actions : {
        getDetail(store,{dataId}){
            axios.get("http://59.110.173.55:5000/vue/detail",{params:{dataId}})
                .then(({data})=>{
                    store.commit("setGoods",{goods:data[0]})
                })
        },
        //dataId,goodsname:goods.itemName,goodsurl:goods.itemInfo.imgUrl,price:goods.itemInfo.price,num:this.num1
        create(store,data){
            axios.get("http://59.110.173.55:5000/vue/create",{params:{
                dataId:data.dataId,
                num:data.num,
                username:data.username
            }})
            .then(({data})=>{
            })
        }
    }
}