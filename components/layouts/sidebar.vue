<script setup>
const variableStore = useVariebleStore();
const authStore = useAuthStore();
const cookieStore = useCookiesStore();
const router = useRouter();
const route = useRoute();

const activeMenu = computed(() => {
  return (path) => route.path.startsWith(path);
});

const isActiveMainMenu = ref(true);

const handleClickMenu = (path, type) => {
  if (type === "main") {
    isActiveMainMenu.value = true;
  } else {
    isActiveMainMenu.value = false;
  }
  router.push(path);
};

const userLogOut = () => {
  authStore.logOut();
};
</script>

<template>
  <el-scrollbar height="100%">
    <el-menu
      class="layout-menu"
      :collapse="cookieStore.isOpenMenu">
      <el-menu-item
        v-for="item in variableStore.list[authStore.role]"
        :key="item.path"
        :index="item.path"
        :class="{ isActive: activeMenu(item.path) }"
        @click="handleClickMenu(item.path, 'main')">
        <el-icon style="margin-right: 12px !important"
          ><Svg :name="item.icon"
        /></el-icon>
        <template #title>{{ item.title }}</template>
      </el-menu-item>
    </el-menu>
  </el-scrollbar>
  <div class="layout-footer">
    <el-menu
      class="layout-menu"
      :collapse="cookieStore.isOpenMenu">
      <el-menu-item
        style="display: flex; justify-content: center; margin-bottom: 20px"
        index="/cabinet/admin/logout"
        @click="userLogOut">
        <el-icon
          ><Svg
            name="exit"
            class="stroke"
        /></el-icon>
        <template #title>Выйти</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>
