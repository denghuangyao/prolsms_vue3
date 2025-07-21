import { createProdMockServer } from 'vite-plugin-mock/client';
import mock from '../mock';
export async function setupProdMockServer() {
  const mockModules = [...mock];
  createProdMockServer(mockModules);
}
