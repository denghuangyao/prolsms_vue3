import type { Preferences } from '@/types';
import { preferenceManager } from './preferences';

// 偏好设置（带有层级关系）
const preferences: Preferences = preferenceManager.getPreferences();
export { preferences };
