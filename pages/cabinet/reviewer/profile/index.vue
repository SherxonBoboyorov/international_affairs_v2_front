<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";

import { nextTick, onMounted, reactive, ref } from "vue";

// Store va turlar (Sizning loyihangizga mos)
const authStore = useAuthStore();

const requirementsScientificActivity = ref<RequirementsScientificActivity[]>(
  []
);

const ruleFormRef = ref<FormInstance>();
const loading = ref<boolean>(false);
const isChangePasswordVisible = ref<boolean>(false);

// 1. Form ma'lumotlari
const ruleForm = reactive({
  academic_degree: "",
  diploma_issued_by: "",
  email: "",
  institutional_phone: "",
  name: "",
  orcid: "",
  position: "",
  science_field_id: "",
  work_place: "",
});

// 2. Disabled holatlari
const isDisabledForm = reactive({
  academic_degree: true,
  diploma_issued_by: true,
  email: true,
  institutional_phone: true,
  name: true,
  orcid: true,
  position: true,
  science_field_id: true,
  work_place: true,
});

// 3. Validatsiya qoidalari (Barchasi saqlab qolindi)
const rules = reactive<FormRules>({
  academic_degree: [
    {
      message: "Поле обязательно к заполнению",
      required: true,
      trigger: "blur",
    },
  ],
  diploma_issued_by: [
    {
      message: "Поле обязательно к заполнению",
      required: true,
      trigger: "blur",
    },
  ],
  email: [
    {
      message: "Поле обязательно к заполнению",
      required: true,
      trigger: "blur",
    },
    { message: "Поле должно быть email", trigger: "blur", type: "email" },
  ],
  institutional_phone: [
    {
      message: "Поле обязательно к заполнению",
      required: true,
      trigger: "blur",
    },
  ],
  name: [
    {
      message: "Поле обязательно к заполнению",
      required: true,
      trigger: "blur",
    },
  ],
  orcid: [
    {
      message: "Поле обязательно к заполнению",
      required: true,
      trigger: "blur",
    },
  ],
  position: [
    {
      message: "Поле обязательно к заполнению",
      required: true,
      trigger: "blur",
    },
  ],
  science_field_id: [
    {
      message: "Поле обязательно к заполнению",
      required: true,
      trigger: "blur",
    },
  ],
  work_place: [
    {
      message: "Поле обязательно к заполнению",
      required: true,
      trigger: "blur",
    },
  ],
});

// 4. Inputni aktivlashtirish va fokus qilish funksiyasi
const activateField = async (field: keyof typeof isDisabledForm) => {
  if (isDisabledForm[field]) {
    isDisabledForm[field] = false;
    await nextTick();

    // El-input ichidagi haqiqiy input elementini topish va fokus berish
    const inputWrapper = document.querySelector(`[data-field="${field}"]`);
    const innerInput =
      inputWrapper?.querySelector("input") ||
      inputWrapper?.querySelector("textarea");
    if (innerInput instanceof HTMLElement) {
      innerInput.focus();
    }
  }
};

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  loading.value = true;
  try {
    await formEl.validate();
    const formData = new FormData();
    Object.keys(ruleForm).forEach((key) => {
      formData.append(key, (ruleForm as any)[key]);
    });

    const { status } = await authStore.register(formData);
    if (status) {
      messageMeneger(
        "Вы успешно зарегистрировались. Вам необходимо получить одобрение главного редактора.",
        "success",
        6000
      );
      formEl.resetFields();
      // Reset disabled states
      Object.keys(isDisabledForm).forEach(
        (key) => ((isDisabledForm as Record<string, boolean>)[key] = true)
      );
    }
  } catch (error) {
    console.error("Form validation error:", error);
  } finally {
    loading.value = false;
  }
};

const toggleDisableAllFields = () => {
  Object.keys(isDisabledForm).forEach(
    (key) =>
      ((isDisabledForm as Record<string, boolean>)[key] = !(
        isDisabledForm as Record<string, boolean>
      )[key])
  );
};

const isAllFieldDisabled = computed(() => {
  return Object.values(isDisabledForm).every((value) => value);
});

onMounted(async () => {
  const response: { data: RegisterPayload; status: boolean } =
    await GET<RegisterPayload>("profile/get");
  if (response.status) {
    ruleForm.academic_degree = response.data.academic_degree;
    ruleForm.diploma_issued_by = response.data.diploma_issued_by;
    ruleForm.email = response.data.email;
    ruleForm.institutional_phone = response.data.institutional_phone;
    ruleForm.name = response.data.name;
    ruleForm.orcid = response.data.orcid;
    ruleForm.position = response.data.position;
    ruleForm.science_field_id = response.data.science_field_id || "";
    ruleForm.work_place = response.data.work_place;
  }
  const { data, status } = await GET<RequirementsScientificActivity[]>(
    "requirements/scientific-activity"
  );
  if (status && data) {
    requirementsScientificActivity.value = data;
  }
});
</script>

<template>
  <div class="page">
    <div class="bg-white large mb-24">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        class="demo-ruleForm"
        status-icon
        @keyup.enter="submitForm(ruleFormRef)">
        <el-form-item prop="name">
          <div
            :class="['input-wrapper', { 'is-disabled': isDisabledForm.name }]"
            data-field="name"
            @click="activateField('name')">
            <el-input
              v-model="ruleForm.name"
              :disabled="isDisabledForm.name"
              placeholder="ФИО">
              <template #suffix>
                <Svg name="enable-input" />
              </template>
            </el-input>
          </div>
        </el-form-item>

        <el-form-item prop="email">
          <div
            :class="['input-wrapper', { 'is-disabled': isDisabledForm.email }]"
            data-field="email"
            @click="activateField('email')">
            <el-input
              v-model="ruleForm.email"
              :disabled="isDisabledForm.email"
              placeholder="Институциональный Email">
              <template #suffix>
                <Svg name="enable-input" />
              </template>
            </el-input>
          </div>
        </el-form-item>

        <el-form-item prop="institutional_phone">
          <div
            :class="[
              'input-wrapper',
              { 'is-disabled': isDisabledForm.institutional_phone },
            ]"
            data-field="institutional_phone"
            @click="activateField('institutional_phone')">
            <el-input
              v-model="ruleForm.institutional_phone"
              :disabled="isDisabledForm.institutional_phone"
              placeholder="Институциональный номер телефона">
              <template #suffix>
                <Svg name="enable-input" />
              </template>
            </el-input>
          </div>
        </el-form-item>

        <el-form-item prop="academic_degree">
          <div
            :class="[
              'input-wrapper',
              { 'is-disabled': isDisabledForm.academic_degree },
            ]"
            data-field="academic_degree"
            @click="activateField('academic_degree')">
            <el-input
              v-model="ruleForm.academic_degree"
              :disabled="isDisabledForm.academic_degree"
              placeholder="Ученая степень">
              <template #suffix>
                <Svg name="enable-input" />
              </template>
            </el-input>
          </div>
        </el-form-item>

        <el-form-item prop="work_place">
          <div
            :class="[
              'input-wrapper',
              { 'is-disabled': isDisabledForm.work_place },
            ]"
            data-field="work_place"
            @click="activateField('work_place')">
            <el-input
              v-model="ruleForm.work_place"
              :disabled="isDisabledForm.work_place"
              placeholder="Место работы">
              <template #suffix>
                <Svg name="enable-input" />
              </template>
            </el-input>
          </div>
        </el-form-item>

        <el-form-item prop="position">
          <div
            :class="[
              'input-wrapper',
              { 'is-disabled': isDisabledForm.position },
            ]"
            data-field="position"
            @click="activateField('position')">
            <el-input
              v-model="ruleForm.position"
              :disabled="isDisabledForm.position"
              placeholder="Должность">
              <template #suffix>
                <Svg name="enable-input" />
              </template>
            </el-input>
          </div>
        </el-form-item>

        <el-form-item
          v-if="requirementsScientificActivity.length > 0"
          prop="science_field_id">
          <div
            :class="[
              'input-wrapper',
              { 'is-disabled': isDisabledForm.science_field_id },
            ]"
            data-field="science_field_id"
            @click="activateField('science_field_id')">
            <el-select
              v-model="ruleForm.science_field_id"
              :disabled="isDisabledForm.science_field_id"
              placeholder="Сфера научной деятельности">
              <el-option
                v-for="item in requirementsScientificActivity"
                :key="item.id"
                :label="activeL(item, 'title')"
                :value="item.id" />

              <template #suffix>
                <Svg name="enable-input" />
              </template>
            </el-select>
          </div>
        </el-form-item>

        <el-form-item prop="diploma_issued_by">
          <div
            :class="[
              'input-wrapper',
              { 'is-disabled': isDisabledForm.diploma_issued_by },
            ]"
            data-field="diploma_issued_by"
            @click="activateField('diploma_issued_by')">
            <el-input
              v-model="ruleForm.diploma_issued_by"
              :disabled="isDisabledForm.diploma_issued_by"
              placeholder="Кем и когда выдан диплом">
              <template #suffix>
                <Svg name="enable-input" />
              </template>
            </el-input>
          </div>
        </el-form-item>

        <el-form-item prop="orcid">
          <div
            :class="['input-wrapper', { 'is-disabled': isDisabledForm.orcid }]"
            data-field="orcid"
            @click="activateField('orcid')">
            <el-input
              v-model="ruleForm.orcid"
              :disabled="isDisabledForm.orcid"
              placeholder="ORCID">
              <template #suffix>
                <Svg name="enable-input" />
              </template>
            </el-input>
          </div>
        </el-form-item>

        <el-form-item class="mb-0">
          <el-button
            class="h-50 blue"
            :loading="loading"
            @click="
              isAllFieldDisabled
                ? toggleDisableAllFields()
                : submitForm(ruleFormRef)
            ">
            {{ isAllFieldDisabled ? "Редактировать" : "Сохранить" }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-button
      class="h-50 dark"
      @click="isChangePasswordVisible = true">
      Изменить пароль
    </el-button>

    <PopupReviewerChangePassword
      v-model:visible="isChangePasswordVisible"
      @close="isChangePasswordVisible = false" />
  </div>
</template>

<style scoped>
.input-wrapper {
  width: 100%;
}

/* Disabled holatda cursorni not-allowed qilish */
.input-wrapper.is-disabled {
  cursor: not-allowed;
}

.input-wrapper.is-disabled :deep(.el-input),
.input-wrapper.is-disabled :deep(.el-select) {
  pointer-events: none; /* Ichki elementlar clickni o'tkazib yuboradi */
}

/* Element Plus disabled stilini cursor uchun override qilish (ixtiyoriy) */
:deep(.el-input.is-disabled .el-input__inner) {
  cursor: not-allowed !important;
}

.w-full {
  width: 100%;
}
</style>
