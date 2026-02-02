<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
const emit = defineEmits<{
  (e: "cancel" | "create", comment?: string): Promise<void>;
}>();
const visible = defineModel<boolean>("visible", {
  default: false,
  type: Boolean,
});
const { t } = useI18n();
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<{ comment: string }>({
  comment: "",
});

const rules = reactive<FormRules>({
  comment: [{ message: t("required"), required: true, trigger: "blur" }],
});

const close = () => {
  emit("cancel");
  ruleFormRef.value?.resetFields();
};

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate();
  emit("create", ruleForm.comment);
};
</script>

<template>
  <el-dialog
    v-model="visible"
    width="880"
    align-center
    @close="close">
    <h2>Отказ от задания</h2>
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
            prop="comment"
            label="Причина отказа">
            <el-input v-model="ruleForm.comment" />
            <p class="m-0 mt-12">Например</p>
            <p
              class="m-0"
              style="font-weight: 700; line-height: 1">
              «Конфликт интересов», «Нехватка времени», «Не соответствует моей
              экспертизе», «Другое»
            </p>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="d-flex w-full between mt-24">
      <el-button
        class="grey p-50"
        @click="emit('cancel')">
        Отмена</el-button
      >
      <el-button
        class="dark p-50"
        @click="submitForm(ruleFormRef)">
        Отправить отказ</el-button
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
