import { DirectiveBinding } from 'vue'
import { usePermissionStoreHook } from '@/store/modules/permission'

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding
    const parentEl = el.parentElement
    const permissionStore = usePermissionStoreHook()
    const roles = permissionStore.roles || []
    let flag = roles.some(role => role == value)
    if (!flag) parentEl?.removeChild(el)
  }
}
