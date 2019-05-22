<template>
  <transition name="index">

    <div class="body">
      <backHead :back="false"/>
      <div class="main">
        <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
           <list :list="users"/>
        </div>
      </div>
      <backTop/>
      <!-- <FooterTab/> -->
      <loading v-if="loadingShow"/>
    </div>
  </transition>
</template>
<script>
  import loading from '~/components/common/loading'
  import list from '~/components/carList/list'
  import backHead from '~/components/common/header/back_head'
  import FooterTab from '~/components/common/footer/footer'
  import backTop from '~/components/common/backTop'
  import axios from '~/plugins/axios'
  import {filteData} from '~/config/getData'

  export default {
    head () {
      return {
        title:'咸鱼-买车第一站'
      }
    },
    data () {
      return {
        header:{ //head
          title:'咸鱼-买车第一站', //标题
          position:'top', //停留到顶部位置，fixed
        },
        loadingShow:false,
        topStatus:'',
        topStatusText:'上拉刷新',
        wrapperHeight:'',
        page:1,
        stickF:false,
        fous:null,
      }
    },
    async asyncData () {
      let { data } = await filteData();
       return { users : data.carList}
    },
    components: {
      loading,
      list,
      backHead,
      backTop,
      FooterTab
    },
    mounted () {
      // loading动画展示
      // this.loadingShow = true;
      // setTimeout(()=>{
      //   this.loadingShow = false;
      // },1000)

      // 获取滚动所需的高度
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;

    },
    methods:{

      // 置顶事件
      backTop(){
        // console.log(1)
        this.four=setInterval(this.FourscrollBy,10);
      },
      // 置顶
      FourscrollBy(){
        // debugger
        if(document.documentElement && this.$refs.wrapper.scrollTop) { //IE
          if (this.$refs.wrapper.scrollTop <= 0) {
            clearInterval(this.four);
          } else {
            this.$refs.wrapper.scrollBy(0, -30);
          }
        } else { //Chrome不支持documentElement.scrollTop
          if (document.body.scrollTop <= 0) {
            clearInterval(this.four);
          } else {
            this.$refs.wrapper.scrollBy(0, -30);
          }
        }
      },

      // 监听上加载动作
      handleTopChange (status) {
        if(status == 'drop'){
          // debugger
          this.topStatusText = '松开刷新'
        }
        this.topStatus = status
        // console.log(this.topStatus)
      },
      // 上拉刷新
      loadTop() {
        debugger
        let vm = this;
        this.page=1;
        setTimeout(()=>{
          axios.get('/api/mobile/filteData.json',{params: vm.params}).then((res)=>{
            this.users = res.data.carList
            this.topStatusText = '上拉刷新'
          });
          this.$refs.loadmore.onTopLoaded();
        },1000)
      },
      // 下拉加载
      loadBottom(){
        let vm = this;
        this.page++;
        // debugger
        setTimeout(()=>{
           axios.get('/api/mobile/filteData.json',{params:{currPage:vm.page}}).then((res)=>{
            //  debugger
            this.users = this.users.concat(res.data.carList)
          });
          if(this.users.length >= 20){
            this.stickF = true;
          }
          this.$refs.loadmore.onBottomLoaded();
        },1000)
      },
      stickScrollTop(){

      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '~static/style/mixin';
  .fixed{
    position:fixed;
    top:0;
    left:0;
    right:0;
    z-index: 100;
  }
  .main{
    .page-loadmore-wrapper{
      overflow: scroll;
    }
  }
</style>
