import type { App } from 'vue';
import Modal from './modal/Modal.vue';
import Tabs from './tabs/Tabs.vue';
import SvgIcon from './icons/SvgIcon.vue';
import { ThemeToggle } from './widget/theme-toggle';
import { Scrollbar } from './scrollbar';
export default {
  inistall(app: App) {
    app.component('Modal', Modal);
    app.component('svg-icon', SvgIcon);
    app.component('Tabs', Tabs);
    app.component('ThemeToggle', ThemeToggle);
    app.component('Scrollbar', Scrollbar);
  },
};
