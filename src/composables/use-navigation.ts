import { useRouter, type RouteRecordNormalized } from 'vue-router';

/**
 * 处理路由跳转
 */
function useNavigation() {
  const router = useRouter();
  const routeMetaMap = new Map<string, RouteRecordNormalized>();
  const initRouteMap = () => {
    const routes = router.getRoutes();
    for (let route of routes) {
      routeMetaMap.set(route.path, route);
    }
    console.log('-routes-', routes);
  };
  initRouteMap();
  const navigation = async (path: string) => {
    try {
      const route = routeMetaMap.get(path);
      const { query = {} } = route?.meta ?? {};
      //处理路径，有打开新页面、在新窗口中打开路由等，目前先处理路由切换
      await router.push({
        path,
        query,
      });
    } catch (error) {
      console.error('Navigation failed:', error);
      throw error;
    }
  };
  return {
    navigation,
  };
}
export { useNavigation };
