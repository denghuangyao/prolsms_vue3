export interface VisibleDomRect {
  width: number
  height: number
  left: number
  top: number
}
/**
 * 获取元素可见区域
 * @param element
 * @returns
 */
export function getElementVisibleRect(element?: HTMLElement | null | undefined): VisibleDomRect {
  if (!element) {
    return {
      width: 0,
      height: 0,
      top: 0,
      left: 0,
    }
  }
  const rect = element.getBoundingClientRect()
  const top = Math.max(rect.top, 0)
  const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight)
  const bottom = Math.min(viewHeight, rect.bottom) //去掉内容高度
  const left = Math.max(rect.left, 0)
  const viewWidth = Math.max(document.documentElement.clientWidth, window.innerWidth)
  const right = Math.min(viewWidth, rect.right)
  //   console.log(rect)
  return {
    width: Math.max(0, right - left),
    height: Math.max(0, bottom - top),
    top,
    left,
  }
}
