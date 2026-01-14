<script setup>
const modal = ref(false);
const role = ref("");
const phrase = ref("");
const search = ref("");
const loading = ref(false);
const editItemId = ref(null);
const list = ref([]);
const variebleStore = useVariebleStore();
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

const handleItem = async (id, type) => {
  if (type === "edit") {
    editItemId.value = id;
    modal.value = true;
  } else {
    await DELETE(`admin/department/${id}`);
    messageMeneger("Отдел удален");
    await fetchList();
  }
};

onMounted(async () => {
  await fetchList();
});
</script>

<template>
  <div class="page">
    <div>
      <h1>Список документов</h1>
      <p class="mt-0 mb-30">
        Просмотр и отслеживание всех заявлений и приказов
      </p>
    </div>
    <div class="bg-white medium mb-30">
      <el-row :gutter="20">
        <el-col
          :xs="24"
          :md="12"
          :lg="5">
          <el-input
            v-model="search"
            class="w-full"
            placeholder="Поиск"
            suffix-icon="el-icon-search"
            :disabled="loading"
            @keyup.enter="fetchList" />
        </el-col>
        <el-col
          :xs="24"
          :md="12"
          :lg="5">
          <el-select
            v-model="role"
            placeholder="Роль"
            class="custom">
            <el-option
              class="el-dropdown-menu__item"
              label="Не выбрано"
              value="" />
            <el-option
              v-for="(item, index) in Object.keys(variebleStore.roles)"
              :key="index"
              class="el-dropdown-menu__item"
              :value="item"
              :label="variebleStore.roles[item]" />
          </el-select>
        </el-col>
        <el-col
          :xs="24"
          :md="12"
          :lg="5">
          <el-select
            v-model="role"
            placeholder="Роль"
            class="custom">
            <el-option
              class="el-dropdown-menu__item"
              label="Не выбрано"
              value="" />
            <el-option
              v-for="(item, index) in Object.keys(variebleStore.roles)"
              :key="index"
              class="el-dropdown-menu__item"
              :value="item"
              :label="variebleStore.roles[item]" />
          </el-select>
        </el-col>
        <el-col
          :xs="24"
          :md="12"
          :lg="5">
          <el-select
            v-model="role"
            placeholder="Роль"
            class="custom">
            <el-option
              class="el-dropdown-menu__item"
              label="Не выбрано"
              value="" />
            <el-option
              v-for="(item, index) in Object.keys(variebleStore.roles)"
              :key="index"
              class="el-dropdown-menu__item"
              :value="item"
              :label="variebleStore.roles[item]" />
          </el-select>
        </el-col>
        <el-col
          :xs="24"
          :md="12"
          :lg="4">
          <el-button
            :disabled="loading && !phrase"
            color="#000"
            class="h-50 w-full"
            @click.prevent="modal = true">
            <Svg name="clear-filter" /> Сбросить</el-button
          >
        </el-col>
      </el-row>
    </div>
    <LoaderBox
      :loading="loading"
      :is-empty="list.length === 0">
      <div class="bg-white medium">
        <h3>Документы (3)</h3>
        <p class="mb-30 mt-0">
          Список всех заявлений и приказов с возможностью детального просмотра
        </p>
        <el-table
          :data="list"
          highlight-current-row
          stripe>
          <el-table-column
            fixed
            label="Название"
            show-overflow-tooltip>
            <template #default="{ row }">{{ activeL(row, "title") }}</template>
          </el-table-column>
          <el-table-column
            fixed="right"
            width="62">
            <template #default="{ row }">
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
                <template #dropdown>
                  <el-dropdown-menu class="">
                    <el-dropdown-item @click="handleItem(row.id, 'edit')">
                      <Svg
                        class="mr-0"
                        style="height: 16px"
                        name="edit" />
                      Редактировать
                    </el-dropdown-item>
                    <el-dropdown-item @click="handleItem(row.id, 'edit')">
                      <Svg
                        class="mr-0"
                        style="height: 16px"
                        name="delete" />
                      Удалить
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
