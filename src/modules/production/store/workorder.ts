import { defineStore } from "pinia";
import {
  WorkOrder,
  WorkOrderPhase,
  WorkOrderPhaseBillOfMaterials,
  WorkOrderPhaseDetail,
} from "../types";
import Services from "../services";

export const useWorkOrderStore = defineStore({
  id: "workorder",
  state: () => ({
    workorder: undefined as WorkOrder | undefined,
    workorders: undefined as Array<WorkOrder> | undefined,
    workorderPhase: undefined as WorkOrderPhase | undefined,
  }),
  getters: {},
  actions: {
    // Workorder
    setNew(id: string) {
      this.workorder = {
        id,
        code: "",
        workMasterId: "",
        referenceId: "",
        exerciceId: "",
        order: 0,
        plannedQuantity: 0,
        plannedDate: "",
        statusId: "",
        startTime: null,
        endTime: null,
        comment: "",
        disabled: false,
        phases: [],
      } as WorkOrder;
    },
    async fetchFiltered(startTime: string, endTime: string, statusId?: string) {
      this.workorders = await Services.WorkOrder.GetBetweenDatesAndStatus(
        startTime,
        endTime,
        statusId
      );
    },
    async fetchAll() {
      this.workorders = await Services.WorkOrder.getAll();
    },
    async fetchOne(id: string) {
      this.workorder = await Services.WorkOrder.getById(id);
    },
    async create(model: WorkOrder) {
      const result = await Services.WorkOrder.create(model);
      if (result) await this.fetchOne(model.id);
      return result;
    },
    async update(id: string, model: WorkOrder) {
      const result = await Services.WorkOrder.update(id, model);
      if (result) await this.fetchAll();
      return result;
    },
    async delete(id: string) {
      const result = await Services.WorkOrder.delete(id);
      if (result) await this.fetchAll();
      return result;
    },

    // Phases
    async fetchPhaseById(id: string) {
      this.workorderPhase = await Services.WorkOrderPhase.getById(id);
    },
    async createPhase(model: WorkOrderPhase) {
      const result = await Services.WorkOrderPhase.create(model);
      if (result) await this.fetchPhaseById(model.id);
      return result;
    },
    async updatePhase(id: string, model: WorkOrderPhase) {
      const result = await Services.WorkOrderPhase.update(id, model);
      if (result) await this.fetchPhaseById(model.id);
      return result;
    },
    async deletePhase(id: string) {
      const result = await Services.WorkOrderPhase.delete(id);
      if (result) await this.fetchOne(this.workorder!.id);
      return result;
    },

    // Phase details
    async createPhaseDetail(model: WorkOrderPhaseDetail) {
      const result = await Services.WorkOrderPhaseDetail.create(model);
      if (result) await this.fetchPhaseById(model.workOrderPhaseId);
      return result;
    },
    async updatePhaseDetail(id: string, model: WorkOrderPhaseDetail) {
      const result = await Services.WorkOrderPhaseDetail.update(id, model);
      if (result) await this.fetchPhaseById(model.workOrderPhaseId);
      return result;
    },
    async deletePhaseDetail(id: string) {
      const result = await Services.WorkOrderPhaseDetail.delete(id);
      if (result) await this.fetchPhaseById(this.workorderPhase!.id);
      return result;
    },

    // Phase bill of materials
    async createPhaseBomItem(model: WorkOrderPhaseBillOfMaterials) {
      const result = await Services.WorkOrderPhaseBillOfMaterials.create(model);
      if (result) await this.fetchPhaseById(model.workOrderPhaseId);
      return result;
    },
    async updatePhaseBomItem(id: string, model: WorkOrderPhaseBillOfMaterials) {
      const result = await Services.WorkOrderPhaseBillOfMaterials.update(
        id,
        model
      );
      if (result) await this.fetchPhaseById(model.workOrderPhaseId);
      return result;
    },
    async deletePhaseBomItem(id: string) {
      const result = await Services.WorkOrderPhaseBillOfMaterials.delete(id);
      if (result) await this.fetchPhaseById(this.workorderPhase!.id);
      return result;
    },
  },
});
