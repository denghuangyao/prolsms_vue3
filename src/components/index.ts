import type { App } from 'vue'
import Modal from './modal/Modal.vue'
import Tabs from './tabs/Tabs.vue'
import SvgIcon from './icons/SvgIcon.vue'
export default {
  inistall(app: App) {
    app.component('Modal', Modal)
    app.component('svg-icon', SvgIcon)
    app.component('Tabs', Tabs)
  },
}
