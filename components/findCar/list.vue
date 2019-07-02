<template>
  <div>
    <ul v-if="findCarList.length > 0" class="list">
      <router-link :to="{path:'/detail/'+item.id+'?position=0300'+(index < 9 ? '0'+(index+1) : index+1)}" tag="li" v-for="(item,index) in findCarList" :key="index" :id="item.id">
        <div class="listLeft"><img v-lazy="item.photoAddress" alt=""></div>
        <div class="listRight">
          <h2>{{item.buyDate}}&nbsp;&nbsp;{{item.seriesBrandCarStyle | emptyVal}}</h2>
          <div class="second">
            <span>{{item.location}}/{{item.mileAge | toFixedVal}}万公里/{{item.standard}}</span>
            <span v-if="item.is4s && item.is4s === 1" class="sign">有4S记录</span>
          </div>
          <p>{{item.publishDate}}</p>
          <div class="money">
            <div class="price">￥{{item.price}}万</div>
            <div class="credit" v-if="item.credit > 0">
              <img src="http://static.hx2cars.com/resource/web/dist/static/mobpages/images/mcarlist/listcredit.png" alt="">
              {{item.credit}}
            </div>
          </div>
        </div>
      </router-link>
      <!--<li v-for="(item,index) in users.carList" :key="item.id" :id="item.id">{{item.id}}{{index}}</li>-->
    </ul>
    <div v-else class="noList">
      <img src="../../static/img/nosearch_icon.png" alt="">
      <span>无数据</span>
    </div>
  </div>
</template>
<script>
export default {
  data (){
    return {
      msg:'list'
    }
  },
  computed:{
    indexS(val){
      if(val<9){
        return '0'+(val+1)
      }else{
        return (val+1)
      }
    }
  },
  props:['findCarList'],
  methods:{
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
            justify-content: space-between;
            div{
              /*flex:1;*/
              display: flex;
              align-items: center;
              &.price{justify-content: flex-start;color:$f60;font-size:.56rem;}
              &.credit{
                justify-content: flex-end;
                color:$c999;
                img{
                  @include wh(1rem,.5rem);
                  margin-right:.2rem;
                }
              }
            }
          }
        }
      }
    }
  .noList{
    font-size:.45rem;
    color:$c999;
    @include wh(100%,auto);
    padding: 1.5rem 0;
    img{
      @include flexCenter;
      @include wh(4rem,2rem);
    }
    span{
      @include flexCenter;
      margin:.3rem 0;
    }
  }
</style>
