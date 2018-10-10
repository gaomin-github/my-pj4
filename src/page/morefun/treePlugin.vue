<template>
  <ul class="tree-level">
    <li v-for="(data,key) in datas" :key="data.id" class="tree-level-title">
        <section class="title-check" :class="data.tick?'':'title-uncheck'" @click="treeCheck(datas,data,key)">
          <svg><use xlink:href="#tick"/> </svg>
        </section>
        <section class="title-toggle" v-if="data.childs&&data.hideChilds" @click="treeToggle(datas,data,key)">
          <svg><use xlink:href="#add"/> </svg>
        </section>
        <section class="title-toggle" v-else @click="treeToggle(datas,data,key)">
          <svg><use xlink:href="#shrink"/> </svg>
        </section>
        <span @click="displayDetail(data)">{{data.title}}</span>
        <transition name="tree-node">
          <my-tree v-if="data.childs&&!data.hideChilds" :dataSource="data.childs"/>
        </transition>
    </li>

  </ul>
</template>
<script>
  export default {
    name:'myTree',
    props:{
      dataSource:Array,
    },
    data:function(){
      return{
        datas:this.dataSource
      }
    },
    created:function(){
    },
    computed:{
    },
    methods:{
      treeToggle:function(datas,data,key){
        return (
          function bbb(data,datas,key){
            if(data.childs){
              data.hideChilds=!data.hideChilds
              data.childs.forEach((o,index)=>{
                bbb(o,data.childs,index)
              })
            }
            datas.splice(key,1,data)
          }
        )(data,datas,key)
      },
      treeCheck:function(datas,data,key){
        return (
          function bbb(data,datas,key){
            data.tick=!data.tick
            if(data.childs){
              data.childs.forEach((o,index)=>{
                bbb(o,data.childs,index)
              })
            }
            datas.splice(key,1,data)
          }
        )(data,datas,key)
      },
      displayDetail:function(data){

        console.log('data')
        if(data.ilink){
          this.$router.push({path:data.ilink})
        }
        console.log(data)
      }
    }
  }
</script>
<style scoped lang="scss">
.tree-level{
  margin-left: 1em;
}
.tree-level-title{
  /*border:1px blue solid;*/
  .title-check,.title-toggle{
    width:1em;
    height:1em;
    line-height:.7em;
    border:1px rgb(35,150,240) solid;
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    svg{
      vertical-align: middle;
      width:.8em;
      height:.8em;
      display: inline;
    }
  }
  .title-toggle{
    background: rgb(35,150,240);
    border-radius: .5em;
  }
  .title-uncheck{
    svg{
      opacity:0;
    }
  }
  span{
    vertical-align: middle;
    line-height:1.5em;
  }
  span:hover{
    cursor: pointer;
  }
}
/*.tree-node-enter,.tree-node-leave-to{*/
  /*!*opacity: 0;*!*/
  /*height:0;*/
/*}*/
/*.tree-node-leave-active{*/
  /*transform:scale(1,0);*/
  /*transition: all 1s ease;*/
/*}*/
/*.tree-node-enter-to,.tree-node-leave{*/
  /*!*opacity: 1;*!*/
  /*!*height:100px;*!*/
/*}*/
</style>
