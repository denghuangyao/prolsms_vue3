import type { UserInfo } from '@dhy/types';
import http from '../http';
export const getUserInfo = async () => {
  let userInfo: null | UserInfo = null;
  userInfo = await http.get('/user/info');
  return userInfo;
};
