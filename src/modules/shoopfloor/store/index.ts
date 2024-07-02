import { defineStore } from "pinia";
import { Operator } from "../../production/types";
import { Workcenter } from "../types";
import { RealtimeService } from "../services/realtime.service";
import { FileService } from "../../../api/services/file.service";
import { loadImage } from "../../../utils/functions";

const localStorageOperatorKey = "temges.operator";

export const useShoopfloorStore = defineStore("shopfloorStore", {
  state: () => {
    return {
      operator: undefined as Operator | undefined,
      workcenters: undefined as Workcenter[] | undefined,
      workcenter: undefined as Workcenter | undefined,
      workcenterImageBlob: undefined as Blob | undefined,
    };
  },
  actions: {
    async getOperator(): Promise<Operator | undefined> {
      if (this.operator !== undefined) {
        return this.operator;
      }
      const lsValue = localStorage.getItem(localStorageOperatorKey);
      if (lsValue !== null) {
        await this.setOperator(JSON.parse(lsValue));
        return this.operator;
      }
    },
    async setOperator(operator: Operator) {
      this.operator = operator;
      localStorage.setItem(localStorageOperatorKey, JSON.stringify(operator));
    },
    removeOperator() {
      this.operator = undefined;
      localStorage.removeItem(localStorageOperatorKey);
    },

    async fetchWorkcenters() {
      this.workcenters = undefined;

      const service = new RealtimeService();
      const response = await service.GetWorkcenters();
      if (response && response.content) this.workcenters = response.content;
    },
    async fetchWorkcenter(id: string, withImage = false) {
      this.workcenter = undefined;

      const service = new RealtimeService();
      const response = await service.GetWorkcenter(id);
      if (response && response.content) this.workcenter = response.content;

      if (withImage && this.workcenter) {
        const fileService = new FileService();
        const files = await fileService.GetEntityFiles(
          "WorkcenterPicture",
          this.workcenter.workcenterId
        );
        if (files && files.length > 0) {
          const response = await fileService.Download(files[0]);
          this.workcenterImageBlob = new Blob([response], {
            type: "image/jpeg",
          });
        }
      }
    },

    async clockInOperator(operatorId: string) {
      if (!this.workcenter) return;

      const service = new RealtimeService();
      const response = await service.ClockInOperator({
        operatorId,
        workcenterId: this.workcenter.workcenterId,
      });
      if (response && response.result) {
        await this.fetchWorkcenter(this.workcenter!.workcenterId);
      }
    },
    async clockOutOperator(operatorId: string) {
      if (!this.workcenter) return;

      const service = new RealtimeService();
      const response = await service.ClockOutOperator({
        operatorId,
        workcenterId: this.workcenter.workcenterId,
      });
      if (response && response.result) {
        await this.fetchWorkcenter(this.workcenter!.workcenterId);
      }
    },

    async openWorkOrderPhase(workOrderPhaseId: string) {
      if (!this.workcenter) return;

      const service = new RealtimeService();
      const response = await service.OpenWorkOrderPhase({
        workOrderPhaseId,
        workcenterId: this.workcenter.workcenterId,
      });
      if (response && response.result) {
        await this.fetchWorkcenter(this.workcenter!.workcenterId);
      }
    },
    async closeWorkOrderPhase(workOrderPhaseId: string) {
      if (!this.workcenter) return;

      const service = new RealtimeService();
      const response = await service.CloseWorkOrderPhase({
        workOrderPhaseId,
        workcenterId: this.workcenter.workcenterId,
      });
      if (response && response.result) {
        await this.fetchWorkcenter(this.workcenter!.workcenterId);
      }
    },
  },
});
