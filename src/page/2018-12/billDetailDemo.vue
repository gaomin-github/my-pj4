<template>
    <section class="detail_container">
        <section class="wp_head">
            <img src="/static/imgs/2018-12/bc17fb1ftw1efqrjre0sqj20u30ndq59.jpg"/>
            <section class="wp_head_right">
                <h5>物品名称：{{wpInfo.cmatname}}</h5>
                <span>库存：{{wpInfo.istoreiqty}}</span>
                <span>数量精度：{{wpInfo.imatprecision}}</span>
                <span>价格精度：{{wpInfo.ipriceprecision}}</span>
            </section>
        </section>
        <section class="wp_body">
            <section class="wp_body_item">
                <label>单位</label>
                <input type="text" value="" placeholder="单位"/>
                <img src="/static/imgs/2018-12/myDel.png"/>
            </section>
            <section class="wp_body_item">
                <label>数量</label>
                <input type="text" @blur="changeIqty" :value="(wpInfo.iqty).toFixed(wpInfo.imatprecision)"/>
                <img src="/static/imgs/2018-12/myDel.png"/>
            </section>
            <section class="wp_body_item">
                <label>单价</label>
                <input type="text" @blur="changeTaxPrice" :value="(wpInfo.itaxprice).toFixed(wpInfo.ipriceprecision)"/>
                <img src="/static/imgs/2018-12/myDel.png"/>
            </section>
            <section class="wp_body_item">
                <label>无税单价</label>
                <input type="text" @blur="changeUnitPrice" :value="(wpInfo.iunitprice).toFixed(wpInfo.ipriceprecision)"/>
                <img src="/static/imgs/2018-12/myDel.png"/>
            </section>
            <section class="wp_body_item">
                <label>金额</label>
                <input type="text" @blur="changeTotal" :value="(wpInfo.itotal).toFixed(TOTAL_JE_PRECISION)"/>
                <img src="/static/imgs/2018-12/myDel.png"/>
            </section>
            <section class="wp_body_item">
                <label>无税金额</label>
                <input type="text" @blur="changeAmt" :value="(wpInfo.iamt).toFixed(TOTAL_JE_PRECISION)"/>
                <img src="/static/imgs/2018-12/myDel.png"/>
            </section>
            <section class="wp_body_item">
                <label>税额</label>
                <input type="text" @blur="changeTax" :value="(wpInfo.itax).toFixed(TOTAL_JE_PRECISION)"/>
                <img src="/static/imgs/2018-12/myDel.png"/>
            </section>
            <section class="wp_body_item">
                <label>税率</label>
                <input type="text" @blur="changeTaxRate" :value="(wpInfo.itaxrate).toFixed(SL_PRECISION)"/>
                <img src="/static/imgs/2018-12/myDel.png"/>
            </section>
        </section>
        <section class="operate_block">
            <button @click="editForm">确定</button>
            <button @click="delForm">返回</button>
        </section>
    </section>
</template>
<script lang="ts">
    import Vue from 'vue';
    import {MyWpInfo,MyWpInfoModel} from '@/page/2018-12/model/MyWpInfoModel.ts'
    import saleBillBus from '@/page/2018-12/plugin/saleBillBus.js'
    let myWpInfoModel=new MyWpInfoModel()
    export default Vue.extend({
        data:function():{
            wpInfo:MyWpInfo,
            TOTAL_JE_PRECISION:number,
            SL_PRECISION:number,
        }{
            return{
                wpInfo:myWpInfoModel.myWpInfo,
                TOTAL_JE_PRECISION:2,
                SL_PRECISION:1
            }
        },
        mounted:function(){
            saleBillBus.$on('showBillDetail',(param:MyWpInfo):void=>{
                myWpInfoModel.setModel(param)
                this.wpInfo=myWpInfoModel.getModel()
            })
        },
        methods:{
            changeIqty(event:any){
                this.wpInfo.iqty=parseFloat(event.target.value)
                if(isNaN(this.wpInfo.iqty)||this.wpInfo.iqty<=0){
                    console.log('数量值不合法')
                    this.wpInfo.iqty=1
                }
                let ipricetype=this.wpInfo.ipricetype==null||this.wpInfo.ipricetype.length<=0||this.wpInfo.ipricetype=='none'?'taxprice':this.wpInfo.ipricetype
                if(ipricetype=='taxprice'){
                    if(this.wpInfo.itaxprice==0 && this.wpInfo.itotal!=0 ){
                        this.wpInfo.itaxprice = parseFloat((this.wpInfo.itotal/this.wpInfo.iqty).toFixed(this.wpInfo.ipriceprecision))
                        this.wpInfo.iunitprice = parseFloat((this.wpInfo.iamt/this.wpInfo.iqty).toFixed(this.wpInfo.ipriceprecision));
                        }
                    if((this.wpInfo.itaxprice!=0)){
                        this.wpInfo.itotal= parseFloat((this.wpInfo.itaxprice*this.wpInfo.iqty).toFixed(this.TOTAL_JE_PRECISION))
                        this.wpInfo.iamt=parseFloat((this.wpInfo.itotal/((1*100+this.wpInfo.itaxrate)/100)).toFixed(this.TOTAL_JE_PRECISION))
                        this.wpInfo.itax=parseFloat((this.wpInfo.itotal-this.wpInfo.iamt).toFixed(this.TOTAL_JE_PRECISION))
                        this.wpInfo.iunitprice = parseFloat((this.wpInfo.iamt/this.wpInfo.iqty).toFixed(this.wpInfo.ipriceprecision));
                    }
                }else{
                    if(this.wpInfo.iunitprice!=0){
                        this.wpInfo.iamt= parseFloat((this.wpInfo.iunitprice*this.wpInfo.iqty).toFixed(this.TOTAL_JE_PRECISION));
                        this.wpInfo.itotal = parseFloat((this.wpInfo.iamt*(1+(this.wpInfo.itaxrate/100))).toFixed(this.TOTAL_JE_PRECISION));
                        this.wpInfo.itax = parseFloat((this.wpInfo.itotal - this.wpInfo.iamt).toFixed(this.TOTAL_JE_PRECISION));
                        this.wpInfo.itaxprice= parseFloat((this.wpInfo.itotal/this.wpInfo.iqty).toFixed(this.wpInfo.ipriceprecision));
                    }
                    if( this.wpInfo.iunitprice==0 && this.wpInfo.iamt!=0 ){
                        this.wpInfo.iunitprice = parseFloat((this.wpInfo.iamt/this.wpInfo.iqty).toFixed(this.wpInfo.ipriceprecision));
                        this.wpInfo.itaxprice = parseFloat((this.wpInfo.itotal/this.wpInfo.iqty).toFixed(this.wpInfo.ipriceprecision));
                    }
                }
            },
//            修改单价
            changeTaxPrice(event:any):void{
                this.wpInfo.itaxprice=parseFloat(event.target.value)
                if(isNaN(this.wpInfo.itaxprice)||this.wpInfo.itaxprice<=0){
                    console.log('数量值不合法')
                    this.wpInfo.itaxprice=0
                }
                this.wpInfo.itotal=parseFloat((this.wpInfo.iqty>0?this.wpInfo.iqty*this.wpInfo.itaxprice:this.wpInfo.itotal).toFixed(this.TOTAL_JE_PRECISION));
                this.wpInfo.iamt=parseFloat((this.wpInfo.iqty>0?this.wpInfo.itotal/((1*100+this.wpInfo.itaxrate)/100):this.wpInfo.iamt).toFixed(this.TOTAL_JE_PRECISION));
                this.wpInfo.itax=parseFloat((this.wpInfo.iqty>0?(this.wpInfo.itotal*100-this.wpInfo.iamt*100)/100:this.wpInfo.itax).toFixed(this.TOTAL_JE_PRECISION))
                this.wpInfo.iunitprice=parseFloat((this.wpInfo.iqty>0?this.wpInfo.iamt/this.wpInfo.iqty:this.wpInfo.itaxprice/((1*100+this.wpInfo.itaxrate)/100)).toFixed(this.wpInfo.ipriceprecision))

            },
//            修改无税单价
            changeUnitPrice(event:any):void{
                this.wpInfo.iunitprice=parseFloat(event.target.value)
                if(isNaN(this.wpInfo.iunitprice)||this.wpInfo.iunitprice<=0){
                    console.log('数量值不合法')
                    this.wpInfo.iunitprice=0
                }
                this.wpInfo.iamt = parseFloat((this.wpInfo.iqty>0?this.wpInfo.iqty*this.wpInfo.iunitprice:this.wpInfo.iamt).toFixed(this.TOTAL_JE_PRECISION))
                this.wpInfo.itax = parseFloat((this.wpInfo.iqty>0?this.wpInfo.iamt*this.wpInfo.itaxrate/100:this.wpInfo.itax).toFixed(this.TOTAL_JE_PRECISION))
                this.wpInfo.itotal = parseFloat((this.wpInfo.iqty>0?(this.wpInfo.itax+this.wpInfo.iamt):this.wpInfo.itotal).toFixed(this.TOTAL_JE_PRECISION))
                this.wpInfo.itaxprice = parseFloat((this.wpInfo.iqty>0?this.wpInfo.itotal/this.wpInfo.iqty:this.wpInfo.iunitprice*(1*100+this.wpInfo.itaxrate)/100).toFixed(this.wpInfo.ipriceprecision))

            },
//            修改总金额
            changeTotal(event:any):void{
                this.wpInfo.itotal=parseFloat(event.target.value)
                if(isNaN(this.wpInfo.itotal)||this.wpInfo.itotal<=0){
                    console.log('数量值不合法')
                    this.wpInfo.itotal=0
                }
                this.wpInfo.itaxprice=parseFloat((this.wpInfo.itotal/this.wpInfo.iqty).toFixed(this.wpInfo.ipriceprecision));
                this.wpInfo.iamt=parseFloat((this.wpInfo.itotal/((1*100+this.wpInfo.itaxrate)/100)).toFixed(this.TOTAL_JE_PRECISION));
                this.wpInfo.itax=parseFloat((((this.wpInfo.itotal*100-this.wpInfo.iamt*100)/100)).toFixed(this.TOTAL_JE_PRECISION));
                this.wpInfo.iunitprice=parseFloat((this.wpInfo.iamt/this.wpInfo.iqty).toFixed(this.wpInfo.ipriceprecision));

            },
//            修改无税金额
            changeAmt(event:any):void{
                this.wpInfo.iamt=parseFloat(event.target.value)
                if(isNaN(this.wpInfo.iamt)||this.wpInfo.iamt<=0){
                    console.log('数量值不合法')
                    this.wpInfo.itotal=0
                }
                this.wpInfo.itax = parseFloat((this.wpInfo.iamt*this.wpInfo.itaxrate/100).toFixed(this.TOTAL_JE_PRECISION));
                this.wpInfo.iunitprice = parseFloat((this.wpInfo.iamt/this.wpInfo.iqty).toFixed(this.wpInfo.ipriceprecision));
                this.wpInfo.itotal = parseFloat((this.wpInfo.itax+this.wpInfo.iamt).toFixed(this.TOTAL_JE_PRECISION));
                this.wpInfo.itaxprice=parseFloat((this.wpInfo.itotal/this.wpInfo.iqty).toFixed(this.wpInfo.ipriceprecision));
            },
            changeTax(event:any):void{
                this.wpInfo.itax=parseFloat(event.target.value)
                if(isNaN(this.wpInfo.itax)||this.wpInfo.itax<=0){
                    console.log('数量值不合法')
                    this.wpInfo.itax=0
                }
                this.wpInfo.ipricetype=this.wpInfo.ipricetype==null||this.wpInfo.ipricetype.length<=0||this.wpInfo.ipricetype=='none'?'taxprice':this.wpInfo.ipricetype
                if(this.wpInfo.iqty!=0){
                    if(this.wpInfo.ipricetype=='taxprice'){
                        this.wpInfo.iamt=parseFloat((this.wpInfo.itotal-this.wpInfo.itax).toFixed(this.TOTAL_JE_PRECISION));
                        this.wpInfo.iunitprice=parseFloat((this.wpInfo.iamt/this.wpInfo.iqty).toFixed(this.wpInfo.ipriceprecision));
                        if(this.wpInfo.iamt!=0){
                            this.wpInfo.itaxrate=parseFloat((this.wpInfo.itax/this.wpInfo.iamt*100).toFixed(this.SL_PRECISION));
                        }
                    }else{
                        this.wpInfo.itotal = parseFloat(((this.wpInfo.iamt*100 + this.wpInfo.itax*100)/100).toFixed(this.TOTAL_JE_PRECISION));
                        this.wpInfo.itaxprice=parseFloat((this.wpInfo.itotal/this.wpInfo.iqty).toFixed(this.wpInfo.ipriceprecision));
                        if(this.wpInfo.iamt!=0){
                            this.wpInfo.itaxrate=parseFloat((this.wpInfo.itax/this.wpInfo.iamt*100).toFixed(this.SL_PRECISION));
                        }
                    }
                }
            },
            changeTaxRate(event:any):void{
                this.wpInfo.itaxrate=parseFloat(event.target.value)
                if(isNaN(this.wpInfo.itaxrate)||this.wpInfo.itaxrate<=0){
                    console.log('数量值不合法')
                    this.wpInfo.itaxrate=0
                }
                if(this.wpInfo.ipricetype=='taxprice'){
                    this.wpInfo.itax = parseFloat(((this.wpInfo.itotal/(1+(this.wpInfo.itaxrate/100)))*(this.wpInfo.itaxrate/100)).toFixed(this.TOTAL_JE_PRECISION));
                    this.wpInfo.iamt = parseFloat((this.wpInfo.itotal-this.wpInfo.itax).toFixed(this.TOTAL_JE_PRECISION));
                    if(this.wpInfo.iqty!=0){
                        this.wpInfo.iunitprice=parseFloat((this.wpInfo.iamt/this.wpInfo.iqty).toFixed(this.wpInfo.ipriceprecision));
                    }
                }else{
                    if(this.wpInfo.iqty!=0){
                        this.wpInfo.itax=parseFloat((this.wpInfo.iamt*this.wpInfo.itaxrate/100).toFixed(this.TOTAL_JE_PRECISION));
                        this.wpInfo.itotal=parseFloat((this.wpInfo.itax+this.wpInfo.iamt).toFixed(this.TOTAL_JE_PRECISION));
                        if(this.wpInfo.iqty!=0){
                            this.wpInfo.itaxprice=parseFloat((this.wpInfo.itotal/this.wpInfo.iqty).toFixed(this.wpInfo.ipriceprecision));
                        }
                    }
                }
            },
            editForm(){
                saleBillBus.$emit('hideBillDetail',{status:true,data:this.wpInfo})
                this.$router.go(-1)
            },
            delForm(){
                saleBillBus.$emit('hideBillDetail',{status:false,data:this.wpInfo})
                this.$router.go(-1)
            }
        }
    })
</script>
<style scoped lang="scss">
  @import '@/page/2018-12/common.scss';
    .detail_container{
        background-color: rgb(255,255,255);
    }
    .wp_head{
        display: flex;
        padding:1rem;
        img{
            width:5rem;
            height:5rem;
            margin-right: 3rem;
        }
        .wp_head_right{
            h5{
                font-size: 1.4rem;
                font-weight: 600;
                line-height: 2rem;
            }
            span{
                display: block;
                font-size: 1rem;
                line-height: 1.8rem;
            }
        }
    }
    .wp_body{
        font-size: .8rem;
        .wp_body_item{
            display: flex;
            margin:1rem;
            align-items: center;
            label{
                display: block;
                width:6rem;
                text-align: right;
                padding-right: 1rem;
                color:$normal_font_color;
                /*border:1rem black solid;*/
            }
            input{
                border:.1rem $sub_font_color solid;
                display: block;
                flex-basis: 100%;
                height: 2rem;
                color:$normal_font_color;
                padding-left: .5rem;
                padding-right: .5rem;
            }
            img{
                display: block;
                width:2rem;
                height:2rem;
              /*margin-right: 20rem;*/
            }
        }
        .wp_body_item:hover{
            label{
                color:$active_link_color;
            }
            input{
                border:.1rem $active_link_color solid;
            }
        }
    }
    .operate_block{
        display: flex;
        justify-content: space-around;
        padding-bottom: 10rem;
        button{

            /*background-color: $second_bg_color;*/
            /*color:rgb(255,255,255);*/
            padding:.5rem 1rem;
            font-size:1.2rem;
            border-radius: .3rem;
        }
    }
</style>
