<template>
  <div class="documentation-content">
    <div class="master-detail-layout">
      <!-- Master: Document List -->
      <div class="documents-panel">
        <DataTable
          :value="plantStore.productionInstructionsDocuments"
          v-model:selection="selectedDocument"
          selectionMode="single"
          @row-select="onDocumentSelect"
        >
          <template #empty>
            <div class="no-data">
              No hi ha instruccions de treball disponibles
            </div>
          </template>
          <Column field="originalName" header="Nom" style="width: 80%"></Column>
          <Column field="type" header="Tipus" style="width: 20%">
            <template #body="slotProps">
              <Tag :value="getFileType(slotProps.data)" severity="info" />
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
import { File } from "../../../../types";
import PdfViewer from "../../../../components/PdfViewer.vue";
import { usePlantStore } from "../../store";

// Services
const plantStore = usePlantStore();

// State
const selectedDocument = ref<File | null>(null);

// Document selection handler
const onDocumentSelect = (event: any) => {
  selectedDocument.value = event.data;
};

// Helper functions
const getFileType = (file: File): string => {
  if (!file?.originalName) return "Desconegut";
  const name = file.originalName.trim();
  const lastDot = name.lastIndexOf(".");
  if (lastDot === -1 || lastDot === name.length - 1) return "Sense extensió"; // no extension present
  const ext = name.substring(lastDot + 1);
  return ext.toUpperCase();
};

// Lifecycle
onMounted(() => {});
</script>

<style scoped>
.documentation-content {
  height: 100%;
}

.master-detail-layout {
  display: grid;
  grid-template-columns: 400px 1fr;
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
