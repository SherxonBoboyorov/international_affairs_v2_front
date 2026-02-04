<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";

const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();
const onChangeParam = route.params.onChange as string;
const data = ref<ArticleAssignment>();
const loading = ref<boolean>(true);
const ruleFormRef = ref<FormInstance>();
const recommendationList = ref<
  {
    title: string;
    type: string;
  }[]
>([
  {
    title: "Рекомендуется к публикации",
    type: "accept",
  },
  {
    title: "Рекомендуется после доработки",
    type: "after_revision",
  },
  {
    title: "Требует серьезные доработки",
    type: "reject",
  },
]);
const ruleForm = reactive<{
  [key: string]: any;
  general_recommendation: string;
  review_comments: string;
  review_file: File | null;
}>({
  general_recommendation: "",
  review_comments: "",
  review_file: null,
});

const formRules = ref<FormRules>({
  general_recommendation: [
    {
      message: "Рекомендация обязательна",
      required: false,
      trigger: "change",
    },
  ],
  review_comments: [
    {
      message: "Обоснование решения обязательно",
      required: false,
      trigger: "blur",
    },
  ],
  review_file: [
    {
      message: "Файл обязателен",
      required: false,
      trigger: "change",
    },
  ],
});

const fetchData = async () => {
  loading.value = true;
  try {
    const { data: responseData } = await GET<ArticleAssignment>(
      `reviewer/articles/in-progress/${onChangeParam}`
    );
    if (responseData) {
      data.value = responseData;
      responseData.review_criteria.forEach((item) => {
        ruleForm[item.id] = item.score;
      });
      ruleForm.general_recommendation = responseData.general_recommendation;
      ruleForm.review_comments = responseData.review_comments;
      // ruleForm.review_file = responseData.completed_review.review_files;
    }
  } catch (error) {
    console.error("Ma'lumotni yuklashda xatolik:", error);
  } finally {
    loading.value = false;
  }
};

const submitForm = async (
  formEl: FormInstance | undefined,
  isDraft: boolean
) => {
  if (!formEl) return;
  loading.value = true;
  try {
    await formEl.validate();
    const formData = new FormData();
    Object.entries(ruleForm).forEach(([key, value]) => {
      if (value !== null && key !== "review_file") {
        formData.append(key, value);
      } else if (key === "review_file" && value !== null) {
        if (Array.isArray(value)) {
          value.forEach((file) => {
            formData.append("review_files[]", file);
            formData.append("draft_files[]", file);
          });
        } else {
          formData.append("review_files", value);
          formData.append("draft_files", value);
        }
      }
    });
    if (isDraft) {
      const { status }: { status: boolean } = await POST(
        `reviewer/articles/${onChangeParam}/save-draft-review`,
        formData
      );
      if (status) {
        router.push("/cabinet/reviewer/in-work");
      }
    } else {
      const { status }: { status: boolean } = await POST(
        `reviewer/articles/${onChangeParam}/submit-review`,
        formData
      );
      if (status) {
        router.push("/cabinet/reviewer/in-work");
      }
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
    <div class="page">
      <div class="page-form-header mb-24">
        <h1>{{ data?.title }}</h1>
      </div>
      <div class="page-form-body">
        <ul class="mb-20">
          <li>
            <span>Дата назначения:</span>
            <span>{{ formateDate(data?.assigned_at?.split("T")[0]) }}</span>
          </li>
          <li>
            <span>Дедлайн:</span>
            <span>{{ formateDate(data?.deadline?.split("T")[0]) }}</span>
          </li>
          <li>
            <span>Комментарий от Редактор:</span>
            <span>{{ data?.description }}</span>
          </li>
        </ul>
        <a :href="config.public.apiImgUrl + data?.file_path">
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

        <div class="page-form-header mb-24 mt-40">
          <h1>рецензия</h1>
        </div>
        <div class="bg-white large">
          <ul class="mb-20">
            <li
              v-for="(criterion, index) in data?.review_criteria"
              :key="index">
              <span>{{ criterion.name_ru }}:</span>
              <span>
                <el-rate
                  v-model="ruleForm[`${criterion.id}`]"
                  :max="criterion.max_score"
                  size="large"
              /></span>
            </li>
          </ul>

          <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="formRules"
            label-position="top"
            @keyup.enter="submitForm(ruleFormRef, false)">
            <el-row
              :gutter="20"
              class="gap-20">
              <el-col :span="24">
                <el-form-item prop="general_recommendation">
                  <el-select
                    v-model="ruleForm.general_recommendation"
                    placeholder="Рекомендация"
                    filterable
                    clearable>
                    <el-option
                      v-for="(item, index) in recommendationList"
                      :key="index"
                      :label="item.title"
                      :value="item.type" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item prop="review_comments">
                  <el-input
                    v-model="ruleForm.review_comments"
                    placeholder="Обоснование решения"
                    type="textarea"
                    :rows="3" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item prop="review_file">
                  <CustomUploader
                    button-type="default"
                    class="w-full"
                    is-multiple
                    button-text="Загрузить файл"
                    :accept-format="[
                      'application/pdf',
                      'application/msword',
                      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    ]"
                    @click.stop
                    @update:files="(files) => (ruleForm.review_file = files)" />
                </el-form-item>

                <a
                  v-for="(item, index) in data?.draft_files"
                  :key="index"
                  style="margin-right: 20px; font-weight: 600; color: #880019"
                  :href="config.public.apiImgUrl + item.path">
                  {{ item.original_name }}
                </a>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <hr class="mt-20 mb-20" />
        <div class="d-flex between">
          <el-button
            class="blue p-50"
            @click="submitForm(ruleFormRef, false)">
            Отправить
          </el-button>
          <el-button
            class="dark mr-8 p-50"
            @click="submitForm(ruleFormRef, true)">
            Сохранить как черновик
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
</style>
