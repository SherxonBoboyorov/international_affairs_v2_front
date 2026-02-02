<script setup lang="ts">
const router = useRouter();
const loading = ref<boolean>(true);
const list = ref<Article[]>([]);
const dialogVisible = ref<boolean>(false);
const pagination = reactive<Pagination<Article>>({
  current: 1,
  per_page: 10,
  size: 10,
  total: 0,
});

const sortingTypeList = ref<
  {
    label: string;
    value: ArticleStatus;
  }[]
>([
  {
    label: "Все",
    value: null,
  },
  {
    label: "Не назначен",
    value: "not_assigned",
  },
  {
    label: "Назначен",
    value: "assigned",
  },
  {
    label: "В работе",
    value: "in_progress",
  },
  {
    label: "Завершен",
    value: "completed",
  },
  {
    label: "Отклонен",
    value: "rejected",
  },
  {
    label: "Просрочен",
    value: "overdue",
  },
]);

const sorting = reactive<SortingStateArticle>({
  created_at: "",
  status: null,
});

const fetchList = async () => {
  loading.value = true;
  dialogVisible.value = false;
  const params: QueryParams = {
    created_at: formateDate(sorting.created_at, "-"),
    page: pagination.current,
    status: sorting.status,
  };

  const { data, status } = await GET<Pagination<Article>>(
    "chief-editor/reviewer-articles",
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
});
</script>

<template>
  <div class="page">
    <div class="d-flex mb-30 between">
      <el-button
        class="h-50 blue ml-auto"
        @click="dialogVisible = true">
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
          v-for="(item, index) in sortingTypeList"
          :key="index"
          :label="item.label"
          :value="item.value || ''" />
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
            prop="title"
            label="Название"
            show-overflow-tooltip />
          <el-table-column
            fixed
            prop="fio"
            label="Ф.И.О"
            show-overflow-tooltip />
          <el-table-column
            fixed
            prop="status"
            label="Статус">
            <template #default="{ row }">
              <span
                :class="row.status"
                class="article-status">
                {{
                  row.status === "not_assigned"
                    ? "Не назначен"
                    : row.status === "assigned"
                      ? "Назначен"
                      : row.status === "in_progress"
                        ? "В работе"
                        : row.status === "completed"
                          ? "Завершен"
                          : row.status === "rejected"
                            ? "Отклонен"
                            : row.status === "overdue"
                              ? "Просрочен"
                              : ""
                }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            fixed
            prop="created_at"
            label="Дата создания"
            show-overflow-tooltip>
            <template #default="{ row }">
              {{ formateDate(row.created_at?.split("T")[0]) }}
            </template>
          </el-table-column>
          <el-table-column
            fixed
            prop="deadline"
            label="Срок выполнения"
            show-overflow-tooltip>
            <template #default="{ row }">
              {{ formateDate(row.deadline?.split("T")[0]) }}
            </template>
          </el-table-column>

          <el-table-column
            fixed="right"
            label="Действие"
            width="280">
            <template #default="{ row }">
              <el-button
                v-if="row.status === 'not_assigned'"
                class="dark w-full"
                @click.prevent="
                  router.push(`/cabinet/editor/article/${row.id}`)
                ">
                Назначить рецензентов
              </el-button>
              <el-button
                v-else
                class="blue w-full"
                @click.prevent="
                  router.push(`/cabinet/editor/article/${row.id}`)
                ">
                Просмотреть детали
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-if="pagination.total > pagination.size"
          v-model:current-page="pagination.current"
          class="mb-40"
          background
          layout="prev, pager, next"
          :page-size="pagination.size"
          :total="pagination.total"
          @current-change="fetchList" />
      </div>
    </LoaderBox>
    <PopupAdminCreateArticle
      v-model:visible="dialogVisible"
      @create="fetchList" />
  </div>
</template>
<style scoped lang="scss">
.article-status {
  position: relative;
  padding-left: 14px;

  &::after {
    position: absolute;
    top: 50%;
    left: 0;
    width: 12px;
    height: 12px;
    content: "";
    border-radius: 50%;
    transform: translateY(-50%);
  }

  &.not_assigned {
    color: #123654;

    &::after {
      background-color: #123654;
    }
  }

  &.assigned {
    color: #0e74c9;

    &::after {
      background-color: #0e74c9;
    }
  }

  &.in_progress {
    color: #880019;

    &::after {
      background-color: #880019;
    }

    &.completed {
      color: #55ae43;

      &::after {
        background-color: #55ae43;
      }
    }

    &.rejected {
      color: #f0f;

      &::after {
        background-color: #f0f;
      }
    }

    &.overdue {
      color: #ff0004;

      &::after {
        background-color: #ff0004;
      }
    }
  }
}
</style>
