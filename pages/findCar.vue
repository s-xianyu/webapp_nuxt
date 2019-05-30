<template>
  <transition name="index">
    <div class="body" style="overflow: hidden" :style="{ height: windowHeight}">
      <BackHead :back="true"/>
      <div :class="{fixeds:isFixed}">
        <ListNav/>
      </div>
      <div class="main">
        <List/>
      </div>
      <BackTop/>
      <!-- <FooterTab/> -->
      <Loading v-if="loadingShow"/>
      <Login/>
    </div>
  </transition>
</template>
<script>
  import Loading from '~/components/common/loading'
  import List from '~/components/findCar/list'
  import ListNav from '~/components/findCar/listNav'
  import BackHead from '~/components/common/header/back_head'
  import FooterTab from '~/components/common/footer/footer'
  import BackTop from '~/components/common/backTop'
  import Login from '~/components/common/login/login'
  import {filteData} from '~/config/getData'
  import {mapState,mapActions} from 'vuex'

  export default {
    head () {
      return {
        title:'列表页-买车第一站'
      }
    },
    data () {
      return {
        loadingShow:false,
        offsetTop:0,
        isFixed:false,
      }
    },
    created(){
      this.getCity();
    },
    mounted(){
      this.scrollHead();
      window.addEventListener('scroll', this.scrollHead);
      // 获取screen至页面顶部的距离
      // debugger
      this.offsetTop = document.querySelector('.listNav').offsetTop;
    },
    // async asyncData () {
    //   let { data } = await filteData();
    //    return { users : data.carList}
    // },
    computed:{
      ...mapState(['windowHeight'])
    },
    components: {
      Loading,
      List,
      BackHead,
      BackTop,
      FooterTab,
      ListNav,
      Login
    },
    methods:{
      ...mapActions(['getCity']),
      scrollHead(){
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        if (scrollTop > this.offsetTop) {
          this.isFixed = true
        } else {
          this.isFixed = false
        }
      },
    }
  }
</script>
<style lang="scss" scoped>
  @import '~static/style/mixin';
  .fixeds{
    @include wh(12.42rem,auto);
    position:fixed;
    top:0;
    left:0;
    right:0;
    z-index: 100;
    & + .main{
      margin-top:3rem;
    }
  }
  .main{
    .page-loadmore-wrapper{
      overflow: scroll;
    }
  }
</style>
