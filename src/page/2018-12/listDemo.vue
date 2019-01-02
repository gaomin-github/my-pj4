<template>
    <section>
        <section class="left_container">
            <section class="order_block">
                <span @click="changeLeftSort(sortAsc)">升序</span>
                <span @click="changeLeftSort(sortDesc)">降序</span>
            </section>
            <section v-if="leftData!=null&&leftData.length>0" :style="{backgroundColor:leftConfig.bgColor}">
                <section v-for="item in leftData" class="block">
                    <p>{{item.id}}：{{item.name}}</p>
                    <span>{{item.date}}</span>
                    <p>{{item.content}}</p>
                </section>
                <section class="loadMore">
                    <a href="#" @click="loadMore">加载更多</a>
                </section>
            </section>
        </section>
        <section class="right_container">
            <section class="order_block">
                <span @click="changeRightSort(sortAsc)">升序</span>
                <span @click="changeRightSort(sortDesc)">降序</span>
            </section>
            <section v-if="rightData!=null&&rightData.length>0" :style="{backgroundColor:rightConfig.bgColor}">
                <section v-for="item in rightData" class="block">
                    <p>{{item.id}}{{item.name}}</p>
                    <span>{{item.date}}</span>
                    <p>{{item.content}}</p>
                    <p>{{item.agreeNum}}</p>
                </section>
            </section>
        </section>
    </section>
</template>
<script lang="ts">
    import Vue from 'vue'
    import {MyList,MyListModel,LoadWay,SortType} from '@/page/2018-12/model/MyListModel.ts'
    import listData from '@/page/2018-12/data/myListModel.js'
    let  leftConfig1={
        initSize:4,
        pageSize:1,
        currentPage:1,
        loadWay:LoadWay.myLink,
        openNewPage:false,
        showLoading:true,
        currentSortBy:'date',
        isLoading:false,
    }
    let rightConfig1={
        initSize:2,
        pageSize:1,
        currentPage:1,
        loadWay:LoadWay.myScroll,
        openNewPage:true,
        showLoading:false,
        sortType:SortType.asc,
        currentSortBy:'agreeNum',
        bgColor:'#ccc',
        isLoading:false,
    }
    let leftModel=new MyListModel()
    let rightModel=new MyListModel()
    export default Vue.extend({
        data:function():{
            leftData:object[],
            rightData:object[],
            leftConfig:MyList,
            rightConfig:MyList,
            sortDesc:SortType,
            sortAsc:SortType,
        }{
            return{
                leftData:[],
                rightData:[],
                leftConfig:(new MyListModel()).myList,
                rightConfig:(new MyListModel()).myList,
                sortDesc:SortType.desc,
                sortAsc:SortType.asc,
            }
        },
        created:function(){
            this.init()
        },
        methods:{
            init(){
//                初始化配置信息
                leftModel.mySet(leftConfig1)
                this.leftConfig=leftModel.myList
                rightModel.mySet(rightConfig1)
                this.rightConfig=rightModel.myList
//                初始化列表信息
                leftModel.setDataList(listData.slice(0,this.leftConfig.initSize))
                this.leftData=leftModel.getDataList()
                rightModel.setDataList(listData.slice(0,this.rightConfig.initSize))
                this.rightData=rightModel.getDataList()
            },
            loadMore(e:any){
                e.preventDefault()
                console.log('加载更多数据')
            },
            changeLeftSort(param:SortType){
                console.log('修改排序方式')
                leftModel.setSortType(param)
                this.leftData=leftModel.getDataList()
            },
            changeRightSort(){

            }
        }
    })
</script>
<style scoped lang="scss">
    .left_container,.right_container{
        border:.1rem black solid;
        width:45%;
        float:left;
        margin-right: 1rem;
    }
    .order_block{
        display: flex;
        justify-content:space-around;
        span{
            display: block;
            line-height: 1.2rem;
            padding:.5rem;
            color:rgb(255,255,255);
        }
    }
    .right_container{
        height:20rem;
        overflow-y: scroll;
    }
    .block{
        padding-left: 1rem;
        border-bottom:.1px black solid;
        margin:1rem 0;
        p{
            font-size: 1.2rem;
            line-height: 2rem;
        }
        span{
            font-size: 1rem;
            line-height: 1.5rem;
            color:rgb(120,120,120)
        }
    }
    .loadMore{
        border:.1rem black solid;
        a{
            display: block;
            text-align: center;
        }
    }
</style>
