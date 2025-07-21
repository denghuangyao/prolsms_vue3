import type { MenuRecordRaw } from '@/types';
function findMenuByPath(menus: MenuRecordRaw[], path?: string): MenuRecordRaw | null {
  for (const menu of menus) {
    if (menu.path === path) {
      return menu;
    }
    if (menu.children?.length) {
      let matchMenu = findMenuByPath(menu.children, path);
      if (matchMenu) {
        return matchMenu;
      }
    }
  }
  return null;
}
function findRootMenuByPath(menus: MenuRecordRaw[], path?: string, level: number = 0) {
  const findMenu = findMenuByPath(menus, path);
  const rootMenuPath = findMenu?.parents?.[level];
  const rootMenu = rootMenuPath ? menus.find((item) => item.path === rootMenuPath) : undefined;
  console.log('findRootMenuByPath--', rootMenu);
  return {
    findMenu,
    rootMenu,
    rootMenuPath,
  };
}
export { findMenuByPath, findRootMenuByPath };
