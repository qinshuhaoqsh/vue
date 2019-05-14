<template>
<dir>

        <Head/>
  <div>
    <div class="w310">
      <div class="hang">
        <div class="divleft" >用户名</div>
        <div class="divright tel_right">
          <input @keyup="tel()"
            @focus="tel()"
            @blur="tel()"
            v-model="telnum" type="text" placeholder="手机"  >
            <div class="tel_info" v-show="flag_tel">
            <span id="useridmsg">{{telmsg1}}</span>
          </div>
        </div>
      </div>

      <div class="hang">
        <div class="divleft">密码</div>
        <div class="divright">
          <input placeholder="请输入6-20位字符" v-model="mm1" @keyup="mfunction()" @focus="mfunction()" @blur="mfunction()" type="password"  >
          <div class="y_info" v-show="flag_m">
            <span id="m_msg">密码必须输入6-8位字符</span>
          </div>
        </div>
      </div>

      <div class="hang">
        <a @click="dengluf()" class="zhuce" style="width:64%" href="javascript:;">登录</a>
        <router-link tag="a" to="./register" class="zhuce" style="width:32%;font-weight: normal;background-color: #ededed;color:#626262;font-size: 13px;" href="javascript:;">免费注册</router-link>

      </div>
    </div>
  </div></dir>
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

function hrefs (url){
    window.location.href=url;
    }
import { mapState, mapActions } from "vuex";
import Head from "../components/Head.vue";
export default {
  name: "Login",
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
  computed:{
  },
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
   
    mfunction(){
      if (/^[0-9a-zA-Z]{6,8}$/.test(this.mm1)) {
        this.flag_m = false;
      } else {
        this.flag_m = true;
      }
    },
    mmfunction(){
      if (this.mm1==this.mm2) {
        this.flag_mm = false;
      } else {
        this.flag_mm = true;
      }
    },
    dengluf(){
      if(!this.flag_tel&&!this.flag_m&&this.telnum&&this.mm1){
        // alert("s")

        this.$store.dispatch("login/loginyanzheng", {
        username: this.telnum,
        password: this.mm1,

        cb: (a, b, c) => {
          this.$message({
            message: a,
            type: b
          });
          if (c == 1) {
            if(getCookie("url")){
              hrefs(getCookie("url"));
            }else{
              this.$router.push({ name: "h" });
            }
          } else {
            this.$router.push({ name: "l" });
          }
        }
      });

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
.w310 {
  padding-top: 45px;
  padding-bottom: 55px;
  font-size: 14px;
  color: #626262;
  width: 310px;
  margin: auto;
  height: 140px;
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
      width: 66px;
      height: 40px;
      line-height: 40px;
      text-align: center;
    }
    .yzm_container {
      position: relative;
      .yzm {
        position: absolute;
        right: 4px;
        top: 4px;
        background-color: aliceblue;
        padding: 6px;
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
        left: 266px;
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
      width: 240px;
      height: 40px;
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
