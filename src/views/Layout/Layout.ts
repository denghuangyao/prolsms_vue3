import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Layout',
  setup() {
    const msg = ref('Hello, Vue 3 + TypeScript!')
    return { msg }
  },
})
