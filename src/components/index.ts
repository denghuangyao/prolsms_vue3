import type { App } from 'vue'
import Modal from './modal/Modal.vue'
import SvgIcon from './icons/SvgIcon.vue'
export default {
  inistall(app: App) {
    app.component('Modal', Modal)
    app.component('svg-icon', SvgIcon)
  },
}
