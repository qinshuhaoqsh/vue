<template>
    <div>
        <router-view />
        <Foot/>
    </div>
</template>
<script>

import Foot from "../components/Foot.vue";
import {mapState} from "vuex";
export default {
    name : "Index",
    components : {
        Foot
    }
}
</script>
<style lang="less" scoped>
    .logo{
        
        h1{
            @h: 80px;
            height: @h;
            line-height: @h;
            color:#09f;
            font-size:40px;
            font-weight: bold;
        }
    }
</style>


