<template>
  <main class="clockin">
    <div class="clockin__container">
      <!-- Logo Section -->
      <div class="clockin__header">
        <img
          src="../../../assets/images/logo.jpg"
          alt="Logo Temges"
          class="clockin__logo"
        />
        <h1 class="clockin__title">{{ $t("shopfloor.clockin.title") }}</h1>
      </div>

      <!-- Input Section -->
      <div class="clockin__form">
        <div class="clockin__input-wrapper">
          <i :class="PrimeIcons.USER" class="clockin__input-icon"></i>
          <Password
            v-model="operatorCode"
            :placeholder="$t('shopfloor.clockin.placeholder')"
            class="clockin__input"
            autofocus
            @keyup.enter="onSubmit"
            :feedback="false"
          />
        </div>

        <Button
          :label="$t('shopfloor.clockin.buttonLabel')"
          :icon="PrimeIcons.ARROW_RIGHT"
          icon-pos="right"
          size="large"
          class="clockin__button"
          :disabled="!operatorCode.trim()"
          @click="onSubmit"
        />
      </div>

      <!-- Visual Feedback -->
      <div class="clockin__hint" v-if="!operatorCode.trim()">
        <i :class="PrimeIcons.INFO_CIRCLE"></i>
        <span>{{ $t("shopfloor.clockin.instructions") }}</span>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { PrimeIcons } from "primevue/api";
import Password from "primevue/password";
import { usePlantModelStore } from "../../production/store/plantmodel";
import { useToast } from "primevue/usetoast";
import { useI18n } from "vue-i18n";
import { Operator } from "../../production/types";

const plantModelStore = usePlantModelStore();
const toast = useToast();
const { t } = useI18n();
const operatorCode = ref("");

const emit = defineEmits<{
  (e: "submit", operator: Operator): void;
}>();

const onSubmit = () => {
  if (!operatorCode.value.trim()) return;

  const operator = plantModelStore.operators?.find(
    (op) => op.code === operatorCode.value.trim()
  );

  if (operator) {
    emit("submit", operator);
  } else {
    toast.add({
      severity: "error",
      summary: t("shopfloor.clockin.errorTitle"),
      detail: t("shopfloor.clockin.errorDetail"),
      life: 4000,
    });
    // Clear input after error for quick retry
    operatorCode.value = "";
  }
};
</script>

<style scoped>
.clockin {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - var(--top-panel-height) - 2rem);
}

.clockin__container {
  width: 100%;
  max-width: 500px;
  background: white;
  border-radius: 24px;
  padding: 2.5rem 2rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.4s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.clockin__header {
  text-align: center;
  margin-bottom: 3rem;
}

.clockin__logo {
  height: 80px;
  width: auto;
  margin-bottom: 1.5rem;
  object-fit: contain;
}

.clockin__title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.5rem;
  letter-spacing: -0.025em;
}

.clockin__instructions {
  font-size: 1rem;
  color: #718096;
  margin: 0;
  line-height: 1.5;
}

.clockin__form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.clockin__input-wrapper {
  position: relative;
}

.clockin__input-icon {
  position: absolute;
  left: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
  font-size: 1.5rem;
  z-index: 1;
}

.clockin__input {
  width: 100%;
  padding: 1.25rem 1.25rem 1.25rem 4rem !important;
  font-size: 1.25rem !important;
  text-align: left !important;
  border: 2px solid #e2e8f0 !important;
  border-radius: 12px !important;
  transition: all 0.3s ease !important;
  background: #f7fafc !important;
}

.clockin__input:focus {
  border-color: #667eea !important;
  background: white !important;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1) !important;
  outline: none !important;
}

.clockin__button {
  width: 100%;
  padding: 1.25rem !important;
  font-size: 1.25rem !important;
  font-weight: 600 !important;
  border-radius: 12px !important;
  background: #667eea !important;
  border: none !important;
  transition: all 0.3s ease !important;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.clockin__button:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4) !important;
}

.clockin__button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #cbd5e0 !important;
}

.clockin__hint {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
  padding: 1rem;
  background: #edf2f7;
  border-radius: 8px;
  color: #4a5568;
  font-size: 0.875rem;
  text-align: center;
}

.clockin__hint i {
  font-size: 1rem;
  color: #667eea;
}

/* Tablet and larger screens */
@media (min-width: 640px) {
  .clockin__container {
    padding: 3rem 2.5rem;
  }

  .clockin__logo {
    height: 100px;
  }

  .clockin__title {
    font-size: 2rem;
  }

  .clockin__instructions {
    font-size: 1.125rem;
  }

  .clockin__input {
    font-size: 1.5rem !important;
  }

  .clockin__button {
    font-size: 1.5rem !important;
  }
}

/* Large screens */
@media (min-width: 1024px) {
  .clockin__container {
    max-width: 600px;
    padding: 4rem 3rem;
  }

  .clockin__logo {
    height: 120px;
  }

  .clockin__title {
    font-size: 2.25rem;
  }
}

/* Touch-friendly adjustments */
@media (hover: none) and (pointer: coarse) {
  .clockin__input,
  .clockin__button {
    padding: 1.5rem !important;
  }

  .clockin__button {
    padding: 1.75rem !important;
  }
}
</style>
