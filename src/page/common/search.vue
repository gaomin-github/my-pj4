<<template>
  <section>
    <page-head v-bind:goBack="true" v-bind:showLogin="true"></page-head>
  </section>
</template>
<script>
  import pageHead from '@/page/common/header'
  export default{
    data:function(){
      return{
      }
    },
    components:{
      pageHead
    }
  }
</script>
<style scoped>
</style>
