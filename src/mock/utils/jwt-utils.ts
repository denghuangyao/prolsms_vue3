import jwt from 'jsonwebtoken';
import { type UserInfo, MOCK_USERS } from './mock-data';
import type { Recordable } from '@/types';
const ACCESS_TOKEN_SECRET = 'access_token_secret';
interface UserPayload extends UserInfo {
  iat: number;
  exp: number; //过期时间戳
}
export const generateAccessToken = (user: UserInfo) => {
  //expiresIn：表示token有效期，60（ms）, "2 days", "10h", "7d"，默认“120”ms
  return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '7d' });
};
export const verifyAccessToken = (headers: Recordable) => {
  const authHeader = headers.authorization;
  if (!authHeader?.startsWith('Bearer')) {
    return null;
  }
  const token = authHeader.split(' ')[1];
  let decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as UserPayload;
  let username = decoded.username;
  const user = MOCK_USERS.find((item) => item.username === username);
  if (!user) return null;
  const { password: _pwd, ...userinfo } = user;
  console.log('decoded--', decoded);
  return userinfo;
};
