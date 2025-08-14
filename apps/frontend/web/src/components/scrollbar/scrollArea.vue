<script setup lang="ts">
import type { ScrollAreaRootProps } from 'radix-vue';
import { cn } from '@dhy/utils';
import { computed } from 'vue';
import type { ClassType } from '@dhy/types';
const props = withDefaults(
  defineProps<
    ScrollAreaRootProps & {
      class?: ClassType;
      onScroll?: (event: Event) => void;
      viewportProps?: { onScroll: (event: Event) => void };
    }
  >(),
  {
    onScroll: () => { },
  },
);
defineOptions({
  name: 'ScrollArea',
});
const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  console.log('props--', props);
  return delegated;
});
</script>
<template>
  <ScrollAreaRoot :class="cn(props.class)" v-bind="delegatedProps" class="ScrollAreaRoot">
    <ScrollAreaViewport class="ScrollAreaViewport" as-child @scroll="onScroll">
      <slot></slot>
    </ScrollAreaViewport>
    <ScrollAreaScrollbar class="ScrollAreaScrollbar" orientation="vertical">
      <ScrollAreaThumb class="ScrollAreaThumb" />
    </ScrollAreaScrollbar>
    <ScrollAreaCorner />
  </ScrollAreaRoot>
</template>

<style lang="scss">
.ScrollAreaRoot {
  --scrollbar-size: 0.5rem;
  overflow: hidden;
}

.ScrollAreaViewport {
  height: 100%;
  width: 100%;
}

/* 基础滚动条样式 */
.ScrollAreaScrollbar {
  /* 核心属性 */
  display: flex;
  touch-action: none;
  user-select: none;
  transition-property: color, background-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  cursor: pointer;

  /* 垂直滚动条专属 */
  &[data-orientation='vertical'] {
    height: 100%;
    width: var(--scrollbar-size);
    border-left: 1px solid transparent;
    padding: 1px;
  }

  /* 水平滚动条专属 */
  &[data-orientation='horizontal'] {
    width: var(--scrollbar-size);
    flex-direction: column;
    border-top: 1px solid transparent;
    padding: 1px;
  }
}

.ScrollAreaThumb {
  flex: 1;
  background-color: var(--menu-scrollbar-bg-color);
  border-radius: var(--scrollbar-size);
  position: relative;

  &:hover {
    background: var(--menu-scrollbar-hover-bg-color);
  }
}
</style>
