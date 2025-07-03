import { CSS_VARIABLE_LAYOUT_CONTENT_HEIGHT, CSS_VARIABLE_LAYOUT_CONTENT_WIDTH } from '@/constants';
import { getElementVisibleRect, type VisibleDomRect } from '@/utils';
import { useCssVar, useDebounceFn } from '@vueuse/core';
import { ref, computed, type CSSProperties, onMounted, onUnmounted } from 'vue';

export function useLayoutContentStyle() {
  let resizeObeserver: null | ResizeObserver = null;
  const visibleDomRect = ref<null | VisibleDomRect>(null);
  const contentElement = ref<HTMLDivElement | null>(null);
  const contentHeight = useCssVar(CSS_VARIABLE_LAYOUT_CONTENT_HEIGHT);
  const contentWidth = useCssVar(CSS_VARIABLE_LAYOUT_CONTENT_WIDTH);
  console.log('contentHeight-useLayoutContentStyle-', contentHeight);
  const overlayStyle = computed((): CSSProperties => {
    const { height, width, left, top } = visibleDomRect.value ?? {};
    return {
      height: `${height}px`,
      width: `${width}px`,
      left: `${left}px`,
      top: `${top}px`,
      position: 'fixed',
    };
  });
  const debouncedCalcHeight = useDebounceFn(() => {
    visibleDomRect.value = getElementVisibleRect(contentElement.value);
    contentHeight.value = `${visibleDomRect.value.height}px`;
    contentWidth.value = `${visibleDomRect.value.width}px`;
    // console.log('visibleDomRect.value-useDebounceFn-', visibleDomRect.value)
  }, 16);
  onMounted(() => {
    if (contentElement.value && !resizeObeserver) {
      resizeObeserver = new ResizeObserver(debouncedCalcHeight);
      resizeObeserver.observe(contentElement.value);
    }
  });
  onUnmounted(() => {
    resizeObeserver?.disconnect();
    resizeObeserver = null;
  });

  return {
    contentElement,
    overlayStyle,
  };
}
