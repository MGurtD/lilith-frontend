<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import { FileService } from "../api/services/file.service";
import { File } from "../types";
import Toolbar from "primevue/toolbar";
import { PrimeIcons } from "primevue/api";
import { useToast } from "primevue/usetoast";
import { loadImage, createBlobAndDownloadFile } from "../utils/functions";
import { useConfirm } from "primevue/useconfirm";
import { DialogOptions, FileType } from "../types/component";

const props = defineProps<{
  title: string;
  entity: string;
  id: string;
  maxFiles?: number;
}>();

const toast = useToast();
const confirm = useConfirm();

const service = new FileService();
const files = ref(undefined as undefined | Array<File>);

// Instancia para controlar el diálogo
const dialogOptions = reactive({
  visible: false,
  title: "Detalle de la imagen",
  closable: true,
  position: "center",
  modal: true,
} as DialogOptions);

// Crea una referencia reactiva para almacenar la prop
const idRef = ref(props.id);

// Usa la función watch para observar cambios en la prop
watch(
  () => props.id,
  (newValue, oldValue) => {
    // Actualiza la referencia reactiva
    idRef.value = newValue;

    if (newValue && newValue !== oldValue) {
      fetchData();
    }
  }
);

const fetchData = async () => {
  files.value = await service.GetEntityFiles(props.entity, idRef.value);
};

onMounted(async () => {
  setTimeout(() => {
    fetchData();
  }, 200);
});

const canLoadMoreFiles = () => {
  if (!props.maxFiles) {
    return true;
  }

  if (files.value) {
    return files.value?.length < props.maxFiles;
  }
};

const uploadFile = async () => {
  const input = document.createElement("input");
  input.type = "file";

  input.onchange = async (e: any) => {
    const file = e.target.files[0];

    const uploaded = await service.Upload(file, props.entity, props.id);
    if (!uploaded) {
      toast.add({
        severity: "error",
        detail: "Error al carregar l'arxiu",
      });
      return;
    }
    await fetchData();
  };

  input.click();
};

const showFile = async (file: File) => {
  dialogOptions.visible = true;

  const response = await service.Download(file);
  const blob = new Blob([response], { type: "image/jpeg" });
  const imageElement = await loadImage(blob);

  document.getElementById("img-container")?.appendChild(imageElement);
};

const downloadFile = async (file: File) => {
  const response = await service.Download(file);
  createBlobAndDownloadFile(file.originalName, response);
};

const deleteFile = async (file: File) => {
  confirm.require({
    message: "Està segur que vol eliminar l'arxiu seleccionat",
    accept: async () => {
      var deleted = await service.Delete(file.id);
      if (!deleted) {
        toast.add({
          severity: "error",
          detail: "Error al eliminar l'arxiu",
        });
        return;
      }
      await fetchData();
    },
  });
};
</script>
<template>
  <div class="base_input">
    <Toolbar>
      <template #start>
        <p class="file_viewer_title">{{ title }}</p>
      </template>
      <template #end>
        <Button
          size="small"
          :disabled="!canLoadMoreFiles()"
          rounded
          :icon="PrimeIcons.UPLOAD"
          @click="uploadFile"
        />
      </template>
    </Toolbar>
    <section class="file-viewer">
      <article class="file-viewer-item" v-for="file in files" :key="id">
        <div class="file-viewer-item-type">
          <i
            v-if="file.type === FileType.DOCUMENT"
            :class="
              file.originalName.endsWith('docx')
                ? PrimeIcons.FILE_WORD
                : PrimeIcons.FILE_PDF
            "
            style="font-size: 3.5rem"
          />
          <i
            v-if="file.type === FileType.IMAGE"
            :class="PrimeIcons.IMAGE"
            style="font-size: 3.5rem"
          />
          <p>
            {{ file.originalName.substring(0, 20) }}
          </p>
        </div>
        <div
          :class="
            file.type === FileType.IMAGE
              ? 'file-viewer-item-actions-image'
              : 'file-viewer-item-actions-file'
          "
        >
          <div
            v-if="file.type === FileType.IMAGE"
            class="file-viewer-item-action file-viewer-item-action-show"
            @click="showFile(file)"
          >
            <i :class="PrimeIcons.EYE" style="font-size: 1rem" />
          </div>
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

  <Dialog
    v-model:visible="dialogOptions.visible"
    :header="dialogOptions.title"
    :closable="dialogOptions.closable"
    :modal="dialogOptions.modal"
  >
    <div id="img-container"></div>
  </Dialog>
</template>
<style scoped>
.file-viewer {
  padding-top: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, 150px);
  grid-template-rows: repeat(auto-fill, 150px);
  gap: 1rem;
}

.file_viewer_title {
  font-weight: bold;
  font-size: 1rem;
  color: black;
}

.file-viewer-item {
  border: 1px solid var(--blue-800);
  font-size: 0.8rem;
  display: grid;
  grid-template-rows: 0.8fr 0.2fr;
}

.file-viewer-item-type {
  padding-top: 10px;
  text-align: center;
  color: darkgray;
}

.file-viewer-item-actions-file {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.file-viewer-item-actions-image {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.file-viewer-item-action {
  width: 100%;
  height: 100%;
  padding-top: 6px;
  text-align: center;
  opacity: 0.9;
  color: #fff;
}

.file-viewer-item-action:hover {
  cursor: pointer;
  opacity: 0.6;
}

.file-viewer-item-action-delete {
  background-color: var(--red-800);
}

.file-viewer-item-action-download {
  background-color: var(--blue-800);
}

.file-viewer-item-action-show {
  background-color: var(--gray-800);
}
</style>
