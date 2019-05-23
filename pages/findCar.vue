<template>
  <transition name="index">
    <div class="body" style="overflow: hidden" :style="{ height: windowHeight}">
      <backHead :back="true"/>
      <div :class="{fixeds:isFixed}">
        <listNav/>
      </div>
      <div class="main">
        <list :list="users"/>
      </div>
      <backTop/>
      <!-- <FooterTab/> -->
      <loading v-if="loadingShow"/>
    </div>
  </transition>
</template>
<script>
  import loading from '~/components/common/loading'
  import list from '~/components/findCar/list'
  import listNav from '~/components/findCar/listNav'
  import backHead from '~/components/common/header/back_head'
  import FooterTab from '~/components/common/footer/footer'
  import backTop from '~/components/common/backTop'
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
    mounted(){
      this.getCity();
      this.scrollHead();
      window.addEventListener('scroll', this.scrollHead);
      // 获取screen至页面顶部的距离
      // debugger
      this.offsetTop = document.querySelector('.listNav').offsetTop;
    },
    async asyncData () {
      let { data } = await filteData();
       return { users : data.carList}
    },
    computed:{
      ...mapState(['windowHeight'])
    },
    components: {
      loading,
      list,
      backHead,
      backTop,
      FooterTab,
      listNav
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
      margin-top:1.21rem;
    }
  }
  .main{
    .page-loadmore-wrapper{
      overflow: scroll;
    }
  }
</style>
