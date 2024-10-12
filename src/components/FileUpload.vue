<template>
  <div class="w-11/12 bg-white p-2 shadow-md">
    <div class="bg-base-200 collapse">
      <input type="checkbox" class="peer" />
      <div
        class="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content"
      >
        Upload File
      </div>
      <div
        class="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content"
      >
        <h2 class="text-sm font-bold mb-4">Upload File</h2>
        <div class="mb-4">
          <label for="file" class="block text-gray-700 text-sm font-bold mb-2"
            >Choose File:</label
          >
          <input
            type="file"
            @change="uploadFile"
            id="file"
            class="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            placeholder="Choose file"
          />
        </div>
        <button @click="submitFile" class="btn btn-primary btn-sm">
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useFileStore } from '../stores/file';

const fileStore = useFileStore();

const file = ref(null);

const fileName = computed(() => file.value?.name);
const fileExtension = computed(() =>
  fileName.value?.substr(fileName.value?.lastIndexOf('.') + 1)
);
const fileMimeType = computed(() => file.value?.type);

const uploadFile = (event) => {
  file.value = event.target.files[0];
};

const submitFile = async () => {
  const reader = new FileReader();
  reader.readAsDataURL(file.value);
  reader.onload = async () => {
    const encodedFile = reader.result.split(',')[1];
    const data = {
      file: encodedFile,
      fileName: fileName.value,
      fileExtension: fileExtension.value,
      fileMimeType: fileMimeType.value,
    };
    try {
      const response = await fileStore.handleUpload(data);
      console.log('response', response);

      // now refresh to get new list of files
      await fileStore.getChildren();

      // clear the file input
      file.value = null;
    } catch (error) {
      console.error(error);
    }
  };
};
</script>
