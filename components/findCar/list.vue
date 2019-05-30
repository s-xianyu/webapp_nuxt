<template>
  <div class="carList">
    <div
      v-infinite-scroll="loadermore"
      infinite-scroll-distance="10">
      <ul v-if="findCarList.length" class="list">
        <router-link :to="{path:'/detail/'+item.id}" tag="li" v-for="(item,index) in findCarList" :id="item.id">
          <div class="listLeft"><img v-lazy="item.photoAddress" alt=""></div>
          <div class="listRight">
            <h2>{{item.buyDate}}&nbsp;&nbsp;{{item.seriesBrandCarStyle | emptyVal}}</h2>
            <div class="second">
              <span>{{item.location}}/{{item.mileAge | toFixedVal}}万公里/{{item.standard}}</span>
              <span v-if="item.is4s && item.is4s === 1" class="sign">有4S记录</span>
            </div>
            <p>{{item.publishDate}}</p>
            <div class="money">
              <span class="price">￥{{item.price}}万</span>
              <span class="credit" v-if="item.credit > 0">{{item.credit}}</span>
            </div>
          </div>
        </router-link>
        <!--<li v-for="(item,index) in users.carList" :key="item.id" :id="item.id">{{item.id}}{{index}}</li>-->
      </ul>
    </div>
    <Loading v-if="loadingShow"/>
  </div>
</template>
<script>
  import Loading from '~/components/common/loading'
  import {mapState,mapGetters,mapMutations} from 'vuex'
  import {filteData} from '~/config/getData'
export default {
  data (){
    return {
      loadingShow:false,
    }
  },
  watch:{
    // 监听车龄
    getList_year(){
      this.thisGetters();
    },
    // 监听排序
    getList_order(){
      this.thisGetters();
    },
    // 监听价格
    getList_priceInterval(){
      this.thisGetters();
    },
    //监听4S
    getList_is4s(){
      this.thisGetters();
    },
    getList_newCar(){
      // this.thisGetters();
    }
  },
  computed:{
    ...mapState([
      'findCarList',
      'areaCode',
      'pageSize',
      'currPage',
      'order',
      'priceInterval',
      'year',
      'serial',
      'carType',
      'standards',
      'dayInterval',
      'colors',
      'gears',
      'is4s',
      'pifa',
      'mileage',
      'carKinds',
      'bodType',
      'factory',
      'country',
      'motor',
      'devicetoken',
      'newCar',
      'appmobile',
      'apptoken',
    ]),
    ...mapGetters([
      'getList_year',
      'getList_order',
      'getList_priceInterval',
      'getList_is4s',
      'getList_newCar'
    ]),
    params (){
      return{
        areaCode:this.areaCode,
        pageSize:this.pageSize,
        currPage:this.currPage,
        order:this.order,
        priceInterval:this.priceInterval,
        year:this.year,
        serial:this.serial,
        carType:this.carType,
        standards:this.standards,
        dayInterval:this.dayInterval,
        colors:this.colors,
        gears:this.gears,
        is4s:this.is4s,
        pifa:this.pifa,
        mileage:this.mileage,
        carKinds:this.carKinds,
        bodType:this.bodType,
        factory:this.factory,
        country:this.country,
        motor:this.motor,
        devicetoken:this.devicetoken,
        newCar:this.newCar,
        appmobile:this.appmobile,
        apptoken:this.apptoken,
      }
    }
  },
  components:{
    Loading
  },
  created(){
    // this.LoadMore()
  },
  methods:{
    ...mapMutations(['ADD_LIST','ADD_PAGE']),
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
      let { data } = await filteData(this.params);
      this.ADD_LIST(data.carList);
      setTimeout(()=>{
        this.loadingShow = false;
      },500);
    },
  }
}
</script>
<style lang="scss" scoped>
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
          .second{
            color:$c999;
            font-size:.37rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .sign{
              @include flexCenter;
              @include wh(1.8rem,.61rem);
              border:1px solid red;
              color:red;
              font-size:.3rem;
            }
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
