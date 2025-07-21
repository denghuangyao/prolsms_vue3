import { WLConst } from '@dhy/constants';

/**
 * 判断系统是否开放哪些模块
 * @param type
 * @returns
 */
export function checkSystemType(type?: string) {
  //没有配置情况
  if (type == undefined) {
    return true;
  }
  let systemType = Config.systemType;
  let AllFlag = systemType.indexOf(WLConst.systemType.ALL) > -1;
  let typeFlag = systemType.indexOf(type) > -1;
  return AllFlag || typeFlag || type == WLConst.systemType.ALL;
}
