<script setup>
const cookieStore = useCookiesStore();
const switchLocalePath = useSwitchLocalePath();
const allLangs = reactive([
  {
    code: "uz",
    name: "Uzbek",
  },
  {
    code: "ru",
    name: "Русский",
  },
  {
    code: "en",
    name: "English",
  },
]);
</script>

<template>
  <div class="my-style">
    <el-container>
      <!-- <el-header :class="cookieStore.isOpenMenu ? 'mini-menu' : ''">
        <LayoutsHeader />
      </el-header> -->
      <el-container :style="`height: 100vh`">
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
            <div
              style="
                position: absolute;
                top: 20px;
                right: 20px;
                display: flex;
                gap: 10px;
                align-items: center;
              ">
              <el-dropdown
                placement="bottom-end"
                class="custom"
                popper-class="custom-dropdown"
                trigger="click">
                <el-button>
                  <Svg
                    name="lang"
                    class="mr-0"
                    style="width: 24px; height: 24px" />
                  {{ $i18n.locale }}
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <template
                      v-for="lang in allLangs"
                      :key="lang.code">
                      <el-dropdown-item
                        v-if="lang.code !== $i18n.locale"
                        :class="{ active: $i18n.locale === lang.code }"
                        ><nuxt-link :to="switchLocalePath(lang.code)">
                          {{ lang.name }}</nuxt-link
                        ></el-dropdown-item
                      >
                    </template>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
              <el-badge
                :value="4"
                class="item">
                <el-button class="">
                  <Svg
                    name="notification"
                    class="mr-0"
                /></el-button>
              </el-badge>
            </div>
            <NuxtPage />
          </el-main>
        </el-scrollbar>
      </el-container>
    </el-container>
  </div>
</template>
