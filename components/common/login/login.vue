<!--公用弹框登录模块-->
<template>
  <div class="logoFixed" ref="login" :class="{cur:loginShow}" :style="{ height: wrapperHeight + 'px' }">
    <header>
      <h2>手机验证</h2>
      <span class="iconfont icon-prev" @click="back"></span>
    </header>
    <div class="main">
      <div class="_login_box_logo">
        <img src="../../../static/img/checkmobile.png" alt="">
      </div>
      <div class="_login_box_form">
        <ul>
          <li>
            <input type="tel" v-model="phone" placeholder="请输入手机号码">
          </li>
          <li>
            <input type="number" v-model="imgCode" placeholder="请输入图片验证码">
            <img class="imgCode" @click="randomNum" :src="'http://m.hx2car.com/servlet/yzCode.jpg?rnd='+rnd" alt="">
          </li>
          <li>
            <input type="number" v-model="phoneCode" placeholder="请输入手机验证码">
            <button class="phoneCode" v-if="codeText === '获取验证码'" @click="getPhoneCode">{{codeText}}</button>
            <button class="phoneCode" v-else>{{codeText}}</button>
          </li>
        </ul>
        <button @click="loginSubmit" class="_login_box_submit">登录</button>
      </div>
      <div class="_third_party">
        使用其他账号登录
        <div class="qqLogin" @click="qqLogin">
          <img src="../../../static/img/third_party_qq.png" alt="">QQ登录
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  import Header from '~/components/common/header/back_head';
  import FooterTab from '~/components/common/footer/footer';
  import {mapMutations,mapState,mapActions} from 'vuex';
  import {outcodephones,smallprogramlogin} from '~/config/getData'
  export default {
    data() {
      return {
        rnd:'',
        phone:'',
        imgCode:'',
        phoneCode:'',
        codeText:'获取验证码',
        wrapperHeight:'',
      }
    },
    components:{
      Header,
      FooterTab
    },
    computed:{
      ...mapState(['isLogin','loginShow'])
    },
    mounted(){
      this.getUserInfo();
      this.randomNum();

      // 获取页面高度
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.login.getBoundingClientRect().top;
    },
    methods:{
      // 生成随机图片
      randomNum(){
        this.rnd = Math.random();
      },
      ...mapMutations(['USER_SAVE','LOGIN_SHOW']),
      ...mapActions(['getUserInfo']),

      // 获取图片验证码
      async getPhoneCode(){
        if(this.valueTrue()){
          let params = {
            Number:this.phone,
            verifyCode:this.imgCode
          };
          let { data } = await outcodephones(params);
          // debugger
          Toast(data.message);
          if(data.message == '短信发送成功'){
            let time = 60;
            let T = setInterval(()=>{
              time--;
              this.codeText = `重新发送(${time}s)`;
              if(time === 0){
                clearInterval(T);
                this.codeText = `获取验证码`;
                time = 60;
              }
            },1000)
          }
        }
      },
      // 登录提交
      async loginSubmit(){
        let params = {
          phoNum:this.phone,
          code:this.phoneCode
        };
        let { data } = await smallprogramlogin(params);
        // debugger;
        console.log(data);
        this.USER_SAVE(data);

      },

      // input输入的值是否可执行
      valueTrue(){
        if(this.phone === ''){
          Toast('手机号码不能为空!');
          return false
        }else if(this.$phoneReg(this.phone)){
          Toast('请输入正确的手机号码!');
          return false
        }else if(this.imgCode === ''){
          Toast('请输入图片验证码!');
          return false
        }else{
          return true
        }
      },
      // QQ登录跳转
      qqLogin(){
        window.location.href='https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101435816&redirect_uri=http%3A%2F%2Fwww.hx2car.com%2Fsys%2FQQlogin.htm&state=/wap/personcenter.htm,%2F&display=mobile'
      },
      // 登录框返回
      back(){
        this.LOGIN_SHOW();
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~static/style/mixin";
  .logoFixed{
    z-index: 999;
    position: fixed;
    overflow-y: scroll;
    width: 100%;
    background-color: #fff;
    left: 0;
    top: 0;
    -webkit-transition: all .3s;
    transition: all .3s;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
    &.cur{
      -webkit-transform: translate(0px, 0px);
      transform: translate(0px, 0px);
    }
  }
  header{
    position: relative;
    z-index: 100;
    @include wh(100%,1.8rem);
    border-bottom:1px solid #e1e1e1;
    background:$fff;
    &.cur{
      position: fixed;
      top:0;
      left:0;
      right:0;
    }
    h2{
      @include wh(100%,1.8rem);
      @include flexCenter;
      color:$c333;
    }
    span{
      position:absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size:.7rem;
      @include wh(1.6rem,1.8rem);
      left:0;
      top:0;
    }
  }
  .main{
    background-color:$fff;
    padding-bottom:2.8rem;
    ._login_box_logo{
      height:5.32rem;
      padding:1.2rem 0 .8rem 0;
      img{
        @include wh(auto,100%);
      }
    }
    ._login_box_form{
      width: 100%;
      padding: 0 .68rem;
      ul{
        width: 100%;
        border: 1px solid #eaeaea;
        border-radius: .16rem;
        background-color: #fff;
        margin: 0 0 1.6rem 0;
        li{
          width: 100%;
          height: 1.8rem;
          position: relative;
          &:nth-child(2){
            input{
              border-top:1px solid #eaeaea;
              border-bottom:1px solid #eaeaea;
              border-radius: 0;
            }
          }
          input{
            box-sizing: border-box;
            border-radius: .16rem;
            width: 100%;
            height: 1.8rem;
            -webkit-appearance: none;
            padding: 0 0 0 .64rem;
            font-size: .56rem;
          }
          .imgCode{
            color: #fff;
            font-size: .44rem;
            top: .32rem;
            right: .64rem;
            text-align: center;
            line-height: 1.16rem;
            width: 3.8rem;
            height: 1.16rem;
            border-radius: .12rem;
            background-color: #f60;
            display: block;
            position: absolute;
            border: none;
          }
          .phoneCode{
            color: #fff;
            font-size: .44rem;
            top: .32rem;
            right: .64rem;
            text-align: center;
            line-height: 1.16rem;
            width: 3.8rem;
            height: 1.16rem;
            border-radius: .12rem;
            background-color: #f60;
            display: block;
            position: absolute;
            border: none;
          }
        }
      }
      ._login_box_submit{
        display: block;
        width: 100%;
        height: 1.8rem;
        background-color: #f60;
        border-radius: .12rem;
        font-size: .8rem;
        text-align: center;
        line-height: 1.8rem;
        color: #fff;
        border: none;
      }
    }
    ._third_party{
      width: 100%;
      line-height: .8rem;
      font-size: .56rem;
      margin-top: .6rem;
      text-align: center;
      color: #666;
      .qqLogin{
        margin-left: 1.2rem;
        color: #666;
        display: inline-block;
        img{
          display: inline-block;
          width: .8rem;
          height: .8rem;
          background-size: .8rem;
          vertical-align: bottom;
          margin-right: .2rem;
        }
      }
    }
  }
</style>
