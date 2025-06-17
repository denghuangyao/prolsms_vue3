import type { Directive } from 'vue'

export const loadingDirective: Directive = {
  unmounted(el, binding, vnode) {
    console.log('unmounted-', el, binding, vnode)
  },
}
export const spinningDirective: Directive = {}
