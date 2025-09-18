import { type App } from 'vue';
import dpHeader from './dpHeader.vue';
import blockTitle from './blockTitle.vue';
import titleTab from './titleTab.vue';
import rankBar from './rankBar/rankBar.vue';
import scrollTable from './scrollTable.vue';
import gaikuangbox from './gaikuangbox.vue';
import empty from './empty.vue';
export default {
  install(app: App) {
    // 这里可以添加全局组件和指令的注册逻辑
    app.component('dp-header', dpHeader);
    app.component('block-title', blockTitle);
    app.component('title-tab', titleTab);
    app.component('gaikuangbox', gaikuangbox);
    app.component('rank-bar', rankBar);
    app.component('scroll-table', scrollTable);
    app.component('empty', empty);
  },
};
