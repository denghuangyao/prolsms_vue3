import { getSampleById, queryBoxList, queryRackList } from '@/apis';
import {
  type MiniBoxInfo,
  type ContainerInfo as BaseContainerInfo,
  type LevelFirstConInfo,
  type RackColumnPlane,
  type StorageLocation,
  type LevelThirdConInfo,
} from 'vue3-biobank';
import { cloneDeep, set, get } from '@dhy/shared/utils';
import { onMounted, computed, getCurrentInstance, reactive, nextTick, ref } from 'vue';

interface GraphicalContainer {
  rowData: {
    id: any;
  } & Record<string, any>; //树形结构节点数据（选中的冰箱/液氮罐，第一层容器）
  isXuanzeweizhi?: boolean; //树形结构节点数据（选中的冰箱/液氮罐，第一层容器）

  storageLocation?: StorageLocation; //跳转到指定存储位置
  // 是否开启按ctrl就连续选中样本格子
  openCtrlSelected: boolean;
}
interface ContainerInfo extends BaseContainerInfo {
  rackInfoList?: [];
}
export type { GraphicalContainer, ContainerInfo };
const sampleInfoList: any = [
  //显示样本信息的所有字段列表
  { label: '样本编号', isLink: true, value: '', field: 'code' },
  { label: '登记人', value: '', field: 'registrant' },
  { label: '登记日期', value: '', field: 'registrationDate' },
  { label: '样本名称', value: '', field: 'name' },
  { label: '过期日期', value: '', field: 'expirationDate' },
  { label: '样本源编号', value: '', field: 'sampleSourceCode' },
  { label: '样本源名称', value: '', field: 'sampleSourceName' },
  { label: '容量', value: '', field: 'capacity' },
  { label: '存放位置', value: '', field: 'storageLocation' },
  { label: '冻融次数', value: '', field: 'freezingThawCount' },
  { label: '描述', value: '', field: 'description' },
];
function useGraphicalContainer(props: GraphicalContainer) {
  let yangbenInfoList = ref(sampleInfoList);
  const { storageLocation, rowData, isXuanzeweizhi } = props;
  const instance = getCurrentInstance();
  //(x,y)选中冻存盒第几行几列的格子,可多选
  let boxActiveKeys = computed<[]>(() => boxActiveList.value.map((item: any) => item.key));
  let showSampleId = ref(null); //显示样本信息的样本Id
  let containerInfo = reactive<ContainerInfo>({
    name: '', //容器名称
    rowCount: undefined, //容器行数
    maxRackQuantity: undefined, //容器列数
    rackQuantity: undefined, //子容器数
    sampleQuantity: undefined, //总样本数
    status: undefined, //容器状态
    type: undefined,
  });
  let levelFirstConList = ref<LevelFirstConInfo[]>([]); //第一层级容器：冰箱所有冻存架列表或液氮罐所有提篮
  let activeKey: any = ref<string>(''); //(x,y,num):选中几行几列的第几个格子
  let levelFirstConMap: any = new Map(); //存放冰箱-冻存架的键值对 x,y=data
  let levelSedParentCon: any = {}; //（选中的）第二层容器：冻存架
  let levelSedConList = ref<RackColumnPlane[]>([]); //第二层级容器：冻存架里抽屉列表
  let levelSedConMap: any = new Map(); //存放冻存架-抽屉的键值对 x,y=data
  let drawerActiveKey: any = ref<string>(''); //(x,y)选中冻存架第几行几列的格子
  let levelThirdCon = ref<LevelThirdConInfo>({}); //（选中的）第三层级容器：冻存盒
  let boxConMap: any = ref<Map<string, MiniBoxInfo>>(new Map()); //存放冻存盒格子的键值对 x,y=data
  let boxActiveList: any = ref<[]>([]); //选中冻存盒格子[{isHasYB,}]

  /**根据后端返回已创建格子列表，存储Map，方便获取选中格子的具体数据,key为（行号,列号),value=格子数据 */
  function arrayToMap(array: any, xField: any, yField: any) {
    let map = new Map();
    array.forEach((item: any) => {
      let key: any = `${item[xField] - 1},${item[yField] - 1}`;
      map.set(key, item);
    });
    console.log('-map--', map);
    return map;
  }
  /**根据指定行、总列数生成容器格子数据 */
  function generateArray(rownum: any, columns: any, referenceMap: any) {
    let list: any = [];
    for (let j = 0; j < columns; j++) {
      let key = `${rownum},${j}`; //x,y
      let tmp: any = referenceMap.get(key) || null; // 在这里可以根据需要初始化数组元素的值
      console.log('tmp---', tmp, 'key--', key);
      list.push(tmp);
    }
    return list;
  }
  /**根据总行数、总列数生成容器的九宫格子数据 */
  function generateTwoArray(rows: any, columns: any, resData: any, referenceMap: any) {
    let array = [];
    for (let i = 0; i < rows; i++) {
      let children = generateArray(i, columns, referenceMap);
      let row: any = {
        ...resData,
        children,
      };
      array.unshift(row);
    }
    return array;
  }
  /**处理冰箱数据结构[{...冰箱容器数据,children:[冻存架数据]}] */
  function handlerData(data: any, referenceMap: any) {
    let resData: any = cloneDeep(data); //冰箱容器数据
    for (let key in resData) {
      if (key == 'rackInfoList') {
        delete resData.rackInfoList;
      }
    }
    let list: any = generateTwoArray(data.rowCount, data.maxRackQuantity, resData, referenceMap);
    console.log('handlerData-levelFirstConList.value--', list);
    return list;
  }

  /**初始默认选中
   * 冰箱：最左最上的启用状态的冻存架的最上面那层抽屉；
   * 液氮罐：编号从小到大的第一个启用状态的提篮，选中提篮的最下层
   * */
  function getFirstActiveKey() {
    if (!levelFirstConList.value || !levelFirstConList.value.length) {
      return;
    }
    //冻存架从上到下，从左到右排序
    let sortBoxArray: any = levelFirstConList.value.reduce((acc: any, item: any) => {
      return [...acc, ...item.children];
    }, []);
    let defaultSelectedBox: any = null;
    let isSearchFistBox: boolean = sortBoxArray.some((item: any) => {
      //获取第一个启用状态的冻存架
      if (item && item.status == 'ENABLED') {
        defaultSelectedBox = item;
        return true;
      }
      return false;
    });
    if (!isSearchFistBox && sortBoxArray && sortBoxArray.length) {
      defaultSelectedBox = sortBoxArray[0];
    }
    console.log('--getFirstActiveKey-defaultSelectedBox', defaultSelectedBox);
    if (!defaultSelectedBox) {
      //没有冻存架
      return;
    }
    let morenkey: any = '';
    let containerType: any = containerInfo.type;
    console.log('-containerType-', containerType);
    if (containerType == 'NITROGEN_CYLINDER') {
      morenkey = `${defaultSelectedBox.storey - 1},${defaultSelectedBox.storeyColumn - 1},0`; //获取提蓝第一层
    } else if (containerType == 'REFRIGERATOR') {
      morenkey = `${defaultSelectedBox.storey - 1},${defaultSelectedBox.storeyColumn - 1},${defaultSelectedBox.rowCount - 1}`; //获取冻存架最高层
    }
    console.log('默认选中第一个--', morenkey);
    clickBox(morenkey);
  }
  /**根据冰箱选中冻存架的抽屉，返回所在层、列、行-第几行抽屉（从0开始编号） */
  function getActiveXYZ(str: any) {
    if (!str) return {};
    let values = str.split(',');
    let x = values[0];
    let y = values[1];
    let z = values[2];
    return { x, y, z };
  }
  /**清空所有选中容器（从第一层级开始清空） */
  function clearAllActive() {
    activeKey.value = ''; //清空选中冻存架（或提篮：未选中某层）位置
    levelSedParentCon = {}; //清空选中冻存架某行（或提篮）的数据
    drawerActiveKey.value = ''; //清空选中冻存盒
    levelThirdCon.value = {}; //清空选中冻存盒的数据
    boxActiveList.value = []; //清空选中冻存盒的格子
    showSampleId.value = null; //样本信息选中清空
  }
  // 切换提篮清空其他层级选中格子
  function toggleHandBacket(activeXYZ: any) {
    console.log('-toggleHandBacket-activeXYZ-', activeXYZ);
    if (!activeXYZ) {
      //未选中提篮，清空下层级容器选中
      clearAllActive();
      instance?.emit('getIsShowDeleteBtn', false); //操作按钮不展示删除提篮/冻存盒按钮
    }
    let { x, y, z }: any = getActiveXYZ(activeXYZ);
    if (Number(z) == -1) {
      //未选中提篮第几层，需清空冻存盒及其层级以下的容器选中
      let boxData: any = levelFirstConMap.get(`${x},${y}`);
      if (boxData) {
        instance?.emit('getIsShowDeleteBtn', true); //选中提篮 操作按钮展示删除提篮/冻存盒按钮
      }
      levelSedParentCon = boxData; //当前选中的提篮
      drawerActiveKey.value = ''; //清空选中冻存盒
      levelThirdCon.value = {}; //清空选中冻存盒的数据
      boxActiveList.value = []; //清空选中冻存盒的格子
      showSampleId.value = null; //样本信息选中清空
    }
  }
  // 点击（冰箱-》冻存架）或者（液氮罐=》提篮=》某一层）
  function clickBox(param: any, callBack?: any) {
    clearAllActive();
    activeKey.value = param;
    let { x, y, z }: any = getActiveXYZ(param);
    let boxData: any = levelFirstConMap.get(`${x},${y}`);
    console.log('--clickBox--xyz', param, 'boxData--', boxData);
    levelSedParentCon = boxData;
    instance?.emit('getIsShowDeleteBtn', true); //操作按钮展示删除冻存架/冻存盒按钮
    if (Number(z) == -1) {
      //提篮未选择具体层数
      activeKey.value = ''; //只点击提篮未选中某层
      return;
    }
    chakanSubContainer(param, boxData, z, (res: any) => {
      let arr: any = res || [];
      if (!arr.length) return;
      if (callBack) {
        //选中冻存架或提蓝层，跳转指定冻存盒
        callBack(arr);
        return;
      }
      //点击冻存架抽屉默认选择最左边第一个冻存盒（列号最大）
      let boxItemData = arr.reduce((maxObj: any, obj: any) => {
        return obj.rackColumn > maxObj.rackColumn ? obj : maxObj;
      }, arr[0]);
      clickColumnBox(boxItemData);
    });
  }
  /**查看冻存架内所有冻存盒 */
  async function chakanSubContainer(
    parentLocationXYZ: any,
    boxData: any,
    rackRowIdx: any,
    callBack?: any,
  ) {
    let { id, columnCount }: any = boxData; //选中冰箱=》冻存架盒子
    let req: any = { id, rackRow: Number(rackRowIdx) + 1 };
    await queryBoxList(req).then((res: any) => {
      let data: any = res || [];
      levelSedConMap = arrayToMap(data, 'rackRow', 'rackColumn');
      levelSedConList.value = generateArray(rackRowIdx, columnCount, levelSedConMap);
      levelSedConList.value.forEach((item: any) => {
        if (item) {
          set(item, 'parentLocationXYZ', parentLocationXYZ);
        }
      });

      console.log('--chakanSubContainer--', levelSedConMap, levelSedConList);
      callBack && callBack(data);
    });
  }

  /**根据容器列数设置容器内每个盒子的宽度，平均分配 */
  function distributeWidth() {
    let numChildBoxes: number = levelSedConList.value.length;
    let percentWidth = Number((100 / numChildBoxes).toFixed(2));
    return `${percentWidth}%`;
  }
  // 点击冻存架-》冻存盒
  function clickColumnBox(rowData: any) {
    drawerActiveKey.value = `${rowData.parentLocationXYZ}_${rowData.rackColumn - 1}`;
    console.log('-levelSedConMap--', levelSedConMap);
    boxActiveList.value = [];
    showSampleId.value = null; //样本信息选中清空
    chakanMinContainer(rowData);
    console.log(
      '--clickColumnBox-drawerActiveKey.value-',
      drawerActiveKey.value,
      'rowData--',
      rowData,
    );
  }
  /**查看冻存盒所有格子 */
  function chakanMinContainer(rowData: any) {
    levelThirdCon.value = rowData;
    let { x, y, z }: any = getActiveXYZ(activeKey.value);
    let boxData: any = levelFirstConMap.get(`${x},${y}`);
    levelThirdCon.value.fromToLocation = `${boxData.name}-${rowData.name}`;
    console.log(
      '--rowData-chakanMinContainer--',
      levelThirdCon.value,
      rowData.containerLocationList,
      'rowData--',
      boxData,
    );
    boxConMap.value = arrayToMap(rowData.containerLocationList, 'boxRow', 'boxColumn');
  }
  /**点击选中格子，则取消选中 */
  function removeElementFromArray(arr: any, element: any) {
    let index: any = arr.findIndex((item: any) => item.key == element);
    if (index !== -1) {
      arr.splice(index, 1);
      return true;
    }

    return false;
  }

  // 点击冻存盒格子
  function clickBoxnum(boxItemData: any) {
    showSampleId.value = null;
    if (isXuanzeweizhi) {
      clickBoxForTangchuang(boxItemData);
      return;
    }
    let { key, isHasYB }: any = boxItemData;
    let isCancelActive: boolean = removeElementFromArray(boxActiveList.value, key); //是否重复点击，重复点击取消选中
    console.log('-isCancelActive--', isCancelActive, 'isHasYB--', isHasYB);
    if (!isCancelActive) {
      if (!isHasYB) {
        //选中空格子，空格子只能选一个
        let emptyboxs: any = boxActiveList.value.filter((item: any) => !item.isHasYB);
        console.log('--emptyboxs-', emptyboxs);
        if (emptyboxs && emptyboxs.length) {
          //删除原来选中的空格子
          removeElementFromArray(boxActiveList.value, emptyboxs[0].key);
        }
      }
      boxActiveList.value.push(boxItemData);
      if (isHasYB) {
        chakanYB(boxItemData.sampleId);
      }
    }
    console.log('boxActiveKeys---', boxActiveKeys);
  }
  function multiSelect(list: any) {
    console.log(list, 'multiSelect');
    list.forEach((i: any) => {
      if (!boxActiveList.value.includes(i.key)) {
        boxActiveList.value.push(i);
      }
    });
  }
  function chakanYB(id: any) {
    getSampleById(id).then((res: any) => {
      let data: any = res;
      showSampleId.value = id;
      yangbenInfoList.value.forEach((item: any) => {
        if (isXuanzeweizhi) {
          set(item, 'isLink', false); //选择位置弹窗不查看编辑样本
        }
        set(item, 'value', data[item.field]);
      });
    });
  }
  /**打开样本详情 */
  function openYBDetail() {
    if (isXuanzeweizhi) return; //选择位置弹窗不查看编辑样本
    let sampleId: any = showSampleId.value;
    if (!sampleId) return;
    let attach: any = {
      pageType: 'xiangqing',
      id: sampleId,
    };
    // wllib.framework.wlPopupUI('shengwuYangben_yangbenDengji_yangbenXiangqing', attach, () => {
    //   chakanYB(sampleId);
    //   updateAllLevelCon(true);
    // });
  }
  /**新增冰箱-冻存架 */
  function addSubRongqi({ rowIndx, columnIndx }: any) {
    let { rowCount, type, status }: any = containerInfo;
    if (status == 'DISABLED') {
      //停用状态的冻存架不可新增
      return;
    }
    let storey: any = Number(rowCount - rowIndx);
    let storeyColumn: any = Number(columnIndx + 1);
    console.log('rowIndx--', rowIndx, 'columnIndx--', columnIndx);
    if (!rowData) return;
    let id: any = rowData?.id;
    let code: any = `DCJ(${storey},${storeyColumn})`; //冰箱的子容器-冻存架默认编号
    if (type == 'NITROGEN_CYLINDER') {
      //液氮罐的子容器-提篮默认编号
      code = `TL_${storeyColumn}`;
    }
    var attach: any = {
      id,
      type,
      selectBox: {
        code,
        storey,
        storeyColumn,
      },
    };
    // wllib.framework.wlPopupUI('shengwuYangben_zirongqiGuanli_zirongqixz', attach, () => {
    //   chakanxq();
    // });
  }
  /**新增冻存架-冻存盒 */
  function addMinRongqi(columnIndx: any) {
    let { id, storey, storeyColumn, status }: any = levelSedParentCon;
    if (status == 'DISABLED') {
      //停用状态的冻存盒不可新增
      return;
    }
    let rackColumn: any = Number(columnIndx + 1);
    let rackRowIdx: any = getActiveXYZ(activeKey.value).z,
      rackRow: any = Number(rackRowIdx) + 1;
    let selectBox: any = {
      code: `DCH(${rackRow},${rackColumn})`,
      storey,
      storeyColumn,
      rackColumn,
      rackRow,
    };
    console.log('-columnIndx-addMinRongqi--', columnIndx, 'levelSedParentCon--', levelSedParentCon);
    var attach: any = {
      id,
      selectBox,
    };
    // wllib.framework.wlPopupUI('shengwuYangben_zirongqiGuanli_subZirongqixz', attach, () => {
    //   chakanSubContainer(activeKey.value, levelSedParentCon, rackRowIdx);
    // });
  }
  /**操作图形按钮交互S */
  // 删除冻存架（或提篮）后，图形化重新渲染
  function afterDelSedParentCon() {
    clearAllActive();
    instance?.emit('getIsShowDeleteBtn', false); //操作按钮不展示删除冻存架/冻存盒按钮
    chakanxq(); //重新获取冰箱冻存架数据
  }
  // 删除冻存盒后，图形化重新渲染
  function afterDelThirdLevelCon() {
    drawerActiveKey.value = ''; //清空选中冻存盒
    levelThirdCon.value = {}; //清空选中冻存盒的数据
    boxActiveList.value = []; //清空选中冻存盒的格子
    showSampleId.value = null; //样本信息选中清空
    let rackRowIdx: any = getActiveXYZ(activeKey.value).z;
    chakanSubContainer(activeKey.value, levelSedParentCon, rackRowIdx); //重新获取冻存架-抽屉数据
  }
  //选中位置数据(过滤已有样本格子)
  function getActiveEmptyBoxList() {
    let emptyboxs: any = boxActiveList.value.filter((item: any) => !item.isHasYB);
    let emptyBoxList: any = [];
    if (emptyboxs && emptyboxs.length) {
      let boxKey: any = emptyboxs[0].key,
        rowIdx: any,
        colIdx: any,
        boxPlanRef: any = instance?.refs.boxPlanRef;
      if (boxKey) {
        let values: any = boxKey.split(',');
        rowIdx = Number(values[0]);
        colIdx = Number(values[1]);
        emptyBoxList = (boxPlanRef && boxPlanRef.getFreeCellsInOrder(rowIdx, colIdx)) || []; //获取顺延位置所有空格子
      }
    }
    let { roomName, containerName, name: containerRackName }: any = levelSedParentCon;
    let { name: containerBoxName, id: containerBoxId }: any = levelThirdCon.value;
    let activeLocationData: any = {
      roomName,
      containerName,
      containerRackName,
      containerBoxName,
      containerBoxId,
      emptyBoxList,
    };
    return activeLocationData;
  }
  //操作库存后更新样本数
  function updateAllLevelCon(isKeepActive?: boolean) {
    //更新冰箱-冻存架
    chakanxq(() => {
      //更新冻存架-抽屉-冻存盒
      console.log('--updateAllLevelCon--', activeKey.value);
      let { x, y, z }: any = getActiveXYZ(activeKey.value);
      let boxData: any = levelFirstConMap.get(`${x},${y}`);
      levelSedParentCon = boxData; //更新选中的冰箱-冻存架数据
      chakanSubContainer(activeKey.value, levelSedParentCon, z, () => {
        let drawerKey: any = drawerActiveKey.value;
        if (drawerKey) {
          let values: any = drawerKey.split('_');
          let drawerColIdx: any = Number(values[1]);
          levelThirdCon.value = levelSedConList.value[drawerColIdx]; //更新选中的抽屉-冻存盒数据
          chakanMinContainer(levelThirdCon.value); //更新抽屉-冻存盒格子
          if (!isKeepActive) {
            //是否保留已选格子：修改样本信息更新
            boxActiveList.value = []; //重置选中格子
            showSampleId.value = null; //样本信息选中清空
            console.log(
              '--updateAllLevelCon--1-isKeepActive-',
              isKeepActive,
              'boxActiveList.value--',
              boxActiveList.value,
            );
          }

          console.log(
            '--updateAllLevelCon--2-isKeepActive-',
            isKeepActive,
            'boxActiveList.value--',
            boxActiveList.value,
          );
        }
      });
    });
  }
  /**操作图形按钮交互E */
  /**选择位置弹窗特殊相关处理S */
  function clickBoxForTangchuang(boxItemData: any) {
    let { isHasYB }: any = boxItemData;
    boxActiveList.value = [boxItemData];
    if (isHasYB) {
      chakanYB(boxItemData.sampleId);
    } else {
      let isDisabledStatus: any = levelThirdCon.value && levelThirdCon.value.status == 'DISABLED';
      if (isDisabledStatus) {
        ElMessage('容器已停用');
        return;
      }
      ElMessageBox.confirm('确定选中此位置？', '提示', {
        type: 'warning',
      })
        .then((res: any) => {
          instance?.emit('getActiveEmptyBoxList', getActiveEmptyBoxList());
        })
        .catch(() => {
          boxActiveList.value = [];
          showSampleId.value = null; //样本信息选中清空
        });
    }
  }
  /**选择位置弹窗特殊相关处理E */
  /**列表存储位置跳转指定的样本存放位置 */
  function setSampleLocation() {
    let rackInfoList: any = containerInfo.rackInfoList;
    if (!rackInfoList || !rackInfoList.length) {
      ElMessage('无法查找到样本的存储位置');
      return;
    }
    if (!storageLocation) return;
    let containerRack: any = null; //查找样本所在冻存架或提蓝的位置
    let isSearchResult: boolean = rackInfoList.some((item: any) => {
      if (item.id == storageLocation.containerRackId) {
        containerRack = item;
        return true;
      }
      return false;
    });
    if (!isSearchResult) {
      ElMessage('无法查找到样本的存储位置');
      return;
    }
    let sampleLocationKey = `${containerRack.storey - 1},${containerRack.storeyColumn - 1},${storageLocation.rackRow - 1}`; //获取提蓝第一层
    console.log('setSampleLocation-containerRack--', containerRack, sampleLocationKey);
    clickBox(sampleLocationKey, (containerBoxs: any) => {
      //选中冻存架或提蓝层
      let boxIdx: any = containerBoxs.findIndex(
        (item: any) => item.id == storageLocation.containerBoxId,
      ); //查找样本所在的冻存盒
      if (boxIdx == -1) {
        ElMessage('无法查找到样本的存储位置');
        return;
      }
      let boxItemData = containerBoxs[boxIdx];
      clickColumnBox(boxItemData); //选中冻存盒
      nextTick(() => {
        let boxPlanRef: any = instance?.refs.boxPlanRef;
        console.log('boxPlanRef--', boxPlanRef);
        if (!boxPlanRef) {
          ElMessage('无法查找到样本的存储位置');
          return;
        }
        //获取冻存盒具体行列位置数据
        let boxItemData: any = boxPlanRef.getBoxItemData(
          storageLocation.boxRow - 1,
          storageLocation.boxColumn - 1,
        );
        console.log('boxItemData--', boxItemData);
        if (!boxItemData) {
          ElMessage('无法查找到样本的存储位置');
          return;
        }
        clickBoxnum(boxItemData);
      });
    });
  }
  /**查看冰箱内所有冻存架 */
  function chakanxq(callBack?: any) {
    let id: any = rowData && rowData.id;
    if (!id) return;
    queryRackList(id).then((res: any) => {
      console.log('chakanxq--', res);
      let data: any = res;
      for (let key in data) {
        set(containerInfo, key, get(data, key));
      }
      levelFirstConMap = arrayToMap(data.rackInfoList, 'storey', 'storeyColumn');
      levelFirstConList.value = handlerData(data, levelFirstConMap);
      console.log(
        'levelFirstConList.value---',
        levelFirstConList.value,
        'levelFirstConMap--',
        levelFirstConMap,
      );
      callBack && callBack();
    });
  }

  onMounted(() => {
    chakanxq(() => {
      console.log('-storageLocation-跳到指定样本存放位置', storageLocation);
      if (storageLocation) {
        //是否需要调整指定存储位置
        setSampleLocation();
        return;
      }
      getFirstActiveKey(); //选中冰箱，液氮罐直接展开到冻存盒层次
    });
  });
  return {
    boxConMap,
    clickColumnBox,
    showSampleId,
    openYBDetail,
    yangbenInfoList,
    drawerActiveKey,
    multiSelect,
    levelThirdCon,
    clickBoxnum,
    boxActiveKeys,
    containerInfo,
    toggleHandBacket,
    addSubRongqi,
    addMinRongqi,
    activeKey,
    levelSedParentCon,
    levelSedConList,
    distributeWidth,
    clickBox,
    levelFirstConList,
  };
}
export { useGraphicalContainer };
