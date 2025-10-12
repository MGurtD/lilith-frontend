<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "../store";
import { useProfilesStore } from "../store/profiles";
import { PrimeIcons } from "primevue/api";
import { useI18n } from "vue-i18n";
import FormProfile from "../components/forms/FormProfile.vue";
import ProfileMenuAssignment from "../components/ProfileMenuAssignment.vue";
import { useToast } from "primevue/usetoast";

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const id = route.params.id as string;
const isNew = id === "new";
const store = useStore();
const profiles = useProfilesStore();
const toast = useToast();

const formModel = ref<any>({});
const menuModel = ref<{
  menuItemIds: string[];
  defaultMenuItemId: string | null;
} | null>(null);

const refreshHeader = () => {
  store.setMenuItem({
    icon: PrimeIcons.USER,
    title: t(isNew ? "profiles.newTitle" : "profiles.editTitle"),
    backButtonVisible: true,
  });
};

onMounted(async () => {
  refreshHeader();
  if (isNew) {
    profiles.setNew();
    formModel.value = { ...profiles.current };
    const ma = profiles.menuAssignment;
    menuModel.value = ma
      ? {
          menuItemIds: [...ma.menuItemIds],
          defaultMenuItemId: ma.defaultMenuItemId ?? null,
        }
      : { menuItemIds: [], defaultMenuItemId: null };
  } else {
    await profiles.fetchOne(id);
    formModel.value = { ...profiles.current };
    const ma = profiles.menuAssignment;
    menuModel.value = ma
      ? {
          menuItemIds: [...ma.menuItemIds],
          defaultMenuItemId: ma.defaultMenuItemId ?? null,
        }
      : { menuItemIds: [], defaultMenuItemId: null };
  }
});

watch(
  () => profiles.menuAssignment,
  (v) => {
    if (v)
      menuModel.value = {
        menuItemIds: [...v.menuItemIds],
        defaultMenuItemId: v.defaultMenuItemId ?? null,
      };
  }
);

const saveProfile = async () => {
  let ok = false;
  if (isNew) {
    ok = await profiles.create({
      name: formModel.value.name || "",
      description: formModel.value.description,
    });
  } else if (profiles.current) {
    ok = await profiles.update(profiles.current.id, {
      id: profiles.current.id,
      name: formModel.value.name,
      description: formModel.value.description,
    });
  }
  if (ok) {
    // after create, we have id
    if (profiles.current && menuModel.value) {
      profiles.setMenuSelection(menuModel.value.menuItemIds);
      profiles.setDefaultMenu(menuModel.value.defaultMenuItemId);
      await profiles.saveMenuAssignment();
    }
    toast.add({
      severity: "success",
      summary: t(isNew ? "profiles.created" : "profiles.updated"),
      life: 2500,
    });
    if (isNew && profiles.current)
      router.replace({ path: `/profile/${profiles.current.id}` });
  } else {
    toast.add({ severity: "error", summary: t("profiles.error"), life: 3000 });
  }
};
</script>
<template>
  <div class="grid">
    <div class="col-12 lg:col-4">
      <div class="card h-full">
        <FormProfile
          v-model="formModel"
          :submitting="profiles.saving"
          :readonly-system="!!formModel.isSystem"
          @submit="saveProfile"
        />
      </div>
    </div>
    <div class="col-12 lg:col-8">
      <div class="card h-full">
        <ProfileMenuAssignment v-model="menuModel" />
      </div>
    </div>
  </div>
</template>
