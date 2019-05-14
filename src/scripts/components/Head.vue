<template>
    <div>
        <el-row class="q_logo">
            <el-col :span="2"><p>&nbsp;</p></el-col>
            <el-col :span="10">
                <p>网罗天下图书 传承中华文明</p>
            </el-col>
            <el-col :span="4"><p>&nbsp;</p></el-col>
                <el-col :span="1">
                    <router-link v-if="flag"  :to="{name:'l'}"   key="l" >登录</router-link>
                    <router-link v-else  :to="{name:'h'}"   key="h" >{{login }}</router-link>
                </el-col>   
                <el-col :span="1">
                    <router-link v-if="flag" :to="{name:'r'}" key="r" >注册</router-link>
                    <a v-else @click="delCookie" >注销</a>
                </el-col>          
                <el-col :span="2" class="a">
                    <router-link  :to="{name:'shoppingcar'}" key="shoppingcar" >
                        <el-badge :value="goodnum" :max="9" class="item">
                            <el-button  class="items">购物车</el-button>
                        </el-badge>
                    </router-link>
                </el-col>
                <el-col :span="1"><a href="#">个人中心</a></el-col>
                <el-col :span="1"><a href="#">我的订单</a></el-col>
            </el-row>
        <el-col :span="2"><p>&nbsp;</p></el-col>
        <el-row class="q_search">
            <el-col :span="10">
                <a href="">
                    <img src="https://www.liuyuling.site/vue/font/ef1727cd.logo.png" alt="">
                </a>
            </el-col>
            <el-col :span="8">
                    <div class="search">
                        <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
                            <el-button slot="append" icon="el-icon-search" :plain="true" @click="open"  ></el-button>
                        </el-input>
                    </div>
            </el-col>
            <el-col :span="2"><p>&nbsp;</p></el-col>
        </el-row>
        <nav>
            <el-col :span="2"><p>&nbsp;</p></el-col>
            <el-col :span="20" class="nav">
                <router-link activeClass="active" :to="{name:nav.url}" v-for="nav in list" :key="nav.name" >{{nav.text}}</router-link>                
            </el-col>
           <el-col :span="2"><p>&nbsp;</p></el-col>
        </nav>
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


function setCookie(cname, cvalue, exdays){
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            console.info(cname + "=" + cvalue + "; " + expires);
            document.cookie = cname + "=" + cvalue + "; " + expires;
            console.info(document.cookie);
        };
    function hrefs (url){
    window.location.href=url;
    }
import { Message } from 'element-ui';
import {mapState} from "vuex";
export default {
    name:"Head",
    data(){
        return {
            login:"",
            input5:'',
            list : [
                {text:"首页",url:"h"},
                {text:"新书广场",url:"xinshu"},
                {text:"旧书循迹",url:"jiushu"},
                {text:"民国旧书",url:"minguo"},
                {text:"艺术品",url:"art"}
            ]
        }
    },
    methods:{
        open() {
            setCookie("key",this.input5,7);
            const h = this.$createElement;
            this.$message({
            message: h('p', null, [
                h('span', null, '正在搜索..... '),
                h('i', { style: 'color: teal' },this.input5)
            ]),
            type: 'success'
            });
            this.$router.push({ name: "search" });
        },
        delCookie(){
            const h = this.$createElement;
            this.$message({
            message: h('p', null, [
                h('span', null, "已经退出登录"),
                h('i', { style: 'color: teal' },getCookie("username"))
            ]),
            type: 'warning'
            });
            setCookie("username","",-7);
            setCookie("url","",-7);
            setCookie("params","",-7);
            hrefs("#");
            this.$store.dispatch("login/out");
        }
    },
    computed:{
        ...mapState("login",['flag']),
        ...mapState("shoppingcar",['goodnum'])
    },
    mounted(){
        if(getCookie("username")){
            this.login = getCookie("username");
            this.$store.dispatch("shoppingcar/getCount",{username:getCookie("username")});
        }else{
            this.$store.dispatch("shoppingcar/err");
        }
    }
}
</script>
<style lang="less" scoped>
    .q_logo{
        background-color: pink;
        height: 40px;
        a{
            height: 100%;
            width: 100%;
            display: block;
            line-height: 40px;
            font-size: 12px;
            color: #fff;
            text-align: center;
            .item{
                background-color: pink;
                height: 30px;
                width: 50%;
                padding: 0;
                margin: 0;
                margin: 10px 25% 0;
                border: 0;
                color: #fff;
                display: block;
                line-height: 40px;
                font-size: 12px;
                .items{
                background-color: pink;
                height: 20px;
                width: 100%;
                padding: 0;
                margin: 0;
                border: 0;
                color: #fff;
                display: block;
                line-height: 20px;
                font-size: 12px;
                &:hover{
                color: #000;}
                }
                
            }
            &:hover{
                color: #000;
            }
        }
        p{
            line-height: 36px;
            font-size: 12px;
            color: #fff;
        }
    }
    .q_search{
        @h:100px;
        background-color: #f2f1ea;
        height: @h;
        a{
            position: relative;
            display: block;
            height: @h;
            img{
            width: 234px;
            height: 50px;
            position: absolute;
            bottom: 25px;
            display: block;
        }
        }
        .search{
            height: 40px;
            line-height: 100px;
            .input-with-select .el-input-group__prepend {
                background-color: #fff;
            }
        }
        
    }
    nav{
        background: #fff;
        padding: 10px 0;
        .nav{
            border-bottom: 1px solid rgba(0,0,0,0.46);
        }
        
         a{
            @h: 40px;
            display: inline-block;
            height:@h;
            line-height: @h;
            width: 120px;
            text-align: center;
            color:#000;
            
            
            &:hover{
                background: rgba(0,0,0,0.46);
                color:#fff;
            }

            &.active{
                background: rgba(0,0,0,0.46);
                color:#fff;
            }
        }
    }
</style>

