<script setup lang="ts">
const route = useRoute();
const config = useRuntimeConfig();
const onChangeParam = route.params.onChange as string;
const data = ref<ArticleReview>();
const popupVisible = ref<boolean>(false);
const popupChangeDeadlineVisible = ref<boolean>(false);
const loading = ref<boolean>(true);

const fetchData = async () => {
  loading.value = true;
  popupVisible.value = false;
  try {
    const { data: responseData } = await GET<ArticleReview>(
      `chief-editor/reviewer-articles/${onChangeParam}`
    );
    if (responseData) {
      console.log(responseData, "responseData");
      data.value = responseData;
    }
  } catch (error) {
    console.error("Ma'lumotni yuklashda xatolik:", error);
  } finally {
    loading.value = false;
  }
};

const handleFile = async (file: File) => {
  const formData = new FormData();
  formData.append("title", data.value?.article_title || "");
  formData.append("fio", data.value?.authors_name || "");
  formData.append("edited_file", file);
  formData.append("deadline", data.value?.deadline?.split("T")[0] || "");
  const { status } = await POST<ArticleReview>(
    data.value?.type === "internal"
      ? `chief-editor/reviewer-articles/${onChangeParam}/edited-file`
      : `chief-editor/reviewer-articles/${onChangeParam}/convert`,
    formData
  );
  if (status) {
    messageMeneger("Информация успешно обновлена.");
    await fetchData();
  }
};

onMounted(async () => {
  await fetchData();
});
</script>

<template>
  <LoaderBox
    :loading="loading"
    :blur-px="30">
    <div class="page">
      <div class="page-form-header mb-24">
        <h1>{{ data?.article_title }}</h1>
      </div>
      <div class="page-form-body">
        <div
          class="d-flex mb-40"
          style="align-items: flex-start">
          <a
            download
            :href="`${
              data?.type === 'internal'
                ? config.public.apiImgUrl + data?.file_path
                : data?.file_path
            }`">
            <el-button class="blue">
              Скачать файл
              <svg
                class="ml-12"
                viewBox="0 0 16.5 19.5"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="16.500000"
                height="19.500000"
                fill="none"
                customFrame="#000000">
                <g id="Group">
                  <path
                    id="Vector"
                    d="M15.3506 18.3445C15.0949 18.6041 14.748 18.75 14.3864 18.75L2.11364 18.75C1.75198 18.75 1.40513 18.6041 1.1494 18.3445C0.893668 18.0848 0.75 17.7326 0.75 17.3654L0.75 2.13462C0.75 1.76739 0.893668 1.41521 1.1494 1.15554C1.40513 0.895879 1.75198 0.75 2.11364 0.75L10.9773 0.75L15.75 5.59615L15.75 17.3654C15.75 17.7326 15.6063 18.0848 15.3506 18.3445Z"
                    fill-rule="nonzero"
                    stroke="rgb(255,255,255)"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.500000" />
                  <path
                    id="Vector"
                    d="M10.978 11.1352L8.25071 13.9044L5.52344 11.1352M8.25071 13.9044L8.25071 6.28906"
                    fill-rule="nonzero"
                    stroke="rgb(255,255,255)"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.500000" />
                </g>
              </svg>
            </el-button>
          </a>

          <div>
            <CustomUploader
              button-class="blue ml-12"
              button-style="height: 44px !important; padding: 0 15px !important;"
              :button-text="
                data?.edited_file_name
                  ? `Заменить файл (${data?.edited_file_name})`
                  : 'Загрузить файл'
              "
              button-type="default"
              :accept-format="[
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
              ]"
              :is-view-uploaded-files="false"
              @click.stop
              @update:files="(files) => handleFile(files)">
              <template #icon>
                <svg
                  class="ml-12"
                  viewBox="0 0 16.5 19.5"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="16.500000"
                  height="19.500000"
                  fill="none"
                  customFrame="#000000">
                  <g id="Group">
                    <path
                      id="Vector"
                      d="M15.3506 18.3445C15.0949 18.6041 14.748 18.75 14.3864 18.75L2.11364 18.75C1.75198 18.75 1.40513 18.6041 1.1494 18.3445C0.893668 18.0848 0.75 17.7326 0.75 17.3654L0.75 2.13462C0.75 1.76739 0.893668 1.41521 1.1494 1.15554C1.40513 0.895879 1.75198 0.75 2.11364 0.75L10.9773 0.75L15.75 5.59615L15.75 17.3654C15.75 17.7326 15.6063 18.0848 15.3506 18.3445Z"
                      fill-rule="nonzero"
                      stroke="rgb(255,255,255)"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.500000" />
                    <path
                      id="Vector"
                      d="M5.45455 4.84615L2.72727 7.61538L0 4.84615M2.72727 7.61538L2.72727 3.80769L2.72727 0"
                      fill-rule="nonzero"
                      stroke="rgb(255,255,255)"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.500000"
                      transform="matrix(-1,8.74228e-08,-8.74228e-08,-1,10.9766,13.9043)" />
                  </g>
                </svg>
              </template>
            </CustomUploader>
            <a
              v-if="data?.edited_file_path"
              :href="`${config.public.apiImgUrl + data?.edited_file_path}`"
              download
              style="
                margin: 8px 0 0 12px;
                font-size: 12px;
                color: #494949;
                text-decoration: underline;
              ">
              Скачать загруженный файл ({{ data?.edited_file_name }})
            </a>
          </div>
        </div>
        <ul class="mb-40">
          <li>
            <span>Ф.И.О:</span>
            <span>{{ data?.authors_name }}</span>
          </li>
          <li>
            <span>Описание:</span>
            <span>{{ data?.article_title }}</span>
          </li>
          <li>
            <span>Срок выполнения:</span>
            <span>{{ formateDate(data?.deadline?.split("T")[0]) }}</span>
          </li>
          <li>
            <span>Статус:</span>
            <span
              :class="data?.status"
              class="article-status"
              >{{
                data?.status === "not_assigned"
                  ? "Не назначен"
                  : data?.status === "assigned"
                    ? "Назначен"
                    : data?.status === "in_progress"
                      ? "В работе"
                      : data?.status === "completed"
                        ? "Завершен"
                        : data?.status === "rejected"
                          ? "Отклонен"
                          : data?.status === "overdue"
                            ? "Просрочен"
                            : ""
              }}</span
            >
          </li>
        </ul>
        <hr />
        <div class="page-form-header mb-24">
          <h1>Рецензенты</h1>
        </div>
        <ul class="mb-40">
          <li
            v-for="(item, index) in data?.assignments"
            :key="index">
            <span class="mr-20">{{ item.name }}</span>
            <span
              :class="item.status"
              class="article-status mr-auto"
              >{{
                item.status === "not_assigned"
                  ? "Не назначен"
                  : item.status === "assigned"
                    ? "Назначен"
                    : item.status === "in_progress"
                      ? "В работе"
                      : item.status === "completed"
                        ? "Завершен"
                        : item.status === "rejected"
                          ? "Отклонен"
                          : item.status === "overdue"
                            ? "Просрочен"
                            : ""
              }}</span
            >
            <span>{{ item.description }}</span>
          </li>
        </ul>
        <hr />
        <el-button
          class="dark"
          @click="popupVisible = true">
          Назначить дополнительного рецензента
        </el-button>
        <el-button
          class="blue"
          @click="popupChangeDeadlineVisible = true">
          Продлить дедлайн
        </el-button>
      </div>
    </div>
    <LazyPopupAdminAddDeadline
      v-model:visible="popupVisible"
      @create="fetchData"
      @cancel="popupVisible = false" />
    <LazyPopupAdminChangeDeadline
      v-model:visible="popupChangeDeadlineVisible"
      :assignments="data?.assignments || []"
      @create="fetchData"
      @cancel="popupChangeDeadlineVisible = false" />
  </LoaderBox>
</template>

<style scoped lang="scss">
ul {
  padding: 0;
  margin: 0;
  list-style: none;

  li {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    font-size: 18px;
    font-weight: 500;
    color: #123654;
    border-bottom: 1px solid #1236541c;

    &:last-child {
      border-bottom: none;
    }
  }
}

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
