<template>
  <div class="app-wrapper">
    <el-container>
      <el-header class="nav-header">
        <Navbar></Navbar>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Sidebar></Sidebar>
        </el-aside>
        <el-main>
          <AppMain></AppMain>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import AppMain from './components/AppMain.vue'
import Sidebar from './components/Sidebar/index.vue'
</script>
<style lang="scss">
.app-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  background: #edf4f6;
}

.nav-header {
  background: #4c63fa;
}
</style>
