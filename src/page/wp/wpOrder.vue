<template>
  <section class="wp-container">
    <section>
    </section>
    <button @click="addWp">添加物品</button>
    <ul class="wp-content">
      <li v-for="(item,key) in wplist" :key="key">
        <button @click="updateWpZp(item,key)" :class="item.isZp?'zpActive':''">赠品</button>
        <section class="wp-cell-right">
          <p class="wp-cell-title">测试物品{{item.title}}</p>
          <section class="wp-cell-label">
            <span>{{item.num}}</span>
            <span>{{item.price}}</span>
            <span>{{(item.num)*(item.price)}}</span>
          </section>
        </section>
      </li>
    </ul>
    <section>
      <display-message/>
    </section>
    <section>
      <operate-message/>
    </section>
  </section>
</template>
<script>
  import displayMessage from '@/page/eventBus/displayMessage'
  import operateMessage from '@/page/eventBus/operateMessage'
  export default{
    data:function(){
      return {
        wplist:[
          {
            cguid_hidden:'01',
            title:'A',
            num:1,
            price:100
          },{
            cguid_hidden:'02',
            title:'B',
            num:2,
            price:50
          }
        ],
        zpActive:false,
      }
    },
    components:{
      displayMessage,
      operateMessage
    },
    created:function(){
//      console.log("==================created")
    },
    mounted:function(){
//      console.log("==================mounted")
    },
    activated:function(){
      if(this.$route.params&&this.$route.params.wpinfo){
        let items=this.$route.params.wpinfo
        this.wplist=[...this.wplist.map(o=>{
          if(items){
            let index=items.forEach((item,index)=>{
              if(item.cguid_hidden==o.cguid_hidden){
                item.num=(parseInt(item.num)+parseInt(o.num))
                item.isZp=o.isZp
                if(item.isZp) item.price=0
                o=item
                items.splice(index,1)
              }
            })
          }
          return o
        })]
        this.wplist=[...this.wplist,...items]
      }
    },
    methods:{
      addWp(){
        this.$router.push({path:'wpchoose'})
      },
      updateWpZp(item,key){
        item.isZp=!item.isZp
        item.price=0
        this.wplist.splice(key,1,item)
        console.log(item)
      }

    }
  }
</script>
<style lang="scss" scoped>
  .wp-container{
    height:100%;
  }
  button{
    width:6em;
    height:3em;
    background: rgb(53,153,253);
    margin:.5em 0 0 .5em;
    border-radius: .5em;
    color:rgb(255,255,255);
  }
  .wp-content{
    li{
      display: flex;
      flex-direction: row;
      padding:0 .5em;
      height:3.5em;
      line-height: 1.5em;
      align-items: center;
      border-bottom: 1px rgb(220,220,220) solid;
      .zpActive{
        border: 1px rgb(255,0,0) solid;
        color:rgb(255,0,0);
      }
      button{
        width:4em;
        margin-right: .5em;
        height:2.5em;
        background: none;
        border: 1px rgb(150,150,150) solid;
        color:rgb(150,150,150);
        border-radius: .5em;
      }
      .zp-active{
        color:rgb(255,0,0);
        border: 1px rgb(255,0,0) solid;
      }
      .wp-cell-right{
        flex:1;
        .wp-cell-title{
          font-weight: 600;
        }
        .wp-cell-label{
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }
      }
    }
  }
</style>
