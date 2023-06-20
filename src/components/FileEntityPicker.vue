<script setup lang="ts">
import { onMounted, ref } from "vue";
import { FileService } from "../api/services/file.service";
import { File } from "../types";
import Toolbar from "primevue/toolbar";
import { PrimeIcons } from "primevue/api";
import { useToast } from "primevue/usetoast";

const props = defineProps<{
  entity: string;
  id: string;
}>();

const emit = defineEmits<{
  (event: "fileAdd", payload: string): void;
  (event: "fileDelete", payload: string): void;
}>();

const toast = useToast();

const service = new FileService();
const files = ref(undefined as undefined | Array<File>);

const fetchData = async () => {
  files.value = await service.GetEntityFiles(props.entity, props.id);
};

onMounted(async () => {
  await fetchData();
});

const uploadFile = async () => {
  var input = document.createElement("input");
  input.type = "file";

  input.onchange = async (e: any) => {
    // getting a hold of the file reference
    var file = e.target.files[0];

    const uploaded = await service.Upload(file, props.entity, props.id);
    if (!uploaded) {
      toast.add({
        severity: "error",
        detail: "Error al pujar l'arxiu",
      });
      return;
    }
    await fetchData();
  };

  input.click();
};

const downloadFile = async (file: File) => {
  const response = await service.Download(file);

  const url = window.URL.createObjectURL(new Blob([response]));
  const link = document.createElement("a");

  link.href = url;
  link.setAttribute("download", "test.pdf");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const deleteFile = async (file: File) => {
  var deleted = await service.Delete(file.id);
  if (!deleted) {
    toast.add({
      severity: "error",
      detail: "Error al eliminar l'arxiu",
    });
    return;
  }
  await fetchData();
};
</script>
<template>
  <div class="base_input">
    <Toolbar>
      <template #end>
        <Button
          size="small"
          label="Upload"
          icon="pi pi-upload"
          @click="uploadFile"
        />
      </template>
    </Toolbar>
    <section class="file-viewer">
      <article class="file-viewer-item" v-for="file in files" :key="id">
        <div class="file-viewer-item-type">
          <i
            v-if="file.type === 0"
            :class="PrimeIcons.FILE_PDF"
            style="font-size: 3.5rem"
          />
          <i
            v-if="file.type === 1"
            :class="PrimeIcons.IMAGE"
            style="font-size: 1rem"
          />
        </div>
        <div class="file-viewer-item-actions">
          <div
            class="file-viewer-item-action file-viewer-item-action-download"
            @click="downloadFile(file)"
          >
            <i :class="PrimeIcons.DOWNLOAD" style="font-size: 1rem" />
          </div>
          <div
            class="file-viewer-item-action file-viewer-item-action-delete"
            @click="deleteFile(file)"
          >
            <i :class="PrimeIcons.TIMES" />
          </div>
        </div>
      </article>
    </section>
  </div>
</template>
<style scoped>
.file-viewer {
  padding-top: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, 150px);
  grid-template-rows: repeat(auto-fill, 150px);
  gap: 1rem;
}

.file-viewer-item {
  border: 1px solid gray;
  font-size: 0.8rem;

  display: grid;
  grid-template-rows: 0.8fr 0.2fr;
}

.file-viewer-item-type {
  padding-top: 10px;
  text-align: center;
}

.file-viewer-item-actions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.file-viewer-item-action {
  border: 1px solid black;
  width: 100%;
  height: 100%;
  padding-top: 5px;
  text-align: center;
}

.file-viewer-item-action:hover {
  cursor: pointer;
}

.file-viewer-item-action-delete {
  background-color: var(--red-800);
}

.file-viewer-item-action-download {
  background-color: var(--blue-800);
}
</style>
