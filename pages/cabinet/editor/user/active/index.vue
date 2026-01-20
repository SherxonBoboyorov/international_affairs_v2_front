<script setup>
const router = useRouter();
const role = ref("");
const search = ref("");
const loading = ref(true);
const list = ref([]);
const pagination = reactive({
  current: 1,
  size: 5,
  total: 0,
});
const sorting = reactive({
  date: "asc",
  status: "",
});
const statusList = ref([
  { label: "Активен", value: "active" },
  { label: "Не активен", value: "inactive" },
]);

// watch(search, async (currentValue) => {
//   pagination.current = 1;
//   if (currentValue === "") await fetchList();
// });

// watch(role, async (currentValue) => {
//   pagination.current = 1;
//   fetchList();
// });

const fetchList = async () => {
  loading.value = true;
  const params = {
    page: pagination.current,
    phrase: search.value,
    role: role.value,
  };
  const { data } = await GET(`admin/article`, params);
  const { total_count, users } = data;
  list.value = users.data;
  pagination.size = users.per_page;
  pagination.total = total_count;
  loading.value = false;
};

const fakeDataList = ref([
  {
    author: "Хамидов Бахтияр",
    endDate: "12.12.2022",
    id: 1,
    name: "Lorem ipsum dolor sit amet",
    startDate: "12.12.2022",
    status: "Статус",
  },
  {
    author: "Хамидов Бахтияр",
    endDate: "12.12.2022",
    id: 2,
    name: "Lorem ipsum dolor sit amet",
    startDate: "12.12.2022",
    status: "Статус",
  },
  {
    author: "Хамидов Бахтияр",
    endDate: "12.12.2022",
    id: 3,
    name: "Lorem ipsum dolor sit amet",
    startDate: "12.12.2022",
    status: "Статус",
  },
  {
    author: "Хамидов Бахтияр",
    endDate: "12.12.2022",
    id: 4,
    name: "Lorem ipsum dolor sit amet",
    startDate: "12.12.2022",
    status: "Статус",
  },
  {
    author: "Хамидов Бахтияр",
    endDate: "12.12.2022",
    id: 5,
    name: "Lorem ipsum dolor sit amet",
    startDate: "12.12.2022",
    status: "Статус",
  },
  {
    author: "Хамидов Бахтияр",
    endDate: "12.12.2022",
    id: 6,
    name: "Lorem ipsum dolor sit amet",
    startDate: "12.12.2022",
    status: "Статус",
  },
  {
    author: "Хамидов Бахтияр",
    endDate: "12.12.2022",
    id: 7,
    name: "Lorem ipsum dolor sit amet",
    startDate: "12.12.2022",
    status: "Статус",
  },
]);

// const removeItem = async (id) => {
//   await DELETE(`admin/article/${id}`);
//   messageMeneger("Пользователь удален");
//   await fetchList();
// };

onMounted(async () => {
  await fetchList();
});
</script>

<template>
  <div class="page">
    <div class="d-flex mb-30 between">
      <el-button
        class="h-50 blue"
        @click.prevent="router.push('/cabinet/admin/user/active/create')">
        Добавить статью
        <Svg
          class="ml-8"
          name="add" />
      </el-button>
    </div>
    <div class="bg-white large d-flex gap-12 mb-30">
      <el-select
        v-model="sorting.status"
        class="mr-20"
        placeholder="Выберите статус">
        <el-option
          v-for="(item, index) in statusList"
          :key="index"
          :label="item.label"
          :value="item.value" />
      </el-select>
      <Provider>
        <el-date-picker
          v-model="sorting.date"
          class="mr-20"
          :first-day-of-week="1"
          type="date"
          format="DD.MM.YYYY"
          value-format="DD.MM.YYYY"
          placeholder="Выберите дату"
      /></Provider>
      <el-button
        class="h-50 dark"
        @click.prevent="fetchList">
        Применить
      </el-button>
    </div>
    <!-- <Provider :isServer="true"> -->
    <LoaderBox
      :loading="loading"
      :is-empty="fakeDataList.length === 0">
      <div class="bg-white">
        <el-table
          :data="fakeDataList"
          highlight-current-row
          border
          stripe>
          <el-table-column
            fixed
            prop="name"
            label="Название статьи"
            show-overflow-tooltip />
          <el-table-column
            prop="author"
            label="Имя автора" />
          <el-table-column
            prop="status"
            label="Статус" />
          <el-table-column
            prop="startDate"
            label="Дата начала" />
          <el-table-column
            prop="endDate"
            label="Дата окончания" />

          <el-table-column
            fixed="right"
            label="Действие"
            width="280">
            <template #default>
              <el-button class="blue"> Назначить рецензентов </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-if="pagination.total > pagination.size"
          v-model:current-page="pagination.current"
          background
          layout="prev, pager, next"
          :page-size="pagination.size"
          :total="pagination.total"
          @current-change="fetchList" />
      </div>
    </LoaderBox>
    <!-- </Provider> -->
  </div>
</template>
