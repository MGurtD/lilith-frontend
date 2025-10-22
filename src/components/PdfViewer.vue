<template>
  <div class="pdf-viewer-container">
    <!-- Toolbar -->
    <Toolbar class="pdf-toolbar">
      <template #start>
        <div class="toolbar-controls">
          <!-- Zoom Controls -->
          <Button
            :icon="PrimeIcons.SEARCH_MINUS"
            size="small"
            outlined
            :disabled="loading || scale <= 0.5"
            @click="zoomOut"
            v-tooltip.bottom="'Reduir zoom'"
            class="mr-2"
          />
          <span class="zoom-level">{{ Math.round(scale * 100) }}%</span>
          <Button
            :icon="PrimeIcons.SEARCH_PLUS"
            size="small"
            outlined
            :disabled="loading || scale >= 3.0"
            @click="zoomIn"
            v-tooltip.bottom="'Ampliar zoom'"
            class="ml-2 mr-2"
          />
          <Button
            icon="pi pi-refresh"
            size="small"
            outlined
            :disabled="loading"
            @click="resetZoom"
            v-tooltip.bottom="'Restablir zoom'"
            class="mr-3"
          />

          <!-- Page Navigation -->
          <template v-if="totalPages > 1">
            <Divider layout="vertical" class="mx-2" />
            <Button
              :icon="PrimeIcons.CHEVRON_LEFT"
              size="small"
              outlined
              :disabled="loading || currentPage <= 1"
              @click="previousPage"
              v-tooltip.bottom="'Pàgina anterior'"
              class="mr-2"
            />
            <span class="page-indicator">
              Pàgina {{ currentPage }} de {{ totalPages }}
            </span>
            <Button
              :icon="PrimeIcons.CHEVRON_RIGHT"
              size="small"
              outlined
              :disabled="loading || currentPage >= totalPages"
              @click="nextPage"
              v-tooltip.bottom="'Pàgina següent'"
              class="ml-2"
            />
          </template>
        </div>
      </template>

      <template #end>
        <div class="toolbar-actions">
          <!-- Fullscreen Toggle -->
          <Button
            :icon="
              isFullscreen
                ? PrimeIcons.WINDOW_MINIMIZE
                : PrimeIcons.WINDOW_MAXIMIZE
            "
            size="small"
            outlined
            :disabled="loading"
            @click="toggleFullscreen"
            v-tooltip.bottom="
              isFullscreen ? 'Sortir de pantalla completa' : 'Pantalla completa'
            "
            class="mr-2"
          />

          <!-- Download -->
          <Button
            :icon="PrimeIcons.DOWNLOAD"
            size="small"
            outlined
            :disabled="loading"
            @click="downloadFile"
            v-tooltip.bottom="'Descarregar document'"
          />
        </div>
      </template>
    </Toolbar>

    <!-- PDF Content Area -->
    <div
      ref="containerRef"
      class="pdf-content-wrapper"
      :class="{ fullscreen: isFullscreen }"
    >
      <!-- Loading State -->
      <div v-if="loading" class="pdf-loading-state">
        <ProgressSpinner
          style="width: 50px; height: 50px"
          strokeWidth="4"
          animationDuration="1s"
        />
        <p class="loading-text">Carregant document...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="pdf-error-state">
        <i
          :class="PrimeIcons.EXCLAMATION_CIRCLE"
          style="font-size: 3rem; color: var(--red-500)"
        ></i>
        <p class="error-text">{{ error }}</p>
        <Button
          label="Tornar a intentar"
          outlined
          size="small"
          @click="loadPdf"
        />
      </div>

      <!-- PDF Viewer -->
      <div v-else-if="pdfSource" class="pdf-viewer-content">
        <VuePdfEmbed
          ref="pdfRef"
          :source="pdfSource"
          :scale="scale"
          :page="currentPage"
          @rendered="onRendered"
          @loading-failed="onLoadingFailed"
          @loaded="onLoaded"
        />
      </div>

      <!-- No File State -->
      <div v-else class="pdf-no-file-state">
        <i
          :class="PrimeIcons.FILE_PDF"
          style="font-size: 4rem; color: var(--surface-400)"
        ></i>
        <p class="no-file-text">Selecciona un document per visualitzar</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from "vue";
import { useToast } from "primevue/usetoast";
import { PrimeIcons } from "primevue/api";
import VuePdfEmbed from "vue-pdf-embed";
import { FileService } from "../api/services/file.service";
import { createBlobAndDownloadFile } from "../utils/functions";
import type { File } from "../types";

// PrimeVue components
import Toolbar from "primevue/toolbar";
import Button from "primevue/button";
import Divider from "primevue/divider";
import ProgressSpinner from "primevue/progressspinner";

interface Props {
  file: File | null;
}

const props = defineProps<Props>();
const toast = useToast();

// Services
const fileService = new FileService();

// Refs
const containerRef = ref<HTMLElement | null>(null);
const pdfRef = ref<any>(null);

// State
const pdfSource = ref<string | ArrayBuffer | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);
const scale = ref(1.0);
const currentPage = ref(1);
const totalPages = ref(0);
const isFullscreen = ref(false);

// Zoom controls
const zoomIn = () => {
  if (scale.value < 3.0) {
    scale.value = Math.min(scale.value + 0.25, 3.0);
  }
};

const zoomOut = () => {
  if (scale.value > 0.5) {
    scale.value = Math.max(scale.value - 0.25, 0.5);
  }
};

const resetZoom = () => {
  scale.value = 1.0;
};

// Page navigation
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

// Fullscreen
const toggleFullscreen = async () => {
  if (!containerRef.value) return;

  try {
    if (!isFullscreen.value) {
      if (containerRef.value.requestFullscreen) {
        await containerRef.value.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      }
    }
  } catch (err) {
    toast.add({
      severity: "error",
      summary: "Error de pantalla completa",
      detail: "No s'ha pogut canviar el mode de pantalla",
      life: 4000,
    });
  }
};

// Handle fullscreen change events
const handleFullscreenChange = () => {
  isFullscreen.value = !!document.fullscreenElement;
};

// Load PDF
const loadPdf = async () => {
  if (!props.file) {
    pdfSource.value = null;
    return;
  }

  loading.value = true;
  error.value = null;
  pdfSource.value = null;

  try {
    const blob = await fileService.Download(props.file);

    if (!blob) {
      throw new Error("No s'ha pogut descarregar el document");
    }

    // Convert blob to ArrayBuffer for vue-pdf-embed
    const arrayBuffer = await blob.arrayBuffer();
    pdfSource.value = arrayBuffer;

    // Reset view state
    currentPage.value = 1;
    scale.value = 1.0;
  } catch (err: any) {
    console.error("Error loading PDF:", err);
    error.value = err?.message || "Error en carregar el document PDF";
    toast.add({
      severity: "error",
      summary: "Error de càrrega",
      detail: error.value,
      life: 5000,
    });
  } finally {
    loading.value = false;
  }
};

// Download file
const downloadFile = async () => {
  if (!props.file) return;

  try {
    const blob = await fileService.Download(props.file);
    if (blob) {
      createBlobAndDownloadFile(props.file.originalName, blob);
      toast.add({
        severity: "success",
        summary: "Descàrrega completada",
        detail: `${props.file.originalName}`,
        life: 3000,
      });
    }
  } catch (err) {
    toast.add({
      severity: "error",
      summary: "Error de descàrrega",
      detail: "No s'ha pogut descarregar el document",
      life: 4000,
    });
  }
};

// PDF Events
const onRendered = () => {
  loading.value = false;
};

const onLoaded = (pdf: any) => {
  totalPages.value = pdf.numPages;
};

const onLoadingFailed = (err: any) => {
  console.error("PDF loading failed:", err);
  error.value = "No s'ha pogut carregar el document PDF";
  loading.value = false;
  toast.add({
    severity: "error",
    summary: "Error de càrrega",
    detail: error.value,
    life: 5000,
  });
};

// Watch for file changes
watch(
  () => props.file,
  (newFile) => {
    if (newFile) {
      loadPdf();
    } else {
      pdfSource.value = null;
      error.value = null;
      currentPage.value = 1;
      totalPages.value = 0;
    }
  },
  { immediate: true }
);

// Lifecycle
onMounted(() => {
  document.addEventListener("fullscreenchange", handleFullscreenChange);

  // Handle Escape key for fullscreen
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape" && isFullscreen.value) {
      toggleFullscreen();
    }
  };
  document.addEventListener("keydown", handleEscape);

  onUnmounted(() => {
    document.removeEventListener("fullscreenchange", handleFullscreenChange);
    document.removeEventListener("keydown", handleEscape);
  });
});
</script>

<style scoped>
.pdf-viewer-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

/* Toolbar */
.pdf-toolbar {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-bottom: 1px solid #e2e8f0;
  padding: 0.75rem 1rem;
  border-radius: 0;
}

.toolbar-controls,
.toolbar-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.zoom-level,
.page-indicator {
  font-size: 0.875rem;
  font-weight: 600;
  color: #475569;
  padding: 0 0.5rem;
  min-width: 50px;
  text-align: center;
}

.page-indicator {
  min-width: 120px;
}

/* Content Wrapper */

.pdf-content-wrapper.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  border-radius: 0;
  padding: 2rem;
}

/* PDF Content */

.loading-text {
  font-size: 1rem;
  color: #64748b;
  margin: 0;
  font-weight: 500;
}

/* Error State */
.pdf-error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 3rem;
  text-align: center;
}

.error-text {
  font-size: 1rem;
  color: #ef4444;
  margin: 0;
  font-weight: 500;
  max-width: 400px;
}

/* No File State */
.pdf-no-file-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 3rem;
  opacity: 0.6;
}

.no-file-text {
  font-size: 1.125rem;
  color: #64748b;
  margin: 0;
  font-weight: 500;
}

/* Responsive */
@media (max-width: 768px) {
  .pdf-toolbar {
    padding: 0.5rem;
  }

  .toolbar-controls,
  .toolbar-actions {
    gap: 0.25rem;
  }

  .zoom-level,
  .page-indicator {
    font-size: 0.75rem;
    padding: 0 0.25rem;
    min-width: 40px;
  }

  .page-indicator {
    min-width: 100px;
  }

  .pdf-content-wrapper {
    padding: 0.5rem;
  }
}

/* Scrollbar styling */
.pdf-content-wrapper::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

.pdf-content-wrapper::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.pdf-content-wrapper::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 5px;
}

.pdf-content-wrapper::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
