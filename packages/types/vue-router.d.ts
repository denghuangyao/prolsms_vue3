import 'vue-router';
import type { RouteMeta as IRouteMeta } from '@dhy/types';
declare module 'vue-router' {
  interface RouteMeta extends IRouteMeta {}
}
