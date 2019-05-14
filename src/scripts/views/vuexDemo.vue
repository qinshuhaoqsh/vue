<template>
    <div>
        <h2>
            vuex -demo -- {{msg}}  -- {{count}}  --- {{city}}
        </h2>
        <el-badge :value="count" class="item">
            <el-button size="small">评论</el-button>
        </el-badge>
        <p> <el-badge :value="count1"></el-badge> </p>
        <h3> {{myCity }}  --- {{newCity}}  </h3>
        <h2> {{count2}} ---  {{count3}}   </h2>
        <hr>    
        <el-button type="primary" @click="countadd" >count add </el-button>
        <el-button type="success" @click="countdesc" >count desc 10 </el-button>
        <el-button type="info" @click="changeCity" >修改城市 深圳-sz  </el-button>
        <el-button type="info" @click="increment(100)" >count add 100  </el-button>
        <el-button type="danger" @click="changeMsg('努力最后5个星期-1809')" >changsMsg 努力最后5个星期   </el-button>
        <el-button type="warning" @click="countdecrement" >count -- 200   </el-button>
        <el-input v-model="city1"  ></el-input>
        <h2> {{ city1 }} </h2>
        <h2> {{ msg }} </h2>
    </div>
</template>


<script>
import store from "../vuex/store";
import {mapState,mapActions,mapGetters,mapMutations} from "vuex";
export default {
    data(){
        return {
            // msg:"vuex 学习",
            // count:this.$store.state.count,
            // city:store.state.city
        }
    },
    computed:{
        count1(){
            return this.$store.state.count
        },
        myCity(){
            return this.$store.state.city
        },
        city1:{
            get(){
                return this.$store.state.city;
            },
            set(val){
                console.log(val);
                // this.$store.commit("gotoCity",val)   // commit mutations 
                this.gotoCity(val)  // 直接提交mutations
            }
        },
        ...mapGetters([
            'newCity'
        ]),
        // newCity(){
        //     return this.$store.getters.newCity;
        // },
        // var obj = {a:1,b:2}  ...obj ==  a:1 ,b:2 
        ...mapState({
            count2:state=>state.count,    //  (state)=>{return state.count}
            count3:'count'    //  `state => state.count`
        }),
        ...mapState([   // 取 state  最终方法 
            // 映射 this.count 为 store.state.count
            'count',
            'city',
            'msg'
        ])
    },
    methods:{
        countadd(){
            console.log("1 ==> 组件发出 action ")
            this.$store.dispatch("add");   // action type 
        },
        // countdesc(){
        //     this.$store.dispatch("desc");
        // },
        changeCity(){
            this.$store.dispatch("gotoCity","深圳-气候宜人")
        },
        ...mapActions({
            countdesc:'desc'   // 将 `this.countdesc()` 映射为 `this.$store.dispatch('desc')`
        }),
        ...mapActions([
            'increment' , // 直接指向  映射  action -type   this.$store.dispatch('increment',100)
            'changeMsg',
            'decrement'
        ]),
        countdecrement(){
            this.decrement(200);   
        },
        ...mapMutations(['gotoCity','desc'])  // this.gotoCity == this.$store.commit('gotoCity')
    }
}
</script>
