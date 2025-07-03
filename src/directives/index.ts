import type { App } from 'vue';
import { registerLoadingDirective } from './loading';
export default {
  install(app: App) {
    registerLoadingDirective(app, {
      loading: true,
      spinning: true,
    });
  },
};
