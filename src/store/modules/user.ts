import { ref } from "vue"
import store from "@/store"
import { defineStore } from "pinia"

export const useUserStore = defineStore("user", () => {
  const token = ref<string>("")
  const setToken = (value: string) => {
    token.value = value
  }
  return { token, setToken }
},
  {
    persist: true,
  })

export function useUserStoreHook() {
  return useUserStore(store)
}
