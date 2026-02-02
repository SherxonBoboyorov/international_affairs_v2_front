<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
const emit = defineEmits<{
  (e: "cancel" | "create"): void;
}>();

const visible = defineModel<boolean>("visible", {
  default: false,
});

const loading = ref<boolean>(false);
const { t } = useI18n();
const createArticleRuleFormRef = ref<FormInstance>();
const ruleForm = reactive<CreateArticleRuleForm>({
  active: true,
  deadline: "",
  file: null,
  fio: "",
  title: "",
});

const rules = reactive<FormRules<CreateArticleRuleForm>>({
  deadline: [{ message: t("required"), required: true, trigger: "blur" }],
  file: [{ message: t("required"), required: true, trigger: "blur" }],
  fio: [{ message: t("required"), required: true, trigger: "blur" }],
  title: [{ message: t("required"), required: true, trigger: "blur" }],
});

const close = () => {
  emit("cancel");
  createArticleRuleFormRef.value?.resetFields();
};

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid) => {
    if (valid) {
      loading.value = true;
      const f = new FormData();
      const keys = Object.keys(ruleForm) as Array<keyof CreateArticleRuleForm>;
      for (const key of keys) {
        const value = ruleForm[key];
        if (key === "file" && value) {
          f.append("file", value as File);
        } else if (key === "active") {
          f.append(key, boolenToString(value) ? "1" : "0");
        } else {
          f.append(key, String(value));
        }
      }
      try {
        const { status } = await POST(`chief-editor/reviewer-articles`, f);
        if (status) {
          messageMeneger("Статья добавлена");
          loading.value = false;
          emit("create");
        }
      } catch (error) {
        console.error(error);
      } finally {
        formEl.resetFields();
        loading.value = false;
        emit("cancel");
      }
    }
  });
};
</script>

<template>
  <el-dialog
    v-model="visible"
    width="800"
    align-center
    @close="close">
    <h2>Добавить статью</h2>
    <el-form
      ref="createArticleRuleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-position="top"
      @keyup.enter="submitForm(createArticleRuleFormRef)">
      <el-row
        class="gap-20"
        :gutter="20">
        <el-col :span="24">
          <el-form-item
            prop="title"
            label="Название">
            <el-input v-model="ruleForm.title" /> </el-form-item
        ></el-col>
        <el-col :span="24">
          <el-form-item
            prop="fio"
            label="ФИО">
            <el-input v-model="ruleForm.fio" /> </el-form-item
        ></el-col>
        <el-col :span="24">
          <el-form-item
            prop="deadline"
            label="Срок выполнения">
            <Provider>
              <el-date-picker
                v-model="ruleForm.deadline"
                class="mr-20"
                :first-day-of-week="1"
                type="date"
                format="DD.MM.YYYY"
                value-format="DD.MM.YYYY"
                clearable
                placeholder="Выберите дату" />
            </Provider> </el-form-item
        ></el-col>

        <el-col :span="24">
          <el-form-item
            prop="file"
            label="Файл документа">
            <CustomUploader
              v-if="visible"
              class="w-full"
              is-drag
              :accept-format="[
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
              ]"
              :max-size="10"
              @click.stop
              @update:files="
                (files) => (ruleForm.file = files)
              " /> </el-form-item
        ></el-col>
      </el-row>
    </el-form>
    <el-button
      class="dark w-full mt-24"
      :loading="loading"
      @click="submitForm(createArticleRuleFormRef)">
      Сохранить
    </el-button>
  </el-dialog>
</template>
