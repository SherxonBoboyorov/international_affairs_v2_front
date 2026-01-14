<script setup>
const cookieStore = useCookiesStore();
</script>

<template>
  <div class="my-style">
    <el-container>
      <el-header :class="cookieStore.isOpenMenu ? 'mini-menu' : ''">
        <LayoutsHeader />
      </el-header>
      <el-container style="height: calc(100vh - 110px)">
        <el-aside
          :class="{ mini: cookieStore.isOpenMenu }"
          :width="cookieStore.isOpenMenu ? '84px' : '300px'"
          style="position: relative; overflow: visible">
          <LayoutsSidebar />
        </el-aside>
        <el-scrollbar
          height="100%"
          style="width: 100%">
          <el-main
            :class="cookieStore.isOpenMenu ? 'mini-main' : ''"
            style="position: relative">
            <NuxtPage />
          </el-main>
        </el-scrollbar>
      </el-container>
    </el-container>
  </div>
</template>
