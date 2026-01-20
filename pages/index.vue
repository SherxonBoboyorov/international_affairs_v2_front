<script setup lang="ts">
/**
 * Asosiy sahifa - avtomatik ravishda login sahifasiga yo'naltiradi
 */
definePageMeta({
  layout: "auth",
});
const router = useRouter();
router.push("/auth");
</script>

<template>
  <div></div>
</template>
