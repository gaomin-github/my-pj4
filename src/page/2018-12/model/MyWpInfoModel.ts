export interface MyWpInfo{
    cmatguid:string,                //物品id
    cmatname:string,                //物品名称
    imatprecision:number,           //数量精度
    ipriceprecision:number,         //价格精度
    imgPath:string,                 //物品logo地址
    cunitname:string,               //物品单位
    istoreiqty:number,              //库存数量
    iqty:number,                    //物品数量
    itaxprice:number,               //单价
    iunitprice:number,              //无税单价
    itotal:number,                  //金额
    iamt:number,                    //无税金额
    itaxrate:number,                //税率
    itax:number,                    //税额
    ipricetype:string,              //价格是否含税
    iisgift:boolean,                //是否赠品
    editpower:boolean,              //是否有修改权限
}
export class MyWpInfoModel{
    myWpInfo:MyWpInfo
    constructor(){
        this.init()
    }
    public init():void{
        this.myWpInfo={
            cmatguid:'',
            cmatname:'',
            imatprecision:0,
            ipriceprecision:2,
            imgPath:'',
            cunitname:'',
            istoreiqty:0,
            iqty:0,
            itaxprice:0.00,
            iunitprice:0.00,
            itotal:0.00,
            iamt:0.00,
            itaxrate:0.0,
            itax:0.00,
            ipricetype:'',
            iisgift:false,
            editpower:true,
        }
    }
    public setModel(param:MyWpInfo):void{
        this.myWpInfo=Object.assign(this.myWpInfo,param)
        if(this.myWpInfo.imgPath==null||this.myWpInfo.imgPath=='undefined'||this.myWpInfo.imgPath.length<=0){
            this.myWpInfo.imgPath='/static/imgs/2018-12/bc17fb1ftw1efqrjre0sqj20u30ndq59.jpg'
        }
        // console.log('setModel')
        // console.log(this.myWpInfo)
    }
    public setImgPath(param:string):void{
        this.myWpInfo.imgPath=param
    }
    public setIstoreiqty(param:number):void{
        this.myWpInfo.istoreiqty=param
    }
    public setIqty(param:number):void{
        this.myWpInfo.iqty=param
    }
    public setItaxprice(param:number):void{
        this.myWpInfo.itaxprice=param
    }
    public setIunitprice(param:number):void{
        this.myWpInfo.iunitprice=param
    }
    public setItotal(param:number):void{
        this.myWpInfo.itotal=param
    }
    public setIamt(param:number):void{
        this.myWpInfo.iamt=param
    }
    public setItax(param:number):void{
        this.myWpInfo.itax=param
    }
    public setIpricetype(param:string):void{
        this.myWpInfo.ipricetype=param
    }
    public setIisgift(param:boolean):void{
        this.myWpInfo.iisgift=param
    }
    public getModel():MyWpInfo{
        return this.myWpInfo
    }
}
