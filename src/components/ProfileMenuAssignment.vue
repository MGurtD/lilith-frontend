<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useMenusStore } from "../store/menus";
import { useProfilesStore } from "../store/profiles";
import type { MenuItemNode } from "../types/menuitem";

const props = defineProps<{ profileId: string }>();

const { t } = useI18n();
const menusStore = useMenusStore();
const profilesStore = useProfilesStore();

const emit = defineEmits<{
  (e: "menu-selection-change", ids: string[]): void;
  (e: "menu-assignment-loaded"): void;
  (e: "save"): void;
}>();

interface RowItem {
  id: string;
  key: string;
  title: string;
  route?: string | null;
  sortOrder: number;
  icon?: string | null;
  level: number;
  parentId: string | null;
  hasChildren: boolean;
}

const parentMap = ref<Map<string, string | null>>(new Map());
const childrenMap = ref<Map<string, string[]>>(new Map());
const rows = ref<RowItem[]>([]);

const buildIndexes = (nodes: MenuItemNode[]) => {
  parentMap.value = new Map();
  childrenMap.value = new Map();
  const visit = (node: MenuItemNode, parentId: string | null) => {
    parentMap.value.set(node.id, parentId);
    if (!childrenMap.value.has(parentId || "__root__")) {
      childrenMap.value.set(parentId || "__root__", []);
    }
    childrenMap.value.get(parentId || "__root__")!.push(node.id);
    if (node.children?.length) {
      childrenMap.value.set(
        node.id,
        node.children.map((c) => c.id),
      );
      node.children.forEach((c) => visit(c, node.id));
    } else {
      childrenMap.value.set(node.id, []);
    }
  };
  nodes.forEach((n) => visit(n, null));
};

const buildRows = (nodes: MenuItemNode[]) => {
  const result: RowItem[] = [];
  const walk = (node: MenuItemNode, parentId: string | null, level: number) => {
    result.push({
      id: node.id,
      key: node.key,
      title: node.title,
      route: node.route ?? null,
      sortOrder: node.sortOrder,
      icon: node.icon ?? null,
      level,
      parentId,
      hasChildren: !!node.children?.length,
    });
    node.children?.forEach((c) => walk(c, node.id, level + 1));
  };
  nodes.forEach((n) => walk(n, null, 0));
  rows.value = result;
};

// Selection using DataTable pattern
const selectionRows = ref<RowItem[]>([]);
const selectionIds = ref<Set<string>>(new Set());

const syncSelectionRows = () => {
  selectionRows.value = rows.value.filter((r) => selectionIds.value.has(r.id));
};

const seedSelectionFromStore = () => {
  const ids = new Set<string>(profilesStore.menuAssignment?.menuItemIds ?? []);
  // ensure ancestors visible as selected
  const withAncestors = new Set<string>(ids);
  for (const id of ids) {
    let p = parentMap.value.get(id) ?? null;
    while (p) {
      withAncestors.add(p);
      p = parentMap.value.get(p) ?? null;
    }
  }
  selectionIds.value = withAncestors;
  syncSelectionRows();
};

const getDescendants = (id: string): string[] => {
  const res: string[] = [];
  const stack: string[] = [...(childrenMap.value.get(id) ?? [])];
  while (stack.length) {
    const cid = stack.pop()!;
    res.push(cid);
    const kids = childrenMap.value.get(cid) ?? [];
    if (kids.length) stack.push(...kids);
  }
  return res;
};

const getAncestors = (id: string): string[] => {
  const res: string[] = [];
  let p = parentMap.value.get(id) ?? null;
  while (p) {
    res.push(p);
    p = parentMap.value.get(p) ?? null;
  }
  return res;
};

const addWithDependencies = (id: string) => {
  selectionIds.value.add(id);
  getDescendants(id).forEach((d) => selectionIds.value.add(d));
  getAncestors(id).forEach((a) => selectionIds.value.add(a));
};

const removeWithDependencies = (id: string) => {
  selectionIds.value.delete(id);
  getDescendants(id).forEach((d) => selectionIds.value.delete(d));
  // remove ancestors that have no selected descendants
  for (const a of getAncestors(id)) {
    const anyBelow = getDescendants(a).some((d) => selectionIds.value.has(d));
    if (!anyBelow) selectionIds.value.delete(a);
  }
};

const onRowSelect = (e: any) => {
  const row: RowItem = e.data;
  addWithDependencies(row.id);
  syncSelectionRows();
  emit("menu-selection-change", Array.from(selectionIds.value));
};

const onRowUnselect = (e: any) => {
  const row: RowItem = e.data;
  removeWithDependencies(row.id);
  syncSelectionRows();
  emit("menu-selection-change", Array.from(selectionIds.value));
};

const onSelectAll = () => {
  selectionIds.value = new Set(rows.value.map((r) => r.id));
  syncSelectionRows();
  emit("menu-selection-change", Array.from(selectionIds.value));
};

const onUnselectAll = () => {
  selectionIds.value.clear();
  syncSelectionRows();
  emit("menu-selection-change", Array.from(selectionIds.value));
};

const loading = computed(
  () =>
    menusStore.treeLoading ||
    profilesStore.menuLoading ||
    menusStore.loading ||
    profilesStore.saving,
);

const saveSelection = () => {
  emit("save");
};

// Search filter
const searchFilter = ref("");

const filteredRows = computed<RowItem[]>(() => {
  if (!searchFilter.value) return rows.value;

  const searchLower = searchFilter.value.toLowerCase();
  return rows.value.filter(
    (row) =>
      row.title.toLowerCase().includes(searchLower) ||
      row.key.toLowerCase().includes(searchLower),
  );
});

const rootEl = ref<HTMLElement | null>(null);

onMounted(async () => {
  console.log(
    "ProfileMenuAssignment: Starting data load for profile",
    props.profileId,
  );

  try {
    // Step 1: Load menu hierarchy (await properly, no promise chains)
    console.log("ProfileMenuAssignment: Loading menu hierarchy...");
    await menusStore.fetchHierarchy(true);
    console.log(
      "ProfileMenuAssignment: Menu hierarchy loaded, tree length:",
      menusStore.tree.length,
    );

    // Step 2: Build UI structure from menu tree
    buildIndexes(menusStore.tree);
    buildRows(menusStore.tree);
    console.log("ProfileMenuAssignment: Rows built:", rows.value.length);

    // Step 3: Load menu assignment for this profile (independent of parent)
    console.log(
      "ProfileMenuAssignment: Loading menu assignment for profile...",
    );
    await profilesStore.fetchMenuAssignment(props.profileId);
    console.log(
      "ProfileMenuAssignment: Menu assignment loaded:",
      profilesStore.menuAssignment,
    );

    // Step 4: Seed selection from loaded data
    seedSelectionFromStore();
    console.log(
      "ProfileMenuAssignment: Selection seeded, selected IDs:",
      selectionIds.value.size,
    );

    // Step 5: Notify parent that data is loaded and ready
    emit("menu-assignment-loaded");
    console.log("ProfileMenuAssignment: Emitted menu-assignment-loaded event");
  } catch (err) {
    console.error("ProfileMenuAssignment: Error during data load:", err);
    // Initialize empty rows so UI doesn't break
    rows.value = [];
    // Still emit the event so parent can initialize with empty data
    emit("menu-assignment-loaded");
  }

  console.log("ProfileMenuAssignment: Initialization complete");
});

// NO WATCHERS - All data loading is handled in onMounted with proper async/await
// This prevents reactivity-based deadlocks and makes the flow transparent
</script>

<template>
  <div class="card profile-menu-assignment" ref="rootEl">
    <DataTable
      scrollable
      scrollHeight="flex"
      :value="filteredRows"
      v-model:selection="selectionRows"
      :loading="loading"
      dataKey="id"
      selectionMode="multiple"
      @row-select="onRowSelect"
      @row-unselect="onRowUnselect"
      @select-all-change="
        ($event) => ($event.checked ? onSelectAll() : onUnselectAll())
      "
    >
      <template #header>
        <div
          class="flex flex-wrap align-items-center justify-content-between gap-2"
        >
          <div class="datatable-filter-1">
            <IconField iconPosition="left">
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText
                v-model="searchFilter"
                :placeholder="t('common.search')"
                class="w-full"
              />
            </IconField>
          </div>
          <div class="datatable-buttons">
            <Button
              size="small"
              icon="pi pi-link"
              :label="t('common.assign') || 'Assignar'"
              @click="saveSelection"
            />
          </div>
        </div>
      </template>

      <Column selectionMode="multiple" headerStyle="width: 3rem" />

      <Column :header="t('menuItems.title') || 'Títol'">
        <template #body="slotProps">
          <div class="flex align-items-center">
            <span :style="{ marginLeft: slotProps.data.level * 16 + 'px' }">{{
              slotProps.data.title
            }}</span>
          </div>
        </template>
      </Column>
      <Column
        field="key"
        :header="t('menuItems.key') || 'Clau'"
        style="width: 20%"
      />
      <Column
        field="route"
        :header="t('menuItems.route') || 'Ruta'"
        style="width: 25%"
      />
      <Column
        field="sortOrder"
        :header="t('menuItems.order') || 'Ordre'"
        style="width: 8%"
      />
    </DataTable>
  </div>
</template>

<style scoped>
.p-datatable .p-datatable-tbody > tr > td {
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
}
.profile-menu-assignment {
  display: flex;
  flex-direction: column;
}
.profile-menu-assignment :deep(.p-datatable-wrapper) {
  flex: 1 1 auto;
}
</style>
