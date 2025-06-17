import type { App } from 'vue'
import { loadingDirective, spinningDirective } from './loading'
export default {
  install(app: App) {
    app.directive('loading', loadingDirective)
    app.directive('spinning', spinningDirective)
  },
}
