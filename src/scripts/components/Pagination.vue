<template>
    <div class="pagination">
        <a 
            href="javascript:;" 
            class="page-tab-btn btn"
            :class="{disable:currentPage == 1}"
            @click="tabPage(false)"
        >上一页</a><a 
            v-for="num in pageCount" 
            :key="num" href="javascript:;" 
            class="btn page-number"
            :class="{active:currentPage == num}"
            @click="toPage(num)"
        >
            {{num}}
        </a><a 
            href="javascript:;" 
            class="page-tab-btn btn"
            @click="tabPage()"
            :class="{disable:currentPage == pageCount}"
        >下一页</a>
    </div>
</template>
<script>
export default {
    name : "Pagination",
    props : {
        defaultIndex : {
            type : Number,
            default : 1,
            validator(value){
                if(value >= 1){
                    return true
                }else{
                    throw new Error("初始页数必须大于等于1")
                }
            }
        },
        pageCount : {
            type : Number,
            required : true,
            validator(value){
                if(value >= 1){
                    return true
                }else{
                    throw new Error("总页数必须大于等于1")
                }
            }
        }
    },
    data(){
        return {
            currentPage : 1
        }
    },
    mounted(){
        this.currentPage = this.defaultIndex
    },
    methods:{
        tabPage(isNext=true){
            if(isNext){
                if(this.currentPage < this.pageCount){
                    this.currentPage ++
                }
            }else{
                if(this.currentPage > 1){
                    this.currentPage --
                }
            }
        },
        toPage(num){
            this.currentPage = num
        },
    },
    watch : {
        currentPage(){
            this.$emit("pageChange",this.currentPage)
        },
        defaultIndex(){
            this.currentPage = this.defaultIndex
        }
    }
}
</script>
<style lang="less" scoped>
    .pagination{
        text-align: center;
        padding:20px 0;
    }
    .btn{
        @h: 28px;
        display: inline-block;
        border:1px solid #ccc;
        height: @h;
        line-height: @h;
        text-align: center;
        color :#666;
        border-radius: 5px;
        margin:0 3px;

        &:hover,
        &.active{
            background: #09f;
            border:1px solid #09f;
            color:#fff;
        }

        &.page-number{
            width: @h;
        }

        &.page-tab-btn{
            width: 80px;
        }

        &.disable{
            background: #e9e9e9;
            color:#999;
            cursor: default;
            border:1px solid #ccc;
        }
    }
</style>

