<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import { getMenuItemsHierarchy } from "../api/services/menuitem.service";
import type { MenuItemNode } from "../types/menuitem";

interface AssignmentModel {
  menuItemIds: string[];
  defaultMenuItemId?: string | null;
}
const props = defineProps<{
  modelValue: AssignmentModel | null;
  disabled?: boolean;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", value: AssignmentModel): void;
}>();
const { t } = useI18n();

const hierarchy = ref<MenuItemNode[]>([]);
const loading = ref(false);
const search = ref("");

interface FlatRow {
  id: string;
  title: string;
  route?: string | null;
  depth: number;
  parentId?: string | null;
  childrenIds: string[];
}
const flatRows = ref<FlatRow[]>([]);
// Reactive selection map id -> boolean
const selectionMap = ref<Record<string, boolean>>({});

const load = async () => {
  loading.value = true;
  try {
    hierarchy.value = await getMenuItemsHierarchy();
    const rows: FlatRow[] = [];
    const walk = (nodes: MenuItemNode[], depth: number) => {
      nodes
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .forEach((n) => {
          const childrenIds: string[] = [];
          if (n.children?.length) {
            const collect = (c: MenuItemNode) => {
              childrenIds.push(c.id);
              c.children?.forEach(collect);
            };
            n.children.forEach(collect);
          }
          rows.push({
            id: n.id,
            title: n.title,
            route: n.route,
            depth,
            parentId: n.parentId || null,
            childrenIds,
          });
          if (n.children?.length) walk(n.children, depth + 1);
        });
    };
    walk(hierarchy.value, 0);
    flatRows.value = rows;
    if (props.modelValue?.menuItemIds) {
      const map: Record<string, boolean> = {};
      props.modelValue.menuItemIds.forEach((id) => (map[id] = true));
      selectionMap.value = map;
    }
  } finally {
    loading.value = false;
  }
};
onMounted(load);

watch(
  () => props.modelValue?.menuItemIds,
  (v) => {
    if (v) {
      const map: Record<string, boolean> = {};
      v.forEach((id) => (map[id] = true));
      selectionMap.value = map;
    }
  }
);

const visibleRows = computed(() => {
  if (!search.value) return flatRows.value;
  const term = search.value.toLowerCase();
  const matchIds = new Set<string>();
  const parentMap = new Map<string, string | null>();
  flatRows.value.forEach((r) => parentMap.set(r.id, r.parentId || null));
  flatRows.value.forEach((r) => {
    if (
      r.title.toLowerCase().includes(term) ||
      (r.route || "").toLowerCase().includes(term)
    ) {
      let cur: string | null | undefined = r.id;
      while (cur) {
        matchIds.add(cur);
        cur = parentMap.get(cur) || null;
      }
    }
  });
  return flatRows.value.filter((r) => matchIds.has(r.id));
});

const isSelected = (id: string) => !!selectionMap.value[id];
const select = (id: string, value: boolean) => {
  const row = flatRows.value.find((r) => r.id === id);
  if (!row) return;
  const allAffected = [id, ...row.childrenIds];
  allAffected.forEach((a) =>
    value ? (selectionMap.value[a] = true) : delete selectionMap.value[a]
  );
  if (!value) {
    const parentChain = new Map(
      flatRows.value.map(
        (r) => [r.id, r.parentId || null] as [string, string | null]
      )
    );
    let parent = row.parentId || null;
    while (parent) {
      const siblingsSelected = flatRows.value
        .filter((r) => r.parentId === parent)
        .some((s) => selectionMap.value[s.id]);
      if (!siblingsSelected) delete selectionMap.value[parent];
      parent = parentChain.get(parent) || null;
    }
  } else {
    let parent = row.parentId || null;
    const parentChain = new Map(
      flatRows.value.map(
        (r) => [r.id, r.parentId || null] as [string, string | null]
      )
    );
    while (parent) {
      selectionMap.value[parent] = true;
      parent = parentChain.get(parent) || null;
    }
  }
  emit("update:modelValue", {
    menuItemIds: Object.keys(selectionMap.value),
    defaultMenuItemId: props.modelValue?.defaultMenuItemId ?? null,
  });
};
const toggleRow = (row: FlatRow) => select(row.id, !isSelected(row.id));
const bulkSelect = () => {
  const map: Record<string, boolean> = {};
  flatRows.value.forEach((r) => (map[r.id] = true));
  selectionMap.value = map;
  emit("update:modelValue", {
    menuItemIds: Object.keys(selectionMap.value),
    defaultMenuItemId: props.modelValue?.defaultMenuItemId ?? null,
  });
};
const bulkDeselect = () => {
  selectionMap.value = {};
  emit("update:modelValue", { menuItemIds: [], defaultMenuItemId: null });
};
</script>

<template>
  <div class="profile-menu-assignment">
    <div class="flex align-items-center justify-content-between mb-2">
      <span class="font-bold">{{ t("profiles.menuAssignment.title") }}</span>
      <div class="flex gap-2">
        <Button
          size="small"
          :label="t('profiles.menuAssignment.bulkSelect')"
          @click="bulkSelect"
          :disabled="disabled || loading"
        />
        <Button
          size="small"
          :label="t('profiles.menuAssignment.bulkDeselect')"
          severity="secondary"
          @click="bulkDeselect"
          :disabled="disabled || loading"
        />
      </div>
    </div>
    <span class="p-input-icon-left w-full mb-2">
      <i class="pi pi-search" />
      <InputText
        v-model="search"
        class="w-full"
        :placeholder="t('profiles.menuAssignment.searchPlaceholder')"
      />
    </span>
    <div v-if="loading" class="py-4 flex justify-content-center">
      <ProgressSpinner style="width: 40px; height: 40px" strokeWidth="4" />
    </div>
    <div v-else>
      <DataTable
        :value="visibleRows"
        dataKey="id"
        scrollable
        scrollHeight="400px"
        tableStyle="min-width:40rem"
      >
        <Column :header="t('menuItems.title')">
          <template #body="{ data }">
            <div class="flex align-items-center">
              <Checkbox
                :binary="true"
                :modelValue="isSelected(data.id)"
                @change="toggleRow(data)"
                class="mr-2"
              />
              <span :style="{ marginLeft: data.depth * 1.25 + 'rem' }">{{
                data.title
              }}</span>
            </div>
          </template>
        </Column>
        <Column
          field="route"
          :header="t('menuItems.route')"
          style="width: 30%"
        />
      </DataTable>
    </div>
  </div>
</template>

<style scoped>
.profile-menu-assignment :deep(.p-datatable) {
  font-size: 0.9rem;
}
</style>
