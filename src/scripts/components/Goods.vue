<template>
    <el-col :span="20" class="auto">
        <ul class="goods-list" v-if="list.length>0">
            <router-link tag="li" :to="{name:'d',params:{dataId:goods.dataId} }" v-for="goods in list" :key="goods.dataId" :title="goods.itemName" class="lis">
                <div class="img-box">
                    <img :src="goods.itemInfo.imgUrl" :alt="goods.itemName" />
                </div>
                <h3 class="itemname">&nbsp;&nbsp;{{goods.itemName}}</h3>
                <p class="author">&nbsp;&nbsp;{{goods.itemInfo.author}}&nbsp;著</p>
                <p class="clr"><span class="fl">&nbsp;&nbsp;￥{{goods.itemInfo.price}}&nbsp;起&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><el-button type="danger" plain size="small" >加入购物车</el-button></p>
                <!-- <a href="javascript:;" class="btn">加入购物车</a> -->
                
            </router-link>
        </ul>
        <div v-else class="err">
            很抱歉，没有找到与“{{key}}”相关的商品。
        </div>
    </el-col>
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

export default {
    name : "Goods",
    props : {
        list : {
            required : true
        }
    },
    data(){
        return{
            key:getCookie("key")
        }
    }
}
</script>
<style lang="less" scoped>
    .lis:hover{
        box-shadow: 3px 3px 3px 3px #eee;
    }
.auto{
        margin:10px 8% !important;
    }
    .goods-list{
        li{
            width: 23%;
            box-sizing: border-box;
            margin:1%;
            float :left;
            border: #eee 1px solid;
            .img-box{
                height: 300px;
                overflow:hidden;
                img{
                        height: 300px;
                        cursor: pointer;
                        display: block;

                }
            }
            .itemname{
                font-size: 14px;
                color: #333;
                line-height: 30px;
                height: 30px;
                overflow: hidden;
                font-weight: normal;
                font-size: 12px;
            }
            p{
                font-size: 12px;
                color:#999;
                line-height: 30px;
                i{
                    color:#f00;
                    font-size:18px;
                }
            }
            .author{
                font-size: 12px;
                color: #999;
            }
            .fl{
                color: #bf7f5f;
                font-size: 16px;
            }
            
        }
        &:after{
            content :"";
            display: block;
            clear: both;
        }
    }
    .err{
        line-height: 40px;
        height: 40px;
        font-size: 20px;
    }
</style>
