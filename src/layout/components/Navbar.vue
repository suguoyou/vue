<template>
  <div class='nav-bar'>
    <div class="header-title" @click="doClick">
      联众测试
    </div>
  </div>
</template>
 
<script setup lang='ts'>
import { ref, reactive } from "vue";
import router from '@/router'

const doClick = () => {
  router.push('/home')
}
</script>
 
<style lang="scss" scoped>
.nav-bar {
  .header-title {
    width: 180px;
    height: 60px;
    font-size: 24px;
    color: #fff;
    text-align: center;
    line-height: 60px;
    font-size: 500;
    float: left;
  }
}
</style>