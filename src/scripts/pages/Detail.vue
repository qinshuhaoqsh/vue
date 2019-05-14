<template>
<div>
    <Head/>
    <el-row class="auto">
            <div class="img-box">
                <img :src="goods.itemInfo.imgUrl" alt=""/>
            
            </div>
            <div class="goods-info">
                <h3>{{goods.itemName}}</h3>
                
                <p>作者：<span>{{goods.itemInfo.author}}</span></p>
                <p>出版社：<span>{{goods.itemInfo.press}}</span></p>
                <p>出版时间：<span>{{goods.itemInfo.pubDate}}</span></p>
                <p>品相：<span>{{goods.itemInfo.quality}}</span></p>
                <p class="price">价格: ￥<span>{{goods.itemInfo.price }}</span>  </p>
                <el-input-number v-model="num1" @change="handleChange" :min="1" :max="goods.itemInfo.number" label="描述文字"></el-input-number>
                <el-button type="success" plain  @click="open">直接购买</el-button>
                <el-button type="danger" :plain="true" @click="openVn">加入购物车</el-button>
            </div>

    </el-row>
</div>
</template>
<script>
function   getCookie (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') c = c.substring(1);
          if (c.indexOf(name) != -1){
            return c.substring(name.length, c.length);
          }
        }
        return "";
      };


function setCookie(cname, cvalue, exdays){
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            console.info(cname + "=" + cvalue + "; " + expires);
            document.cookie = cname + "=" + cvalue + "; " + expires;
        };
import {mapState} from "vuex"
import Head from "../components/Head.vue";
export default {
    name : "Detail",
    components : {
        Head},
    data(){
        return {
            num1: 1
        };
    },
    computed : {
        ...mapState("detail",["goods"]),
    },
    mounted(){
        let {dataId} = this.$route.params;
        setCookie("params",dataId,1);
        if(!dataId) dataId = getCookie("params");
        this.$store.dispatch("detail/getDetail",{dataId})
    },
    methods:{
        handleChange(value) {
      },
      openVn() {
        if(getCookie("username")){
            
            this.$store.dispatch("detail/create",{username:getCookie("username"),dataId:getCookie("params"),num:this.num1})
            const h = this.$createElement;
            this.$message({
            message: h('p', null, [
                h('span', null, '加入购物车成功 '),
                h('i', { style: 'color: teal' }, "")
            ]),
            type: 'success'
            })
            router.go(0)
        }else{
            const h = this.$createElement;
            this.$message({
            message: h('p', null, [
                h('span', null, '您还未登录，请先登录 '),
                h('i', { style: 'color: teal' }, "")
            ]),
            type: 'danger'
            })
            setCookie("url",location.href,1);
            setCookie("params",this.$route.params.dataId,1);
            this.$router.push({name:"l"});
        }
        
      },
      open() {
          if(getCookie("username")){
            this.$store.dispatch("detail/create",{username:getCookie("username"),dataId:getCookie("params"),num:this.num1})
            const h = this.$createElement;
            this.$message({
            message: h('p', null, [
                h('span', null, '正在前往购物车 '),
                h('i', { style: 'color: teal' }, "")
            ]),
            type: 'success'
            })
            this.$router.push({name:"shoppingcar"});
        }else{
            const h = this.$createElement;
            this.$message({
            message: h('p', null, [
                h('span', null, '您还未登录，请先登录 '),
                h('i', { style: 'color: teal' }, "")
            ]),
            type: 'danger'
            })
            setCookie("url",location.href,1);
            setCookie("params",this.$route.params.dataId,1);
            this.$router.push({name:"l"});
        }
      },

    }
}
</script>
<style lang="less" scoped>
    .auto{
        margin:20px 8% !important;
    }
    .img-box{
        width: 40%;
        float: left;
        border: 1px solid #eee;
        img{
            width: 80%;
            margin: 0 10%;
        }
    }
    .goods-info{
        float: left;
        padding-left: 50px;
        color: #333;
        h3{
            margin-top: 20px;
            line-height: 40px;
            height: 40px;
            text-align: left;
            font-size: 20px;
            font-weight: normal;
        }
        p{
            font-size: 24px;
            line-height: 40px;
            height: 40px;
            color: #666;
        }
        span{
            color: pink;
            font-size: 24px;
        }

    }
</style>
