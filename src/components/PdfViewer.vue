<template>
  <div class="pdf-viewer-container">
    <!-- Toolbar -->
    <Toolbar class="pdf-toolbar">
      <template #start>
        <div class="toolbar-controls">
          <!-- Page Count Info -->
          <template v-if="totalPages > 0">
            <span class="page-indicator">
              {{ totalPages }} {{ totalPages === 1 ? "pàgina" : "pàgines" }}
            </span>
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
      <!-- Fullscreen Exit Button -->
      <Button
        v-if="isFullscreen"
        :icon="PrimeIcons.TIMES"
        rounded
        severity="secondary"
        class="fullscreen-exit-button"
        @click="toggleFullscreen"
        v-tooltip.left="'Sortir de pantalla completa (ESC)'"
        aria-label="Sortir de pantalla completa"
      />

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
          :source="pdfSource"
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

// State
const pdfSource = ref<string | ArrayBuffer | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);
const totalPages = ref(0);
const isFullscreen = ref(false);

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

const onLoaded = ({ numPages }: { numPages: number }) => {
  totalPages.value = numPages;
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

.page-indicator {
  font-size: 0.875rem;
  font-weight: 600;
  color: #475569;
  padding: 0 0.5rem;
}

/* Content Wrapper */
.pdf-content-wrapper {
  flex: 1;
  overflow: auto;
  background: #f8fafc;
  position: relative;
}

.pdf-content-wrapper.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  border-radius: 0;
  background: #f8fafc;
}

/* Fullscreen Exit Button */
.fullscreen-exit-button {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 10000;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
}

.fullscreen-exit-button:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  transform: scale(1.05);
}

/* PDF Content */
.pdf-viewer-content {
  padding: 24px 16px;
}

/* Make PDF responsive - critical for proper display */
:deep(.vue-pdf-embed) {
  margin: 0 auto;
  display: block;
  max-width: 60vw;
}

.pdf-content-wrapper.fullscreen :deep(.vue-pdf-embed) {
  max-width: 60vw;
}

:deep(.vue-pdf-embed__page) {
  margin-bottom: 8px;
  box-shadow: 0 2px 8px 4px rgba(0, 0, 0, 0.1);
}

:deep(.vue-pdf-embed__page canvas) {
  width: 100% !important;
  height: auto !important;
  display: block;
}

/* Loading State */
.pdf-loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 3rem;
  height: 100%;
}

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

  .page-indicator {
    font-size: 0.75rem;
    padding: 0 0.25rem;
  }

  .pdf-viewer-content {
    padding: 12px 8px;
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
