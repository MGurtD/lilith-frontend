import { defineStore } from "pinia";
import { PaymentMethod } from "../types";
import { PaymentMethodService } from "../api/services/paymentmethod.service";

const service = new PaymentMethodService("/PaymentMethod");

export const usePaymentMethodStore = defineStore({
  id: "paymentMethod",
  state: () => ({
    paymentMethods: undefined as Array<PaymentMethod> | undefined,
    paymentMethod: undefined as PaymentMethod | undefined,
  }),
  getters: {},
  actions: {
    setNew(id: string) {
      this.paymentMethod = {
        id: id,
        name: "",
        description: "",
        disabled: false,
        dueDays: 0,
        paymentDay: 1,
        numberOfPayments: 1,
        frequency: 1,
      } as PaymentMethod;
    },
    async fetchAll() {
      this.paymentMethods = await service.getAll();

      // if (this.paymentMethods) {
      //   this.paymentMethods = this.paymentMethods.filter(
      //     (p) => p.disabled === false
      //   );
      // }
    },
    async fetchOne(id: string) {
      this.paymentMethod = await service.getById(id);
    },
    async create(model: PaymentMethod) {
      const result = await service.create(model);
      if (result) await this.fetchAll();
      return result;
    },
    async update(id: string, model: PaymentMethod) {
      const result = await service.update(id, model);
      if (result) await this.fetchAll();
      return result;
    },
    async delete(id: string) {
      const result = await service.delete(id);
      if (result) await this.fetchAll();
      return result;
    },
  },
});
