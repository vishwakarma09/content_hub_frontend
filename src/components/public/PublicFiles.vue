<template>
  <div class="flex flex-center">
    <div class="text-lg">Public Files</div>
    <button
      class="btn btn-primary btn-lg"
      @click="downloadFile($route.params.token)"
    >
      Download
    </button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import axios from 'axios';

onMounted(() => {
  console.log('mounted');
});

const getToken = async () => {
  await axios.get('/sanctum/csrf-cookie');
};

const downloadFile = async (token) => {
  try {
    await getToken();
    const response = await axios.get(
      `/api/file-folders/public-download/${token}`
    );
    console.log(response.data);
    const url = window.URL.createObjectURL(
      new Blob([atob(response.data.file)])
    );
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', response.data.fileName);
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.error(error);
  }
};
</script>
