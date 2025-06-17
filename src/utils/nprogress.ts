import type { NProgress } from 'nprogress'
import 'nprogress/nprogress.css' // 引入nprogress的样式文件
let nProgressInstance: null | NProgress = null
/**
 * 动态加载NProgress库，并进行配置。
 * @returns
 */
async function loadNProgress() {
  if (nProgressInstance) {
    return nProgressInstance
  }
  nProgressInstance = await import('nprogress')
  nProgressInstance.configure({
    easing: 'ease', // 动画方式
    trickleSpeed: 200, // 自动递增间隔
    showSpinner: true, //加载条右下方的小圈圈
    speed: 300, // 递增进度条的速度
    minimum: 0.08, // 更改启动时使用的最小百分比
  })
  return nProgressInstance
}
async function startProgress() {
  const nProgress = await loadNProgress()
  nProgress?.start()
}
async function stopProgress() {
  const nProgress = await loadNProgress()
  nProgress?.done()
}
export { startProgress, stopProgress }
