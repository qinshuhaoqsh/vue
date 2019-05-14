<template>
<div>
        <Head/>
    <div v-if="goods.length>0" class="box">
        <div class="auto">
            <el-row v-for="(good,i ) in goods" :key="i" class="auto autos">
                    <el-col :span="1"><input type="checkbox" v-model="good.check" class="checkbox"></el-col>
                    <el-col :span="6" class="fz">{{good.books.itemName}}</el-col>
                    <el-col :span="2" class="imgbox"><img :src="good.books.itemInfo.imgUrl" alt=""></el-col>
                    <el-col :span="2">{{good.books.itemInfo.price}}</el-col>
                    <el-col :span="5"><el-input-number v-model="good.num" @change="handleChange(good.num,good.dataId)" :min="1" :max="good.books.itemInfo.number" label="描述文字"></el-input-number></el-col>
                    <el-col :span="2">{{good.num * good.books.itemInfo.price }}</el-col>
                    <el-col :span="2"><el-button size="mini" type="danger" @click="del(good.dataId)">删除</el-button></el-col>
                </el-row>   
        </div>
        <div class="auto" >
            <el-row class="auto aut">
            <el-col :span="1" class="fz">
                <label for="quan">全选</label>
            </el-col>
            <el-col :span="1">
                <input type="checkbox" id="quan" v-model="checkAll">
            </el-col>
            <el-col :span="8">&nbsp;</el-col>
            <el-col :span="4">
                <h2>总计 :  ￥{{total}}  </h2> 
            </el-col>
            <el-col :span="4">
                <h2>选中总数 : {{selectTotal}} </h2> 
            </el-col>
            <el-col :span="2">
                <el-button size="mini" type="danger" @click="delSelect()" >批量删除</el-button>
            </el-col>
            <el-col :span="2">
            </el-col>
                <el-button size="max" type="success" >结算</el-button>            
            </el-row>
        </div>
        
    </div>
    <div v-else class="auto">
        <el-col :span="18"><img src="http://www.xiangqu.com/build/xiangqu/cart/160608/images/cart_03.png" alt="aa"></el-col>
    </div></div>
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
import {mapState} from "vuex";
import Head from "../components/Head.vue";
export default {
    name:"Shoppingcar",
    components:{Head},
    data(){
        return {
            checkedNames:[],
            selected:[],
            myTotal:0,
        }    
    },
    methods: {
        delSelect(){
            this.goods.forEach((item)=>{
                if(item.check){
                    this.$store.dispatch("shoppingcar/delone",{username:getCookie("username"),dataId:item.dataId});
                }
            })
        },handleChange(num,dataId) {
            this.$store.dispatch("shoppingcar/updatenum",{username:getCookie("username"),dataId,num});
        },
        del(data){
            this.$store.dispatch("shoppingcar/delone",{username:getCookie("username"),dataId:data});
        }
    },
    computed: {
         ...mapState("shoppingcar",["goods"]),
        checkAll:{
            get(){
                var flag = true;
                this.goods.forEach((item)=>{
                    if(!item.check){
                        flag = false;
                    }
                });
                return flag;
            },
            set(val){
                console.log(val);
                this.goods = this.goods.map((item)=>{
                    item.check = val;
                    return item;
                })
            }
        },
        total(){
            var total = 0;
            this.goods.forEach((item)=>{
                if(item.check){
                    total += item.books.itemInfo.price * item.num;
                }
            })
            return total;
        },
        selectTotal(){
            var total = 0;
            this.goods.forEach((item)=>{
                if(item.check){
                    total +=  item.num;
                }
            })
            return total;
        },
       
    },
    mounted(){
        if(getCookie("username")){
            this.$store.dispatch("shoppingcar/getGoods",{username:getCookie("username")});
        }else{
            const h = this.$createElement;
            this.$message({
            message: h('p', null, [
                h('span', null, '您还未登录，请先登录 '),
                h('i', { style: 'color: teal' }, "")
            ]),
            type: 'danger'
            })
            this.$router.push({name:"l"});
        }
        
    }
}
</script>
<style lang="less" scoped>
    .box{
        margin: 50px 0;
    }
    .auto{
        color: pink;
        text-align: center;
        margin:10px 8% !important;
        img{
            width: 80%;
        }
        
        .aut{
            font-size: 20px;
            height: 70px;
        }
        
    }
    .autos{
            line-height: 70px;
            .checkbox{
                height: 16px;
                width: 16px;
                display: line-block;
            }.fz{
                font-size: 12px;
                margin-right: 20px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                height: 70px;
            }
        }
        #quan{
            height: 16px;
                width: 16px;
                display: line-block;
        }
        
</style>

