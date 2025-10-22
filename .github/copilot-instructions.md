# Copilot Project Instructions (Lilith Frontend)

Goal: Provide GitHub Copilot with precise architectural & stylistic guidance so generated code aligns with existing patterns.

---

## 0. Quick Essence

Vue 3 + TypeScript + Vite + Pinia + PrimeVue.
Domain-modular layout under `src/modules/<domain>`.
CRUD via service layer (Axios wrappers).
State via Pinia stores named `use<Entity>Store`.
Forms use `<script setup>`, Catalan messages, toast feedback, Yup-or-manual validation, utilities in `utils/functions.ts`.
Date handling: always convert before sending (`convertDateTimeToJSON`).
IDs: `getNewUuid()` for client-side creation.
Reports: `ReportService.Download(...)` then `createBlobAndDownloadFile`.
Maintain Catalan UI text.
If uncertain: imitate closest analogous entity.

---

## 1. Tech & Tooling

- Vue 3 Composition API (`<script setup>` only).
- TypeScript (explicit types for props, emits, store state preferred).
- Pinia for state (`defineStore`).
- Vue Router 4 (route modules per domain).
- PrimeVue + PrimeFlex + PrimeIcons.
- Validation: Yup + custom `FormValidation` helper OR manual error accumulation.
- HTTP: Axios via `api/base.service.ts` and domain services.
- Build: Vite → `dist` → served by Nginx (Dockerfile copies pre-built `dist`).
- i18n structure exists; many literals inline Catalan—preserve.

---

## 2. Directory Strategy

```
src/
  api/            # generic API helpers & base service
  components/     # base + shared components
  modules/<domain>/
    routes.ts
    components/
    services/
    store/
    types/
    views/
  store/          # global stores (auth, menus, filters, geography, backend)
  utils/          # formatting, validation, dates, currency, file download
  types/          # shared types
  views/          # top-level simple/public pages
```

Add new domain by replicating this module structure.

---

## 3. Service Layer Pattern

- Base service centralizes Axios calls.
- Domain services encapsulate endpoint paths & special actions.
- Keep URL fragments centralized; avoid literals in components.
- Return `boolean` or `GenericResponse<T>` (with `result`, `errors`, `content`).

Example:

```ts
export class MyEntityService extends BaseService<MyEntity> {
  constructor() {
    super("MyEntity");
  }
  async GetById(id: string) {
    return this.get<MyEntity>(`/${id}`);
  }
  async Create(payload: MyEntityCreateRequest) {
    return this.post("", payload);
  }
  async Update(id: string, payload: MyEntityUpdateRequest) {
    return this.put(`/${id}`, payload);
  }
  async Delete(id: string) {
    return this.delete(`/${id}`);
  }
}
```

---

## 4. Pinia Store Conventions

```ts
export const useMyEntityStore = defineStore("myEntity", {
  state: () => ({ items: [] as MyEntity[], current: null as MyEntity | null, loading: false }),
  actions: {
    async fetchAll() { ... },
    async fetchOne(id: string) { ... },
    async create(data: MyEntity) { ... },
    async update(id: string, data: MyEntity) { ... },
    async remove(id: string) { ... },
    setNew(id?: string) { this.current = { id: id ?? getNewUuid(), ...defaults }; },
  },
});
```

Rules:

- Mutate state only inside actions.
- After create/update/delete: refresh list or parent entity.
- Separate actions for nested aggregates (phase details, BOM items) re-fetch parent.

---

## 5. Component & Form Patterns

Flow:

1. Read route param.
2. Fetch entity; if absent, set creation mode (`FormActionMode.CREATE`).
3. Configure header/menu via global store.
4. Use reactive clone for dialog edits.
5. Submit: validate → normalize dates → store action → toast → optional navigation.

Dialog pattern:

```ts
const dialog = reactive({ visible: false, title: "Crear ..." });
const openCreate = () => {
  temp.value = { id: getNewUuid(), ...defaults };
  dialog.title = "Crear ...";
  dialog.visible = true;
};
```

---

## 6. Validation

Yup + helper:

```ts
const schema = Yup.object({
  name: Yup.string().required("Nom obligatori"),
  amount: Yup.number().min(0, "Valor no vàlid"),
});
const validation = ref<FormValidationResult>({ isValid: true, errors: {} });
const submit = async () => {
  validation.value = await FormValidation(schema, model.value);
  if (!validation.value.isValid) {
    const msg = Object.values(validation.value.errors).flat().join("\n");
    toast.add({ severity: "warn", summary: msg, life: 8000 });
    return;
  }
  // proceed
};
```

Use Catalan error messages.

---

## 7. Utilities (Use Instead of Rewriting)

`utils/functions.ts` likely includes:

- `getNewUuid()`
- `convertDateTimeToJSON()`
- `formatDateForQueryParameter()`
- `createBlobAndDownloadFile()`
- `formatCurrency()`
- `extractTime()`
  Extend utilities only if new function is reusable and generic.

---

## 8. Date & Time Rules

- Normalize before API calls with `convertDateTimeToJSON`.
- Clone date objects if applying multiple transformations.
- Use `formatDateForQueryParameter` for filtering.
- Avoid scattering `.toLocaleString`; prefer central helpers.

---

## 9. Reporting Pattern

Steps:

1. Fetch report data (`GetReportDataById`).
2. `new ReportService().Download(data, REPORTS.<Kind>, fileName)`.
3. If blob → `createBlobAndDownloadFile`; else toast warning.
   Add new report: extend `REPORTS`, backend endpoint, consistent filename (Catalan components acceptable).

---

## 10. Hierarchical Production Entities

WorkMaster / WorkOrder → Phases → Details & BOM Items.
Child CRUD must re-fetch parent phase. Use consistent property names (`workMasterPhaseId`, `workOrderPhaseId`). Provide defaults (numbers = 0) on creation to avoid `NaN`.

---

## 11. Global Filters (Exercise Picker)

Many list queries depend on `exercisePicker.dates`.
Before fetching:

```ts
if (!exercisePicker.dates) {
  toast.add({ severity: "warn", summary: "Selecciona exercici", life: 4000 });
  return;
}
```

Call `setCurrentYear()` if needed to auto-populate.

---

## 12. Authentication / Menus

- Auth store keeps JWT, user, roles.
- Menus filtered by role.
- After loading entity, call `setMenuItem({ icon, backButtonVisible: true, title })`.
  Keep auth-dependent logic in views, not deep components.

---

## 13. Lifecycle / Status Constraints

- Fetch lifecycle config; compute guards (`canModify<Entity>` etc.).
- Disable controls instead of removing them; provide tooltip or toast.
- Guards are pure (no side-effects).

---

## 14. Toast Usage

- Severities: success / info / warn / error.
- Life: 4–8s typical.
- Catalan summaries: "Creat correctament", "Actualitzat correctament", "Error en el procés".
- Show first backend error message when available.

---

## 15. Error Handling & GenericResponse

`GenericResponse<T>`: `{ result: boolean; errors: string[]; content?: T | null; }`.
Pattern:

```ts
const resp = await service.Update(id, payload);
if (!resp.result) {
  toast.add({
    severity: "error",
    summary: resp.errors[0] || "Error desconegut",
  });
  return false;
}
```

Always null-check `content` before use.

---

## 16. Currency & Numeric Precision

- Keep raw numeric data unrounded.
- Round at display (e.g., `_.round(value, 2)` or `formatCurrency`).

---

## 17. Naming & Style

- Vue SFC filenames: PascalCase.
- Utilities: camelCase filenames.
- Stores: `use<Entity>Store` with id matching entity.
- Functions: camelCase.
- Avoid very large components (> ~200 lines) — extract subcomponents.
- Type emitted events explicitly:

```ts
const emit = defineEmits<{ (e: "saved", entity: MyEntity): void }>();
```

---

## 18. Route Modules

- Each domain `routes.ts` exports `RouteRecordRaw[]`.
- Use lazy imports: `() => import('./views/MyView.vue')`.
- Provide `name` & `path` consistent with naming scheme (`production-workorders`).
- Use `props: true` when binding route params to props.

---

## 19. Reusable Patterns Library

Header + Load:

```ts
onMounted(async () => {
  await store.fetchOne(id);
  const title = store.current
    ? `Editar ${store.current.name}`
    : "Alta nou registre";
  appStore.setMenuItem({
    icon: PrimeIcons.BOOK,
    backButtonVisible: true,
    title,
  });
  if (!store.current) store.setNew();
});
```

Submit Handler:

```ts
const submit = async () => {
  const entity = store.current!;
  const ok =
    formMode.value === FormActionMode.CREATE
      ? await store.create(entity)
      : await store.update(entity.id, entity);
  if (ok) toast.add({ severity: "success", summary: "Desat correctament" });
};
```

Report Download:

```ts
const download = async () => {
  const data = await service.GetReportDataById(id);
  if (!data) {
    toast.add({ severity: "warn", summary: "Sense dades" });
    return;
  }
  const blob = await new ReportService().Download(
    data,
    REPORTS.ORDER,
    fileName
  );
  if (!blob) {
    toast.add({ severity: "warn", summary: "Error al generar" });
    return;
  }
  createBlobAndDownloadFile(fileName, blob);
};
```

Dialog CRUD (Nested Item):

```ts
const openEdit = (row: PhaseDetail) => {
  temp.value = { ...row };
  dialog.value.visible = true;
  formMode.value = FormActionMode.EDIT;
};
const saveDetail = async () => {
  const ok =
    formMode.value === FormActionMode.CREATE
      ? await phaseStore.createDetail(temp.value)
      : await phaseStore.updateDetail(temp.value.id, temp.value);
  if (ok) {
    await phaseStore.fetchPhaseById(parentId);
    dialog.value.visible = false;
    toast.add({ severity: "success", summary: "Desat" });
  }
};
```

---

## 20. Extending Utilities

Add only if:

- Generic (not domain-specific).
- Reused by ≥ 2 components.
  Include concise JSDoc for new utilities.

---

## 21. Performance & Reactivity

- Use `computed` for derived heavy arrays.
- Debounce rapid search calls (wrap with lodash debounce if added).
- Avoid redundant reactive copies of store arrays.
- Use `storeToRefs` when destructuring store state.

---

## 22. Testing (Future)

If tests are introduced:

- Use Vitest/Jest for utilities (pure functions first).
- Component tests: form validation & event emission.
- Store tests: mock service layer (module mock or dependency injection).
- Prefer Catalan for test descriptions to match UI language (optional).

---

## 23. Internationalization Roadmap

If migrating literals into i18n:

- Key format: `domain.section.label` (e.g., `sales.order.total`).
- Catalan as base, add other locales gradually.
- Avoid mixing raw strings & `$t` for same label in one component.

---

## 24. New Feature Checklist

[ ] Define types (`modules/<domain>/types`).
[ ] Implement service (CRUD + special actions).
[ ] Create Pinia store (state, actions, fetch strategy).
[ ] Add route(s) (`modules/<domain>/routes.ts`).
[ ] Build views (list + detail) with patterns.
[ ] Implement forms/dialogs (validation, toasts, Catalan messages).
[ ] Use utilities (UUID, date conversion, currency formatting).
[ ] Add report integration (if applicable).
[ ] Apply lifecycle/status guards (if relevant).
[ ] Validate exercise/date dependency before queries.
[ ] Update menus/navigation if needed.

---

## 25. DO / AVOID (Condensed)

DO:

- Reuse helpers & naming conventions.
- Keep logic in store actions.
- Validate before API calls.
- Keep UI copy Catalan.
- Round numbers only at display layer.

AVOID:

- Hard-coded API URLs in components.
- Duplicated validation logic.
- Mixing languages.
- Directly mutating store arrays outside actions.
- Rewriting existing utility logic.

---

## 26. Guardrails for Copilot

If prompt suggests:

- Options API → Switch to Composition API.
- Direct Axios in component → Use/extend service layer.
- English/Spanish labels → Convert to Catalan.
- New date formatting duplicating helper → Reference existing utility.
- Complex business calc inline in component → Move to store or utility.

---

## 27. Safe Scaffolds

Copilot may confidently generate: new store skeleton, service methods, form with Yup, report download handler, dialog-based nested CRUD, route module entry.

---

## 28. Handling Uncertainty

If entity shape unclear:

- Inspect analogous domain code.
- Mirror naming & property patterns.
- Insert `// TODO: confirm backend contract` for assumptions.

---

## 29. Quality Bar

Generated code should:

- Type-check (no implicit `any`).
- Avoid unused imports.
- Functions < ~40 lines (split if larger).
- Use early returns for validation failures.
- Null/undefined guard nested access.

---

## 30. Core Principle

Consistency over novelty. Replicate proven patterns, keep Catalan UX language, leverage utilities, centralize side-effects in Pinia stores.

---

End of instructions.
