import { defineStore } from "pinia";
import { Customer, CustomerContact, CustomerAddress, CustomerType } from "../types";
import { CustomerService, CustomerTypeService } from "../api/services/customer.service";

const service = new CustomerService("/customer");
const typeservice = new CustomerTypeService("/customertype");

export const useCustomersStore = defineStore({
    id: "customers",
    state: () => ({
        customers: undefined as Array<Customer> | undefined,
        customerTypes: undefined as Array<CustomerType> | undefined,
        customer: undefined as Customer| undefined,
        customerType: undefined as CustomerType | undefined,
    }),
    getters: {},
    actions: {
        setNewCustomer(id: string) {
            this.customer = {
                id: id,
                code: "",
                comercialName: "",
                taxName: "",
                vatNumber: "",
                web: "",
                disabled: false,
                customerTypeId: "",
            } as Customer;
        },
        async fetchCustomers() {
            this.customers = await service.getAll();
        },
        async fetchCustomer(id: string) {
            this.customer = await service.getById(id);
          },
          async createSupplier(customer: Customer) {
            const result = await service.create(customer);
            if (result) await this.fetchCustomers();
            return result;
          },
          async updateCustomer(id: string, customer: Customer) {
            const result = await service.update(id, customer);
            if (result) await this.fetchCustomers();
            return result;
          },
          async deleteCustomer(id: string) {
            const result = await service.delete(id);
            if (result) await this.fetchCustomers();
            return result;
          }
    },
});