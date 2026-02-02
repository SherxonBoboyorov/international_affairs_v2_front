<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
const route = useRoute();
const loading = ref<boolean>(false);
const props = defineProps<{ assignments: ArticleUser[] }>();
const localAssignments = ref<
  {
    name: string;
    new_deadline: string;
    reviewer_id: number;
    status: ArticleStatus;
  }[]
>([]);
localAssignments.value =
  props.assignments.map((item) => ({
    name: item.name,
    new_deadline: item.deadline?.split("T")[0],
    reviewer_id: item.reviewer_id,
    status: item.status,
  })) || [];
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
  new_deadline: string;
}>({
  new_deadline: "",
});

const reviewers = ref<
  {
    id: number;
    name: string;
  }[]
>([]);

const rules = reactive<
  FormRules<{
    new_deadline: string;
  }>
>({
  new_deadline: [{ message: t("required"), required: true, trigger: "blur" }],
});

const close = () => {
  emit("cancel");
  ruleFormRef.value?.resetFields();
};

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate();
  loading.value = true;
  const { status }: { status: boolean } = await POST<{
    reviewers: {
      new_deadline: string;
      reviewer_id: number;
    }[];
  }>(`chief-editor/reviewer-articles/${onChangeParam}/deadline-extension`, {
    reviewers: localAssignments.value,
  });
  if (status) {
    emit("create");
  }
  loading.value = false;
};

onMounted(async () => {
  const { data } = await GET<
    {
      id: number;
      name: string;
    }[]
  >("requirements/reviewer-requirements");
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
    <pre>{{ localAssignments }}</pre>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-position="top"
      @keyup.enter="submitForm(ruleFormRef)">
      <el-row
        class="gap-20"
        :gutter="20">
        <el-col
          v-for="assignment in localAssignments"
          :key="assignment.reviewer_id"
          :span="24">
          <el-form-item
            :prop="`deadline.${assignment.reviewer_id}`"
            :label="assignment.name">
            <Provider>
              <el-date-picker
                v-model="assignment.new_deadline"
                :first-day-of-week="1"
                type="date"
                format="DD.MM.YYYY"
                value-format="YYYY-MM-DD"
                :disabled="assignment.status === 'completed'"
                clearable
                placeholder="Выберите дату" />
            </Provider>
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
        Продлить дедлайн</el-button
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
