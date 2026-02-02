<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
const route = useRoute();
const onChangeParam = route.params.onChange as string;
const emit = defineEmits<{
  (e: "cancel" | "create"): void;
}>();
const visible = defineModel<boolean>("visible", {
  default: false,
  type: Boolean,
});
const { t } = useI18n();
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<{
  deadline: string;
  description: string;
  reviewers: number[];
}>({
  deadline: "",
  description: "",
  reviewers: [],
});

const reviewers = ref<
  {
    id: number;
    name: string;
  }[]
>([]);

const rules = reactive<
  FormRules<{
    deadline: string;
    description: string;
    reviewers: number[];
  }>
>({
  deadline: [{ message: t("required"), required: true, trigger: "blur" }],
  description: [{ message: t("required"), required: true, trigger: "blur" }],
  reviewers: [{ message: t("required"), required: true, trigger: "blur" }],
});

const close = () => {
  emit("cancel");
  ruleFormRef.value?.resetFields();
};

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate();
  const { status }: { status: boolean } = await POST<{
    deadline: string;
    description: string;
    reviewers: number[];
  }>(
    `chief-editor/reviewer-articles/${onChangeParam}/send-to-reviewers`,
    ruleForm
  );
  if (status) {
    emit("create");
  }
};

onMounted(async () => {
  const { data } = await GET<
    {
      id: number;
      name: string;
    }[]
  >(`chief-editor/reviewer-articles/${onChangeParam}/available-reviewers`);
  reviewers.value = data;
});
</script>

<template>
  <el-dialog
    v-model="visible"
    width="880"
    align-center
    @close="close">
    <h2>Назначение рецензентов</h2>
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
            prop="reviewers"
            label="Выберите рецензентов">
            <el-select
              v-model="ruleForm.reviewers"
              filterable
              remote
              multiple
              placeholder="Поиск рецензента">
              <el-option
                v-for="reviewer in reviewers"
                :key="reviewer.id"
                :label="reviewer.name"
                :value="reviewer.id" />
            </el-select> </el-form-item
        ></el-col>
        <el-col :span="24">
          <el-form-item
            prop="deadline"
            label="Срок выполнения">
            <Provider>
              <el-date-picker
                v-model="ruleForm.deadline"
                :first-day-of-week="1"
                type="date"
                format="DD.MM.YYYY"
                value-format="YYYY-MM-DD"
                clearable
                placeholder="Выберите дату" />
            </Provider>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            prop="description"
            label="Описание">
            <el-input
              v-model="ruleForm.description"
              type="textarea"
              :rows="4" /> </el-form-item
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
        Назначить</el-button
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
