import { ref } from "vue"
import store from "@/store"
import { defineStore } from "pinia"
import { GetMenuList } from '@/https/login'
import { arrToTree, getActions, getPath, getName } from '@/utils/util'
import Layout from '@/layout/index.vue'


const modules = import.meta.glob("../../views/**.vue");
export const usePermissionStore = defineStore("permission", () => {
  const routes = ref<any>([])
  const getAccessRoutes = async () => {
    const resp: any = await GetMenuList()
    const routeList: any = []
    resp.map((item: any) => {
      let route: any = {
        path: getPath(item.url),
        name: getName(item.url),
        component: !item.pcode ? Layout : modules[`../../views${getPath(item.url)}.vue`],
        code: item.code,
        pcode: item.pcode,
        meta: {
          title: item.name,
          cache: !!item.pcode,
          actions: getActions(item.actions)
        }
      }
      routeList.push(route)
    })
    // 递归处理后台返回的路由数据
    const routeTree: RouteRecordRaw[] = arrToTree({
      list: routeList,
      code: 'code',
      pcode: 'pcode',
      children: 'children',
    })
    routes.value = routeTree
    console.log('动态路由', routeTree)
    return routeTree
  }
  const roles = ref<any>([])
  const setRoles = (list) => {
    roles.value = list
  }
  return { routes, getAccessRoutes, roles, setRoles }
})

export function usePermissionStoreHook() {
  return usePermissionStore(store)
}
