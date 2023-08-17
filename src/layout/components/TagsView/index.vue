<template>
  <div class="tag-wrap">
    <div class="tag-list">
      <div @click="doClick(item)" class="tag-item" :class="{ checked: isCheck(item) }"
        v-for="item in tagsViewStore.visitedViews" ref="tagItem">
        {{ item.meta.title }}
        <el-icon :size="14" :color="isCheck(item) ? '#58a7ff' : '#000000'" @click.prevent="closeTag(item)" v-if="item.path !== '/' && item.path !== '/home'">
          <Close />
        </el-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTagsViewStoreHook } from '@/store/modules/tagView'
import { Close } from '@element-plus/icons-vue'
import { useRouter, useRoute } from "vue-router"
import { onMounted, computed, ref, watch } from 'vue'
const tagsViewStore = useTagsViewStoreHook()
const route = useRoute()
const router = useRouter()

onMounted(() => {
  initTags()
  addTags()
})

// 给当前页面tag添加样式
const isCheck = computed(() => {
  return (item: any) => {
    return item.path === route.path
  }
})

// 页面初始化时，添加固定tag
const affixTags = ref<any>([])
const initTags = () => {
  const routes = router
    .getRoutes()
  routes.forEach((item) => {
    if (item?.meta?.affix) {
      affixTags.value.push(item)
      tagsViewStore.addView(item)
    }
  })
}

// 监听路由变化，添加tag，标签栏滚动到当前tag
watch(
  () => route.path,
  () => {
    addTags()
  }
)

const addTags = () => {
  const { name } = route
  if (name) {
    tagsViewStore.addView(route)
  }
}


// 关闭tag
const closeTag = (tag: any) => {
  tagsViewStore.delView(tag)
  // 如果关闭的是当前tag，跳转到最后一个tag
  if (tag.path === route.path && tagsViewStore.visitedViews.length > 0) {
    const { path } =
      tagsViewStore.visitedViews[tagsViewStore.visitedViews.length - 1]
    router.push(path)
  } else {
    router.push('/')
  }
}

const doClick = (tag: any) => {
  router.push({
    path: tag.path,
    query: tag.query,
    params: tag.params
  })
}
</script>
<style lang="scss" scoped>
.tag-wrap {
  width: 100%;
  height: 50px;

  // overflow-x: auto;
  .tag-list {
    display: flex;
    padding: 10px 0;

    .tag-item {
      font-size: 14px;
      padding: 3px 10px;
      margin-right: 10px;
      color: #000000;
      background: #ffffff;
      border-radius: 4px;
      display: flex;
      align-items: center;
      cursor: pointer;
      flex-shrink: 0;

      &.checked {
        color: #58a7ff;
        border: none;
      }

      .close-icon {
        margin-left: 5px;
        transition: all 0.2s;

        &:hover {
          transform: rotateZ(90deg);
        }
      }
    }
  }
}
</style>
