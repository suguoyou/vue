import router from '@/router'
import { useUserStoreHook } from '@/store/modules/user'
import { usePermissionStoreHook } from '@/store/modules/permission'

const whiteList = ['/login']
// 路由前置守卫
router.beforeEach(async (to, _from, next) => {
  const token = useUserStoreHook().token
  if (token) {
    if (to.path === '/login') {
      next('/')
    } else {
      const permissionStore = usePermissionStoreHook()
      if (!permissionStore.routes || permissionStore.routes.length == 0) {
        const accessRoutes = await permissionStore.getAccessRoutes()
        accessRoutes.forEach((route) => {
          router.addRoute(route)
        })
        permissionStore.setRoles(to.meta.actions || [])
        next({ path: to.fullPath, replace: true, query: to.query })
      } else {
        permissionStore.setRoles(to.meta.actions || [])
        next()
      }
    }
  } else {
    // 如果是白名单
    if (whiteList.indexOf(to.path) !== -1) {
      // 正常跳转
      next()
    } else {
      // 否则跳转到登录页
      next('/login')
    }
  }
})

