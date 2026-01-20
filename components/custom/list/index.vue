<script setup lang="ts">
/**
 * Maxsus jadval (list) komponenti
 */
interface Header {
  class?: string;
  colspan?: number;
  index?: boolean;
  title?: string;
}

interface Props {
  headers?: Header[];
}

withDefaults(defineProps<Props>(), {
  headers: () => [],
});
</script>

<template>
  <div class="custom-list">
    <table>
      <thead>
        <tr>
          <th
            v-for="(header, index) in headers"
            :key="index"
            :colspan="header.colspan"
            :width="header.index ? '1%' : ''"
            :class="header.class">
            {{ header.index ? "№" : header.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <slot />
      </tbody>
    </table>
  </div>
</template>

<style lang="scss"></style>
