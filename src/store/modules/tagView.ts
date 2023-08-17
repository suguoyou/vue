import { defineStore } from 'pinia'
import { ref } from 'vue'
import store from "@/store"

export const useTagsViewStore = defineStore('tagsView', () => {
  const visitedViews = ref<any>([])
  const cachedViews = ref<any>([])
  const addView = (view: any) => {
    addVisitedView(view)
    addCachedView(view)
  }
  const addVisitedView = (view: any) => {
    if (visitedViews.value.some((v) => v.path === view.path)) return
    visitedViews.value.push(
      Object.assign({}, view, {
        title: view.meta.title || 'no-name',
      })
    )
  }
  const addCachedView = (view: any) => {
    if (cachedViews.value.includes(view.name)) return
    if (view.meta.cache) {
      cachedViews.value.push(view.name)
    }
  }
  const delView = (view: any) => {
    const index = visitedViews.value.findIndex((v) => v.path === view.path)
    if (index > -1) {
      visitedViews.value.splice(index, 1)
    }
    const index2 = cachedViews.value.findIndex((v) => v === view.name)
    if (index2 > -1) {
      cachedViews.value.splice(index2, 1)
    }
  }
  // 二次跳转一个页面，路由信息会发生变化，需要更新
  const updateVisitedView = (view: any) => {
    const index = visitedViews.value.findIndex((v) => v.path === view.path)
    if (index > -1) {
      visitedViews.value[index] = Object.assign({}, view)
    }
  }

  return { visitedViews, cachedViews, addView, delView, updateVisitedView }
})

export function useTagsViewStoreHook() {
  return useTagsViewStore(store)
}
