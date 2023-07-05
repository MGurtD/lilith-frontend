import { defineStore } from "pinia";
import { AreaService, WorkcenterService, WorkcenterTypeService, SiteService, EnterpriseService } from "../services";
import { Workcenter, WorkcenterType, Area, Enterprise, Site } from "../types";

const workcenterService = new WorkcenterService("/workcenter");
const workcenterTypeService = new WorkcenterTypeService("/workcentertype");
const areaService = new AreaService("/area");
const siteService = new SiteService("/site");
const enterpriseService = new EnterpriseService("/enterprise");

export const usePlantModelStore = defineStore({
    id: "plantmodel",
    state: () => ({
        workcenter: undefined as Workcenter | undefined,
        workcenters: undefined as Array<Workcenter> | undefined,
        workcenterType: undefined as WorkcenterType | undefined,
        workcenterTypes: undefined as Array<WorkcenterType> | undefined,
        area: undefined as Area | undefined,
        areas: undefined as Array<Area> | undefined,
        site: undefined as Site | undefined,
        sites: undefined as Array<Site> | undefined,
        enterprise: undefined as Enterprise | undefined,
        enterprises: undefined as Array<Enterprise> | undefined,

    }),
    getters: {},
    actions: {
      //workcenter
        setNewWorkcenter(id: string){
            this.workcenter = {
                id: id,
                name: "",
                description: "",
                workcenterTypeId: "",
                areaId: "",
                disabled: false,
            } as Workcenter;
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
          setNewWorkcenterType(id: string){
            this.workcenterType = {
                id: id,
                name: "",
                description: "",
                disabled: false,
            }as WorkcenterType
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
          //area
          setNewArea(id: string){
            this.area = {
                id: id,
                name: "",
                description: "",
                siteId: "",
                disabled: false,
            }as Area
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
          setNewSite(id: string){
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
            }as Site
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
          setNewEnterprise(id: string){
            this.enterprise = {
                id: id,
                name: "",
                description: "",
                siteId: "",
                disabled: false,
            }as Area
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
    },
});