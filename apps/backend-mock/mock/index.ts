import type { MockMethod } from 'vite-plugin-mock';
import user from './user';
import auth from './auth';
export default [...user, ...auth] as MockMethod[];
