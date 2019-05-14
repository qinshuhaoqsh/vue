<template>
    <div>
        <el-col :span="20" class="auto">
            <el-carousel :interval="4000" type="card" height="200px">
                <el-carousel-item v-for="(item,i) in list" :key="i">
                <img :src="item.src" :alt="item.text">
                </el-carousel-item>
            </el-carousel>
        </el-col>
    </div>
</template>


<script>
export default {
    name:"Lunpo",
    data(){
        return {
            list : [
                {text:"定名与相知",src:"https://img0.kfzimg.com/operation/4c/52/4c52281ff954687466fe0587633c53db.jpg"},
                {text:"老人与海",src:"https://img0.kfzimg.com/operation/48/2e/482ec48a2539efefb62ef9477e492ca2.jpg"},
                {text:"旧书循迹",src:"https://img0.kfzimg.com/operation/f0/9a/f09aecbcc5c52bf0c03ad020a556bf30.jpg"},
                {text:"千里江山图的故事",src:"https://img0.kfzimg.com/operation/d0/56/d056e8ff2d71cb544e6f589cd0ebec64.jpg"},
                {text:"艺术品",src:"https://img0.kfzimg.com/operation/68/e6/68e637f2ba445a89290b251cab04fbfd.jpg"}
            ]
        }
    }
}
</script>
<style lang="less" scoped>
    .auto{
        margin:10px 8% !important;
    }
    .el-carousel__item img {
    font-size: 14px;
    line-height: 200px;
    margin: 0;
  }
</style>

