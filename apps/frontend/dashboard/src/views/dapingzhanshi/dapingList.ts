

import { Component,Watch } from 'vue-property-decorator'
import { wlview, wllib } from 'src/wlframe';
import { MyVue } from 'src/wlframe/wl/my_vue';
@Component({})
export default class SYSZS_dapingzhanshi_List_view extends MyVue {
  list:any=[
    {label:"系统大屏",systemType:WLConst.systemType.ALL,key: "XTDP",suoluetu:"static/imgs/shiyanshizhanshi/XTDP.png",routePath:"xitongDaping"},
    {label:"仪器预约",systemType:WLConst.systemType.YQYY,key: "YQYY",suoluetu:"static/imgs/shiyanshizhanshi/YQYY.png",routePath:"yiqiyuyueDaping"},
    {label:"试剂耗材",systemType:WLConst.systemType.SJHC,key: "SJHC",suoluetu:"static/imgs/shiyanshizhanshi/SJHC.png",routePath:"shijihaocaiDaping"},
    {label:"危化品",systemType:WLConst.systemType.WHP,key: "WHP",suoluetu:"static/imgs/shiyanshizhanshi/WHP.png",routePath:"weihuapinDaping"},
    {label:"实验室预约",systemType:WLConst.systemType.SYSYY,key: "SYSYY",suoluetu:"static/imgs/shiyanshizhanshi/SYSYY.png",routePath:"sysyyDaping"},
    {label:"分类分级",systemType:WLConst.systemType.FLFJ,key: "FLFJ",suoluetu:"static/imgs/shiyanshizhanshi/FLFJ.png",routePath:"fenleifenjiDaping"},
    {label:"智能硬件",systemType:WLConst.systemType.SYSZS,key: "ZNYJ",suoluetu:"static/imgs/shiyanshizhanshi/ZNYJ.png",routePath:"zhinengyingjianDaping"},
  ]
  constructor() {
    super();
  }
  initData():void{

  }
  mounted(){
    // 过滤没有部署的模块
    this.list=this.list.filter((item:any)=>checkSystemType(item.systemType));
  }
  openDaping(item:any){
    console.log("openDaping--",item)
    if(!item.routePath){
      wllib.global.WLWarnMessage("暂未开放！");
      return;
    }
    if(item.key=="FLFJ"){
      this.openFLFJDaping(item);//分类分级按顶级部门查看统计
      return;
    }
    let height = window.screen.height, width = window.screen.width;
    window.open(`${Config.webUrl}/#/${item.routePath}`, item.routePath, `location=no, toolbar=no,titlebar=no,menubar==no,height=${height},width=${width}`)
  }
  openFLFJDaping(item:any){
    let height = window.screen.height, width = window.screen.width;
    let timeStamp:any=wllib.date.getMilliTime(new Date());
    wllib.net.wlGet(Config.ajaxUrl + '/org/orgDetail', {}).then((res: any) => {
      let id:any=res.data.orgId
      if(!id){
        wllib.global.WLWarnMessage("查看数据异常");
        return;
      }
      window.open(`${Config.webUrl}/#/${item.routePath}?id=${id}&timeStamp=${timeStamp}`, item.routePath, `location=no, toolbar=no,titlebar=no,menubar==no,height=${height},width=${width}`);
    });
  }
}