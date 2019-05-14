<template>
    <el-col :span="20" class="el-footer" >
        <footer data-v-078307be="" style="height: 60px;">
            <div data-v-a2f4fd38="" data-v-078307be="" class="footer-box">
                <div data-v-a2f4fd38="" class="footer-wrap clearfix">
                    <div data-v-a2f4fd38="" class="copyright-info-box">© 2002-2018 Kongfz.com 孔夫子旧书网 版权所有</div>
                    <div data-v-a2f4fd38="" class="link-box">
                        <a data-v-a2f4fd38="" target="_blank" rel="nofollow" href="#" class="item">关于孔网</a> <a data-v-a2f4fd38="" target="_blank" rel="nofollow" href="#" class="item">联系我们</a> <a data-v-a2f4fd38="" target="_blank" rel="nofollow" href="#" class="item">帮助中心</a> <a data-v-a2f4fd38="" target="_blank" rel="nofollow" href="#" class="item">版权隐私</a> <a data-v-a2f4fd38="" target="_blank" rel="nofollow" href="#" class="item">广告业务</a> <a data-v-a2f4fd38="" target="_blank" rel="nofollow" href="#" class="item">工作机会</a> <a data-v-a2f4fd38="" target="_blank" href="#" class="item">移动版</a> <a data-v-a2f4fd38="" target="_blank" href="#" class="item">图书目录</a> <a data-v-a2f4fd38="" target="_blank" href="#" class="item">图书标签</a>
                    </div>
                </div>
            </div>
        </footer>
    </el-col>
</template>

<script>
export default {
    name:"Foot",
}
</script>

<style lang="less" scoped>
    .el-footer{
        margin: 0 0 0 8%;
        padding:10px 0 !important;
        border-top: 1px solid rgba(0, 0, 0, .46);
        color: #333;
        font-size: 12px;
        .footer-box{
            position: relative;
            z-index: 10;
            width: 100%;
            height: 50px;
            color: #999;
            background-color: #fff;
            overflow: hidden;
            .footer-wrap{
                height: 50px;
                margin: 0 auto;
                padding: 10px 0 20px;
                color: #999;
                .copyright-info-box{
                    float: left;
                    width: 300px;
                    height: 20px;
                    line-height: 20px;
                    font-size: 12px;
                }
                .link-box{
                    height: 20px;
                    line-height: 20px;
                    font-size: 12px;
                    text-align: right;
                    a{
                        margin-left: 13px;
                        color: #8999a9;
                        &:hover{
                            color: #000;
                        }
                    }
                }
            }
        }
    }
</style>

