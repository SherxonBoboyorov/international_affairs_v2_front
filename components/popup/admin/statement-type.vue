<script setup>
import { Check, Close } from "@element-plus/icons-vue";
const emit = defineEmits(["cancel", "create"]);
const visible = defineModel("visible", {
  default: false,
  type: Boolean,
});
const id = defineModel("id", {
  default: null,
  type: Number,
});
const loading = ref(false);
const { t } = useI18n();
const ruleFormRef = ref();
const ruleForm = reactive({
  active: true,
  template_document: {},
  title_en: "",
  title_ru: "",
  title_uz: "",
});

const rules = reactive({
  title_en: [{ message: t("required"), required: true, trigger: "blur" }],
  title_ru: [{ message: t("required"), required: true, trigger: "blur" }],
  title_uz: [{ message: t("required"), required: true, trigger: "blur" }],
});

watch(id, async () => {
  if (id.value) {
    const { data } = await GET(`admin/statement-type/${id.value}`);
    ruleForm.title_uz = data.title_uz;
    ruleForm.title_ru = data.title_ru;
    ruleForm.title_en = data.title_en;
    ruleForm.active = boolenToString(data.active);
    ruleForm.template_document = null;
  }
});

const close = () => {
  emit("cancel");
  ruleFormRef.value?.resetFields();
};

const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate();
  loading.value = true;
  const f = new FormData();
  for (const key in ruleForm) {
    if (key === "template_document") {
      // multiple files
      // ruleForm.template_document.forEach((file, index) => {
      //   f.append(`template_document[${index}]`, file);
      // });

      // single file
      f.append("template_document", ruleForm.template_document);
    } else if (key === "active") {
      f.append(key, boolenToString(ruleForm[key]) ? 1 : 0);
    } else {
      f.append(key, ruleForm[key]);
    }
  }
  if (id.value) {
    f.append("_method", "PUT");
    if (ruleForm.template_document === null) {
      f.delete("template_document");
    }
    const { status } = await POST(`admin/statement-type/${id.value}`, f);
    if (status) {
      messageMeneger("Тип заявления обновлен");
      loading.value = false;
      emit("create");
    }
  } else {
    const { status } = await POST(`admin/statement-type`, f);
    if (status) {
      messageMeneger("Тип заявления создан");
      loading.value = false;
      emit("create");
    }
  }
  formEl.resetFields();
  loading.value = false;
  emit("cancel");
};
</script>

<template>
  <el-dialog
    v-model="visible"
    width="500"
    align-center
    @close="close">
    <h2>Новый заявления</h2>
    <p class="mb-20 mt-4">Создание нового пользователя в системе</p>
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
            prop="title_uz"
            label="Название UZ">
            <el-input v-model="ruleForm.title_uz" /> </el-form-item
        ></el-col>
        <el-col :span="24">
          <el-form-item
            prop="title_ru"
            label="Название RU">
            <el-input v-model="ruleForm.title_ru" /> </el-form-item
        ></el-col>
        <el-col :span="24">
          <el-form-item
            prop="title_en"
            label="Название EN">
            <el-input v-model="ruleForm.title_en" /> </el-form-item
        ></el-col>
        <el-col :span="24">
          <el-form-item
            label="Активность"
            prop="active">
            <el-switch
              v-model="ruleForm.active"
              :active-icon="Check"
              :inactive-icon="Close"
              inline-prompt />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            prop="template_document"
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
                (files) => (ruleForm.template_document = files)
              " /> </el-form-item
        ></el-col>
      </el-row>
    </el-form>
    <el-button
      class="black w-full mt-24"
      :loading="loading"
      @click="submitForm(ruleFormRef)">
      Сохранить</el-button
    >
  </el-dialog>
</template>
