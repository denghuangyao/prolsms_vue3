import type { Preferences } from '@/types'
import { reactive, readonly } from 'vue'
import { defaultPreferences } from './config'
class PreferenceManager {
  private state: Preferences = reactive<Preferences>({
    ...this.loadPreferences(),
  })
  constructor() {}
  public getPreferences() {
    return readonly(this.state)
  }
  /**
   * 加载偏好设置
   * @returns
   */
  private loadPreferences(): Preferences {
    return { ...defaultPreferences }
  }
}
const preferenceManager = new PreferenceManager()
export { preferenceManager }
