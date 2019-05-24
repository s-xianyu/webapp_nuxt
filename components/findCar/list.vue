<template>
  <div class="carList">
    <mt-loadmore v-infinite-scroll="loadermore" infinite-scroll-immediate-check="false">
      <ul class="list">
        <router-link :to="{path:'/detail/'+item.id}" tag="li" v-for="(item,index) in list" :key="item.id" :id="item.id">
          <div class="listLeft"><img v-lazy="item.photoAddress" alt=""></div>
          <div class="listRight">
            <h2>{{item.buyDate}}&nbsp;&nbsp;{{item.seriesBrandCarStyle | emptyVal}}</h2>
            <p>{{item.location}}/{{item.mileAge | toFixedVal}}万公里/{{item.standard}}</p>
            <p>{{item.publishDate}}</p>
            <div class="money">
              <span class="price">￥{{item.price}}万</span>
              <span class="credit" v-if="item.credit > 0">{{item.credit}}</span>
            </div>
          </div>
        </router-link>
        <!--<li v-for="(item,index) in users.carList" :key="item.id" :id="item.id">{{item.id}}{{index}}</li>-->
      </ul>
    </mt-loadmore>
    <Loading v-if="loadingShow"/>
  </div>
</template>
<script>
  import {filteData} from '~/config/getData'
  import Loading from '~/components/common/loading'
  import {mapState} from 'vuex'
export default {
  data (){
    return {
      list:[],
      loadingShow:false,
    }
  },
  computed:{
    ...mapState(['findCarVal']),
  },
  watch:{

  },
  components:{
    Loading
  },
  mounted(){
    this.LoadMore()
  },
  methods:{
    loadermore(){
      this.loadingShow = !this.loadingShow;
      this.LoadMore()
    },

    async LoadMore () {
      let { data } = await filteData(this.findCarVal);
      this.list = data.carList;
      setTimeout(()=>{
        this.loadingShow = false;
      },1000);
    },
  }
}
</script>
<style lang="scss" scope>
  @import '~static/style/mixin';
  .list{
      li{
        @include wh(100%,auto);
        @include flexCenter;
        padding:.5rem .3rem;
        border-bottom:1px solid #e1e1e1;
        .listLeft{
          flex:1.15;
          img{
            width: 4.224rem;
            height: 3.168rem;
          }
          }
        .listRight{
          flex:2;
          margin-left:.3rem;
          h2{
            font-size:.5rem;
            word-break: break-all;
            text-overflow: ellipsis;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          p{
            color:$c999;
            font-size:.37rem;
          }
          .money{
            display: flex;
            span{
              flex:1;
              display: flex;
              &.price{justify-content: flex-start;color:$f60;font-size:.56rem;}
              &.credit{justify-content: flex-end}
            }
          }
        }
      }
    }
</style>
