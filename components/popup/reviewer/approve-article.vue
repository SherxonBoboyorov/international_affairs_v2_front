<script setup lang="ts">
const emit = defineEmits<{
  (e: "cancel" | "create"): void;
}>();
const visible = defineModel<boolean>("visible", {
  default: false,
  type: Boolean,
});
const close = () => {
  emit("cancel");
};

const submitForm = () => {
  emit("create");
};
</script>

<template>
  <el-dialog
    v-model="visible"
    width="500"
    align-center
    @close="close">
    <h2>принятие задания</h2>
    <p class="m-0">Вы уверены, что принимаете задание?</p>
    <div class="d-flex w-full between mt-24">
      <el-button
        class="grey p-50"
        @click="emit('cancel')">
        Нет</el-button
      >
      <el-button
        class="blue p-50"
        @click="submitForm()">
        Да</el-button
      >
    </div>
  </el-dialog>
</template>

<style scoped lang="scss">
h2 {
  font-size: 30px;
  font-style: bold;
  font-weight: 700;
  line-height: 42px;
  color: rgb(136 0 25 / 100%);
  text-align: center;
  text-transform: uppercase;
}

p {
  font-size: 16px;
  font-weight: 600;
  line-height: 30px;
  color: rgb(18 54 84 / 100%);
  text-align: center;
}
</style>
