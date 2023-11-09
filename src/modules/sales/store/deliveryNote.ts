import { defineStore } from "pinia";
import {
  DeliveryNote,
  DeliveryNoteDetail,
  CreateSalesHeaderRequest,
} from "../types";
import SalesServices from "../services";

export const useDeliveryNoteStore = defineStore({
  id: "deliveryNote",
  state: () => ({
    deliveryNote: undefined as DeliveryNote | undefined,
    deliveryNotes: undefined as Array<DeliveryNote> | undefined,
  }),
  getters: {},
  actions: {
    async Create(createRequest: CreateSalesHeaderRequest) {
      const response = await SalesServices.DeliveryNote.Create(createRequest);
      return response.result;
    },
    async GetById(id: string) {
      this.deliveryNote = await SalesServices.DeliveryNote.getById(id);
    },
    async GetFiltered(startTime: string, endTime: string, customerId?: string) {
      if (customerId) {
        this.deliveryNotes =
          await SalesServices.DeliveryNote.GetBetweenDatesAndCustomer(
            startTime,
            endTime,
            customerId
          );
      } else {
        this.deliveryNotes = await SalesServices.DeliveryNote.GetBetweenDates(
          startTime,
          endTime
        );
      }
    },

    async GetBetweenDates(startTime: string, endTime: string) {
      this.deliveryNotes = await SalesServices.DeliveryNote.GetBetweenDates(
        startTime,
        endTime
      );
    },
    async Update(id: string, salesOrder: DeliveryNote) {
      const updated = await SalesServices.DeliveryNote.update(id, salesOrder);
      return updated;
    },
    async Delete(id: string): Promise<boolean> {
      const deleted = await SalesServices.DeliveryNote.delete(id);
      return deleted;
    },
    async CreateDetail(detail: DeliveryNoteDetail): Promise<boolean> {
      const response = await SalesServices.DeliveryNote.CreateDetail(detail);
      if (response.result) await this.GetById(response.content!.deliveryNoteId);
      return response.result;
    },
    async UpdateDetail(detail: DeliveryNoteDetail): Promise<boolean> {
      const response = await SalesServices.DeliveryNote.UpdateDetail(detail);
      if (response.result) await this.GetById(response.content!.deliveryNoteId);
      return response.result;
    },
    async DeleteDetail(detail: DeliveryNoteDetail): Promise<boolean> {
      const response = await SalesServices.DeliveryNote.DeleteDetail(detail);
      if (response.result) await this.GetById(response.content!.deliveryNoteId);
      return response.result;
    },
  },
});
