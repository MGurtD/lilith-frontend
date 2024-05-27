import { defineStore } from "pinia";
import {
  AreaService,
  WorkcenterService,
  WorkcenterTypeService,
  SiteService,
  EnterpriseService,
  OperatorService,
  OperatorTypeService,
  MachineStatusService,
  WorkcenterCostService,
} from "../services";
import {
  Workcenter,
  WorkcenterCost,
  WorkcenterType,
  Area,
  Enterprise,
  Site,
  Operator,
  OperatorType,
  MachineStatus,
} from "../types";

const workcenterService = new WorkcenterService("/workcenter");
const workcenterTypeService = new WorkcenterTypeService("/workcentertype");
const workcenterCostService = new WorkcenterCostService("/workcentercost");
const areaService = new AreaService("/area");
const siteService = new SiteService("/site");
const enterpriseService = new EnterpriseService("/enterprise");
const operatorService = new OperatorService("/operator");
const operatorTypeService = new OperatorTypeService("/operatortype");
const machineStatusService = new MachineStatusService("/machinestatus");

export const usePlantModelStore = defineStore({
  id: "plantmodel",
  state: () => ({
    workcenter: undefined as Workcenter | undefined,
    workcenters: undefined as Array<Workcenter> | undefined,
    workcentercost: undefined as WorkcenterCost | undefined,
    workcentercosts: undefined as Array<WorkcenterCost> | undefined,
    workcenterType: undefined as WorkcenterType | undefined,
    workcenterTypes: undefined as Array<WorkcenterType> | undefined,
    area: undefined as Area | undefined,
    areas: undefined as Array<Area> | undefined,
    site: undefined as Site | undefined,
    sites: undefined as Array<Site> | undefined,
    enterprise: undefined as Enterprise | undefined,
    enterprises: undefined as Array<Enterprise> | undefined,
    operator: undefined as Operator | undefined,
    operators: undefined as Array<Operator> | undefined,
    operatorType: undefined as OperatorType | undefined,
    operatorTypes: undefined as Array<OperatorType> | undefined,
    machineStatus: undefined as MachineStatus | undefined,
    machineStatuses: undefined as Array<MachineStatus> | undefined,
  }),
  getters: {
    getWorkcentersByTypeId: (state) => {
      return (typeId: string) => {
        if (!state.workcenters) return [];

        return state.workcenters.filter((w) => w.workcenterTypeId === typeId);
      };
    },
    getWorkcenterNameById: (state) => {
      return (id: string): string => {
        if (!state.workcenters) return "";

        const workcenter = state.workcenters.find((w) => w.id === id);
        return workcenter ? workcenter.description : "";
      };
    },
    getOperatorNameById: (state) => {
      return (id: string): string => {
        if (!state.operators) return "";

        const operator = state.operators.find((o) => o.id === id);
        return operator ? `${operator.name} ${operator.surname}` : "";
      };
    },
    getMachineStatusNameById: (state) => {
      return (id: string): string => {
        if (!state.machineStatuses) return "";

        const machineStatus = state.machineStatuses.find((o) => o.id === id);
        return machineStatus ? `${machineStatus.description}` : "";
      };
    },
  },
  actions: {
    //workcenter
    setNewWorkcenter(id: string) {
      this.workcenter = {
        id: id,
        name: "",
        description: "",
        workcenterTypeId: "",
        areaId: "",
        shiftId: "",
        disabled: false,
      } as Workcenter;
    },
    async fetchActiveModel() {
      this.workcenterTypes = await workcenterTypeService.getActive();
      this.areas = await areaService.getActive();
      this.workcenters = await workcenterService.getActive();
      this.machineStatuses = await machineStatusService.getActive();
      this.operatorTypes = await operatorTypeService.getActive();
      this.operators = await operatorService.getActive();
    },
    async fetchWorkcenters() {
      this.workcenters = await workcenterService.getAll();
    },
    async fetchWorkcenter(id: string) {
      this.workcenter = await workcenterService.getById(id);
    },
    async createWorkcenter(workcenter: Workcenter) {
      const result = await workcenterService.create(workcenter);
      if (result) await this.fetchWorkcenters();
      return result;
    },
    async updateWorkcenter(id: string, workcenter: Workcenter) {
      const result = await workcenterService.update(id, workcenter);
      if (result) await this.fetchWorkcenters();
      return result;
    },
    async deleteWorkcenter(id: string) {
      const result = await workcenterService.delete(id);
      if (result) await this.fetchWorkcenters();
      return result;
    },
    //workcentertype
    setNewWorkcenterType(id: string) {
      this.workcenterType = {
        id: id,
        name: "",
        description: "",
        disabled: false,
      } as WorkcenterType;
    },
    async fetchWorkcenterTypes() {
      this.workcenterTypes = await workcenterTypeService.getAll();
    },
    async fetchWorkcenterType(id: string) {
      this.workcenterType = await workcenterTypeService.getById(id);
    },
    async createWorkcenterType(workcentertype: WorkcenterType) {
      const result = await workcenterTypeService.create(workcentertype);
      if (result) await this.fetchWorkcenterTypes();
      return result;
    },
    async updateWorkcenterType(id: string, workcentertype: WorkcenterType) {
      const result = await workcenterTypeService.update(id, workcentertype);
      if (result) await this.fetchWorkcenterTypes();
      return result;
    },
    async deleteWorkcenterType(id: string) {
      const result = await workcenterTypeService.delete(id);
      if (result) await this.fetchWorkcenterTypes();
      return result;
    },
    setNewWorkcenterCost(id: string) {
      this.workcentercost = {
        id: id,
        workcenterId: "",
        machineStatusId: "",
        cost: 0.0,
        disabled: false,
      };
    },
    async fetchWorkcenterCosts() {
      this.workcentercosts = await workcenterCostService.getAll();
    },
    async fetchWorkcenterCost(id: string) {
      this.workcentercost = await workcenterCostService.getById(id);
    },
    async createWorkcenterCost(workcentercosts: WorkcenterCost) {
      const result = await workcenterCostService.create(workcentercosts);
      if (result) await this.fetchWorkcenterCosts();
      return result;
    },
    async updateWorkcenterCost(id: string, workcentercosts: WorkcenterCost) {
      const result = await workcenterCostService.update(id, workcentercosts);
      if (result) await this.fetchWorkcenterCosts();
      return result;
    },
    async deleteWorkcenterCost(id: string) {
      const result = await workcenterCostService.delete(id);
      if (result) await this.fetchWorkcenterCosts();
      return result;
    },
    //area
    setNewArea(id: string) {
      this.area = {
        id: id,
        name: "",
        description: "",
        siteId: "",
        disabled: false,
      } as Area;
    },
    async fetchAreas() {
      this.areas = await areaService.getAll();
    },
    async fetchArea(id: string) {
      this.area = await areaService.getById(id);
    },
    async createArea(area: Area) {
      const result = await areaService.create(area);
      if (result) await this.fetchAreas();
      return result;
    },
    async updateArea(id: string, area: Area) {
      const result = await areaService.update(id, area);
      if (result) await this.fetchAreas();
      return result;
    },
    async deleteArea(id: string) {
      const result = await areaService.delete(id);
      if (result) await this.fetchAreas();
      return result;
    },
    //site
    setNewSite(id: string) {
      this.site = {
        id: id,
        name: "",
        description: "",
        address: "",
        city: "",
        postalCode: "",
        region: "",
        country: "",
        phoneNumber: "",
        email: "",
        vatNumber: "",
        enterpriseId: "",
        disabled: false,
      } as Site;
    },
    async fetchSites() {
      this.sites = await siteService.getAll();
    },
    async fetchSite(id: string) {
      this.site = await siteService.getById(id);
    },
    async createSite(site: Site) {
      const result = await siteService.create(site);
      if (result) await this.fetchSites();
      return result;
    },
    async updateSite(id: string, site: Site) {
      const result = await siteService.update(id, site);
      if (result) await this.fetchSites();
      return result;
    },
    async deleteSite(id: string) {
      const result = await siteService.delete(id);
      if (result) await this.fetchSites();
      return result;
    },

    //enterprise
    setNewEnterprise(id: string) {
      this.enterprise = {
        id: id,
        name: "",
        description: "",
        siteId: "",
        disabled: false,
      } as Area;
    },
    async fetchEnterprises() {
      this.enterprises = await enterpriseService.getAll();
    },
    async fetchEnterprise(id: string) {
      this.enterprise = await enterpriseService.getById(id);
    },
    async createEnterprise(enterprise: Enterprise) {
      const result = await enterpriseService.create(enterprise);
      if (result) await this.fetchEnterprises();
      return result;
    },
    async updateEnterprise(id: string, enterprise: Enterprise) {
      const result = await enterpriseService.update(id, enterprise);
      if (result) await this.fetchEnterprises();
      return result;
    },
    async deleteEnterprise(id: string) {
      const result = await enterpriseService.delete(id);
      if (result) await this.fetchEnterprises();
      return result;
    },
    //Operator
    setNewOperator(id: string) {
      this.operator = {
        id: id,
        code: "",
        name: "",
        surname: "",
        operatorTypeId: "",
        disabled: false,
      } as Operator;
    },
    async fetchOperators() {
      this.operators = await operatorService.getAll();
    },
    async fetchOperator(id: string) {
      this.operator = await operatorService.getById(id);
    },
    async createOperator(operator: Operator) {
      const result = await operatorService.create(operator);
      if (result) await this.fetchOperators();
      return result;
    },
    async updateOperator(id: string, operator: Operator) {
      const result = await operatorService.update(id, operator);
      if (result) await this.fetchOperators();
      return result;
    },
    async deleteOperator(id: string) {
      const result = await operatorService.delete(id);
      if (result) await this.fetchOperators();
      return result;
    },
    setNewOperatorType(id: string) {
      this.operatorType = {
        id: id,
        name: "",
        description: "",
        disabled: false,
      } as OperatorType;
    },
    async fetchOperatorTypes() {
      this.operatorTypes = await operatorTypeService.getAll();
    },
    async fetchOperatorType(id: string) {
      this.operatorType = await operatorTypeService.getById(id);
    },
    async createOperatorType(operatorType: OperatorType) {
      const result = await operatorTypeService.create(operatorType);
      if (result) await this.fetchOperatorTypes();
      return result;
    },
    async updateOperatorType(id: string, operatorType: OperatorType) {
      const result = await operatorTypeService.update(id, operatorType);
      if (result) await this.fetchOperatorTypes();
      return result;
    },
    async deleteOperatorType(id: string) {
      const result = await operatorTypeService.delete(id);
      if (result) await this.fetchOperatorTypes();
      return result;
    },
    setNewMachineStatus(id: string) {
      this.machineStatus = {
        id: id,
        name: "",
        description: "",
        disabled: false,
      } as MachineStatus;
    },
    async fetchMachineStatuses() {
      this.machineStatuses = await machineStatusService.getAll();
    },
    async fetchMachineStatus(id: string) {
      this.machineStatus = await machineStatusService.getById(id);
    },
    async createMachineStatus(machineStatus: MachineStatus) {
      const result = await machineStatusService.create(machineStatus);
      if (result) await this.fetchMachineStatuses();
      return result;
    },
    async updateMachineStatus(id: string, machineStatus: MachineStatus) {
      const result = await machineStatusService.update(id, machineStatus);
      if (result) await this.fetchMachineStatuses();
      return result;
    },
    async deleteMachineStatus(id: string) {
      const result = await machineStatusService.delete(id);
      if (result) await this.fetchMachineStatuses();
      return result;
    },
  },
});
