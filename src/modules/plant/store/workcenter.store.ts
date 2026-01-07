import { defineStore } from "pinia";
import {
  Workcenter,
  WorkOrder,
  WorkOrderWithPhases,
} from "../../production/types";
import {
  WorkcenterRealtime,
  WorkcenterViewState,
  RealtimeHandler,
  WorkcenterRealtimeHandler,
} from "../types";
import ProductionServices from "../../production/services";
import ActionsService from "../services/actions.service";
import { FileService } from "../../../services/file.service";
import { File } from "../../../types";
import { usePlantOperatorStore } from "./operator.store";

export const usePlantWorkcenterStore = defineStore("plantWorkcenterStore", {
  state: () => ({
    workcenter: undefined as Workcenter | undefined,
    workcenterRt: undefined as WorkcenterRealtime | undefined,
    loadedWorkOrders: [] as WorkOrderWithPhases[],
    productionInstructionsDocuments: [] as File[],
    _realtimeHandler: null as
      | RealtimeHandler
      | WorkcenterRealtimeHandler
      | null,
    _lastLoadedPhaseIds: [] as string[],
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
      this.workcenter =
        await ProductionServices.Workcenter.getById(workcenterId);
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
    connectToWorkcenter(workcenterId: string) {
      if (this._realtimeHandler) {
        this._realtimeHandler.cleanup();
      }
      const handler = ActionsService.client.connectToWorkcenter(workcenterId);
      handler.onUpdate((data) => {
        this.workcenterRt = data;

        // Extract phase IDs from workorders array (normalize PascalCase to camelCase)
        const phaseIds = (data.Workorders || []).map(
          (wo: any) => wo.workOrderPhaseId || wo.WorkOrderPhaseId
        );

        // Check if phase IDs have changed
        const hasChanged =
          phaseIds.length !== this._lastLoadedPhaseIds.length ||
          phaseIds.some(
            (id: string, idx: number) => id !== this._lastLoadedPhaseIds[idx]
          );

        if (hasChanged) {
          // Clear immediately if empty
          if (phaseIds.length === 0) {
            this.loadedWorkOrders = [];
            this._lastLoadedPhaseIds = [];
          } else {
            // Fetch new data when phase IDs have changed
            this.fetchLoadedWorkOrders(phaseIds);
          }
        }
      });
      this._realtimeHandler = handler;
    },
    async fetchLoadedWorkOrders(phaseIds: string[]) {
      if (!phaseIds || phaseIds.length === 0) {
        this.loadedWorkOrders = [];
        this._lastLoadedPhaseIds = [];
        this.productionInstructionsDocuments = [];
        return;
      }

      try {
        const workOrders =
          await ProductionServices.WorkOrderPhase.GetLoadedByPhaseIds(phaseIds);
        this.loadedWorkOrders = workOrders || [];
        this._lastLoadedPhaseIds = phaseIds;

        // Carregar automàticament la documentació de la primera workorder
        if (this.loadedWorkOrders.length > 0) {
          const firstWorkOrder = this.loadedWorkOrders[0];
          if (firstWorkOrder.salesReferenceId) {
            await this.fetchWorkInstructionDocuments(
              firstWorkOrder.salesReferenceId
            );
          }
        } else {
          this.productionInstructionsDocuments = [];
        }
      } catch (error) {
        console.error("Error fetching loaded work orders:", error);
        this.loadedWorkOrders = [];
        this.productionInstructionsDocuments = [];
      }
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
    clearWorkcenter() {
      // Desconnectar WebSocket si està actiu
      this.disconnectWebSocket();

      // Netejar tot l'estat del workcenter
      this.workcenter = undefined;
      this.workcenterRt = undefined;
      this.loadedWorkOrders = [];
      this.productionInstructionsDocuments = [];
      this._lastLoadedPhaseIds = [];
    },
  },
});
