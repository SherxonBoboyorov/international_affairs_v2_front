<script setup lang="ts">
const router = useRouter();
const route = useRoute();
const isPopup = ref<boolean>(false);
const onChangeParam = route.params.onChange as string;

const data = ref<Partial<Reviewer>>({});
const loading = ref<boolean>(true);

const isEdit =
  onChangeParam !== "create" && !Number.isNaN(Number(onChangeParam));

const handleUser = async (
  isAccept: boolean,
  caneclMessage?: string
): Promise<void> => {
  try {
    if (isAccept) {
      await POST(`chief-editor/reviewers/${onChangeParam}/approve`);
      messageMeneger("Пользователь принят");
    } else {
      await POST(`chief-editor/reviewers/${onChangeParam}/reject`, {
        reason: caneclMessage,
      });
      messageMeneger("Пользователь отклонен");
    }
    router.push("/cabinet/editor/user/new");
  } catch (error) {
    console.error("Xatolik yuz berdi:", error);
  }
};

onMounted(async () => {
  loading.value = true;
  if (isEdit) {
    try {
      const { data: responseData } = await GET<Reviewer>(
        `chief-editor/reviewers/${onChangeParam}`
      );
      if (responseData) {
        console.log(responseData, "responseData");
        data.value = responseData;
      }
    } catch (error) {
      console.error("Ma'lumotni yuklashda xatolik:", error);
    }
  }
  loading.value = false;
});
</script>

<template>
  <LoaderBox
    :loading="loading"
    :blur-px="30">
    <div class="page">
      <div class="page-form-header mb-24">
        <h1>Детали и действия с рецензентом</h1>
      </div>

      <div class="page-form-body">
        <ul>
          <!-- F.I.O -->
          <li>
            <span>ФИО:</span>
            <span>{{ data.name }}</span>
          </li>
          <li>
            <span>Email:</span>
            <span>{{ data.email }}</span>
          </li>
          <li>
            <span>Номер телефона:</span>
            <span>{{ data.institutional_phone }}</span>
          </li>
          <li>
            <span>Учёная степень:</span>
            <span>{{ data.academic_degree }}</span>
          </li>
          <li>
            <span>Место работы:</span>
            <span>{{ data.work_place }}</span>
          </li>
          <li>
            <span>Научная степень:</span>
            <span>{{ activeL(data.scientific_activity, "title") }}</span>
          </li>
          <li>
            <span>Орцид:</span>
            <span>{{ data.orcid }}</span>
          </li>
          <li>
            <span>Диплом выдан:</span>
            <span>{{ data.diploma_issued_by }}</span>
          </li>
        </ul>
      </div>
      <div class="page-form-body-hr"></div>

      <div class="page-form-footer">
        <el-button
          class="p-50 blue"
          @click.prevent="handleUser(true)"
          >Принять</el-button
        >
        <el-button
          class="p-50 grey"
          @click.prevent="isPopup = true"
          >Отклонить</el-button
        >
      </div>
    </div>
    <PopupAdminCancelUser
      v-model:visible="isPopup"
      @cancel="isPopup = false"
      @create="handleUser(false, $event)" />
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
</style>
