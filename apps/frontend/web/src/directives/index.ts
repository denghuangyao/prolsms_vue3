import type { App } from 'vue';
import { registerLoadingDirective } from './loading';
import { registerThrottleDirective } from './throttle';
export default {
  install(app: App) {
    registerLoadingDirective(app, {
      loading: true,
      spinning: true,
    });
    registerThrottleDirective(app);
  },
};
