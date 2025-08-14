import http from '../http';
export const queryRackList = (id: any) => {
  return http.get('/swybk/sampleStock/graphic/queryRackList', { id });
};
export const queryBoxList = ({ id, rackRow }: any) => {
  return http.get('/swybk/sampleStock/graphic/queryBoxList', { id, rackRow });
};
export const getSampleById = (id: any) => {
  return http.get(`/swybk/sample/detail`, { id });
};

export const getContainerById = (id: any) => {
  return http.get('/biobank/container/detail', { id });
};
