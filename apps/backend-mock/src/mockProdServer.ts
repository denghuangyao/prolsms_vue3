import { createProdMockServer } from 'vite-plugin-mock/client';
import type { MockMethod } from 'vite-plugin-mock';
import user from '../mock/user';
import auth from '../mock/auth';
import biobank from '../mock/biobank';

export async function setupProdMockServer() {
  const mockModules: MockMethod[] = [...user, ...auth, ...biobank];
  createProdMockServer(mockModules);
}
