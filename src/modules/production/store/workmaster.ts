import { defineStore } from "pinia";
import {
  WorkMaster,
  WorkMasterPhase,
  WorkMasterPhaseBillOfMaterials,
  WorkMasterPhaseDetail,
  WorkMasterToCopy,
} from "../types";
import Services from "../services";
import { GenericResponse } from "../../../types";

export const useWorkMasterStore = defineStore({
  id: "workmaster",
  state: () => ({
    workmaster: undefined as WorkMaster | undefined,
    workmasters: undefined as Array<WorkMaster> | undefined,
    workmasterPhase: undefined as WorkMasterPhase | undefined,
    workmasterToCopy: undefined as WorkMasterToCopy | undefined,
  }),
  getters: {
    getByReferenceId: (state) => {
      return (referenceId: string): Array<WorkMaster> => {
        if (!referenceId || !state.workmasters) return [];

        return state.workmasters.filter((w) => w.referenceId === referenceId);
      };
    },
  },
  actions: {
    // Workmaster
    setNew(id: string) {
      this.workmaster = {
        id: id,
        baseQuantity: 1,
        referenceId: "",
        disabled: false,
        phases: [],
      } as WorkMaster;
    },
    async fetchAll() {
      this.workmasters = await Services.WorkMaster.getAll();
    },
    async fetchAllActives() {
      this.workmasters = await Services.WorkMaster.getAll();
      this.workmasters = this.workmasters?.filter((w) => !w.disabled);
    },
    async fetchOne(id: string) {
      this.workmaster = await Services.WorkMaster.getById(id);
    },
    async create(model: WorkMaster) {
      const result = await Services.WorkMaster.create(model);
      if (result) await this.fetchOne(model.id);
      return result;
    },
    async update(id: string, model: WorkMaster) {
      const result = await Services.WorkMaster.update(id, model);
      if (result) await this.fetchAll();
      return result;
    },
    async delete(id: string) {
      const result = await Services.WorkMaster.delete(id);
      if (result) await this.fetchAll();
      return result;
    },
    async calculate(id: string): Promise<GenericResponse<number>> {
      const result = await Services.WorkMaster.calculateCost(id);
      return result;
    },
    async copy(model: WorkMasterToCopy) {
      const result = await Services.WorkMaster.copyWorkMaster(model);
      if (result) await this.fetchAll();
      return result;
    },

    // Phases
    async fetchPhaseById(id: string) {
      this.workmasterPhase = await Services.WorkMasterPhase.getById(id);
    },
    async createPhase(model: WorkMasterPhase) {
      const result = await Services.WorkMasterPhase.create(model);
      if (result) await this.fetchPhaseById(model.id);
      return result;
    },
    async updatePhase(id: string, model: WorkMasterPhase) {
      const result = await Services.WorkMasterPhase.update(id, model);
      if (result) await this.fetchPhaseById(model.id);
      return result;
    },
    async deletePhase(id: string) {
      const result = await Services.WorkMasterPhase.delete(id);
      if (result) await this.fetchOne(this.workmaster!.id);
      return result;
    },

    // Phase details
    async createPhaseDetail(model: WorkMasterPhaseDetail) {
      const result = await Services.WorkMasterPhaseDetail.create(model);
      if (result) await this.fetchPhaseById(model.workMasterPhaseId);
      return result;
    },
    async updatePhaseDetail(id: string, model: WorkMasterPhaseDetail) {
      const result = await Services.WorkMasterPhaseDetail.update(id, model);
      if (result) await this.fetchPhaseById(model.workMasterPhaseId);
      return result;
    },
    async deletePhaseDetail(id: string) {
      const result = await Services.WorkMasterPhaseDetail.delete(id);
      if (result) await this.fetchPhaseById(this.workmasterPhase!.id);
      return result;
    },

    // Phase bill of materials
    async createPhaseBomItem(model: WorkMasterPhaseBillOfMaterials) {
      const result = await Services.WorkMasterPhaseBillOfMaterials.create(
        model
      );
      if (result) await this.fetchPhaseById(model.workMasterPhaseId);
      return result;
    },
    async updatePhaseBomItem(
      id: string,
      model: WorkMasterPhaseBillOfMaterials
    ) {
      const result = await Services.WorkMasterPhaseBillOfMaterials.update(
        id,
        model
      );
      if (result) await this.fetchPhaseById(model.workMasterPhaseId);
      return result;
    },
    async deletePhaseBomItem(id: string) {
      const result = await Services.WorkMasterPhaseBillOfMaterials.delete(id);
      if (result) await this.fetchPhaseById(this.workmasterPhase!.id);
      return result;
    },
  },
});
