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
import { useConfirm } from "primevue/useconfirm";

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const id = route.params.id as string;
const isNew = id === "new";
const store = useStore();
const profiles = useProfilesStore();
const toast = useToast();
const confirm = useConfirm();

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

const initMenuModel = () => {
  const ma = profiles.menuAssignment;
  menuModel.value = ma
    ? {
        menuItemIds: [...ma.menuItemIds],
        defaultMenuItemId: ma.defaultMenuItemId ?? null,
      }
    : { menuItemIds: [], defaultMenuItemId: null };
};

onMounted(async () => {
  refreshHeader();
  if (isNew) {
    profiles.setNew();
    formModel.value = { ...profiles.current };
    initMenuModel();
  } else {
    await profiles.fetchOne(id);
    formModel.value = { ...profiles.current };
    initMenuModel();
  }
});

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

const onMenuSelectionChange = (ids: string[]) => {
  if (!menuModel.value) return;
  menuModel.value.menuItemIds = ids;
  // also update store working selection so other parts remain in sync
  profiles.setMenuSelection(ids);
};

const onSaveMenus = () => {
  confirm.require({
    message:
      (t("profiles.confirmAssignMenus") as string) ||
      "Confirmes desar la selecció de menús?",
    header: (t("common.confirm") as string) || "Confirmació",
    icon: "pi pi-exclamation-triangle",
    accept: async () => {
      if (menuModel.value) {
        profiles.setMenuSelection(menuModel.value.menuItemIds);
      }
      const ok = await profiles.saveMenuAssignment();
      toast.add({
        severity: ok ? "success" : "error",
        summary: ok
          ? (t("common.saved") as string) || "Desat correctament"
          : (t("common.error") as string) || "Error en el procés",
        life: ok ? 2500 : 4000,
      });

      if (
        store.user?.profileId &&
        store.user.profileId === profiles.current?.id
      ) {
        await store.loadUserMenus(store.user);
      }
    },
  });
};
</script>
<template>
  <div class="grid">
    <div class="col-12">
      <div class="card h-full">
        <FormProfile
          v-model="formModel"
          :submitting="profiles.saving"
          :readonly-system="!!formModel.isSystem"
          @submit="saveProfile"
        />
      </div>
    </div>
    <div class="col-12">
      <div class="card">
        <ProfileMenuAssignment
          :profileId="id"
          @menu-selection-change="onMenuSelectionChange"
          @save="onSaveMenus"
        />
      </div>
    </div>
  </div>
</template>
