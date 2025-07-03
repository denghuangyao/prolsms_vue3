import type { MockMethod } from 'vite-plugin-mock';
import { verifyAccessToken } from './utils/jwt-utils';
import { unAuthorizedResponse, useResponseSuccess } from './utils/response';
export default [
  {
    url: '/auth/code',
    method: 'get',
    response: (request: any) => {
      let userinfo = verifyAccessToken(request.headers);
      if (!userinfo) {
        return unAuthorizedResponse();
      }
      //   const roles = MOCK_USERS.find((item) => item.username === userinfo.username)?.roles ?? []
      //   const codes = []
      //   return useResponseSuccess(codes)
    },
  },
  {
    url: '/auth/logout',
    method: 'post',
    response: () => {
      return useResponseSuccess('');
    },
  },
] as MockMethod[];
