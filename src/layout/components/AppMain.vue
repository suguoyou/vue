<template>
  <div class="main-wrap">
    <TagView></TagView>
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" appea mode="default">
        <keep-alive :include="tagsViewStore.cachedViews">
          <component :is="Component" :key="route.path" class="app-main" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { useTagsViewStoreHook } from "@/store/modules/tagView"
import TagView from './TagsView/index.vue'
const tagsViewStore = useTagsViewStoreHook()

console.log('----', tagsViewStore.cachedViews.toString())
</script>
<style lang="scss">
.main-wrap {
  flex: 1;
  overflow: hidden;
  height: 100%;
  position: relative;
}
.app-main {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #ffffff;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(60px);
}
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(-60px);
}
.fade-transform-enter-active,
.fade-transform-leave-active {
  transition: all 0.5s;
}
</style>
