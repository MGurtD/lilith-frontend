<template>
  <div class="card">
    <FileUpload
      mode="basic"
      name="file"
      :url="fileUploadUrl"
      accept="application/pdf"
      :maxFileSize="1000000"
      :auto="true"
      @upload="onAdvancedUpload"
    />
  </div>
</template>
<script setup lang="ts">
import { useToast } from "primevue/usetoast";
import FileUpload from "primevue/fileupload";
import { fileUploadUrl } from "../api/api.client";
import { FileService } from "../api/services/file.service";
import { onMounted } from "vue";
const toast = useToast();

const onAdvancedUpload = (event: any) => {
  console.log(event);
  toast.add({
    severity: "info",
    summary: "Success",
    detail: "File Uploaded",
    life: 3000,
  });
};

onMounted(async () => {
  let service = new FileService();
  let response = await service.GetByPath("1234.pdf");
  console.log(response);

  const url = window.URL.createObjectURL(new Blob([response]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "file.pdf");
  document.body.appendChild(link);
  link.click();
});
</script>
