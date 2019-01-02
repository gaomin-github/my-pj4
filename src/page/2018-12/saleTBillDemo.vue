<template>
    <section class="sale_container">
        <h4>销货单页面</h4>
        <section @click="enterWpDetail(wpItem)" v-for="wpItem in wpList" class="sale_item">
            <span>{{wpItem.cmatname}}</span>
            <span>{{wpItem.itotal}}</span>
            <span>{{wpItem.iamt}}</span>
        </section>
    </section>
</template>
<script lang="ts">
    import Vue from 'vue';
    import list from '@/page/2018-12/data/saleBillDemo'
    import {MyWpInfo,MyWpInfoModel} from '@/page/2018-12/model/MyWpInfoModel.ts'
    import saleBillBus from '@/page/2018-12/plugin/saleBillBus.js'
    export default Vue.extend({
        data:function():{
            wpList:MyWpInfo[],
        }{
            return{
                wpList:[]
            }
        },
        created:function(){
            list.forEach((o:any)=>{
                let obj:MyWpInfo={
                    cmatguid:o.cmatguid,
                    cmatname:o.cmatname,
                    imatprecision:parseFloat(o.imatprecision+''),
                    ipriceprecision:parseFloat(o.ipriceprecision+''),
                    imgPath:o.imgPath,
                    cunitname:o.cunitname,
                    istoreiqty:parseFloat(o.istoreiqty_f+''),
                    iqty:parseFloat(o.iqty_f+''),
                    itaxprice:parseFloat(o.itaxprice_f+''),
                    iunitprice:parseFloat(o.iunitprice_f+''),
                    itotal:parseFloat(o.itotal_f+''),
                    iamt:parseFloat(o.iamt_f+''),
                    itaxrate:parseFloat(o.itaxrate_f+''),
                    itax:parseFloat(o.itax_f+''),
                    ipricetype:o.ipricetype_f,
                    iisgift:o.iisgift_f,
                    editpower:o.editpower
                }
                let myWpInfoModel=new MyWpInfoModel()
                myWpInfoModel.setModel(obj)
                this.wpList.push(myWpInfoModel.getModel())
            })
//            console.log('listData')
//            console.log(this.wpList)
        },
        mounted:function(){
            saleBillBus.$on('hideBillDetail',(param:any):void=>{
                console.log('接收物品明细页面数据')
                let wpItem=param.data
                let wpIndex:number=this.wpList.findIndex((o:MyWpInfo)=>{
                    return o.cmatguid==wpItem.cmatguid
                })
                if(!param.status){
                    this.wpList.splice(wpIndex,1)
                    return
                }else{
                    this.wpList.splice(wpIndex,1,wpItem)
                }
            })
        },
        methods:{
//            进入物品详情页面
            enterWpDetail(param:MyWpInfo):void{
                saleBillBus.$emit('showBillDetail',param)
                this.$router.push({path:'/billDetailDemo'})
            }
        }
    })
</script>
<style scoped lang="scss">
    .sale_container{
        height:400px;
        width:600px;
        border:1px white solid;
        background-color: rgb(255,255,255);
        padding-left: 5px;
    }
    .sale_item{
        border:1px black solid;
        border-bottom: none;
        line-height: 30px;
        display: flex;
        width:300px;
        justify-content: space-between;
        text-decoration: none;
        span{
            display: block;
            color:$normal_font_color;
            font-size: 12px;
            padding-left: 5px;
            padding-right: 5px;
        }
    }
    .sale_item:last-child{
        border-bottom:1px black solid;
    }
    .sale_item:hover{
        span{
            color:rgb(0,0,0);
            font-weight: 600;
        }
    }
</style>
