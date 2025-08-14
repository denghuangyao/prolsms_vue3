import type { App } from 'vue';
import { default as SvgIcon } from './icons/svg-icon.vue';
import 'virtual:svg-icons-register';
export default {
  install(app: App) {
    app.component('svg-icon', SvgIcon);
  },
};
