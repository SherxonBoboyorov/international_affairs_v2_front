<script setup>
const authStore = useAuthStore();
const variebleStore = useVariebleStore();
</script>

<template>
  <div class="layout-header">
    <div class="layout-header-logo">
      <img
        src="/images/logo.png"
        height="48px"
        alt="" />
    </div>
    <div
      v-if="authStore && authStore.user && variebleStore"
      class="layout-header-profile">
      <div class="layout-header-profile-info">
        <h3>
          {{ JSON.parse(authStore.user, null, 2).name }}
        </h3>
        <h4>{{ variebleStore.roles[authStore.role] }}</h4>
      </div>
      <el-badge :value="4">
        <el-button class="">
          <Svg
            name="notification"
            class="mr-0"
        /></el-button>
      </el-badge>
    </div>
  </div>
</template>
