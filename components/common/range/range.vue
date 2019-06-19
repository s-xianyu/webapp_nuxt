<template>
  <div class="range" ref="range">
    <div class="mileageTitle" :style="{width:width+'%'}">
      <span v-for="item in dataArr">{{item}}</span>
      <span>不限</span>
    </div>
    <div class="slider">
      <div class="ruler" ref="ruler">
        <div class="inner" ref="inner"></div>
        <div ref="startBar" class="bar startBar"
             @touchstart="startTouchStart"
             @touchmove="startTouchMove"
             @touchend="startTouchHend">
          <span></span>
        </div>
        <div ref="endBar" class="bar endBar"
             @touchstart="endTouchStart"
             @touchmove="endTouchMove"
             @touchend="endTouchHend">
          <span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'vue-c-slicer',
    data () {
      return {
        winW:'', //浏览器宽度
        LWidth:'', //获取距离左侧间距
        $ruler: '', // 滑竿
        $inner:'', //线
        $startBar: '', // 左侧滑块
        $endBar: '', // 右侧滑块
        startX: '', // 左侧滑块位置
        endX:  '', // 右侧滑块位置
        steps: '', // 滑竿在限定范围内可以分多少步
        intervalStart: 0,
        intervalEnd: this.step,
        startStep: 0,
        endStep: this.step,
        amountW: '', //  滑竿多长距离
        lowVal:'',
        tallVal:'',
      }
    },
    created() {
      this.$nextTick(() => {
        this.initSlider();
        this.lowVal = this.XY.split('-')[0];
        this.tallVal = this.XY.split('-')[1];
      });
    },
    props:{
      'dataArr':{
        type:Array,
      },
      'step':{
        type:Number,
      },
      'width':{
        type:Number,
      },
      'afterFun':{
        type:Function,
      },
      'XY':{
        type:String,
      }
    },
    mounted(){
      let xy1 =  this.XY.split('-')[0];
      let xy2 =  this.XY.split('-')[1] === '100' ? this.step : this.XY.split('-')[1];
      this.$ruler = this.$refs.ruler;
      this.$inner = this.$refs.inner;
      this.$startBar = this.$refs.startBar;
      this.$endBar = this.$refs.endBar;
      this.amountW = this.$ruler.clientWidth - this.$startBar.clientWidth;
      this.steps = this.amountW / (this.intervalEnd - this.intervalStart); // 总共多少步
      this.$startBar.style.left = this.steps * xy1 + 'px';
      this.$inner.style.left = this.steps * xy1 + 'px';
      this.$inner.style.right = this.steps * (this.step-xy2) + 'px';
      this.$endBar.style.left = this.steps * xy2 + 'px';
    },
    methods: {
      initSlider(){
        this.winW = document.documentElement.clientWidth || document.body.clientWidth;
        this.$ruler = this.$refs.ruler;
        this.$inner = this.$refs.inner;
        this.$startBar = this.$refs.startBar;
        this.$endBar = this.$refs.endBar;
        this.amountW = this.$ruler.clientWidth - this.$startBar.clientWidth;
        this.steps = this.amountW / (this.intervalEnd - this.intervalStart); // 总共多少步
      },
      startTouchStart(e) {
        // 获取距离左侧间距
        let LWidth = this.winW - this.$ruler.clientWidth -  this.$ruler.offsetLeft;
        this.startX = e.touches[0].pageX - LWidth; // 开始滑动时滑块的位置
      },

      startTouchMove(e){
        this.$startBar.style.zIndex = '20';
        this.$endBar.style.zIndex = '10';
        // 获取距离左侧间距
        let LWidth = this.winW - this.$ruler.clientWidth -  this.$ruler.offsetLeft;

        let slidedis = e.touches[0].pageX - LWidth - this.$ruler.offsetLeft; // 滑动距离=当前滑块x距离-最开始滑块距离
        console.log(slidedis)
        let ste = Math.round(slidedis / this.steps);
        if(slidedis < 0){ //如果小于0，停留在初始位置
          this.$startBar.style.left = '0px';
          this.$inner.style.left = '0px';
          return;
        }else if(slidedis > this.amountW){
          //否则如果大于滑动的最大值停留在最大步数的前一步
          this.$startBar.style.left = ((this.endStep-1)*this.steps) + 'px';
          this.$inner.style.left = ((this.endStep-1)*this.steps) + 'px';
          return;
        }
        if ((ste + this.intervalStart) >= this.endStep) {
          return;
        }
        console.log(ste);
        this.startStep = ste + this.intervalStart;
        this.$startBar.style.left = (ste * this.steps) + 'px';
        this.$inner.style.left = (ste * this.steps) + 'px';
      },
      startTouchHend(){
        this.scrollFromVal(this.startStep,'start');
      },
      endTouchStart(e){
        this.endX = e.touches[0].pageX; //开始滑动时滑块的位置
      },
      endTouchMove(e){
        this.$startBar.style.zIndex = '10';
        this.$endBar.style.zIndex = '20';
        // 获取距离左侧间距
        let LWidth = this.winW - this.$ruler.clientWidth -  this.$ruler.offsetLeft;
        //滑动距离=当前滑块x距离-最开始滑块距离
        let slidedis = e.touches[0].pageX - LWidth - this.$ruler.offsetLeft;
        if (slidedis < 0 || slidedis > this.amountW) {
          return;
        }
        let ste = Math.round(slidedis / this.steps);
        if (this.startStep >= (ste + this.intervalStart)) {
          return;
        }
        this.endStep = ste + this.intervalStart;

        if(this.endStep==12){
          this.$endBar.style.left = '';
          this.$endBar.style.right = '0px';
          this.$inner.style.right = '0px'
        }else{
          this.$endBar.style.left = (ste * this.steps) + 'px';
          this.$inner.style.right = (this.$ruler.clientWidth- this.$ruler.offsetLeft*2 -(ste * this.steps)) + 'px';
        }
      },
      endTouchHend(){
        this.scrollFromVal(this.endStep,'end');
      },
      scrollFromVal(val,d){
        d === 'end' ? this.tallVal = val : this.lowVal = val;
        this.afterFun(this.lowVal,this.tallVal)
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "~static/style/mixin";
  .range{
    padding:.4rem 0;
    .mileageTitle{
      @include wh(90%,auto);
      margin:0 auto;
      @include flexCenter;
      span{
        flex:1;
        @include flexCenter;
      }
    }
    .slider{
      @include wh(90%,auto);
      margin:0 auto;
      .ruler{
        background: #e9e9e9;
        height: .12rem;
        position: relative;
        z-index: 10;
        margin-top: 1rem;
        .inner{
          @include wh(auto,100%);
          position:absolute;
          top:0;
          left:0;
          right:0;
          background: $f60;
        }
        .bar{
          @include flexCenter;
          @include wh(1rem,1rem);
          @include borRadius(50%);
          box-shadow:  0 0 .5rem #999;
          background:$fff;
          position:absolute;
          z-index: 12;
          top:-.45rem;
          &.startBar{left:0;}
          &.endBar{right:0;}
          span{
            @include bis('~static/img/scroll_icon.png');
            @include wh(.6rem,.6rem);
          }
        }
      }
    }
  }
</style>
