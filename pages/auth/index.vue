<script setup>
const variebleStore = useVariebleStore();
const authStore = useAuthStore();
definePageMeta({
  layout: "auth",
});

const ruleFormRef = ref();
const loading = ref(false);
const ruleForm = reactive({
  name: "",
  password: "",
});

const rules = reactive({
  name: [
    {
      message: "Поле обязательно к заполнению",
      required: true,
      trigger: "blur",
    },
    // { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
  ],
  password: [
    {
      message: "Поле обязательно к заполнению",
      required: true,
      trigger: "blur",
    },
    // { min: 6, max: 10, message: "Length should be 6 to 10", trigger: "blur" },
  ],
});

const submitForm = async (formEl) => {
  if (!formEl) return;
  loading.value = true;
  await formEl.validate();
  const { role, status } = await authStore.signIn(ruleForm);
  if (status && role) {
    loading.value = false;
    navigateTo(variebleStore.list[role] && variebleStore.list[role][0].path);
  }
  loading.value = false;
};
</script>

<template>
  <div class="auth">
    <div class="auth-body">
      <div class="auth-body-form">
        <h2>Вход</h2>
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          class="demo-ruleForm"
          status-icon
          @keyup.enter="submitForm(ruleFormRef)">
          <el-form-item prop="name">
            <el-input
              v-model="ruleForm.name"
              placeholder="Логин" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="ruleForm.password"
              type="password"
              show-password
              placeholder="Пароль" />
          </el-form-item>
          <el-form-item class="mb-0">
            <el-button
              class="h-50 w-full dark"
              :loading="loading"
              @click="submitForm(ruleFormRef)">
              <Svg name="log-in" />
              Войти
            </el-button>
          </el-form-item>
          <h3>Забыли пароль?</h3>
          <!-- <CustomInputCurrency /> -->
        </el-form>
      </div>
    </div>
  </div>
</template>
