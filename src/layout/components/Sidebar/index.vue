<template>
  <div class="sidebar">
    <el-menu class="el-menu-vertical-demo" router>
      <template v-for="item in menus" :key="item.code">
        <el-sub-menu :index="item.code">
          <template #title>
            <span>{{ item.meta.title }}</span>
          </template>
          <el-menu-item :index="child.path" v-for="child in item.children" :key="child.code">{{
            child.meta.title }}</el-menu-item>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { usePermissionStoreHook } from '@/store/modules/permission'
const permissionStore = usePermissionStoreHook()
const menus = permissionStore.routes
console.log(menus)
</script>

<style lang="scss" scoped>
.sidebar {
  height: 100%;
  background: #ffffff;
}
</style>
