<template>
  <h2>{{ msg }}</h2>
</template>

<script>
  export default {
    data() {
      return {
        msg: 'VIP开通'
      }
    },
    async asyncData({params}){
      console.log(params)
    },

  }
</script>

<style scoped>

</style>
