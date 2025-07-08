import { computed, defineComponent, onMounted, onUnmounted } from 'vue';
import type { MiniBoxInfo } from '../../types';
interface Props {
  rowCount?: number; // 容器总行数
  columnCount?: number; // 容器总列数
  boxMap: Map<string, any>; // 容器显示数据x,y=data
  activeKey: string[]; // 容器选择格子：['x,y',....]:选中几行几列的格子
  openCtrlSelected: boolean; // 是否开启按ctrl就连续选中样本格子
}
interface BoxInfo extends MiniBoxInfo {
  colBh: string;
  rowBh: string;
  colNum: number;
  isHasYB: boolean;
  isInStorage: boolean;
  isOutStorage: boolean;
  key: string;
}
interface BoxData {
  rowBh: string;
  children: BoxInfo[];
}
export default defineComponent({
  props: {
    // 容器总行数
    rowCount: {
      type: Number,
    },

    // 容器总列数
    columnCount: {
      type: Number,
    },

    // 容器显示数据x,y=data
    boxMap: { type: Map, default: () => new Map() },

    // 容器选择格子：['x,y',....]:选中几行几列的格子
    activeKey: { type: Array, default: () => [] },

    // 是否开启按ctrl就连续选中样本格子
    openCtrlSelected: { type: Boolean, default: false },
  },
  emits: ['clickBoxnum', 'multiSelect'],
  setup(props: Props, { emit }) {
    // isshift:boolean=false;//是否按下shift键
    let isctrl: boolean = false; //是否按下ctrl键
    let multiSelectKeys: any = []; //按下shift键时，点击的两个格子的坐标；用于后续选中两个格子之间所有的样本
    const getDataList = computed<BoxData[]>(() => {
      let list: BoxData[] = [];
      for (let i = 0; i < (props?.rowCount ?? 0); i++) {
        let rowBh: any = i + 1;
        let children: BoxInfo[] = [];
        getLetters().forEach((item: any, index: any) => {
          let key: any = `${i},${index}`;
          let colNum: any = index + 1;
          let colBh: any = item;
          let boxData: any = props.boxMap.get(key) || null;
          let isHasYB: boolean = boxData ? true : false;
          let tmp: BoxInfo = {
            colBh,
            rowBh,
            colNum,
            isHasYB,
            isInStorage: false,
            isOutStorage: false,
            key,
            ...boxData,
          };
          if (boxData) {
            tmp.isInStorage = boxData.sampleStatus == 'IN_STORAGE';
            tmp.isOutStorage = boxData.sampleStatus == 'TEMPORARILY_REMOVED';
          }
          children.push(tmp);
        });
        list.push({ rowBh, children });
      }
      console.log('--list-', list);
      return list;
    });
    onMounted(() => {
      console.log('mounted--boxPlane');
      // 初始化时绑定事件监听器，并绑定this作为上下文
      bindEventListeners();
    });
    onUnmounted(() => {
      console.log('destroyed--boxPlane');
      // 销毁时解绑事件监听器
      unbindEventListeners();
    });
    const bindEventListeners = (): void => {
      if (!props.openCtrlSelected) {
        return;
      }
      document.addEventListener('keyup', keyupFunc);
      document.addEventListener('keydown', keydownFunc);
    };

    const unbindEventListeners = () => {
      if (!props.openCtrlSelected) {
        return;
      }
      document.removeEventListener('keyup', keyupFunc);
      document.removeEventListener('keydown', keydownFunc);
    };
    const getLetters = () => {
      const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const result = [];
      for (let i = 0; i < (props?.columnCount ?? 0); i++) {
        result.push(letters[i % letters.length]);
      }
      return result;
    };
    const isActiveKey = (rowIndx: any, columnIndx: any) => {
      return props.activeKey.includes(`${rowIndx},${columnIndx}`);
    };
    const clickBoxnum = (boxItemData: any, rowIdx: number, colIdx: number) => {
      console.log(boxItemData, rowIdx, colIdx, 'clickBoxnum--isctrl', isctrl);
      if (isctrl && props.openCtrlSelected) {
        // 按住ctrl键，点击选中两个格子之间的所有样本
        // 将本次点击的格子，添加到multiSelectKeys中，当multiSelectKeys中累计有两个格子时，开始选中两个格子之间的所有样本
        multiSelectKeys.push({ rowIdx, colIdx });
        multiSelect();
      } else {
        emit('clickBoxnum', boxItemData);
      }
    };

    /**
     * 从当前选中格子，从左往右、从上往下、一行行的获取空闲格子
     * （到结尾格子后，再从最开始（1，A）再继续按顺序获取，直到获取所有的空格子）
     *
     * @param {number} rowIdx 选中位置所在行的索引值
     * @param {number} colIdx 选中位置所在列的索引值
     *
     * */
    function getFreeCellsInOrder(rowIdx: number, colIdx: number) {
      let matrix = getDataList.value; //盒子数据

      let rowsStartPart = matrix.slice(0, rowIdx); //当前格子上面的行(不包含当前格子所在行)
      let rowsEndPart = matrix.slice(rowIdx + 1); //当前格子下面的行(不包含当前格子所在行)
      let currentRow = matrix[rowIdx]; //当前格子所在行的数据

      let allFreeCells: any = []; //空盒子

      let currentRowLeftCells = currentRow.children.slice(0, colIdx); //当前格子所在行，左边的格子数据(不包含当前格子)
      let currentRowRightCells = currentRow.children.slice(colIdx); //当前格子所在行，当前格子及右边的格子数据(！！包含当前格子！！)

      // 过滤出空格子
      // 按从当前格子，从左往右，从上往下
      let startFreeCells = currentRowRightCells.filter((i: any) => !i.isHasYB); //先拿当前格子所在行；当前格子及右边的空格子数据
      let otherRows = [...rowsEndPart, ...rowsStartPart]; //按照往下的顺序，排列盒子的行数据
      let otherFreeCells = otherRows.reduce((list: any, i: any) => {
        let cells = i.children.filter((i: any) => !i.isHasYB);
        return [...list, ...cells];
      }, []); //按顺序过滤出其他行的空闲格子
      let endFreeCells = currentRowLeftCells.filter((i: any) => !i.isHasYB); //最后拿当前格子所在行；左边的空格子数据

      allFreeCells = [...startFreeCells, ...otherFreeCells, ...endFreeCells];
      console.log(allFreeCells, 'getFreeCellsInOrder');
      return allFreeCells;
    }
    /**根据行列号获取指定冻存盒格子数据
     * @param {number} rowIdx 选中位置所在行的索引值
     * @param {number} colIdx 选中位置所在列的索引值
     */
    function getBoxItemData(rowIdx: number, colIdx: number) {
      try {
        return getDataList.value[rowIdx].children[colIdx];
      } catch (e) {
        return null;
      }
    }

    // 监听键盘按下事件的回调
    function keydownFunc(e: any) {
      // 取消默认事件
      // e.preventDefault();
      // console.log(e,arguments,'_e,e,arguments')

      switch (
        e.keyCode // ctrl：17 shift：16
      ) {
        // case 16:
        //   isshift = true; // 如果shift按下就让他按下的标识符变为true
        //   break;
        case 17:
          isctrl = true; // 如果ctrl按下就让他按下的标识符变为true
          break;
      }
    }
    // 监听键盘抬起事件的回调
    function keyupFunc(e: any) {
      // 取消默认事件
      // e.preventDefault();

      switch (
        e.keyCode // ctrl：17 shift：16
      ) {
        // case 16:
        //   isshift = false; // 如果shift抬起就让他按下的标识符变为false
        //   break;
        case 17:
          multiSelectKeys = []; //当ctrl抬起时，清空multiSelectKeys，再次按下时重新开始
          isctrl = false; // 如果ctrl抬起就让他按下的标识符变为false
          break;
      }
    }

    function multiSelect() {
      if (multiSelectKeys.length == 2) {
        let startCoord = multiSelectKeys[0],
          endCoord = multiSelectKeys[1];
        let allHasYBCells = rangeSelectGrids(startCoord, endCoord);
        console.log(allHasYBCells, 'multiSelect');
        multiSelectKeys = []; //清空multiSelectKeys，下次点击时重新开始

        emit('multiSelect', allHasYBCells);
      }
    }
    /**
     * 获取两个格子之间，所有有样本的格子
     * @param startCoord 开始格子
     * @param endCoord 截至格子
     *
     * */
    function rangeSelectGrids(startCoord: any, endCoord: any) {
      let matrix = getDataList.value; //盒子数据
      // 确定遍历的起始和结束坐标
      const startRowIdx = startCoord.rowIdx; //起始格子的所在行
      const startColIdx = startCoord.colIdx; //起始格子的所在列
      const endRowIdx = endCoord.rowIdx; //截止格子的所在行
      const endColIdx = endCoord.colIdx; //截至格子的所在列

      let allHasYBCells: any = []; //所有有样本的格子

      // 提取一个辅助函数来过滤出有样本的格子
      const filterHasYBCells = (cells: any) => cells.filter((cell: any) => cell.isHasYB);

      /**
       * 辅助函数：按顺序获取指定范围内的有样本格子:从左到右，从上到下
       * @param startRow 开始格子的行号
       * @param startCol 开始格子的列号
       * @param endRow 截止格子的行号
       * @param endCol 截止格子的列号
       * */
      const getCellsInRange = (
        startRow: number,
        startCol: number,
        endRow: number,
        endCol: number,
      ) => {
        let cells: any = [];
        for (let row = startRow; row <= endRow; row++) {
          let start = row === startRow ? startCol : 0;
          //如果是起始格子所在行，需获取起始格子右边的格子，所以需从传入的startCol开始裁剪，需包含起始格子本身
          // 否则，从0开始裁剪

          let end = row === endRow ? endCol + 1 : matrix[row].children.length;
          //如果截止格子所在行，需获取截止格子左边的格子，所以需从传入的endCol+1开始截止裁剪，需包含截止格子本身
          // 否则，到最后一列结束

          cells = cells.concat(filterHasYBCells(matrix[row].children.slice(start, end)));
        }
        return cells;
      };

      // 方案一
      // 不管起始格子跟截止格子的顺序，只获取两个格子之间的所有有样本的格子
      // 默认从起始跟截止格子中，最前面的那个格子开始计算，

      // 确定起始和截止的坐标顺序
      // 交换的目的是为了让交换后的起始坐标在截止坐标之前，这样就可以从左到右、从上到下获取所有符合条件的格子

      if (startRowIdx > endRowIdx) {
        //如果起始行号大于截止行号
        let _startRowIdx = endRowIdx,
          _endRowIdx = startRowIdx;
        let _startColIdx = endColIdx,
          _endColIdx = startColIdx;
        //交换两个格子的坐标
        allHasYBCells = getCellsInRange(_startRowIdx, _startColIdx, _endRowIdx, _endColIdx);
      } else if (startRowIdx == endRowIdx) {
        // 如果同一行时，根据起始列号和截止列号的顺序获取格子
        allHasYBCells = getCellsInRange(
          startRowIdx,
          Math.min(startColIdx, endColIdx),
          startRowIdx,
          Math.max(startColIdx, endColIdx),
        );
      } else {
        //如果起始行号小于截止行号,无需交换坐标
        allHasYBCells = getCellsInRange(startRowIdx, startColIdx, endRowIdx, endColIdx);
      }
      return allHasYBCells;

      // // 方案二
      // //从起始格子开始，按从上到下，从左到右，到截止格子结束，获取所有的符合条件的格子
      // // 如果截止格子在起始格子的之前（截止格子在起始格子上方或者同一行的左边）
      // //（则，从起始格子开始，向左、向下，到最后一个格子后，再从最开始（1，A）再继续按顺序获取，直到截止格子）

      // if(startRowIdx>endRowIdx||startRowIdx == endRowIdx&&endColIdx<startColIdx){//如果起始行号大于截止行号，或者起始行号等于截止行号，但是截止列号小于起始列号
      //   // 分成两部分：第一部分是从起始格子向下到最后一个格子，第二部分是从第一个格子（0，0）向下到截止格子
      //   allHasYBCells = getCellsInRange(startRowIdx, startColIdx, matrix.length - 1, matrix[0].children.length - 1)
      //         .concat(getCellsInRange(0, 0, endRowIdx, endColIdx));
      // }
      // else if(startRowIdx == endRowIdx){//如果起始行号等于截止行号，且截止列号大于起始列号
      //   allHasYBCells = filterHasYBCells(matrix[startRowIdx].children.slice(startColIdx, endColIdx + 1));
      // }
      // else{//如果起始行号小于截止行号
      //   allHasYBCells = getCellsInRange(startRowIdx, startColIdx, endRowIdx, endColIdx);
      // }
      // return allHasYBCells
    }

    function isMultiClickItem(rowIdx: any, colIdx: any) {
      let flag = multiSelectKeys.some((i: any) => i.colIdx == colIdx && i.rowIdx == rowIdx);
      return flag;
    }
    return {
      getDataList,
      isMultiClickItem,
      isActiveKey,
      clickBoxnum,
      getLetters,
      //expose
      getBoxItemData,
      getFreeCellsInOrder,
    };
  },
});
