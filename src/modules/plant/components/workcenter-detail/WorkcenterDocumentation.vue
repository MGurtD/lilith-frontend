<template>
  <div class="documentation-content">
    <div class="master-detail-layout">
      <!-- Master: Document List -->
      <div class="documents-panel">
        <DataTable
          :value="plantStore.productionInstructionsDocuments"
          v-model:selection="selectedDocument"
          selectionMode="single"
          class="p-datatable-sm"
          @row-select="onDocumentSelect"
        >
          <template #empty>
            <div class="no-data">
              No hi ha instruccions de treball disponibles
            </div>
          </template>
          <Column field="originalName" header="Nom" style="width: 35%"></Column>
          <Column field="type" header="Tipus" style="width: 15%">
            <template #body="slotProps">
              <Tag :value="getFileType(slotProps.data)" severity="info" />
            </template>
          </Column>
          <Column field="size" header="Mida" style="width: 15%">
            <template #body="slotProps">
              {{ formatFileSize(slotProps.data.size) }}
            </template>
          </Column>
          <Column field="createdOn" header="Data" style="width: 20%">
            <template #body="slotProps">
              {{ formatDate(slotProps.data.createdOn) }}
            </template>
          </Column>
          <Column header="Accions" style="width: 15%">
            <template #body="slotProps">
              <Button
                :icon="PrimeIcons.EYE"
                size="small"
                outlined
                @click.stop="viewDocument(slotProps.data)"
                v-tooltip.bottom="'Visualitzar'"
                class="mr-2"
              />
              <Button
                :icon="PrimeIcons.DOWNLOAD"
                size="small"
                outlined
                @click.stop="downloadDocument(slotProps.data)"
                v-tooltip.bottom="'Descarregar'"
              />
            </template>
          </Column>
        </DataTable>
      </div>

      <!-- Detail: PDF Viewer -->
      <div class="viewer-panel">
        <PdfViewer :file="selectedDocument" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useToast } from "primevue/usetoast";
import { PrimeIcons } from "primevue/api";
import { WorkcenterRt } from "../../types";
import { File } from "../../../../types";
import { FileService } from "../../../../api/services/file.service";
import { createBlobAndDownloadFile } from "../../../../utils/functions";
import PdfViewer from "../../../../components/PdfViewer.vue";
import { usePlantStore } from "../../store";

interface Props {
  workcenter: WorkcenterRt;
}

const props = defineProps<Props>();
const toast = useToast();

// Services
const fileService = new FileService();
const plantStore = usePlantStore();

// State
const workInstructions = ref<File[]>([]);
const selectedDocument = ref<File | null>(null);
const loading = ref(false);

// Document selection handler
const onDocumentSelect = (event: any) => {
  selectedDocument.value = event.data;
};

// View document (sets selection)
const viewDocument = (document: File) => {
  selectedDocument.value = document;
};

// Download document
const downloadDocument = async (document: File) => {
  try {
    const blob = await fileService.Download(document);
    if (blob) {
      createBlobAndDownloadFile(document.originalName, blob);
      toast.add({
        severity: "success",
        summary: "Descàrrega completada",
        detail: document.originalName,
        life: 3000,
      });
    }
  } catch (error) {
    console.error("Error downloading document:", error);
    toast.add({
      severity: "error",
      summary: "Error de descàrrega",
      detail: "No s'ha pogut descarregar el document",
      life: 4000,
    });
  }
};

// Helper functions
const getFileType = (file: File): string => {
  if (!file || !file.originalName) return "Desconegut";

  const name = file.originalName.toLowerCase();
  if (name.endsWith(".pdf")) return "PDF";
  if (name.endsWith(".docx") || name.endsWith(".doc")) return "Word";
  if (name.endsWith(".xlsx") || name.endsWith(".xls")) return "Excel";
  if (name.endsWith(".pptx") || name.endsWith(".ppt")) return "PowerPoint";
  if (name.endsWith(".txt")) return "Text";
  return "Document";
};

const formatFileSize = (bytes: number): string => {
  if (!bytes || bytes === 0) return "0 B";
  const kb = bytes / 1024;
  if (kb < 1024) {
    return `${kb.toFixed(2)} KB`;
  }
  const mb = kb / 1024;
  return `${mb.toFixed(2)} MB`;
};

const formatDate = (dateString: string): string => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("ca-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

// Lifecycle
onMounted(() => {});
</script>

<style scoped>
.documentation-content {
  padding: 1.5rem;
  height: 100%;
}

.master-detail-layout {
  display: grid;
  grid-template-columns: 450px 1fr;
  gap: 1.5rem;
  height: calc(100vh - 250px);
  min-height: 600px;
}

.documents-panel {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.documents-panel :deep(.p-panel-content) {
  overflow: auto;
  max-height: calc(100vh - 300px);
}

.viewer-panel {
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.no-data {
  text-align: center;
  padding: 2rem;
  color: var(--text-color-secondary);
}

/* Responsive layout */
@media (max-width: 1200px) {
  .master-detail-layout {
    grid-template-columns: 380px 1fr;
  }
}

@media (max-width: 992px) {
  .master-detail-layout {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    height: auto;
  }

  .documents-panel :deep(.p-panel-content) {
    max-height: 400px;
  }

  .viewer-panel {
    min-height: 600px;
  }
}
</style>
