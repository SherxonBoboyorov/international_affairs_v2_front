<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
const emit = defineEmits(["cancel", "create"]);
const visible = defineModel("visible", {
  default: false,
  type: Boolean,
});
const { t } = useI18n();
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<{ reason: string }>({
  reason: "",
});

const rules = reactive<FormRules>({
  reason: [{ message: t("required"), required: true, trigger: "blur" }],
});

const close = () => {
  emit("cancel");
  ruleFormRef.value?.resetFields();
};

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate();
  emit("create", ruleForm.reason);
};
</script>

<template>
  <el-dialog
    v-model="visible"
    width="880"
    align-center
    @close="close">
    <h2>Архивирование рецензента</h2>
    <p class="m-0">Вы уверены, что хотите архивирование рецензента?</p>
    <p class="mb-20 mt-0">
      Это отменит все текущие назначения и закроет доступ к кабинету.
    </p>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-position="top"
      @keyup.enter="submitForm(ruleFormRef)">
      <el-row
        class="gap-20"
        :gutter="20">
        <el-col :span="24">
          <el-form-item
            prop="reason"
            label="Причина отклонения">
            <el-input v-model="ruleForm.reason" /> </el-form-item
        ></el-col>
      </el-row>
    </el-form>
    <div class="d-flex w-full between mt-24">
      <el-button
        class="grey"
        @click="emit('cancel')">
        Отмена</el-button
      >
      <el-button
        class="dark"
        @click="submitForm(ruleFormRef)">
        Архивирование</el-button
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
