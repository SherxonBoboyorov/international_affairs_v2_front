<script setup lang="ts">
/**
 * Layout uchun header komponenti
 */
const authStore = useAuthStore();
const variebleStore = useVariebleStore();

// Foydalanuvchi ma'lumotlarini hisoblash
const userData = computed(() => {
  if (authStore.user) {
    try {
      return JSON.parse(authStore.user);
    } catch (e) {
      console.error("User data parse error:", e);
      return null;
    }
  }
  return null;
});
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
          {{ userData?.name }}
        </h3>
        <h4>{{ (variebleStore.roles as any)[authStore.role] }}</h4>
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
