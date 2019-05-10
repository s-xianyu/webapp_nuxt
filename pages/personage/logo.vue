<template>
  <div class="body">
    <Header :heads="header"/>
    <div v-if="!isLogin" class="main">
      <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
      <mt-field @click.native="randomNum" label="验证码" v-model="captcha">
        <img :src="'http://m.hx2car.com/servlet/yzCode.jpg?rnd='+rnd" height="45px" width="100px">
      </mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
      <div class="text">
        <router-link to="/">忘记密码</router-link>
        <router-link to="/">用户隐私</router-link>
      </div>
      <mt-button size="large" type="primary" @click.native="getLogin">登录</mt-button>
    </div>
    <div v-else class="main">
      <mt-button class="outLogin" size="large" type="primary" @click.native="outLogin">退出</mt-button>
    </div>
    <FooterTab/>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  import Header from '~/components/common/back_head';
  import FooterTab from '~/components/common/footer';
  import {mapMutations,mapState,mapActions} from 'vuex';
  export default {
    data() {
      return {
        header: {
          title:'登录中心'
        },
        rnd:'',
        username:'',
        password:'',
        captcha:''
      }
    },
    components:{
      Header,
      FooterTab
    },
    computed:{
      ...mapState(['isLogin'])
    },
    mounted(){
      this.getUserInfo();
      this.randomNum();
    },
    methods:{
      randomNum(){
        this.rnd = Math.random();
      },
      ...mapMutations(['GET_USER','OUT_USER']),
      ...mapActions(['getUserInfo']),
      getLogin(){
        if(this.username === ''){
          Toast('用户名不能为空!')
        }else if(this.password === ''){
          Toast('密码不能为空')
        }else{
          this.GET_USER(this.username);
          history.go(-1);
        }
      },
      outLogin(){
        this.OUT_USER();
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~static/style/mixin";
  .body{
    .main{
      .text{
        display: flex;
        margin:0 .3rem;
        height:2rem;
        justify-content: center;
        align-items: center;
        a{
          display: flex;
          flex: 1;
          &:last-child{justify-content: flex-end}
          &:frist-child{color:$fff}
        }
      }
      .outLogin{
        margin-top:5.18rem;
        background-color:$f60;
      }
    }
  }
</style>
