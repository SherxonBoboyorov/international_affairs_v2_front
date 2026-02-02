<script setup>
import { UploadFilled } from "@element-plus/icons-vue";

const emit = defineEmits(["update:files"]);

const props = defineProps({
  acceptFormat: {
    default: () => [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/gif",
      "image/svg+xml",
      "image/apng",
      "image/avif",
      "image/*",
    ],
    type: Array,
  },
  buttonClass: { default: "", type: String },
  buttonColor: { default: "#000", type: String },
  buttonStyle: { default: "", type: String },
  buttonText: { default: "Загрузить файл", type: String },
  buttonType: { default: "success", type: String },
  class: { default: "", type: String },
  iconName: { default: "file-upload", type: String },
  isCelarUploadedFiles: { default: false, type: Boolean },
  isDrag: { default: false, type: Boolean },
  isDragBlockHeight: { default: 80, type: Number },
  isMultiple: { default: false, type: Boolean },
  isSlot: { default: false, type: Boolean },
  isSlotUploadFiles: { default: false, type: Boolean },
  isView: { default: false, type: Boolean },
  isViewUploadedFiles: { default: true, type: Boolean },
  maxSize: { default: 2, type: Number },
  oldFiles: { default: () => [], type: Array },
});

const uploadedFiles = ref([]);
const uploadedFilesUrl = ref([]);
const allFiles = ref([]);

const triggerFileInput = () => {
  const inputElement = document.createElement("input");
  inputElement.type = "file";
  inputElement.multiple = props.isMultiple;
  inputElement.accept = props.acceptFormat.join(",");
  inputElement.style.display = "none";

  inputElement.addEventListener("change", handleFileUpload);
  document.body.appendChild(inputElement);
  inputElement.click();
  document.body.removeChild(inputElement);
};

const handleFileUpload = (event) => {
  processFiles(event.target.files);
};

const handleFileDrop = (event) => {
  processFiles(event.dataTransfer.files);
};

// === YANGI O'ZGARISHLAR SHU YERDA ===
const processFiles = (files) => {
  const allowedFormats = props.acceptFormat;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    if (file.size / 1024 / 1024 > props.maxSize) {
      messageMeneger(
        `${file.name} faylining hajmi maksimal ${props.maxSize}MB dan oshmasligi kerak.`,
        "error",
        7000
      );
      continue;
    }

    if (!allowedFormats.includes(file.type)) {
      messageMeneger(
        `Юкланган расмнинг формати хато. Керакли формат: <br> <br> ${allowedFormats.join(
          ",<br> "
        )}`,
        "error",
        7000,
        true
      );
      continue;
    }

    const isImage = file.type.startsWith("image/");
    const fileData = {
      isImage,
      name: file.name,
      type: file.type,
      url: URL.createObjectURL(file),
    };

    if (isImage) uploadedFilesUrl.value.push(fileData.url);

    // 🔥 Yangi shart: faqat 1 ta faylga ruxsat
    if (!props.isMultiple) {
      // Avvalgi fayllarni o‘chiramiz
      uploadedFiles.value.forEach((f) => URL.revokeObjectURL(f.url));
      uploadedFiles.value = [fileData];
      uploadedFilesUrl.value = isImage ? [fileData.url] : [];
      allFiles.value = [file];
      emit("update:files", file);
      return; // faqat 1 fayl, shu yerda to‘xtaymiz
    }

    // Agar ko‘p fayllarga ruxsat bo‘lsa
    if (props.isCelarUploadedFiles) {
      emit("update:files", file);
    } else {
      allFiles.value.push(file);
      uploadedFiles.value.push(fileData);
      emit("update:files", allFiles.value);
    }
  }
};

const removeFile = (index) => {
  URL.revokeObjectURL(uploadedFiles.value[index].url);
  uploadedFiles.value.splice(index, 1);
  uploadedFilesUrl.value.splice(index, 1);
  allFiles.value.splice(index, 1);
  emit("update:files", allFiles.value);
};
</script>

<template>
  <div class="custom-uploader">
    <el-button
      v-if="!isDrag"
      :type="buttonType"
      :color="buttonColor"
      :class="buttonClass"
      :style="buttonStyle"
      @click.prevent="triggerFileInput">
      {{ buttonText }} <slot name="icon" />
    </el-button>

    <!-- Drag & Drop zonasi -->
    <!-- :class="class" -->
    <div
      v-if="isDrag"
      class="custom-uploader-drop drop-zone"
      :type="buttonType"
      :disabled="!isMultiple && !!uploadedFiles.length"
      :style="`height: ${isDragBlockHeight}px !important;`"
      @click="triggerFileInput"
      @dragover.prevent
      @dragenter.prevent
      @drop.prevent="handleFileDrop">
      <el-icon
        class="el-icon--upload mr-12"
        size="50"
        ><upload-filled
      /></el-icon>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
    </div>

    <!-- Yuklangan fayllar ro'yxati -->
    <div v-if="uploadedFiles.length && isViewUploadedFiles">
      <ul>
        <template v-for="(file, index) in uploadedFiles">
          <li
            v-if="!isSlotUploadFiles"
            :key="index"
            :class="{ 'no-view': !isView }">
            <div
              v-if="file.isImage"
              class="custom-uploader-image-item">
              <el-image
                v-if="isView"
                :src="file.url"
                :zoom-rate="1.2"
                :max-scale="7"
                :min-scale="0.2"
                :preview-src-list="uploadedFilesUrl"
                :initial-index="index"
                fit="cover" />
              <span>{{ file.name }}</span>
            </div>
            <div
              v-else
              class="custom-uploader-image-item">
              <img
                v-if="isView"
                src="/images/default-file-icon.png"
                class="custom-uploader-image-item-icon"
                alt="Default file icon"
                loading="lazy" />
              <span>{{ file.name }}</span>
            </div>

            <el-button
              class="ml-auto grey mr-8"
              @click="removeFile(index)">
              <Svg
                class="mr-0"
                name="delete" />
            </el-button>
          </li>
        </template>
        <template v-for="(oldFile, index) in oldFiles">
          <li
            v-if="oldFiles?.length"
            :key="index + 'oldFile'"
            :class="{ 'no-view': !isView }">
            <div
              v-if="file.isImage"
              class="custom-uploader-image-item">
              <el-image
                v-if="isView"
                :src="oldFile"
                :zoom-rate="1.2"
                :max-scale="7"
                :min-scale="0.2"
                :preview-src-list="oldFiles"
                :initial-index="index"
                fit="cover" />
              <span>{{ file }}</span>
            </div>
            <div
              v-else
              class="custom-uploader-image-item">
              <img
                v-if="isView"
                src="/images/default-file-icon.png"
                class="custom-uploader-image-item-icon"
                alt="Default file icon"
                loading="lazy" />
              <span>{{ file }}</span>
            </div>
          </li>
        </template>
        <slot />
      </ul>
    </div>
  </div>
</template>

<style>
.drop-zone {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: #888;
  text-align: center;
  cursor: pointer;
  border: 2px dashed #ccc;
  transition: border-color 0.3s ease;
}

.drop-zone:hover {
  border-color: #888;
}
</style>
