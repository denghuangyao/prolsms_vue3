interface TabbarPreferences {
  /** 限制最大数量 */
  maxCount: number;
}
interface AppPreferences {
  defaultHomePath: string;
}
interface Preferences {
  app: AppPreferences;
  tabbar: TabbarPreferences;
}
export type { Preferences };
