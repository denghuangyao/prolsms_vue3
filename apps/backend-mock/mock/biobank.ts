import type { MockMethod } from 'vite-plugin-mock';
import { MOCK_BOXLIST, MOCK_CONTAINNERS, MOCK_RACKLIST, MOCK_SYMPLELIST } from '../utils/mock-data';
import { useResponseSuccess } from '../utils/response';

function getRackList(id: any) {
  const container: any = MOCK_CONTAINNERS.find((item) => item.id === Number(id));
  if (container) {
    container.rackInfoList = MOCK_RACKLIST.filter((item) => item.parentConId === Number(id));
  }
  return container;
}
function getBoxList(id: any, rackRow: any) {
  const container = MOCK_BOXLIST.filter((item) => {
    let isFilter = item.parentConId === Number(id) && item.rackRow === Number(rackRow);
    return isFilter;
  });
  return container;
}
export default [
  {
    url: '/biobank/container/detail',
    method: 'get',
    response: ({ query }: any) => {
      let { id } = query;
      const container = MOCK_CONTAINNERS.find((item) => item.id === Number(id));
      console.log('===mock-data===', container, id);
      return useResponseSuccess({ ...container });
    },
  },
  {
    url: '/swybk/sampleStock/graphic/queryRackList',
    method: 'get',
    response: ({ query }: any) => {
      let { id } = query;
      const container = getRackList(id);
      console.log('===mock-data===', container, id);
      return useResponseSuccess({ ...container });
    },
  },
  {
    url: '/swybk/sampleStock/graphic/queryBoxList',
    method: 'get',
    response: ({ query }: any) => {
      let { id, rackRow } = query;
      const container = getBoxList(id, rackRow);
      console.log('===mock-data==queryBoxList=', container);
      return useResponseSuccess(container);
    },
  },
  {
    url: '/swybk/sample/detail',
    method: 'get',
    response({ query }: any) {
      let { id } = query;
      const container = MOCK_SYMPLELIST.find((item) => item.id === Number(id));
      console.log('===mock-data===', container, id);
      return useResponseSuccess({ ...container });
    },
  },
] as MockMethod[];
