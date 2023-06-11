import { defineStore } from "pinia";
import { PurchaseInvoiceSerieService } from "../services/purchase.service";
import { PurchaseInvoiceSerie } from "../types";

const purchaseInvoiceSerieService = new PurchaseInvoiceSerieService("/purchaseinvoiceserie");

export const usePurchaseStore = defineStore({
    id: "purchases",
    state: () => ({
        purchaseInvoiceSerie: undefined as PurchaseInvoiceSerie | undefined,
        purchaseInvoiceSeries: undefined as Array<PurchaseInvoiceSerie> | undefined,
    }),
    getters: {},
    actions: {
        setNewPurchaseInvoiceSerie(id:string){
            this.purchaseInvoiceSerie = {
                id: id,
                name: "",
                description: "",
                disabled: false,
            } as PurchaseInvoiceSerie;
        },

        async fetchPurchaseInvoiceSeries() {
            this.purchaseInvoiceSeries = await purchaseInvoiceSerieService.getAll();
        },

        async fetchPurchaseInvoiceSerie(id: string) {
            this.purchaseInvoiceSerie = await purchaseInvoiceSerieService.getById(id);
        },

        async createPurchaseInvoiceSerie(purchaseInvoiceSerie: PurchaseInvoiceSerie){
            const result = await purchaseInvoiceSerieService.create(purchaseInvoiceSerie);
            if (result) await this.fetchPurchaseInvoiceSeries();
            return result;
        },

        async updatePurchaseInvoiceSerie(id: string, purchaseInvoiceSerie: PurchaseInvoiceSerie){
            const result = await purchaseInvoiceSerieService.update(id, purchaseInvoiceSerie);
            if (result) await this.fetchPurchaseInvoiceSeries();
            return result;
        },

        async deletePurchaseInvoiceSerie(id: string){
            const result = await purchaseInvoiceSerieService.delete(id);
            if (result) await this.fetchPurchaseInvoiceSeries();
            return result;
        },
    }
});