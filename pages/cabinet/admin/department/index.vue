<script setup>
const modal = ref(false);
const role = ref("");
const phrase = ref("");
const search = ref("");
const loading = ref(false);
const editItemId = ref(null);
const list = ref([]);
const pagination = reactive({
  current: 1,
  size: 5,
  total: 0,
});

watch(search, async (currentValue) => {
  pagination.current = 1;
  if (currentValue === "") await fetchList();
});

watch(role, async () => {
  pagination.current = 1;
  fetchList();
});

const fetchList = async () => {
  loading.value = true;
  modal.value = false;
  const params = {
    page: pagination.current,
    phrase: search.value,
    role: role.value,
  };
  const { data } = await GET(`admin/department`, params);
  list.value = data;
  // pagination.size = data.per_page;
  // pagination.total = data.total;
  loading.value = false;
};

// const handleItem = async (id, type) => {
//   if (type === "edit") {
//     editItemId.value = id;
//     modal.value = true;
//   } else {
//     await DELETE(`admin/department/${id}`);
//     messageMeneger("Отдел удален");
//     await fetchList();
//   }
// };

onMounted(async () => {
  await fetchList();
});
</script>

<template>
  <div class="page">
    <h1 class="mb-40">Отделы</h1>
    <div class="d-flex mb-30 between">
      <el-input
        v-model="search"
        style="max-width: 300px"
        class="w-full"
        placeholder="Поиск"
        suffix-icon="el-icon-search"
        :disabled="loading"
        @keyup.enter="fetchList" />

      <el-button
        :disabled="loading && !phrase"
        class="h-50 dark"
        @click.prevent="modal = true">
        <Svg name="add" /> Добавить</el-button
      >
    </div>
    <LoaderBox
      :loading="loading"
      :is-empty="list.length === 0">
      <el-table
        :data="list"
        highlight-current-row
        stripe
        class="border">
        <el-table-column
          fixed
          label="Название"
          show-overflow-tooltip>
          <template #default="{ row }">{{ activeL(row, "title") }}</template>
        </el-table-column>
        <el-table-column
          fixed="right"
          width="62">
          <template #default>
            <el-dropdown
              placement="bottom-end"
              class="custom"
              popper-class="custom-dropdown"
              trigger="click">
              <el-button class="grey h-50">
                <Svg
                  name="actions-dots"
                  class="mr-0" />
              </el-button>
              <template #dropdown
                >~
                <!-- <el-dropdown-menu class="">
                  <el-dropdown-item @click="handleItem(row.id, 'edit')">
                    <Svg
                      class="mr-0"
                      style="height: 16px"
                      name="edit" />
                    Редактировать
                  </el-dropdown-item>
                  <el-dropdown-item @click="handleItem(row.id, 'delete')">
                    <Svg
                      class="mr-0"
                      style="height: 16px"
                      name="delete" />
                    Удалить
                  </el-dropdown-item>
                </el-dropdown-menu> -->
              </template>
            </el-dropdown>
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
    </LoaderBox>

    <PopupAdminDepartment
      :id="editItemId"
      v-model:visible="modal"
      @create="fetchList"
      @cancel="((modal = false), (editItemId = null))" />
  </div>
</template>
