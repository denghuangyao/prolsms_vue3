import type { GenerateRoutesOptions } from '@/types'
// import { cloneDeep } from '@/utils'

const forbiddenComponent = () => import('@/views/Fallback/Forbidden.vue')
export const generateAccess = (options: GenerateRoutesOptions) => {
  const modules = import.meta.glob(['@/views/**/*.vue', '!@/views/**/components/*.vue'], {
    eager: true,
    import: 'default',
  })
  console.log(modules)
  const { router } = options
  //   const routes = cloneDeep(options.routes)
  //   console.log('routes--', routes)

  return []
}
