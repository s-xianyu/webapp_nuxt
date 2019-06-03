<template>
  <div class="body">
    <div class="animated fadeInRight">
      <BackHead :back="true"/>
      <div :class="{fixeds:isFixed}">
        <ListNav/>
      </div>
      <div class="main">
        <div class="carList"
             v-infinite-scroll="loadermore"
             infinite-scroll-distance="10">
          <List :findCarList="findCarList"/>
        </div>
      </div>
      <BackTop/>
      <!-- <FooterTab/> -->
      <Loading v-if="loadingShow"/>
      <Login/>
      <Brand/>
    </div>
  </div>
</template>
<script>
  import Loading from '~/components/common/loading'
  import List from '~/components/findCar/list'
  import ListNav from '~/components/findCar/listNav'
  import BackHead from '~/components/common/header/back_head'
  import FooterTab from '~/components/common/footer/footer'
  import BackTop from '~/components/common/backTop'
  import Login from '~/components/common/login/login'
  import Brand from '~/components/common/brand/brand'
  import {filteData} from '~/config/getData'
  import {mapState,mapActions,mapMutations,mapGetters} from 'vuex'
  import {removeStore} from "../config/util/util";

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
      this.offsetTop = document.querySelector('.listNav').offsetTop;
    },
    destroyed(){
      this.FINDCARVAL_REMOVE();
      this.WIN_HEIGHT(false);
    },
    watch:{
      getFindCarVal(){
        this.thisGetters();
      }
    },
    computed:{
      ...mapState(['windowHeight','findCarList','findCarVal']),
      ...mapGetters(['getFindCarVal']),
    },
    components: {
      Loading,
      List,
      BackHead,
      BackTop,
      FooterTab,
      ListNav,
      Login,
      Brand
    },
    methods:{
      ...mapActions(['getCity']),
      ...mapMutations(['ADD_LIST','ADD_PAGE','FINDCARVAL_REMOVE','WIN_HEIGHT']),
      async loadermore(){
        this.loadingShow = !this.loadingShow;
        await this.ADD_PAGE('findCar');
        this.LoadMore()
      },
      //监听改变后执行
      thisGetters(){
        this.loadingShow = !this.loadingShow;
        this.LoadMore();
      },

      async LoadMore () {
        let { data } = await filteData(this.findCarVal);
        this.ADD_LIST(data.carList);
        setTimeout(()=>{
          this.loadingShow = false;
        },500);
      },

      scrollHead(){
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        if (scrollTop > this.offsetTop) {
          this.isFixed = true
        } else {
          this.isFixed = false
        }
      },
      // 子组件改变后执行请求
      doParent(){
        this.LoadMore()
      }
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
