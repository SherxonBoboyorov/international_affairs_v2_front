<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();
const onChangeParam = route.params.onChange as string;
const reviewerParam = route.params.reviewer as string;
const data = ref<ReviewResponse>();
const loading = ref<boolean>(true);

const fetchData = async () => {
  loading.value = true;
  try {
    const { data: responseData } = await GET<ReviewResponse>(
      `chief-editor/reviewer-articles/${onChangeParam}/status/${reviewerParam}`
    );
    if (responseData) {
      data.value = responseData;
    }
  } catch (error) {
    console.error("Ma'lumotni yuklashda xatolik:", error);
  } finally {
    loading.value = false;
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
    <div
      v-if="data"
      class="page">
      <div class="page-form-header mb-24">
        <!-- Bu yerda reviewer nomi yoki status nomini ko'rsatish mumkin -->
        <h1>{{ data.name }} — {{ data.status_name }}</h1>
      </div>

      <div class="page-form-body">
        <!-- Asosiy ma'lumotlar: status_dates va review_data'dan -->
        <ul class="mb-20">
          <li>
            <span>Дата назначения:</span>
            <span>
              {{
                data.status_dates.assigned_at
                  ? formateDate(data.status_dates.assigned_at.split("T")[0])
                  : "-"
              }}
            </span>
          </li>
          <li>
            <span>Дедлайн:</span>
            <span>
              {{
                data.status_dates.deadline
                  ? formateDate(data.status_dates.deadline.split("T")[0])
                  : "-"
              }}
            </span>
          </li>
          <li>
            <span>Комментарий от Редактор:</span>
            <span>
              {{ data.description }}
            </span>
          </li>
        </ul>

        <!-- PDF yuklab olish: completed holatida birinchi review_file'dan -->
        <a
          v-if="
            data.current_status === 'completed' &&
            (data.review_data as any).review_files?.length
          "
          :href="
            config.public.apiImgUrl +
            (data.review_data as any).review_files[0].path
          ">
          <el-button
            style="background-color: transparent; border: 1px solid #123654">
            <span
              style="
                display: flex;
                gap: 8px;
                align-items: center;
                font-weight: 500;
                color: #123654;
              "
              >Скачать PDF
              <svg
                viewBox="0 0 17 20"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="17.000000"
                height="20.000000"
                fill="none"
                customFrame="#000000">
                <path
                  id="Vector"
                  d="M17 5.625L17 17.5C17 18.163 16.7441 18.7989 16.2887 19.2678C15.8332 19.7366 15.2155 20 14.5714 20L13.3571 20L13.3571 18.75L14.5714 18.75C14.8935 18.75 15.2023 18.6183 15.4301 18.3839C15.6578 18.1495 15.7857 17.8315 15.7857 17.5L15.7857 5.625L13.3571 5.625C12.8741 5.625 12.4108 5.42746 12.0692 5.07583C11.7276 4.7242 11.5357 4.24728 11.5357 3.75L11.5357 1.25L4.85714 1.25C4.53509 1.25 4.22624 1.3817 3.99851 1.61612C3.77079 1.85054 3.64286 2.16848 3.64286 2.5L3.64286 13.75L2.42857 13.75L2.42857 2.5C2.42857 1.83696 2.68444 1.20107 3.13988 0.732233C3.59533 0.263392 4.21305 7.63278e-16 4.85714 1.38778e-16L11.5357 0L17 5.625ZM1.94286 14.8125L0 14.8125L0 19.8113L0.9605 19.8113L0.9605 18.1338L1.93557 18.1338C2.28367 18.1338 2.57995 18.0617 2.82443 17.9175C3.07133 17.7717 3.25874 17.5742 3.38664 17.325C3.51996 17.0644 3.5872 16.7733 3.58214 16.4788C3.58214 16.1663 3.51819 15.8842 3.39029 15.6325C3.26215 15.3837 3.06858 15.1771 2.83171 15.0363C2.58886 14.8863 2.29257 14.8117 1.94286 14.8125ZM2.60464 16.4788C2.60877 16.6434 2.57331 16.8066 2.50143 16.9538C2.43697 17.082 2.33619 17.187 2.21243 17.255C2.07097 17.3267 1.91469 17.3619 1.75707 17.3575L0.956857 17.3575L0.956857 15.6L1.75829 15.6C2.023 15.6 2.23024 15.6754 2.38 15.8263C2.52976 15.9788 2.60464 16.1963 2.60464 16.4788ZM4.08243 14.8125L4.08243 19.8113L5.85529 19.8113C6.34262 19.8113 6.74657 19.7125 7.06714 19.515C7.39155 19.3152 7.64487 19.0132 7.78964 18.6538C7.94831 18.2788 8.02764 17.8271 8.02764 17.2987C8.02764 16.7738 7.94831 16.3258 7.78964 15.955C7.64628 15.5998 7.39546 15.3017 7.07443 15.105C6.75386 14.91 6.34707 14.8125 5.85407 14.8125L4.08243 14.8125ZM5.04293 15.6187L5.72657 15.6187C6.02691 15.6187 6.2734 15.6821 6.46607 15.8088C6.66585 15.9444 6.81687 16.1437 6.89593 16.3762C6.99145 16.6279 7.03921 16.9417 7.03921 17.3175C7.04298 17.5668 7.01522 17.8156 6.95664 18.0575C6.91476 18.2488 6.83361 18.4286 6.71864 18.585C6.61299 18.7252 6.47301 18.8339 6.31307 18.9C6.12565 18.9721 5.92662 19.0069 5.72657 19.0025L5.04293 19.0025L5.04293 15.6187ZM9.588 17.8225L9.588 19.8113L8.62871 19.8113L8.62871 14.8125L11.7227 14.8125L11.7227 15.6287L9.588 15.6287L9.588 17.025L11.5381 17.025L11.5381 17.8225L9.588 17.8225Z"
                  fill="rgb(18,54,84)"
                  fill-rule="evenodd" />
              </svg>
            </span>
          </el-button>
        </a>

        <!-- Рецензия: faqat completed status uchun -->
        <div
          v-if="data.current_status === 'completed'"
          class="page-form-header mb-24 mt-40">
          <h1>рецензия</h1>
        </div>

        <div
          v-if="data.current_status === 'completed'"
          class="bg-white large mb-40">
          <ul class="mb-20">
            <li
              v-for="(criterion, index) in (data.review_data as any).scores"
              :key="index">
              <span>{{ criterion.name_ru }}:</span>
              <span>
                <el-rate
                  v-if="criterion.score"
                  :model-value="parseInt(criterion.score as unknown as string)"
                  disabled
                  :max="criterion.max_score"
                  size="large" />
              </span>
            </li>
          </ul>
          <div class="recommendation-card">
            <div class="page-form-header mb-20">
              <h1>Общая рекомендация рецензента</h1>
            </div>

            <div
              class="status-alert mb-20"
              :class="data.review_data.general_recommendation">
              <div class="icon-wrapper">
                <svg
                  v-if="data.review_data.general_recommendation === 'accept'"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round" />
                  <path
                    d="M7.75 12L10.58 14.83L16.25 9.17004"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
                <svg
                  v-else-if="
                    data.review_data.general_recommendation === 'reject'
                  "
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round" />
                  <path
                    d="M9.16998 14.83L14.83 9.17004"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round" />
                  <path
                    d="M14.83 14.83L9.16998 9.17004"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
                <svg
                  v-else
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round" />
                  <path
                    d="M12 8V13"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round" />
                  <path
                    d="M11.9945 16H12.0035"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </div>
              <div class="content">
                <h3 class="status-title">
                  {{
                    data.review_data.general_recommendation === "accept"
                      ? "Рекомендуется к публикации"
                      : data.review_data.general_recommendation === "reject"
                        ? "Отклонено"
                        : "Требуется доработка"
                  }}
                </h3>
              </div>
            </div>

            <div class="review-comment mb-20">
              <span class="label">Комментарий рецензента:</span>
              <p class="text">{{ data.review_data.review_comments }}</p>
            </div>

            <div class="files-section">
              <span class="label mb-10 d-block">Прикрепленные файлы:</span>
              <div class="files-grid">
                <a
                  v-for="(item, index) in (data.review_data as any)
                    .review_files"
                  :key="'rf-' + index"
                  class="file-card"
                  :href="config.public.apiImgUrl + item.path"
                  download>
                  <div class="file-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                        stroke="#0e74c9"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round" />
                      <path
                        d="M14 2V8H20"
                        stroke="#0e74c9"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round" />
                      <path
                        d="M16 13H8"
                        stroke="#0e74c9"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round" />
                      <path
                        d="M16 17H8"
                        stroke="#0e74c9"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round" />
                      <path
                        d="M10 9H8"
                        stroke="#0e74c9"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round" />
                    </svg>
                  </div>
                  <div class="file-info">
                    <span class="file-name">{{
                      item.name || "Файл рецензии"
                    }}</span>
                    <span class="file-action">Скачать</span>
                  </div>
                </a>
                <a
                  v-for="(item, index) in (data.review_data as any).draft_files"
                  :key="'df-' + index"
                  class="file-card draft"
                  :href="config.public.apiImgUrl + item.path"
                  download>
                  <div class="file-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                        stroke="#555"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round" />
                      <path
                        d="M14 2V8H20"
                        stroke="#555"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round" />
                      <path
                        d="M16 13H8"
                        stroke="#555"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round" />
                      <path
                        d="M16 17H8"
                        stroke="#555"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round" />
                      <path
                        d="M10 9H8"
                        stroke="#555"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round" />
                    </svg>
                  </div>
                  <div class="file-info">
                    <span class="file-name">{{
                      item.name || "Черновик рецензии"
                    }}</span>
                    <span class="file-action">Скачать</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Agar completed bo'lmasa, oddiy xabar -->
        <div
          v-else
          class="bg-white large mb-40">
          <p style="font-size: 16px; color: #123654">
            Текущий статус: {{ data.status_name }}
          </p>
          <!-- comment reviewer -->
          <p v-if="data.review_data.comment">
            Комментарий от Рецензента: {{ data.review_data.comment }}
          </p>
        </div>

        <!-- История действий: endi status_dates to'g'ridan-to'g'ri data.status_dates dan -->
        <div class="bg-white large">
          <div class="page-form-header mb-20">
            <h1>История действий</h1>
          </div>
          <ul>
            <li v-if="data.status_dates.assigned_at">
              <span>Назначено:</span>
              <span>
                {{ formateDate(data.status_dates.assigned_at.split("T")[0]) }}
              </span>
            </li>
            <li v-if="data.status_dates.in_progress_at">
              <span>В работе:</span>
              <span>
                {{
                  formateDate(data.status_dates.in_progress_at.split("T")[0])
                }}
              </span>
            </li>
            <li v-if="data.status_dates.refused_at">
              <span>Отклонено:</span>
              <span>
                {{ formateDate(data.status_dates.refused_at.split("T")[0]) }}
              </span>
            </li>
            <li v-if="data.status_dates.completed_at">
              <span>Завершено:</span>
              <span>
                {{ formateDate(data.status_dates.completed_at.split("T")[0]) }}
              </span>
            </li>
            <li v-if="data.status_dates.status_changed_at">
              <span>Изменено:</span>
              <span>
                {{
                  formateDate(data.status_dates.status_changed_at.split("T")[0])
                }}
              </span>
            </li>
            <li v-if="data.status_dates.deadline">
              <span>Срок:</span>
              <span>
                {{ formateDate(data.status_dates.deadline.split("T")[0]) }}
              </span>
            </li>
            <li v-if="data.status_dates.extension_date">
              <span>Изменить срок:</span>
              <span>
                {{
                  formateDate(data.status_dates.extension_date.split("T")[0])
                }}
              </span>
            </li>
          </ul>
        </div>

        <hr class="mt-20 mb-20" />
        <div class="d-flex">
          <el-button
            class="blue p-50"
            @click="router.push('/cabinet/reviewer/finished')">
            Назад
          </el-button>
        </div>
      </div>
    </div>
  </LoaderBox>
</template>

<style scoped lang="scss">
ul {
  padding: 0;
  margin: 0;
  list-style: none;

  li:not(.el-select-dropdown__item) {
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

.recommendation-card {
  padding: 24px;
  background-color: #f8f9fa;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
}

.status-alert {
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 16px;
  border: 1px solid transparent;
  border-radius: 8px;

  &.accept {
    color: #2e7d32;
    background-color: #e6f7e9;
    border-color: #ccedd2;
  }

  &.reject {
    color: #c62828;
    background-color: #ffebee;
    border-color: #ffcdd2;
  }

  &.after_revision {
    color: #ef6c00;
    background-color: #fff3e0;
    border-color: #ffe0b2;
  }

  .status-title {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
  }
}

.review-comment {
  padding: 16px;
  background-color: white;
  border-left: 4px solid #123654;
  border-radius: 4px;

  .label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    color: #666;
  }

  .text {
    font-size: 16px;
    line-height: 1.5;
    color: #333;
    white-space: pre-wrap;
  }
}

.files-section {
  .label {
    font-size: 14px;
    font-weight: 600;
    color: #123654;
  }

  .files-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .file-card {
    display: flex;
    gap: 12px;
    align-items: center;
    min-width: 200px;
    padding: 12px 16px;
    text-decoration: none;
    background-color: white;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    transition: all 0.2s ease;

    &:hover {
      border-color: #0e74c9;
      box-shadow: 0 2px 8px rgb(14 116 201 / 10%);
    }

    &.draft {
      background-color: #fafafa;
      border-style: dashed;
    }

    .file-info {
      display: flex;
      flex-direction: column;
    }

    .file-name {
      margin-bottom: 2px;
      font-size: 14px;
      font-weight: 500;
      color: #123654;
    }

    .file-action {
      font-size: 12px;
      color: #0e74c9;
    }
  }
}
</style>
