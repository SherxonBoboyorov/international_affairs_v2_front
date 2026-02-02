<script setup lang="ts">
const router = useRouter();
const requirementsScientificActivity = ref<RequirementsScientificActivity[]>(
  []
);

// loader flag
const loading = ref<boolean>(true);

// list – bu faqat array, table shuni kutyapti
const list = ref<Reviewer[]>([]);

// pagination – faqat meta
const pagination = reactive<Pagination<Reviewer>>({
  current: 1,
  per_page: 10,
  size: 10,
  total: 0,
});

const sorting = reactive<SortingState>({
  created_at: "",
  science_field_id: "",
});

const fetchList = async () => {
  loading.value = true;

  const params: QueryParams = {
    created_at: formateDate(sorting.created_at, "-"),
    page: pagination.current,
    science_field_id: sorting.science_field_id,
  };

  // Backend javobi Pagination<Reviewer> formata deb faraz qilamiz
  const { data, status } = await GET<Pagination<Reviewer>>(
    "chief-editor/reviewers/approved",
    params
  );
  console.log(data, "dataaaa");

  if (status && data) {
    // data: Pagination<Reviewer>
    list.value = data.data || [];
    pagination.size = data.per_page;
    pagination.total = data.total;
  } else {
    messageMeneger("Ошибка", "error");
  }

  loading.value = false;
};

onMounted(async () => {
  await fetchList();
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
    <div class="bg-white large d-flex gap-12 mb-30">
      <el-select
        v-model="sorting.science_field_id"
        class="mr-20"
        placeholder="Выберите статус">
        <el-option
          label="Все"
          value="" />
        <el-option
          v-for="(item, index) in requirementsScientificActivity"
          :key="index"
          :label="activeL(item, 'title')"
          :value="item.id" />
      </el-select>

      <Provider>
        <el-date-picker
          v-model="sorting.created_at"
          class="mr-20"
          :first-day-of-week="1"
          type="date"
          format="DD.MM.YYYY"
          value-format="DD.MM.YYYY"
          clearable
          placeholder="Выберите дату" />
      </Provider>

      <el-button
        class="h-50 dark"
        @click.prevent="fetchList">
        Применить
      </el-button>
    </div>
    <LoaderBox
      :loading="loading"
      :is-empty="list.length === 0">
      <div class="bg-white">
        <el-table
          :data="list"
          highlight-current-row
          border
          stripe>
          <el-table-column
            fixed
            prop="name"
            label="ФИО"
            show-overflow-tooltip />

          <el-table-column
            fixed
            prop="email"
            label="Email"
            show-overflow-tooltip />

          <el-table-column
            fixed
            prop="work_place"
            label="Место работы"
            show-overflow-tooltip />

          <el-table-column
            fixed
            prop="position"
            label="Должность"
            show-overflow-tooltip />

          <el-table-column
            fixed
            prop="academic_degree"
            label="Ученая степень"
            show-overflow-tooltip />

          <el-table-column
            fixed
            prop="scientific_activity"
            label="Научная степень"
            show-overflow-tooltip>
            <template #default="{ row }">
              {{ activeL(row.scientific_activity, "title") }}
            </template>
          </el-table-column>

          <el-table-column
            fixed="right"
            label="Действие"
            width="230">
            <template #default="{ row }">
              <el-button
                class="blue"
                @click.prevent="
                  router.push(`/cabinet/editor/user/active/${row.id}`)
                ">
                Просмотреть детали
              </el-button>
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
  </div>
</template>
