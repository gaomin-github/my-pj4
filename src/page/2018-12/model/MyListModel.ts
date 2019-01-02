export enum LoadWay{
    myScroll=1,         //滚动加载
    myLink=2            //点击链接加载
}
export enum SortType{
    asc=1,      //升序
    desc=2,     //降序
}
interface SortParam{
    sortType?:SortType,
    sortBy?:string
}
export interface MyList{
    initSize:number,            //页面初始化加载条数
    pageSize:number,            //一次加载的条数
    currentPage:number,         //当前页面数
    loadWay:LoadWay,             //加载更多方式（滚动加载/点击链接)
    openNewPage:boolean,          //显示更多加载方式（跳转，不跳转）
    bgColor?:string,              //列表背景色
    dataList?:object[],              //列表数据
    isLoading:boolean,            //是否显示加载动画
    sortType?:SortType,              //排序方式
    currentSortBy?:string,           //排序参数
}
export class MyListModel{
    myList:MyList
    constructor(){
        this.init()
    }
    public init():void{
        this.myList={
            initSize:1,
            pageSize:2,
            currentPage:1,
            loadWay:LoadWay.myLink,         //默认显示链接
            openNewPage:false,              //默认不打开新页面
            bgColor:'#FFF',
            dataList:[],
            isLoading:false,               //默认显示加载动画
            sortType:SortType.desc,          //默认降序
            currentSortBy:''
        }
    }
    public mySet(param:MyList):void{
        this.myList=Object.assign(this.myList,param)
    }
    public setDataList(param:object[]):void{
        this.myList.dataList=param
    }
    public setSortType(param:SortType):void{
        this.myList.sortType=param
    }
    public setCurrentSortBy(param:string):void{
        this.myList.currentSortBy=param
    }
    public setIsloading(param:boolean):void{
        this.myList.isLoading=param
    }
    public getDataList():object[]{
        if(this.myList.currentSortBy==null||this.myList.currentSortBy.length<=0||this.myList.dataList==null||this.myList.dataList.length<=0){
            return this.myList.dataList||[]
        }else{
            let obj:any=this
            let newList=this.myList.dataList.sort((a:any,b:any)=>{
                if(a[obj.myList.currentSortBy]&&b[obj.myList.currentSortBy]){
                    if(obj.myList.sortType==SortType.desc){
                        return a[obj.myList.currentSortBy]<=b[obj.myList.currentSortBy]?1:-1
                    }else{
                        return a[obj.myList.currentSortBy]<=b[obj.myList.currentSortBy]?-1:1
                    }
                }else{
                    return 0
                }
            })
            return newList
        }
    }
    // 不同加载方式 请求更多页面 加载动画  未实现
    // 失去思路辽，先去做别的
}