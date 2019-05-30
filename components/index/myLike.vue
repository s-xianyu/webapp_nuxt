<template>
  <div class="mylike">
    <div style="background:#fff;">
      <div class="h2">
        <h2>猜您喜欢</h2>
        <!-- <div class="right">查看更多<i class="iconfont icon-xiayiye"></i></div> -->
      </div>
    </div>
    <div
      v-infinite-scroll="loadermore"
      infinite-scroll-distance="10">
      <ul v-if="likeList.length">
        <router-link
          tag="li"
          :to="{path:'/detail/'+item.id}"
          v-for="(item, index) in likeList"
          :data-id="item.id"
          :key="index">
          <div class="content">
            <div class="imgTop">
              <img v-lazy="item.photoAddress" src="" alt="">
            </div>
            <div class="textBottom">
              <div class="title">{{item.seriesBrandCarStyle | emptyVal}}</div>
              <div class="bottom">
                <span class="price">￥{{item.price}}万</span>
                <span class="location"><i class="iconfont icon-dingwei"></i><b>{{item.location}}</b></span>
              </div>
            </div>
          </div>
        </router-link>
      </ul>
      <div v-else="this.likeList.length === 0" class="no-center">暂时没有推荐内容</div>
    </div>
    <Loading v-if="loadingShow"/>
  </div>
</template>
<script>
import Loading from '~/components/common/loading'
import {mapState,mapMutations} from 'vuex'
import {gainLike} from '~/config/getData'
export default {
  data () {
    return {
      loadingShow:false, //loading图
      preventRepeatreuqest:true, //防止重复加载
    }
  },
  computed:{
    ...mapState(['likeList','likePage','likePrevent']),
    params (){
      return{
        currPage:this.likePage,
        pageSize:20,
      }
    }
  },
  mounted(){
    if(this.likePrevent){
      this.likeLoadMore()
    }
  },
  components:{
    Loading
  },
  methods:{
    ...mapMutations(['ADD_LIKE','ADD_PAGE']),
    loadermore(){
      // debugger
      this.loadingShow = true;
      this.ADD_PAGE('like');
      this.likeLoadMore();
    },
    async likeLoadMore(){
      // debugger
      let {data} = await gainLike(this.params);
      this.setData(data)
    },
    setData(data){
      setTimeout(()=>{
        this.loadingShow = false;
        this.ADD_LIKE(data.carSearchInfos);
      },500);
    },
  }
}
</script>
<style lang="scss" scope>
  @import '~static/style/mixin';
  .mylike{
    margin-top:.4rem;
    .h2{
      height:1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin:0 .3rem;
      position:relative;
      h2{
        font-size: .48rem;
        font-weight: bold;
        padding-left:.3rem;
        &::before{
          content: '';
          display: inline-block;
          @include wh(.1rem,.6rem);
          background:$c333;
          position: absolute;
          top: .4rem;
          left: 0;
        }
      }
      .right{
        color:$c666;
        .iconfont{
          font-size:.3rem;
        }
      }
    }
    ul{
      margin:0 .2rem;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      margin-top:.5rem;
      li{
        display:flex;
        width:50%;
        padding:.2rem;
        .content{
          box-shadow:0 2px 4px rgba(0, 0, 0, .2);
          .imgTop{
            width:100%;
            min-height:3.7rem;
            img{
              min-width:5.6rem;
              height:4rem;
            }
          }
          .textBottom{
            margin:.5rem .2rem;
            .title{
              color:$c333;
              font-size:.48rem;
              height:auto;
              overflow:hidden;
              display:-webkit-box;
              word-break:break-all;
              text-overflow:ellipsis;
              -webkit-box-orient:vertical;
              -webkit-line-clamp:2;
              height:1.4rem;
              display: flex;
              align-items: center;
              justify-content: flex-start;
            }
            .bottom{
              display:flex;
              justify-content: space-between;
              .price{
                font-size:.5rem;
                color:$f60;
                font-weight: bold
              }
              .location{
                display: flex;
                align-items: center;
                vertical-align: middle;
                i{
                  font-size:.42rem;
                  margin-right:.1rem;
                }
                b{
                  max-width:1.7rem;
                  overflow: hidden;
                  white-space:nowrap;
                  text-overflow:ellipsis;

                }
              }
            }
          }
        }
      }
    }
    .no-center{
      display: flex;
      justify-content: center;
      align-items: center;
      height:4rem;
    }
  }
</style>
