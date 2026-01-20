<script setup>
import { Check, Close } from "@element-plus/icons-vue";

const router = useRouter();
const route = useRoute();
const ruleFormRef = ref();
const variebleStore = useVariebleStore();
const isEdit =
  route.params.onChange !== "create" &&
  !Number.isNaN(Number(route.params.onChange));
const loading = ref(true);

const ruleForm = reactive({
  active: false,
  date_of_hiring: "",
  department_id: "",
  email: "",
  given_name: "",
  job_title_id: "",
  name: "",
  password: "",
  password_confirmation: "",
  patronymic: "",
  personnel_number: "",
  role: "",
  surname: "",
});

const rules = reactive({
  date_of_hiring: [
    {
      message: "Поле обязательно к заполнению",
      required: true,
      trigger: "change",
    },
  ],
  department_id: [
    {
      message: "Поле обязательно к заполнению",
      required: true,
      trigger: "change",
    },
  ],
  email: [
    {
      message: "Поле обязательно к заполнению",
      required: true,
      trigger: "change",
    },
    { message: "Введите корректный email", trigger: "change", type: "email" },
  ],
  given_name: [
    {
      message: "Поле обязательно к заполнению",
      required: true,
      trigger: "change",
    },
  ],
  job_title_id: [
    {
      message: "Поле обязательно к заполнению",
      required: true,
      trigger: "change",
    },
  ],
  name: [
    {
      message: "Поле обязательно к заполнению",
      required: true,
      trigger: "change",
    },
  ],
  password: [
    {
      message: "Поле обязательно к заполнению",
      required: true,
      trigger: "change",
    },
  ],
  password_confirmation: [
    {
      message: "Поле обязательно к заполнению",
      required: true,
      trigger: "change",
    },
    {
      trigger: "change",
      validator: (_, value, callback) => {
        if (value !== ruleForm.password)
          callback(new Error("Пароли не совпадают"));
        else callback();
      },
    },
  ],
  patronymic: [
    {
      message: "Поле обязательно к заполнению",
      required: true,
      trigger: "change",
    },
  ],
  personnel_number: [
    {
      message: "Поле обязательно к заполнению",
      required: true,
      trigger: "change",
    },
  ],
  role: [
    {
      message: "Поле обязательно к заполнению",
      required: true,
      trigger: "change",
    },
  ],
  surname: [
    {
      message: "Поле обязательно к заполнению",
      required: true,
      trigger: "change",
    },
  ],
});

const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate();
  const payload = {
    ...ruleForm,
    active: boolenToString(ruleForm.active),
    date_of_hiring: formateDate(ruleForm.date_of_hiring, "-"),
  };

  const status = ref(false);

  if (isEdit) {
    status.value = await PUT(`admin/article/${route.params.onChange}`, payload);
  } else {
    status.value = await POST(`admin/article`, payload);
  }

  if (status.value) {
    messageMeneger(
      route.params.onChange === "create"
        ? "Пользователь создан"
        : "Пользователь обновлен"
    );
    router.push("/cabinet/admin/article");
  }
};

const departmentList = ref([]);
const jobTitleList = ref([]);
const roleList = ref([]);

onMounted(async () => {
  loading.value = true;

  const resDepartment = await GET("admin/department");
  departmentList.value = resDepartment?.data ?? [];

  const resJobTitle = await GET("admin/requirements/job-titles");
  jobTitleList.value = resJobTitle?.data ?? [];

  const resRole = await GET("admin/requirements/get-roles");
  roleList.value = resRole?.data ?? [];

  if (isEdit) {
    const userRes = await GET(`admin/article/${route.params.onChange}`);
    const user = userRes?.data?.user;

    if (user) {
      Object.keys(ruleForm).forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(user, key)) {
          ruleForm[key] = user[key] ?? ruleForm[key];
        }
      });
      ruleForm.role = user.roles[0].name;
      ruleForm.active = boolenToString(user.active);
      ruleForm.date_of_hiring = formateDate(user.date_of_hiring);
      ruleForm.password = "";
      ruleForm.password_confirmation = "";
    }
  }
  loading.value = false;
});
</script>

<template>
  <LoaderBox
    :loading="loading"
    :blur-px="30">
    <div class="page bg-white large">
      <div class="page-form-header">
        <h1 class="mb-20">
          {{
            route.params.onChange === "create"
              ? "Создание пользователя"
              : "Редактирование пользователя"
          }}
        </h1>
      </div>

      <div class="page-form-body">
        <!-- <pre>{{ ruleForm }}</pre> -->

        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-position="top"
          status-icon
          auto-complete="off">
          <el-row
            class="gap-20"
            :gutter="20">
            <el-col :span="8">
              <el-form-item
                label="Имя"
                prop="given_name">
                <el-input v-model="ruleForm.given_name" />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item
                label="Фамилия"
                prop="surname">
                <el-input v-model="ruleForm.surname" />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item
                label="Отчество"
                prop="patronymic">
                <el-input v-model="ruleForm.patronymic" />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item
                label="Логин"
                prop="name">
                <el-input v-model="ruleForm.name" />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item
                label="Пароль"
                prop="password">
                <el-input
                  v-model="ruleForm.password"
                  type="password"
                  show-password />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item
                label="Подтверждение пароля"
                prop="password_confirmation">
                <el-input
                  v-model="ruleForm.password_confirmation"
                  autocomplete="off"
                  type="password"
                  show-password />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item
                label="Роль"
                prop="role">
                <!-- <client-only> -->
                <el-select
                  v-model="ruleForm.role"
                  placeholder="Выберите роль">
                  <el-option
                    v-for="(item, index) in roleList"
                    :key="index"
                    :label="variebleStore.roles[item] ?? item"
                    :value="item" />
                </el-select>
                <!-- </client-only> -->
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item
                label="Отдел"
                prop="department_id">
                <!-- <client-only> -->
                <el-select
                  v-model="ruleForm.department_id"
                  placeholder="Выберите отдел">
                  <el-option
                    v-for="(item, index) in departmentList"
                    :key="index"
                    :label="activeL(item, 'title')"
                    :value="item.id" />
                </el-select>
                <!-- </client-only> -->
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item
                label="Должность"
                prop="job_title_id">
                <!-- <client-only> -->
                <el-select
                  v-model="ruleForm.job_title_id"
                  placeholder="Выберите должность">
                  <el-option
                    v-for="(item, index) in jobTitleList"
                    :key="index"
                    :label="activeL(item, 'title')"
                    :value="item.id" />
                </el-select>
                <!-- </client-only> -->
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item
                label="Email"
                prop="email">
                <el-input v-model="ruleForm.email" />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item
                label="Табельный номер"
                prop="personnel_number">
                <el-input v-model="ruleForm.personnel_number" />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item
                label="Дата трудоустройства"
                prop="date_of_hiring">
                <el-date-picker
                  v-model="ruleForm.date_of_hiring"
                  :first-day-of-week="1"
                  type="date"
                  format="DD.MM.YYYY"
                  value-format="DD.MM.YYYY"
                  placeholder="" />
              </el-form-item>
            </el-col>

            <el-col :span="8">
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
          </el-row>
        </el-form>
        <div class="page-form-body-hr"></div>
      </div>

      <div class="page-form-footer">
        <el-button
          class="p-50 grey"
          @click.prevent="router.go(-1)"
          >Отмена</el-button
        >
        <el-button
          class="p-50 dark"
          @click.prevent="submitForm(ruleFormRef)"
          >Сохранить</el-button
        >
      </div>
    </div>
  </LoaderBox>
</template>
