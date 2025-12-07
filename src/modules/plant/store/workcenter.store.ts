import { defineStore } from "pinia";
import { Workcenter, WorkOrder } from "../../production/types";
import {
  WorkcenterRealtime,
  WorkcenterViewState,
  RealtimeHandler,
  WorkcenterRealtimeHandler,
} from "../types";
import ProductionServices from "../../production/services";
import ActionsService from "../services/actions.service";
import { FileService } from "../../../api/services/file.service";
import { File } from "../../../types";
import { usePlantOperatorStore } from "./operator.store";

export const usePlantWorkcenterStore = defineStore("plantWorkcenterStore", {
  state: () => ({
    workcenter: undefined as Workcenter | undefined,
    workcenterPictureBlob: undefined as Blob | undefined,
    workcenterPictureUrl: undefined as string | undefined,
    workcenterRt: undefined as WorkcenterRealtime | undefined,
    selectedWorkOrder: undefined as WorkOrder | undefined,
    productionInstructionsDocuments: [] as File[],
    _realtimeHandler: null as
      | RealtimeHandler
      | WorkcenterRealtimeHandler
      | null,
  }),
  getters: {
    workcenterView(): WorkcenterViewState | undefined {
      if (!this.workcenter) return undefined;
      return {
        config: this.workcenter,
        realtime: this.workcenterRt,
      };
    },
  },
  actions: {
    async fetchWorkcenter(workcenterId: string) {
      this.selectedWorkOrder = undefined;
      this.workcenter =
        await ProductionServices.Workcenter.getById(workcenterId);
      if (this.workcenter) {
        this.fetchWorkcenterPicture();
        await this.restoreSelectedWorkOrder();
      }
    },
    async fetchWorkcenterPicture() {
      if (!this.workcenter) return;
      try {
        const fileService = new FileService();
        const files = await fileService.GetEntityFiles(
          "WorkcenterPicture",
          this.workcenter.id
        );
        if (files && files.length > 0) {
          const response = await fileService.Download(files[0]);
          this.workcenterPictureBlob = new Blob([response], {
            type: "image/jpeg",
          });
          if (this.workcenterPictureUrl) {
            URL.revokeObjectURL(this.workcenterPictureUrl);
          }
          this.workcenterPictureUrl = URL.createObjectURL(
            this.workcenterPictureBlob
          );
        } else {
          this.clearWorkcenterPicture();
        }
      } catch (error) {
        console.error("Error loading workcenter picture:", error);
        this.clearWorkcenterPicture();
      }
    },
    clearWorkcenterPicture() {
      if (this.workcenterPictureUrl) {
        URL.revokeObjectURL(this.workcenterPictureUrl);
      }
      this.workcenterPictureUrl = undefined;
    },
    async fetchWorkInstructionDocuments(referenceId: string) {
      if (!this.workcenter) return;
      const fileService = new FileService();
      const files = await fileService.GetEntityFiles(
        "referenceMaps",
        referenceId
      );
      if (files) {
        this.productionInstructionsDocuments = files;
      }
    },
    async restoreSelectedWorkOrder() {
      if (!this.workcenter) return;
      const key = `plant_workcenter_${this.workcenter.id}_selected_wo`;
      const storedId = localStorage.getItem(key);
      if (storedId) {
        try {
          const wo = await ProductionServices.WorkOrder.getById(storedId);
          if (wo) {
            this.selectedWorkOrder = wo;
          } else {
            localStorage.removeItem(key);
          }
        } catch (error) {
          console.error("Error restoring selected work order:", error);
          localStorage.removeItem(key);
        }
      }
    },
    connectToWorkcenter(workcenterId: string) {
      if (this._realtimeHandler) {
        this._realtimeHandler.cleanup();
      }
      const handler = ActionsService.client.connectToWorkcenter(workcenterId);
      handler.onUpdate((data) => {
        this.workcenterRt = data;
      });
      this._realtimeHandler = handler;
    },
    disconnectWebSocket() {
      if (this._realtimeHandler) {
        this._realtimeHandler.cleanup();
        this._realtimeHandler = null;
      }
      this.workcenterRt = undefined;
    },
    async clockInOperator(): Promise<boolean> {
      const operatorStore = usePlantOperatorStore();
      if (!this.workcenter || !operatorStore.operator) return false;
      return await ActionsService.client.clockInOperator({
        operatorId: operatorStore.operator.id,
        workcenterId: this.workcenter.id,
      });
    },
    async clockOutOperator(): Promise<boolean> {
      const operatorStore = usePlantOperatorStore();
      if (!this.workcenter || !operatorStore.operator) return false;
      return await ActionsService.client.clockOutOperator({
        operatorId: operatorStore.operator.id,
        workcenterId: this.workcenter.id,
      });
    },
    async changeMachineStatus(
      statusId: string,
      statusReasonId?: string
    ): Promise<boolean> {
      if (!this.workcenter) return false;
      return await ActionsService.client.changeMachineStatus({
        workcenterId: this.workcenter.id,
        statusId,
        statusReasonId,
      });
    },
    setSelectedWorkOrder(workOrder: WorkOrder) {
      this.selectedWorkOrder = workOrder;
      if (this.workcenter) {
        localStorage.setItem(
          `plant_workcenter_${this.workcenter.id}_selected_wo`,
          workOrder.id
        );
      }
    },
    clearSelectedWorkOrder() {
      this.selectedWorkOrder = undefined;
      if (this.workcenter) {
        localStorage.removeItem(
          `plant_workcenter_${this.workcenter.id}_selected_wo`
        );
      }
    },
  },
});
