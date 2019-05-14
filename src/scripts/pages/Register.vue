<template>
<div>
  
        <Head/>

  <div>
    <div class="w310">
      <div class="hang">
        <div class="divleft">手机号</div>
        <div class="divright tel_right">
          <input
            @keyup="tel()"
            @focus="tel()"
            @blur="tel()"
            v-model="telnum"
            type="text"
            
            
          >
          <div class="tel_info" v-show="flag_tel">
            <span id="useridmsg">{{telmsg1}}</span>
          </div>
        </div>
      </div>

      <div class="hang">
        <div class="divleft">验证码</div>
        <div class="divright yzm_container">
          <input
            v-model="ynum"
            @keyup="yzm()"
            @focus="yzm()"
            @blur="yzm()"
            type="text"
            
            
          >
          <input type="button" id="yzm" v-model="yzmcode" @click="create_yzm()">
          <div class="y_info" v-show="flag_y">
            <span id="y_msg">请输入验证码</span>
          </div>
        </div>
      </div>

      <div class="hang">
        <div class="divleft">短信验证码</div>
        <div class="divright duanxin">
          <input placeholder="无效不用填" type="text">
          <div class="dxyzm">获取短信验证码</div>
        </div>
      </div>

      <div class="hang">
        <div class="divleft">密码</div>
        <div class="divright">
          <input v-model="mm1" @keyup="mfunction()" @focus="mfunction()" @blur="mfunction()" type="password"  >
          <div class="y_info" v-show="flag_m">
            <span id="m_msg">密码必须输入6-8位字符</span>
          </div>
        </div>
      </div>
      <div class="hang">
        <div class="divleft">确认密码</div>
        <div class="divright">
          <input @keyup="mmfunction()" v-model="mm2" @focus="mmfunction()" @blur="mmfunction()" type="password"  >
          <div class="y_info" v-show="flag_mm">
            <span id="mm_msg">请再次输入密码</span>
          </div>
        </div>
      </div>
      <div class="hang" style="justify-content: center;align-items: center;">
        <input v-model="checkbox_s" style="margin-right:10px" type="checkbox"  >
        <a href="javascript:;">我已阅读并接受“服务条款”</a>
      </div>
      <div class="hang">
        <a class="zhuce" @click="zhucef()" href="javascript:;">注册</a>
      </div>
    </div>
  </div></div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import Head from "../components/Head.vue";
export default {
  name: "Register",
  components: {
    Head
  },
  data() {
    return {
      flag_tel: false,
      flag_y: false,
      flag_m: false,
      flag_mm: false,
      telmsg1: "请输入注册手机号码",
      telmsg2: "手机号码已注册",
      telnum: "",
      ynum: "",
      yzmcode: "生成验证码",
      mm1:"",
      mm2:"",
      checkbox_s:false
    };
  },
  computed: {},
  methods: {
    tel() {
      var telnum = this.telnum;
      if (/^1[3|4|5|8][0-9]\d{8}$/.test(telnum)) {
        this.flag_tel = false;
      } else {
        this.flag_tel = true;
      }
    },
    yzm() {
      var ynum = this.ynum;
      if (ynum == this.yzmcode) {
        this.flag_y = false;
      } else {
        this.flag_y = true;
      }
    },
    create_yzm() {
      var code = "";
      var codeLength = 4; //验证码的长度
      var random = new Array(
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z"
      ); //随机数
      for (var i = 0; i < codeLength; i++) {
        //循环操作
        var index = Math.floor(Math.random() * 36); //取得随机数的索引（0~35）
        code += random[index]; //根据索引取得随机数加到code上
      }
      this.yzmcode = code;
    },
    mfunction(){
      if (/^[0-9a-zA-Z]{6,8}$/.test(this.mm1)) {
        this.flag_m = false;
      } else {
        this.flag_m = true;
      }
    },
    mmfunction(){
      if (this.mm1==this.mm2&&this.mm2) {
        this.flag_mm = false;
      } else {
        this.flag_mm = true;
      }
    },
    zhucef(){
      if(!this.flag_tel&&!this.flag_y&&!this.flag_m&&!this.flag_mm&&this.telnum&&this.ynum&&this.mm1&&this.mm2&&this.checkbox_s){
        // alert("s")
        this.$store.dispatch("register/dataqingqiu",{
          username:this.telnum,
          password:this.mm1,
          cb:(a,b,c)=>{
            this.$message({
              message:a,
              type:b
            });
            if(c==1){
              this.$router.push({name:"l"});
            }else{
              this.$router.push({name:"r"});
            }
          }
        })
      }else{
        console.log(
          this.flag_tel&&this.flag_y&&this.flag_m&&this.flag_mm&&this.telnum&&this.ynum&&this.mm1&&this.mm2&&this.checkbox_s
        )
      }
    }
  }
};
</script>
<style lang="less" scoped>
.hll_zc_jf {
  width: 906px;
  margin: 0 auto;
  text-align: right;
  font-size: 14px;
  color: #87d0e3;
}
.w310 {
  font-size: 14px;
  color: #626262;
  width: 310px;
  margin: auto;
  height: 318px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .hang {
    .zhuce {
      width: 100%;
      display: block;
      height: 40px;
      background: #87d0e3;
      line-height: 40px;
      text-align: center;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
    }
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      background-color: #ededed;
    }
    .divleft {
      width: 85px;
      height: 40px;
      line-height: 40px;
      text-align: center;
    }
    .yzm_container {
      position: relative;
      #yzm {
        position: absolute;
        right: 4px;
        top: 4px;
        background-color: aliceblue;
        padding: 6px;
        width: 84px;
        height: 32px;
        line-height: 20px;
      }
    }
    .duanxin {
      position: relative;
      .dxyzm {
        position: absolute;
        right: 4px;
        top: 4px;
        background: #87d0e3;
        padding: 6px;
      }
    }
    .tel_right,
    .divright {
      position: relative;
      .tel_info,
      .y_info {
        background-color: transparent;
        display: block;
        top: 0px;
        color: #f00;
        left: 240px;
        position: absolute;
        width: 105%;
        height: 32px;
        line-height: 32px;
        span {
          padding: 0px 20px 0px 40px;
          background: url(../../assets/images/bj_3.png) no-repeat;
          display: inline-block;
          color: red;
          background-color: white;
        }
      }
    }
    .divright {
      width: 220px;
      height: 40px;
      position: relative;
      input {
        display: inline-block;
        background: none;
        height: 38px;
        line-height: 38px;
        width: 208px;
        padding-left: 10px;
        font-size: 14px;
        border: 1px solid #ededed;
        color: #626262;
        outline: none;
      }
    }
  }
}
</style>




