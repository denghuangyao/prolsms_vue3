const dataScreenTheme = {
  color: ['#005CFA', '#A3FDB0', '#0CD9B5', '#F9C65A', '#335F6A', '#1BE0FE', '#617589', '#2E7EF8'],
};
const bussinessTheme = {};
const safetyTheme = {};
const ThemeMap = {
  // 主题映射表，可以根据需要添加更多主题
  'data-screen-theme': dataScreenTheme,
  'bussiness-white': bussinessTheme,
  'safety-dark': safetyTheme,
};
export type ThemeType = keyof typeof ThemeMap;
export const getTheme = (theme: ThemeType) => {
  return ThemeMap[theme] || bussinessTheme; // 默认返回白屏主题;
};
