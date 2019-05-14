<template>
<div>
        <Head/>
    <Lunpo/>
    <Goods :list="list" />
    <Pagination :defaultIndex="index" :pageCount="pageCount" @pageChange="getGoods" />
</div>
</template>
<script>
import Lunpo from "../components/Lunpo.vue"
import Goods from "../components/Goods.vue"
import Pagination from "../components/Pagination.vue"
import {mapState} from "vuex"
import Head from "../components/Head.vue";
export default {
    name : "Art",
    components : {Lunpo,Goods,Pagination,
        Head},
    data(){
        return {
            index : 1
        }
    },
    computed : {
        ...mapState("home",["list","pageCount"])
    },
    mounted(){
        let {page=1} = this.$route.query
        this.index = page*1
        this.$store.dispatch("home/getGoodss",{page,module:1057});
        this.$store.dispatch("home/getCounts",{page,module:1057});
    },
    beforeRouteUpdate(to,form,next){
        // console.log(to)
        let {page} = to.query
        this.index = page*1
        this.$store.dispatch("home/getGoodss",{page,module:1057});
        this.$store.dispatch("home/getCounts",{page,module:1057});
        next()
    },
    methods : {
        getGoods(num){
            // console.log(`当前应该加载第${num}页的数据`)
            // this.$store.dispatch("home/getGoods",{page:num})
            
            this.$router.push({name:"art",query:{page:num}})
        }
    }
}
</script>
<style lang="less" scoped>
    
</style>

