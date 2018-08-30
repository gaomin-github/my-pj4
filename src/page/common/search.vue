<<template>
  <section>
    <page-head class="search-top" v-bind:goBack="true" v-bind:showLogin="true">
      <section class="search" slot="search">
        <input type="text" placeholder="搜索商家、商品名称"/>
      </section>
      <section class="btn" slot="rightFun">
        <button>搜索</button>
      </section>
    </page-head>
    <section class="search-container">
      <section class="search-history">
        <ul>
          <li>张三1</li>
          <li>张三11</li>
          <li>张三111</li>
          <li>张三111</li>
          <li>张三1111</li>
          <li>张三11111</li>
          <li>张三111111</li>
        </ul>
      </section>
      <section class="search-result">

      </section>
    </section>
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
<style scoped lang="scss">
  .search-top{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .search{
      flex:1;
      background-color: rgb(255,255,255);
      border-radius: 1rem;
      padding:.2rem 1rem;
      margin:0 1rem;
      input{
        width:100%;
        line-height: 1.5rem;
        font-size: .8rem;
      }
    }
    .btn{
      width:3rem;
      button{
        font-size: 1rem;
      }
    }
  }
  .search-container{
    padding-top: 3rem;
  }
  .search-history{
    ul{
      display: flex;
      flex-direction: row;
      justify-content: flex-start;

      li{
        display: inline-block;
        border-bottom: 1px rgb(180,180,180) solid;
        line-height: 2rem;
      }
    }
  }
</style>
