import { defineStore } from "pinia";
<<<<<<< HEAD
import {
  Area,
  Operator,
  Site,
  Workcenter,
  WorkOrder,
} from "../../production/types";
import {
  WorkcenterRealtime,
  WorkcenterViewState,
  RealtimeHandler,
  WorkcenterRealtimeHandler,
} from "../types";
=======
import { Area, Operator, Site, Workcenter } from "../../production/types";
import { WorkcenterRt } from "../types";
>>>>>>> origin/main
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
<<<<<<< HEAD
      // Datos maestros de configuración (API REST)
      workcenter: undefined as Workcenter | undefined,
      workcenterPictureBlob: undefined as Blob | undefined,
      workcenterPictureUrl: undefined as string | undefined,
      // Datos en tiempo real (WebSocket)
      areasWorkcentersRt: [] as WorkcenterRealtime[],
      workcenterRt: undefined as WorkcenterRealtime | undefined,
      // WorkOrder seleccionada manualmente (temporal hasta WebSocket)
      selectedWorkOrder: undefined as WorkOrder | undefined,
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
=======
      workcenter: undefined as Workcenter | undefined,
      workcenterRt: undefined as WorkcenterRt | undefined,
      workcenterImageBlob: undefined as Blob | undefined,
      productionInstructionsDocuments: [] as File[],
      // Realtime array of workcenters received from WebSocket snapshot
      areasWorkcentersRt: [] as WorkcenterRt[],
    };
  },
  actions: {
>>>>>>> origin/main
    async fetchAreasWithWorkcenters() {
      const sites = await ProductionServices.Site.getActive();
      if (sites && sites.length > 0) {
        this.site = sites[0];
      }
      this.areas = (await ProductionServices.Areas.getVisibleInPlant()) || [];
<<<<<<< HEAD
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

=======

      // Simple realtime socket connection: listen for snapshot and populate areasWorkcentersRt
      ActionsService.client.connect();
      ActionsService.client.onMessage((data: any) => {
        if (data && data.Workcenters && typeof data.Workcenters === "object") {
          // Convert dictionary to array; cast minimally to WorkcenterRt
          this.areasWorkcentersRt = Object.values(
            data.Workcenters
          ) as WorkcenterRt[];
        }
      });

      // implement socket and handle messages
    },
>>>>>>> origin/main
    async fetchWorkcenter(workcenterId: string) {
      this.workcenter =
        await ProductionServices.Workcenter.getById(workcenterId);
      if (this.workcenter) {
<<<<<<< HEAD
        this.fetchWorkcenterPicture();
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
          // Descarga el archivo como Blob
          const response = await fileService.Download(files[0]);
          this.workcenterPictureBlob = new Blob([response], {
            type: "image/jpeg",
          });

          // Crea ObjectURL para usar en <img src="">
          if (this.workcenterPictureUrl) {
            URL.revokeObjectURL(this.workcenterPictureUrl); // Limpia URL anterior
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
=======
        this.workcenterRt = {
          workcenter: this.workcenter,
          workcenterId: this.workcenter.id,
          workcenterName: this.workcenter.name,
          workcenterDescription: this.workcenter.description,
          areaId: this.workcenter.areaId,
          areaDescription: "",
          shiftId: this.workcenter.shiftId,
          shiftName: "",
          shiftDetailId: "",
          shiftDetailStartTime: "",
          shiftDetailEndTime: "",
          shiftDetailsIsProductiveTime: false,
          statusId: "",
          statusName: "",
          statusOperatorsAllowed: false,
          statusClosed: false,
          statusStopped: false,
          statusColor: "",
          statusStartTime: "",
          operators: [],
        };

        this.fetchWorkInstructionDocuments();
      }
    },

    async fetchWorkInstructionDocuments() {
      if (!this.workcenter) return;
      const fileService = new FileService();
      const files = await fileService.GetEntityFiles(
        "referenceMaps",
        "8002a9b4-55e9-464f-b03e-8d4b74544dd2"
>>>>>>> origin/main
      );
      if (files) {
        this.productionInstructionsDocuments = files;
      }
    },

<<<<<<< HEAD
    async clockInOperator(): Promise<boolean> {
      if (!this.workcenter || !this.operator) return false;

      return await ActionsService.client.clockInOperator({
        operatorId: this.operator.id,
        workcenterId: this.workcenter.id,
      });
    },
    async clockOutOperator(): Promise<boolean> {
      if (!this.workcenter || !this.operator) return false;

      return await ActionsService.client.clockOutOperator({
        operatorId: this.operator.id,
        workcenterId: this.workcenter.id,
      });
    },

=======
>>>>>>> origin/main
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

<<<<<<< HEAD
    setSelectedWorkOrder(workOrder: WorkOrder) {
      this.selectedWorkOrder = workOrder;
    },
    clearSelectedWorkOrder() {
      this.selectedWorkOrder = undefined;
=======
    async clockInOperator() {
      console.log(this.operator, this.workcenter);
      if (!this.workcenter || !this.operator) return;

      const response = await ActionsService.client.clockInOperator({
        operatorId: this.operator.id,
        workcenterId: this.workcenter.id,
      });
      console.log("Clock-in response:", response);
    },
    async clockOutOperator() {
      if (!this.workcenter || !this.operator) return;

      const response = await ActionsService.client.clockOutOperator({
        operatorId: this.operator.id,
        workcenterId: this.workcenter.id,
      });
      console.log("Clock-out response:", response);
>>>>>>> origin/main
    },
  },
});
