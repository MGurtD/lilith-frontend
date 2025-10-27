import { defineStore } from "pinia";
import { Area, Operator, Site, Workcenter } from "../../production/types";
import {
  WorkcenterRealtime,
  WorkcenterViewState,
  RealtimeHandler,
  WorkcenterRealtimeHandler,
} from "../types";
import ProductionServices from "../../production/services";
import ActionsService from "../services/realtime.service";
import { FileService } from "../../../api/services/file.service";
import { File } from "../../../types";

const localStorageOperatorKey = "temges.operator";

export const usePlantStore = defineStore("plantStore", {
  state: () => {
    return {
      operator: undefined as Operator | undefined,
      site: undefined as Site | undefined,
      areas: [] as Area[],
      // Datos maestros de configuración (API REST)
      workcenter: undefined as Workcenter | undefined,
      // Datos en tiempo real (WebSocket)
      areasWorkcentersRt: [] as WorkcenterRealtime[],
      workcenterRt: undefined as WorkcenterRealtime | undefined,
      // Documentos de instrucciones de producción
      productionInstructionsDocuments: [] as File[],
      // Estado de conexión WebSocket
      _realtimeHandler: null as
        | RealtimeHandler
        | WorkcenterRealtimeHandler
        | null,
    };
  },
  getters: {
    // Vista combinada de áreas con workcenters (config + realtime)
    areasWorkcentersView(): WorkcenterViewState[] {
      return this.areas.flatMap((area) =>
        (area.workcenters || []).map((wc) => {
          const realtime = this.areasWorkcentersRt.find(
            (rt) => rt.workcenterId === wc.id
          );
          return {
            config: wc,
            realtime,
          } as WorkcenterViewState;
        })
      );
    },
    // Vista combinada del workcenter actual
    workcenterView(): WorkcenterViewState | undefined {
      if (!this.workcenter) return undefined;
      return {
        config: this.workcenter,
        realtime: this.workcenterRt,
      };
    },
  },
  actions: {
    /**
     * Carrega les dades d'àrees i workcenters des de l'API
     * NO gestiona connexió WebSocket (això es fa des de la vista)
     */
    async fetchAreasWithWorkcenters() {
      const sites = await ProductionServices.Site.getActive();
      if (sites && sites.length > 0) {
        this.site = sites[0];
      }
      this.areas = (await ProductionServices.Areas.getVisibleInPlant()) || [];
    },

    /**
     * Connecta al WebSocket general i configura handlers
     */
    connectToGeneral() {
      // Netejar handler anterior si existeix
      if (this._realtimeHandler) {
        this._realtimeHandler.cleanup();
      }

      // Connectar i subscriure's al servei
      const handler = ActionsService.client.connectToGeneral();
      handler.onUpdate((data) => {
        this.areasWorkcentersRt = data;
      });

      this._realtimeHandler = handler;
    },

    /**
     * Connecta al WebSocket d'un workcenter específic
     */
    connectToWorkcenter(workcenterId: string) {
      // Netejar handler anterior si existeix
      if (this._realtimeHandler) {
        this._realtimeHandler.cleanup();
      }

      // Connectar i subscriure's al servei
      const handler = ActionsService.client.connectToWorkcenter(workcenterId);
      handler.onUpdate((data) => {
        this.workcenterRt = data;
      });

      this._realtimeHandler = handler;
    },

    /**
     * Desconnecta el WebSocket i neteja handlers
     */
    disconnectWebSocket() {
      if (this._realtimeHandler) {
        this._realtimeHandler.cleanup();
        this._realtimeHandler = null;
      }
      this.areasWorkcentersRt = [];
      this.workcenterRt = undefined;
    },

    async fetchWorkcenter(workcenterId: string) {
      this.workcenter =
        await ProductionServices.Workcenter.getById(workcenterId);
      if (this.workcenter) {
        this.fetchWorkInstructionDocuments();
      }
    },

    async fetchWorkInstructionDocuments() {
      if (!this.workcenter) return;
      const fileService = new FileService();
      const files = await fileService.GetEntityFiles(
        "referenceMaps",
        "8002a9b4-55e9-464f-b03e-8d4b74544dd2"
      );
      if (files) {
        this.productionInstructionsDocuments = files;
      }
    },

    async clockInOperator() {
      if (!this.workcenter || !this.operator) return;

      const response = await ActionsService.client.clockInOperator({
        operatorId: this.operator.id,
        workcenterId: this.workcenter.id,
      });
    },
    async clockOutOperator() {
      if (!this.workcenter || !this.operator) return;

      const response = await ActionsService.client.clockOutOperator({
        operatorId: this.operator.id,
        workcenterId: this.workcenter.id,
      });
    },

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
  },
});
