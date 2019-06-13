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
    }
  }
</script>

<style scoped>

</style>
