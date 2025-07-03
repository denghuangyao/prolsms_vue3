<template>
  <svg aria-hidden="true">
    <use :href="symbolId" :fill="color"></use>
  </svg>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
export default defineComponent({
  name: 'SvgIcon',
  props: {
    prefix: {
      type: String,
      default: 'icon',
    },
    name: {
      type: String,
    },
    size: {
      type: [Number, String],
    },
    color: String,
  },
  setup(props) {
    const symbolId = computed(() => `#${props.prefix}-${props.name}`);
    return { symbolId };
  },
});
</script>
