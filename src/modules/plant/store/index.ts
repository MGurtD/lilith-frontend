import { defineStore } from "pinia";
import { Area, Operator, Site, Workcenter } from "../../production/types";
import { WorkcenterRt } from "../types";
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
      workcenter: undefined as Workcenter | undefined,
      workcenterRt: undefined as WorkcenterRt | undefined,
      workcenterImageBlob: undefined as Blob | undefined,
      productionInstructionsDocuments: [] as File[],
      // Realtime array of workcenters received from WebSocket snapshot
      areasWorkcentersRt: [] as WorkcenterRt[],
    };
  },
  actions: {
    async fetchAreasWithWorkcenters() {
      const sites = await ProductionServices.Site.getActive();
      if (sites && sites.length > 0) {
        this.site = sites[0];
      }
      this.areas = (await ProductionServices.Areas.getVisibleInPlant()) || [];

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
    async fetchWorkcenter(workcenterId: string) {
      this.workcenter =
        await ProductionServices.Workcenter.getById(workcenterId);
      if (this.workcenter) {
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
      );
      if (files) {
        this.productionInstructionsDocuments = files;
      }
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
    },
  },
});
