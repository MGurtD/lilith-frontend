import { defineStore } from "pinia";
import {
  Workcenter,
  WorkOrderWithPhases,
  ValidatePreviousPhaseQuantityRequest,
} from "../../production/types";
import {
  WorkcenterRealtime,
  WorkcenterViewState,
  RealtimeHandler,
  WorkcenterRealtimeHandler,
  NextPhaseInfo,
} from "../types";
import ProductionServices from "../../production/services";
import SharedServices from "../../shared/services";
import ActionsService from "../services/actions.service";
import { FileService } from "../../../services/file.service";
import { File } from "../../../types";
import { usePlantOperatorStore } from "./operator.store";

export const usePlantWorkcenterStore = defineStore("plantWorkcenterStore", {
  state: () => ({
    workcenter: undefined as Workcenter | undefined,
    workcenterRt: undefined as WorkcenterRealtime | undefined,
    loadedWorkOrdersPhases: [] as WorkOrderWithPhases[],
    availableWorkOrders: [] as WorkOrderWithPhases[],
    availableWorkOrdersLoading: false,
    workOrderReferenceDocuments: [] as File[],
    nextAvailablePhase: null as NextPhaseInfo | null,
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
    connectToWorkcenter(workcenterId: string) {
      if (this._realtimeHandler) {
        this._realtimeHandler.cleanup();
      }
      const handler = ActionsService.client.connectToWorkcenter(workcenterId);
      handler.onUpdate((data) => {
        this.workcenterRt = data;

        // Extract phase IDs from workorders array
        const phaseIds = (data.workorders || []).map(
          (wo) => wo.workOrderPhaseId,
        );

        // Check if phase IDs have changed
        const hasChanged =
          phaseIds.length !== this._lastLoadedPhaseIds.length ||
          phaseIds.some(
            (id: string, idx: number) => id !== this._lastLoadedPhaseIds[idx],
          );

        if (hasChanged) {
          // Clear immediately if empty
          if (phaseIds.length === 0) {
            this._lastLoadedPhaseIds = [];
            this.loadedWorkOrdersPhases = [];
            this.workOrderReferenceDocuments = [];
          } else {
            // Fetch new data when phase IDs have changed
            this.fetchLoadedWorkOrders(phaseIds);
          }
        }
      });
      this._realtimeHandler = handler;
    },
    async fetchWorkcenter(workcenterId: string) {
      this.workcenter =
        await ProductionServices.Workcenter.getById(workcenterId);
    },
    async fetchWorkInstructionDocuments(referenceId: string) {
      if (!this.workcenter) return;
      const fileService = new FileService();
      const files = await fileService.GetEntityFiles(
        "referenceMaps",
        referenceId,
      );
      if (files) {
        this.workOrderReferenceDocuments = files;
      }
    },
    async fetchAvailableWorkOrders(workcenterTypeId: string) {
      if (!workcenterTypeId) {
        this.availableWorkOrders = [];
        return;
      }

      this.availableWorkOrdersLoading = true;
      try {
        const workOrders =
          await ProductionServices.WorkOrderPhase.GetPlannedPhasesByWorkcenterType(
            workcenterTypeId,
          );
        this.availableWorkOrders = workOrders || [];
      } catch (error) {
        console.error("Error fetching available work orders:", error);
        this.availableWorkOrders = [];
      } finally {
        this.availableWorkOrdersLoading = false;
      }
    },
    async fetchLoadedWorkOrders(phaseIds: string[]) {
      if (!phaseIds || phaseIds.length === 0) {
        this.loadedWorkOrdersPhases = [];
        this._lastLoadedPhaseIds = [];
        this.workOrderReferenceDocuments = [];
        return;
      }

      try {
        const workOrders =
          await ProductionServices.WorkOrderPhase.GetLoadedByPhaseIds(phaseIds);
        this.loadedWorkOrdersPhases = workOrders || [];
        this._lastLoadedPhaseIds = phaseIds;

        // Carregar automàticament la documentació de la primera workorder
        if (this.loadedWorkOrdersPhases.length > 0) {
          const firstWorkOrder = this.loadedWorkOrdersPhases[0];
          if (firstWorkOrder.salesReferenceId) {
            await this.fetchWorkInstructionDocuments(
              firstWorkOrder.salesReferenceId,
            );
          }
        } else {
          this.workOrderReferenceDocuments = [];
        }
      } catch (error) {
        console.error("Error fetching loaded work orders:", error);
        this.loadedWorkOrdersPhases = [];
        this.workOrderReferenceDocuments = [];
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
      statusReasonId?: string,
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
      this.loadedWorkOrdersPhases = [];
      this.availableWorkOrders = [];
      this.availableWorkOrdersLoading = false;
      this.workOrderReferenceDocuments = [];
      this.nextAvailablePhase = null;
      this._lastLoadedPhaseIds = [];
    },
    async fetchNextPhaseForWorkcenter() {
      this.nextAvailablePhase = null;

      if (
        !this.workcenter ||
        !this.loadedWorkOrdersPhases.length ||
        !this.loadedWorkOrdersPhases[0]?.phases?.length
      ) {
        return;
      }

      const currentPhase = this.loadedWorkOrdersPhases[0].phases[0];

      try {
        const nextPhase =
          await ProductionServices.WorkOrderPhase.GetNextPhaseForWorkcenter(
            currentPhase.phaseId,
            this.workcenter.id,
          );

        if (nextPhase) {
          this.nextAvailablePhase = nextPhase;
        }
      } catch (error) {
        console.error("Error fetching next phase:", error);
      }
    },
    async getPhaseExitStatusId(closePhase: boolean): Promise<string | null> {
      if (!this.loadedWorkOrdersPhases[0]?.phases?.[0]?.phaseStatusId) {
        return null;
      }

      const currentStatusId =
        this.loadedWorkOrdersPhases[0].phases[0].phaseStatusId;
      const targetStatusName = closePhase ? "Tancada" : "Pausa";

      try {
        const transitions =
          await SharedServices.Lifecycle.getAvailableTransitions(
            currentStatusId,
          );

        if (!transitions) return null;

        const targetTransition = transitions.find(
          (t) => t.statusToName === targetStatusName,
        );

        return targetTransition?.statusToId ?? null;
      } catch (error) {
        console.error("Error getting phase exit status:", error);
        return null;
      }
    },
    async validatePhaseQuantity(
      quantity: number,
    ): Promise<{ valid: boolean; error?: string }> {
      // Get current loaded phase
      if (!this.workcenterRt?.workorders?.length) {
        return { valid: false, error: "No hi ha cap fase carregada" };
      }

      const currentPhaseId = this.workcenterRt.workorders[0].workOrderPhaseId;

      const request: ValidatePreviousPhaseQuantityRequest = {
        workOrderPhaseId: currentPhaseId,
        quantity: quantity,
      };

      try {
        const response =
          await ProductionServices.WorkOrderPhase.ValidatePreviousPhaseQuantity(
            request,
          );

        if (response.result) {
          return { valid: true };
        } else {
          return {
            valid: false,
            error: response.errors?.[0] || "Error de validació",
          };
        }
      } catch (error) {
        console.error("Error validating phase quantity:", error);
        return { valid: false, error: "Error de connexió amb el servidor" };
      }
    },
  },
});
