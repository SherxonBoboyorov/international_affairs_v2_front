<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
const emit = defineEmits(["close"]);
const visible = defineModel("visible", {
  default: false,
  type: Boolean,
});
const { t } = useI18n();
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<{
  _method: string;
  current_password: string;
  password: string;
  password_confirmation: string;
}>({
  _method: "PUT",
  current_password: "",
  password: "",
  password_confirmation: "",
});

const rules = reactive<FormRules>({
  current_password: [
    { message: t("required"), required: true, trigger: "blur" },
  ],
  password: [{ message: t("required"), required: true, trigger: "blur" }],
  password_confirmation: [
    { message: t("required"), required: true, trigger: "blur" },
    {
      trigger: "blur",
      validator: (rule, value, callback) => {
        if (value !== ruleForm.password) {
          callback(new Error(t("Пароль не совпадает")));
        } else {
          callback();
        }
      },
    },
  ],
});

const close = () => {
  emit("close");
  ruleFormRef.value?.resetFields();
};

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate();
  const { status }: { status: boolean } = await POST<{
    current_password: string;
    password: string;
    password_confirmation: string;
  }>("profile/change-password", ruleForm);
  if (status) {
    messageMeneger("Пароль успешно изменен");
    close();
  } else {
    messageMeneger("Пароль не изменен", "error");
  }
};
</script>

<template>
  <el-dialog
    v-model="visible"
    width="880"
    align-center
    @close="close">
    <h2>Изменить пароль</h2>
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
            prop="current_password"
            label="Текущий пароль">
            <el-input v-model="ruleForm.current_password" /> </el-form-item
        ></el-col>
        <el-col :span="24">
          <el-form-item
            prop="password"
            label="Новый пароль">
            <el-input v-model="ruleForm.password" /> </el-form-item
        ></el-col>
        <el-col :span="24">
          <el-form-item
            prop="password_confirmation"
            label="Подтверждение пароля">
            <el-input v-model="ruleForm.password_confirmation" /> </el-form-item
        ></el-col>
      </el-row>
    </el-form>
    <div class="d-flex w-full between mt-24">
      <el-button
        class="grey"
        @click="close()">
        Отмена</el-button
      >
      <el-button
        class="dark"
        @click="submitForm(ruleFormRef)">
        Сохранить</el-button
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
</style>
