<template>
    <div class="sidebar">
        <el-menu unique-opened :default-active="activeIndex">
            <template v-for="item in list" :key="item.code">
                <el-sub-menu :index="item.code">
                    <template #title>
                        <span>{{ item.name }}</span>
                    </template>
                    <el-menu-item :index="child.code" v-for="child in item.children" :key="child.code" @click="doSelect">{{
                        child.name }}</el-menu-item>
                </el-sub-menu>
            </template>
        </el-menu>
    </div>
</template>
  
<script lang="ts" setup>
defineProps(['list', 'activeIndex'])
const emit = defineEmits(['selectDepart'])

const doSelect =(data) => {
    emit('selectDepart', data.index)
}
</script>
  
<style lang="scss" scoped>
.sidebar {
    height: 100%;
}
</style>
  