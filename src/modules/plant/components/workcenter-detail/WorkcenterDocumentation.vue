<template>
  <div class="documentation-content">
    <div class="master-detail-layout">
      <!-- Master: Document List -->
      <div class="documents-panel">
        <DataTable
          :value="workcenterStore.productionInstructionsDocuments"
          v-model:selection="selectedDocument"
          selectionMode="single"
          @row-select="onDocumentSelect"
          scrollable
          scrollHeight="flex"
        >
          <template #empty>
            <div class="no-data">
              No hi ha instruccions de treball disponibles
            </div>
          </template>
          <Column field="originalName" header="Nom">
            <template #body="slotProps">
              <div class="text-overflow-ellipsis">
                {{ slotProps.data.originalName }}
              </div>
            </template>
          </Column>
          <Column field="type" header="Tipus" style="width: 60px">
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
import { usePlantWorkcenterStore } from "../../store";

// Services
const workcenterStore = usePlantWorkcenterStore();

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
  grid-template-columns: 300px 1fr;
  gap: 1.5rem;
  height: calc(100vh - 250px);
  min-height: 600px;
  overflow: hidden; /* Prevent grid items from overflowing */
}

.documents-panel {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 0; /* Allow flex/grid item to shrink below content size */
  max-width: 300px; /* Enforce maximum width */
}

.documents-panel :deep(.p-panel-content) {
  overflow: auto;
  max-height: calc(100vh - 300px);
}

.viewer-panel {
  min-height: 0;
  min-width: 0; /* Allow grid item to shrink */
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Prevent overflow */
  width: 100%; /* Fill available space */
}

.no-data {
  text-align: center;
  padding: 2rem;
  color: var(--text-color-secondary);
}

/* DataTable adjustments */
.documents-panel :deep(.p-datatable) {
  width: 100%;
}

.documents-panel :deep(.p-datatable-wrapper) {
  overflow-x: hidden;
}

.text-overflow-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}

/* Responsive layout */

@media (max-width: 992px) {
  .master-detail-layout {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    height: auto;
  }

  .documents-panel {
    display: none;
  }

  .viewer-panel {
    min-height: 600px;
  }
}
</style>
