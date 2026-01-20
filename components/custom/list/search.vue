<script setup lang="ts">
/**
 * Qidiruv komponenti
 */
const value = defineModel<string>("search");
const loading = defineModel<boolean>("loading");
const emit = defineEmits(["submit"]);

interface Props {
  placeholder?: string;
}

withDefaults(defineProps<Props>(), {
  placeholder: "Поиск",
});
</script>

<template>
  <div class="bg-white medium d-flex mb-30">
    <el-input
      v-model="value"
      class="w-full"
      :placeholder="placeholder"
      suffix-icon="el-icon-search"
      @keyup.enter="emit('submit')" />
    <el-button
      :loading="loading"
      type="primary"
      class="ml-20"
      @click.prevent="emit('submit')">
      <Svg
        class="mr-0"
        name="search"
    /></el-button>
  </div>
</template>
