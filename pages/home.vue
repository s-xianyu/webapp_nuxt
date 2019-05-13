<template>
  <div class="body">
    <Header :heads="header"/>
    <div v-if="isLogin" class="main">
      <mt-button class="outLogin" size="large" type="primary" @click.native="outLogin">退出</mt-button>
    </div>
     <FooterTab/>
  </div>
</template>

<script>
  import Header from '~/components/common/title_head';
  import FooterTab from '~/components/common/footer';
  import {mapMutations,mapState,mapActions} from 'vuex';
  export default {
    data() {
      return {
        header: {
          title:'个人中心'
        },
        username:'',
        password:'',
        phone:'',
        introduction:'',
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
    },
    methods:{
      ...mapMutations(['OUT_USER']),
      ...mapActions(['getUserInfo']),
      outLogin(){
        this.OUT_USER();
        this.$router.push('/')
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
