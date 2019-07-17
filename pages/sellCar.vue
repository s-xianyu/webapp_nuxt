<template>
  <div class="sellCar">
    <h2>{{msg}}</h2>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: 'sellCar',
        heads:{
          title:'卖车',
          position:true,
        },
      }
    },
    components: {
    },
    mounted(){

      const point =[
        [4,5],
        [10,1],
        [0,40]
      ];
      let newArr = point.map(([x,y])=>{
        return {x,y}
      });
      console.log(newArr);
        // function so(x,y){
       //   this.x = x;
       //   this.y = y;
       // };
       // so.prototype.meo = function(){
       //   return '(' + this.x + ', ' + this.y + ')';
       // };
       // var p = new so(1,2);
       // console.log(p.meo);

      class so{
        constructor(x,y){
          this.x = x;
          this.y = y;
        }
        meo(){
          return this.x + this.y;
        }
      }
      let a = new so(1,2);
      console.log(a.meo());
    },
    methods:{

    }
  }
</script>

<style scoped>

</style>
