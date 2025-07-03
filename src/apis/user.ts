import type { UserInfo } from '@/types';
import http from '@/utils/http';
export const getUserInfo = async () => {
  let userInfo: null | UserInfo = null;
  userInfo = await http.get('/user/info');
  return userInfo;
};
