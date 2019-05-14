<template>
<div>
        <Head/>
    <Lunpo/>
    <Goods :list="list" />
    <Pagination :defaultIndex="index" :pageCount="pageCount" @pageChange="getGoods" />
</div>
</template>
<script>
function   getCookie (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        console.log("获取cookie,现在循环")
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          console.log(c)
          while (c.charAt(0) == ' ') c = c.substring(1);
          if (c.indexOf(name) != -1){
            return c.substring(name.length, c.length);
          }
        }
        return "";
      };
import Lunpo from "../components/Lunpo.vue"
import Goods from "../components/Goods.vue"
import Pagination from "../components/Pagination.vue"
import {mapState} from "vuex"
import Head from "../components/Head.vue";
export default {
    name : "Search",
    components : {Lunpo,Goods,Pagination,Head},
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
        
        this.index = page*1;
        this.$store.dispatch("home/getGoodsss",{page,key:getCookie("key")});
        this.$store.dispatch("home/getCountss",{page,key:getCookie("key")});
    },
    beforeRouteUpdate(to,form,next){
        // console.log(to)
        let {page} = to.query
        this.index = page*1
        this.$store.dispatch("home/getGoodsss",{page,key:getCookie("key")});
        this.$store.dispatch("home/getCountss",{page,key:getCookie("key")});
        next()
    },
    methods : {
        getGoods(num){
            // console.log(`当前应该加载第${num}页的数据`)
            // this.$store.dispatch("home/getGoods",{page:num})
            
            this.$router.push({name:"search",query:{page:num}})
        }
    }
}
</script>
<style lang="less" scoped>
    
</style>
