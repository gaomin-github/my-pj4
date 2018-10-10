<template>
  <section class="wp-container">
    <input type="number" value="item.num" v-model="param1"/>
    <input type="number" value="item.num" v-model="param2"/>
    <ul class="wp-content">
      <li v-for="(item,key) in wplist" :key="key">
        <p>物品名称：{{item.title}}</p>
        <p>物品数量
          <input type="number" value="item.num" @input="updateWpNum(item,$event)"/>
        </p>
        <p>物品价格
          <input type="number" :value="item.price" @input="updateWpPrice(item,$event)"/>
        </p>
      </li>
    </ul>
    <button @click="backWp">确定</button>
  </section>
</template>
<script>
  export default{
    data:function(){
      return {
        wplist:[
          {
            cguid_hidden:'01',
            title:'A',
          },{
            cguid_hidden:'02',
            title:'B',
          },{
            cguid_hidden:'03',
            title:'C',
          },{
            cguid_hidden:'04',
            title:'D',
          },{
            cguid_hidden:'05',
            title:'E',
          },{
            cguid_hidden:'06',
            title:'F',
          }
        ],    //初始化物品列表
        param1:0,
        param2:0
      }
    },
    computed:{
      totalParam(){
        return this.param1+','+this.param2
      }
    },
    methods:{
      updateWpNum(item,event){
        item.num=event.target.value
      },
      updateWpPrice(item,event){
        item.price=event.target.value
      },
      backWp(){
        let wpinfo=this.wplist.filter(o=>{
          return o.num>0
        })
        console.log(...wpinfo)
        this.$router.push({name:'home',params:{wpinfo:wpinfo}})
      }
    }
  }
</script>
<style lang="scss" scoped>
  .wp-content{
    li{
      border-bottom:1px rgb(180,180,180) solid;
    }
    p{
      line-height: 2em;
    }
  }
  input{
    -webkit-appearance: none;
    width:5em;
    border:1px rgb(180,180,180) solid;
    height:1.5em;
  }
</style>
