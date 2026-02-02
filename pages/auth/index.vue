<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
const variebleStore = useVariebleStore();
const authStore = useAuthStore();
const requirementsScientificActivity = ref<RequirementsScientificActivity[]>(
  []
);
definePageMeta({
  layout: "auth",
});

// Formaning referensi va holati
const ruleFormRef = ref<FormInstance>();
const loading = ref<boolean>(false);
const isAuthType = ref<
  | "forgot-password"
  | "login"
  | "register"
  | "reset-password"
  | "verify-reset-code"
>("login");

// Login formasi ma'lumotlari
const ruleForm = reactive({
  academic_degree: "",
  code: "",
  diploma_file: "",
  diploma_issued_by: "",
  email: "",
  institutional_phone: "",
  name: "",
  orcid: "",
  password: "",
  password_repeat: "",
  position: "",
  science_field_id: "",
  work_place: "",
});

const rules = reactive<FormRules>({
  academic_degree: [
    {
      message: "Поле обязательно к заполнению",
      required: true,
      trigger: "blur",
    },
  ],
  // verify-reset-code
  code: [
    {
      message: "Поле обязательно к заполнению",
      required: true,
      trigger: "blur",
    },
  ],
  diploma_file: [
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
  // login rules
  email: [
    {
      message: "Поле обязательно к заполнению",
      required: true,
      trigger: "blur",
    },
    {
      message: "Поле должно быть email",
      trigger: "blur",
      type: "email",
    },
  ],
  institutional_phone: [
    {
      message: "Поле обязательно к заполнению",
      required: true,
      trigger: "blur",
    },
  ],
  // register rules
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
  password: [
    {
      message: "Поле обязательно к заполнению",
      required: true,
      trigger: "blur",
    },
  ],
  password_repeat: [
    {
      message: "Поле обязательно к заполнению",
      required: true,
      trigger: "blur",
    },
    {
      trigger: "blur",
      validator: (rule: any, value: any, callback: any) => {
        if (value !== ruleForm.password) {
          callback(new Error("Пароли не совпадают"));
        } else {
          callback();
        }
      },
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

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  loading.value = true;
  try {
    await formEl.validate();
    if (isAuthType.value === "login") {
      const { role, status } = await authStore.login(ruleForm);
      if (status && role) {
        loading.value = false;
        const targetPath = (variebleStore.list as any)[role]?.[0]?.path;
        if (targetPath) {
          navigateTo(targetPath);
        }
      }
    } else if (isAuthType.value === "register") {
      const formData = new FormData();
      formData.append("name", ruleForm.name);
      formData.append("email", ruleForm.email);
      formData.append("password", ruleForm.password);
      formData.append("institutional_phone", ruleForm.institutional_phone);
      formData.append("academic_degree", ruleForm.academic_degree);
      formData.append("work_place", ruleForm.work_place);
      formData.append("position", ruleForm.position);
      formData.append("diploma_file", ruleForm.diploma_file);
      formData.append("science_field_id", ruleForm.science_field_id);
      formData.append("diploma_issued_by", ruleForm.diploma_issued_by);
      formData.append("orcid", ruleForm.orcid);
      const { status } = await authStore.register(formData);
      if (status) {
        messageMeneger(
          "Вы успешно зарегистрировались. Вам необходимо получить одобрение главного редактора.",
          "success",
          6000
        );
        formEl.resetFields();
        isAuthType.value = "login";
      }
    } else if (isAuthType.value === "forgot-password") {
      const { status } = await authStore.forgotPassword(ruleForm);
      if (status) {
        messageMeneger(
          "Код отправлен на вашу электронную почту",
          "success",
          6000
        );
        isAuthType.value = "verify-reset-code";
      }
    } else if (isAuthType.value === "verify-reset-code") {
      const payload = {
        code: ruleForm.code,
        email: ruleForm.email,
      };
      const { status } = await authStore.verifyResetCode(payload);
      if (status) {
        messageMeneger("Код подтвержден", "success", 6000);
        isAuthType.value = "reset-password";
      }
    } else if (isAuthType.value === "reset-password") {
      const payload = {
        email: ruleForm.email,
        password: ruleForm.password,
        reset_token: ruleForm.code,
      };
      const { status } = await authStore.resetPassword(payload);
      if (status) {
        messageMeneger("Пароль успешно изменен", "success", 6000);
        formEl.resetFields();
        isAuthType.value = "login";
      }
    }
  } catch (error) {
    console.error("Form validation error:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  const { data, status } = await GET<RequirementsScientificActivity[]>(
    "requirements/scientific-activity"
  );
  if (status && data) {
    requirementsScientificActivity.value = data;
  }
});
</script>

<template>
  <div class="auth">
    <div class="auth-body">
      <div class="auth-body-form">
        <h2>
          {{
            isAuthType === "login"
              ? "Вход"
              : isAuthType === "register"
                ? "Регистрация"
                : "Восстановление пароля"
          }}
        </h2>
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          class="demo-ruleForm"
          status-icon
          @keyup.enter="submitForm(ruleFormRef)">
          <template v-if="isAuthType === 'login'">
            <el-form-item prop="email">
              <el-input
                v-model="ruleForm.email"
                placeholder="Email" />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="ruleForm.password"
                type="password"
                show-password
                placeholder="Пароль" />
            </el-form-item>
          </template>
          <template v-if="isAuthType === 'register'">
            <el-form-item prop="name">
              <el-input
                v-model="ruleForm.name"
                placeholder="ФИО" />
            </el-form-item>
            <el-form-item prop="email">
              <el-input
                v-model="ruleForm.email"
                placeholder="Институциональный Email" />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="ruleForm.password"
                type="password"
                show-password
                placeholder="Пароль" />
            </el-form-item>
            <el-form-item prop="password_repeat">
              <el-input
                v-model="ruleForm.password_repeat"
                type="password"
                show-password
                placeholder="Пароль повторно" />
            </el-form-item>
            <el-form-item prop="institutional_phone">
              <el-input
                v-model="ruleForm.institutional_phone"
                placeholder="Институциональный номер телефона" />
            </el-form-item>

            <el-form-item prop="academic_degree">
              <el-input
                v-model="ruleForm.academic_degree"
                placeholder="Ученая степень" />
            </el-form-item>

            <el-form-item prop="work_place">
              <el-input
                v-model="ruleForm.work_place"
                placeholder="Место работы" />
            </el-form-item>
            <el-form-item prop="position">
              <el-input
                v-model="ruleForm.position"
                placeholder="Должность" />
            </el-form-item>
            <el-form-item prop="science_field_id">
              <el-select
                v-model="ruleForm.science_field_id"
                placeholder="Сфера научной деятельности">
                <el-option
                  v-for="item in requirementsScientificActivity"
                  :key="item.id"
                  :label="activeL(item, 'title')"
                  :value="item.id" />
              </el-select>
            </el-form-item>
            <el-form-item prop="diploma_file">
              <h4
                style="
                  margin-bottom: 10px;
                  font-size: 16px;
                  font-weight: 500;
                  line-height: 20px;
                ">
                Копия диплома подтверждающего ученную степень
              </h4>
              <!-- accept-format="["pdf","doc","docx"]" -->
              <CustomUploader
                button-type="default"
                class="w-full"
                button-text="Выбрать файл"
                :accept-format="[
                  'application/pdf',
                  'application/msword',
                  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                ]"
                @click.stop
                @update:files="(files) => (ruleForm.diploma_file = files)" />
            </el-form-item>
            <el-form-item prop="diploma_issued_by">
              <el-input
                v-model="ruleForm.diploma_issued_by"
                placeholder="Кем и когда выдан диплом" />
            </el-form-item>
            <el-form-item prop="orcid">
              <el-input
                v-model="ruleForm.orcid"
                placeholder="ORCID" />
            </el-form-item>
          </template>
          <template v-if="isAuthType === 'forgot-password'">
            <el-form-item prop="email">
              <el-input
                v-model="ruleForm.email"
                placeholder="Email" /> </el-form-item
          ></template>
          <template v-if="isAuthType === 'verify-reset-code'">
            <el-form-item prop="code">
              <el-input
                v-model="ruleForm.code"
                placeholder="Код" /> </el-form-item
          ></template>
          <template v-if="isAuthType === 'reset-password'">
            <el-form-item prop="email">
              <el-input
                v-model="ruleForm.email"
                placeholder="Email" />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="ruleForm.password"
                type="password"
                show-password
                placeholder="Пароль" />
            </el-form-item>
            <el-form-item prop="password_repeat">
              <el-input
                v-model="ruleForm.password_repeat"
                type="password"
                show-password
                placeholder="Пароль повторно" />
            </el-form-item>
          </template>
          <el-form-item class="mb-0">
            <el-button
              class="h-50 w-full dark"
              :loading="loading"
              @click="submitForm(ruleFormRef)">
              {{ isAuthType === "login" ? "Войти" : "Зарегистрироваться" }}
              <Svg
                name="log-in"
                class="ml-8" />
            </el-button>
          </el-form-item>
          <div class="d-flex between mt-40">
            <h3
              v-if="isAuthType === 'login'"
              class="pointer m-0"
              @click="isAuthType = 'register'">
              Регистрация
            </h3>
            <h3
              v-if="
                isAuthType === 'register' ||
                isAuthType === 'verify-reset-code' ||
                isAuthType === 'reset-password' ||
                isAuthType === 'forgot-password'
              "
              class="pointer m-0"
              @click="isAuthType = 'login'">
              Войти
            </h3>
            <h3
              v-if="
                isAuthType === 'login' ||
                isAuthType === 'register' ||
                isAuthType === 'reset-password'
              "
              class="pointer m-0"
              @click="isAuthType = 'forgot-password'">
              Забыли пароль?
            </h3>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
