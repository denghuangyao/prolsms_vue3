import { filterTree, mapTree } from '@/utils'
import type { RouteMeta, Router, RouteRecordRaw } from 'vue-router'
import type { ExRouteRecordRaw, MenuRecordRaw } from '@/types'
export function generateMenus(routes: RouteRecordRaw[], router: Router): MenuRecordRaw[] {
  //获取所有路由(name=>path)键值对
  const finalRoutesMap: { [key: string]: string } = Object.fromEntries(
    router.getRoutes().map(({ name, path }) => [name, path]),
  )
  console.log('generateMenus-routes', routes)
  let menus = mapTree<ExRouteRecordRaw, MenuRecordRaw>(routes, (route) => {
    // 获取最终的路由路径
    const path = finalRoutesMap[route.name as string] ?? route.path ?? ''
    const { meta = {} as RouteMeta, name: routeName, redirect, children = [] } = route
    let { key, icon, label = '' } = meta
    // 确保菜单名称不为空
    let name = (label || routeName || '') as string
    //处理子菜单
    const resultChildren = (children as MenuRecordRaw[]) ?? []
    // 设置子菜单的父子关系
    if (resultChildren.length > 0) {
      resultChildren.forEach((child) => {
        child.parents = [...(route.parents ?? []), path]
        child.parent = path
      })
    }
    //确定最终路径
    const resultPath = (redirect as string) || path //还有链接形式的
    return {
      key: key as string | undefined,
      icon,
      label: name,
      children: resultChildren,
      parent: route.parent,
      parents: route.parents,
      path: resultPath,
      show: !meta.hideInMenu,
    }
  })

  //   console.log('generateMenus-menus', menus)
  //对菜单进行排序，避免order=0时被替换成999的问题
  menus = menus.sort((a, b) => (a?.order ?? 999) - (b?.order ?? 999))
  console.log('generateMenus-menus', menus)
  //过滤隐藏的菜单项
  return filterTree(menus, (menu) => !!menu.show)
}
