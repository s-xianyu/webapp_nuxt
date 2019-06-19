<template>
  <div class="body">
    <div class="animated fadeInRight">
      <BackHead :back="true"/>
      <div :class="{fixeds:isFixed}">
        <ListNav v-if="shows"/>
      </div>
      <div class="main">
        <div class="carList"
             v-infinite-scroll="loadermore"
             :infinite-scroll-distance="scrollDistance">
          <List :findCarList="findCarList"/>
        </div>
      </div>
      <BackTop/>
      <!-- <FooterTab/> -->
      <Loading v-if="loadingShow"/>
      <Login/>
      <FiltrateCar/>
    </div>
  </div>
</template>
<script>
  import Loading from '~/components/common/loading/loading'
  import List from '~/components/findCar/list'
  import ListNav from '~/components/findCar/listNav'
  import BackHead from '~/components/common/header/back_head'
  import FooterTab from '~/components/common/footer/footer'
  import BackTop from '~/components/common/backTop/backTop'
  import Login from '~/components/common/login/login'
  import FiltrateCar from '~/components/common/filtrateCar/filtrateCar'
  import {filteData} from '~/config/Ajax'
  import {mapState,mapActions,mapMutations} from 'vuex'

  export default {
    head () {
      return {
        title:'列表页-买车第一站'
      }
    },
    data () {
      return {
        shows:true,
        loadingShow:false,
        offsetTop:0,
        isFixed:false,
        scrollDistance:'1', //滚动加载更多阈值
      }
    },
    created(){
      this._getCity();
    },
    mounted(){
      this.scrollHead();
      window.addEventListener('scroll', this.scrollHead);
      // 获取screen至页面顶部的距离
      this.offsetTop = document.querySelector('.listNav').offsetTop;
    },
    destroyed(){
      this.WIN_HEIGHT(false);
    },

    computed:{
      ...mapState(['findCarList','findCarVal']),
    },
    components: {
      Loading,
      List,
      BackHead,
      BackTop,
      FooterTab,
      ListNav,
      Login,
      FiltrateCar
    },
    methods:{
      ...mapActions(['_getCity']),
      ...mapMutations(['ADD_LIST','ADD_PAGE','FINDCARVAL_REMOVE','WIN_HEIGHT']),
      async loadermore(){
        this.loadingShow = !this.loadingShow;
        await this.ADD_PAGE('findCar');
        this.LoadMore()
      },
      async LoadMore () {
        let { data } = await filteData(this.findCarVal);
        this.ADD_LIST(data.carList);
        setTimeout(()=>{
          this.loadingShow = false;
        },500);
      },

      scrollHead(){
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop > this.offsetTop) {
          this.isFixed = true
        } else {
          this.isFixed = false
        }
      },
      // 子组件改变后执行请求
      doParent(){
        this.shows = false;
        // 重新加载数据
        this.loadermore();
        // 更新组件
        this.$nextTick(()=>{
          this.shows = true;
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '~static/style/mixin';
  .main{
    .page-loadmore-wrapper{
      overflow: scroll;
    }
    .carList{
      background:$fff;
    }
  }
</style>
