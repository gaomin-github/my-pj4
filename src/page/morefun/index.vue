<template>
  <section class="wp-container">
    <span>demo集合</span>
    <tree-plugin :dataSource="treeList"></tree-plugin>
    <button @click="enterDetail('ajax')">跳转到ajax页面</button>
  </section>
</template>
<script>
  import treeList from '@/page/morefun/index.json'
  import treePlugin from '@/page/morefun/treePlugin'
  export default{
    name:'treeIndex',
    data:function(){
      return {
        num:5,
        title:'我的目录',
        treeList:treeList
      }
    },
    components:{
      treePlugin
    },
    computed:{
    },
    methods:{
      enterDetail(){
        this.$router.push({path:'indexAjax'})
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
